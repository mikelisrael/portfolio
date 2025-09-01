"use client";
import React from "react";

type PixelatedCanvasProps = {
  src: string;
  width?: number;
  height?: number;
  /** Size of each cell (in CSS pixels) used for sampling and spacing. */
  cellSize?: number;
  /** Dot size as a fraction of cell size (0..1). */
  dotScale?: number;
  /** Shape of the dot drawn for each sample. */
  shape?: "circle" | "square";
  /** Optional background color to clear the canvas with before drawing. */
  backgroundColor?: string;
  /** Convert to grayscale before drawing. */
  grayscale?: boolean;
  className?: string;
  /** Redraw on window resize using the provided width/height. */
  responsive?: boolean;
  /** 0..1. Higher value removes more dots in low-contrast regions. */
  dropoutStrength?: number;
  /** Enable interactive mouse distortion animation. */
  interactive?: boolean;
  /** Max per-dot offset (px) due to distortion. */
  distortionStrength?: number;
  /** Radius (px) around pointer influencing distortion. */
  distortionRadius?: number;
  /** How pixels move near the pointer. */
  distortionMode?: "repel" | "attract" | "swirl";
  /** 0..1 smoothing factor for pointer follow. */
  followSpeed?: number;
  /** Average multiple samples per cell instead of single center sample. */
  sampleAverage?: boolean;
  /** Apply a color tint (e.g., "#0ea5e9" or "rgb(14,165,233)"). */
  tintColor?: string;
  /** 0..1 tint mix amount with original colors. */
  tintStrength?: number;
  /** Cap animation frame rate to improve perf on large canvases. */
  maxFps?: number;
  /** Object-fit behavior for the source image within the canvas. */
  objectFit?: "cover" | "contain" | "fill" | "none";
  /** Random motion amplitude for dots near the pointer. */
  jitterStrength?: number;
  /** Speed factor for the random motion. */
  jitterSpeed?: number;
  /** Smoothly fade the distortion when the pointer leaves. */
  fadeOnLeave?: boolean;
  /** 0..1 smoothing factor for leave fade. Higher = faster fade. */
  fadeSpeed?: number;
};

export const PixelatedCanvas: React.FC<PixelatedCanvasProps> = ({
  src,
  width = 400,
  height = 500,
  cellSize = 3,
  dotScale = 0.9,
  shape = "square",
  backgroundColor = "#000000",
  grayscale = false,
  className,
  responsive = false,
  dropoutStrength = 0.4,
  interactive = true,
  distortionStrength = 3,
  distortionRadius = 80,
  distortionMode = "swirl",
  followSpeed = 0.2,
  sampleAverage = true,
  tintColor = "#FFFFFF",
  tintStrength = 0.2,
  maxFps = 60,
  objectFit = "cover",
  jitterStrength = 4,
  jitterSpeed = 4,
  fadeOnLeave = true,
  fadeSpeed = 0.1,
}) => {
  const canvasRef = React.useRef<HTMLCanvasElement | null>(null);
  const samplesRef = React.useRef<
    Array<{
      x: number;
      y: number;
      r: number;
      g: number;
      b: number;
      a: number;
      drop: boolean;
      seed: number;
    }>
  >([]);
  const dimsRef = React.useRef<{
    width: number;
    height: number;
    dot: number;
  } | null>(null);
  const targetMouseRef = React.useRef<{ x: number; y: number }>({
    x: -9999,
    y: -9999,
  });
  const animMouseRef = React.useRef<{ x: number; y: number }>({
    x: -9999,
    y: -9999,
  });
  const rafRef = React.useRef<number | null>(null);
  const lastFrameRef = React.useRef<number>(0);
  const pointerInsideRef = React.useRef<boolean>(false);
  const activityRef = React.useRef<number>(0);
  const activityTargetRef = React.useRef<number>(0);
  const staticDrawnRef = React.useRef<boolean>(false);
  const imageDataRef = React.useRef<ImageData | null>(null);
  const isInteractiveActiveRef = React.useRef<boolean>(false);
  const eventListenersAttachedRef = React.useRef<boolean>(false);

  // Optimized static render function
  const drawStatic = React.useCallback(() => {
    const canvas = canvasRef.current;
    const dims = dimsRef.current;
    const samples = samplesRef.current;
    if (!canvas || !dims || !samples) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Clear canvas
    if (backgroundColor) {
      ctx.fillStyle = backgroundColor;
      ctx.fillRect(0, 0, dims.width, dims.height);
    } else {
      ctx.clearRect(0, 0, dims.width, dims.height);
    }

    // Batch similar operations for better performance
    const circleOps: Array<{
      x: number;
      y: number;
      radius: number;
      color: string;
      alpha: number;
    }> = [];
    const rectOps: Array<{
      x: number;
      y: number;
      width: number;
      height: number;
      color: string;
      alpha: number;
    }> = [];

    for (const s of samples) {
      if (s.drop || s.a <= 0) continue;

      const color = `rgb(${s.r}, ${s.g}, ${s.b})`;
      const x = s.x + cellSize / 2;
      const y = s.y + cellSize / 2;

      if (shape === "circle") {
        circleOps.push({
          x,
          y,
          radius: dims.dot / 2,
          color,
          alpha: s.a,
        });
      } else {
        rectOps.push({
          x: x - dims.dot / 2,
          y: y - dims.dot / 2,
          width: dims.dot,
          height: dims.dot,
          color,
          alpha: s.a,
        });
      }
    }

    // Batch draw circles
    for (const op of circleOps) {
      ctx.globalAlpha = op.alpha;
      ctx.fillStyle = op.color;
      ctx.beginPath();
      ctx.arc(op.x, op.y, op.radius, 0, Math.PI * 2);
      ctx.fill();
    }

    // Batch draw rectangles
    for (const op of rectOps) {
      ctx.globalAlpha = op.alpha;
      ctx.fillStyle = op.color;
      ctx.fillRect(op.x, op.y, op.width, op.height);
    }

    ctx.globalAlpha = 1;
    staticDrawnRef.current = true;
  }, [cellSize, shape, backgroundColor]);

  // Animation loop - only runs when mouse is interacting
  const animate = React.useCallback(() => {
    const now = performance.now();
    const minDelta = 1000 / Math.max(1, maxFps);
    if (now - lastFrameRef.current < minDelta) {
      rafRef.current = requestAnimationFrame(animate);
      return;
    }
    lastFrameRef.current = now;

    const canvas = canvasRef.current;
    const dims = dimsRef.current;
    const samples = samplesRef.current;
    if (!canvas || !dims || !samples) {
      rafRef.current = requestAnimationFrame(animate);
      return;
    }

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Smooth mouse following
    animMouseRef.current.x =
      animMouseRef.current.x +
      (targetMouseRef.current.x - animMouseRef.current.x) * followSpeed;
    animMouseRef.current.y =
      animMouseRef.current.y +
      (targetMouseRef.current.y - animMouseRef.current.y) * followSpeed;

    // Activity fade handling
    if (fadeOnLeave) {
      activityRef.current =
        activityRef.current +
        (activityTargetRef.current - activityRef.current) * fadeSpeed;
    } else {
      activityRef.current = pointerInsideRef.current ? 1 : 0;
    }

    const activity = Math.max(0, Math.min(1, activityRef.current));

    // Stop animation when activity is essentially zero and mouse has left
    if (activity < 0.001 && !pointerInsideRef.current) {
      drawStatic();
      rafRef.current = null;
      return;
    }

    // Clear canvas
    if (backgroundColor) {
      ctx.fillStyle = backgroundColor;
      ctx.fillRect(0, 0, dims.width, dims.height);
    } else {
      ctx.clearRect(0, 0, dims.width, dims.height);
    }

    const mx = animMouseRef.current.x;
    const my = animMouseRef.current.y;
    const sigma = Math.max(1, distortionRadius * 0.5);
    const t = now * 0.001 * jitterSpeed;

    // Pre-calculate common values outside the loop
    const sigmaSq2 = 2 * sigma * sigma;
    const distStrength = distortionStrength;
    const swirlFactor = distStrength * 0.05;

    for (const s of samples) {
      if (s.drop || s.a <= 0) continue;

      let drawX = s.x + cellSize / 2;
      let drawY = s.y + cellSize / 2;

      // Only calculate distortion if activity is meaningful
      if (activity > 0.001) {
        const dx = drawX - mx;
        const dy = drawY - my;
        const dist2 = dx * dx + dy * dy;
        const falloff = Math.exp(-dist2 / sigmaSq2);
        const influence = falloff * activity;

        if (influence > 0.0005) {
          if (distortionMode === "repel") {
            const dist = Math.sqrt(dist2) + 0.0001;
            const factor = (distStrength * influence) / dist;
            drawX += dx * factor;
            drawY += dy * factor;
          } else if (distortionMode === "attract") {
            const dist = Math.sqrt(dist2) + 0.0001;
            const factor = (distStrength * influence) / dist;
            drawX -= dx * factor;
            drawY -= dy * factor;
          } else if (distortionMode === "swirl") {
            const angle = swirlFactor * influence;
            const cosA = Math.cos(angle);
            const sinA = Math.sin(angle);
            const rx = cosA * dx - sinA * dy;
            const ry = sinA * dx + cosA * dy;
            drawX = mx + rx;
            drawY = my + ry;
          }

          if (jitterStrength > 0) {
            const k = s.seed * 43758.5453;
            const jx = Math.sin(t + k) * jitterStrength * influence;
            const jy = Math.cos(t + k * 1.13) * jitterStrength * influence;
            drawX += jx;
            drawY += jy;
          }
        }
      }

      ctx.globalAlpha = s.a;
      ctx.fillStyle = `rgb(${s.r}, ${s.g}, ${s.b})`;

      if (shape === "circle") {
        const radius = dims.dot / 2;
        ctx.beginPath();
        ctx.arc(drawX, drawY, radius, 0, Math.PI * 2);
        ctx.fill();
      } else {
        ctx.fillRect(
          drawX - dims.dot / 2,
          drawY - dims.dot / 2,
          dims.dot,
          dims.dot,
        );
      }
    }
    ctx.globalAlpha = 1;

    rafRef.current = requestAnimationFrame(animate);
  }, [
    maxFps,
    followSpeed,
    fadeOnLeave,
    fadeSpeed,
    distortionRadius,
    distortionStrength,
    distortionMode,
    jitterStrength,
    jitterSpeed,
    cellSize,
    shape,
    backgroundColor,
  ]);

  const startAnimation = React.useCallback(() => {
    if (!rafRef.current && interactive && isInteractiveActiveRef.current) {
      rafRef.current = requestAnimationFrame(animate);
    }
  }, [animate, interactive]);

  const stopAnimation = React.useCallback(() => {
    if (rafRef.current) {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
    }
  }, []);

  const enableInteractivity = React.useCallback(() => {
    const canvasEl = canvasRef.current;
    if (!canvasEl || !interactive || eventListenersAttachedRef.current) return;

    const onPointerMove = (e: PointerEvent) => {
      const rect = canvasEl.getBoundingClientRect();
      targetMouseRef.current.x = e.clientX - rect.left;
      targetMouseRef.current.y = e.clientY - rect.top;

      if (!pointerInsideRef.current) {
        pointerInsideRef.current = true;
        activityTargetRef.current = 1;
        startAnimation();
      }
    };

    const onPointerEnter = () => {
      pointerInsideRef.current = true;
      activityTargetRef.current = 1;
      startAnimation();
    };

    const onPointerLeave = () => {
      pointerInsideRef.current = false;
      activityTargetRef.current = 0;

      // Immediately disable interactivity and clean up
      setTimeout(() => {
        if (!pointerInsideRef.current) {
          disableInteractivity();
          // Reset mouse position and activity
          targetMouseRef.current.x = -9999;
          targetMouseRef.current.y = -9999;
          animMouseRef.current.x = -9999;
          animMouseRef.current.y = -9999;
          activityRef.current = 0;
          // Redraw static version
          drawStatic();
        }
      }, 100); // Small delay to avoid flickering on quick mouse movements
    };

    canvasEl.addEventListener("pointermove", onPointerMove, { passive: true });
    canvasEl.addEventListener("pointerenter", onPointerEnter, {
      passive: true,
    });
    canvasEl.addEventListener("pointerleave", onPointerLeave, {
      passive: true,
    });

    eventListenersAttachedRef.current = true;
    isInteractiveActiveRef.current = true;

    // Store cleanup functions
    (canvasEl as any)._interactiveCleanup = () => {
      canvasEl.removeEventListener("pointermove", onPointerMove);
      canvasEl.removeEventListener("pointerenter", onPointerEnter);
      canvasEl.removeEventListener("pointerleave", onPointerLeave);
      eventListenersAttachedRef.current = false;
      isInteractiveActiveRef.current = false;
    };
  }, [interactive, startAnimation, drawStatic]);

  const disableInteractivity = React.useCallback(() => {
    const canvasEl = canvasRef.current;
    if (!canvasEl) return;

    stopAnimation();

    if ((canvasEl as any)._interactiveCleanup) {
      (canvasEl as any)._interactiveCleanup();
    }

    isInteractiveActiveRef.current = false;
    eventListenersAttachedRef.current = false;
  }, [stopAnimation]);

  // Hover detection for enabling interactivity
  const onMouseEnter = React.useCallback(() => {
    if (interactive && !isInteractiveActiveRef.current) {
      enableInteractivity();
    }
  }, [interactive, enableInteractivity]);

  React.useEffect(() => {
    let isCancelled = false;
    const canvas = canvasRef.current;
    if (!canvas) return;

    const img = new Image();
    img.crossOrigin = "anonymous";
    img.src = src;

    const compute = () => {
      if (!canvas || isCancelled) return;
      const dpr =
        typeof window !== "undefined" ? window.devicePixelRatio || 1 : 1;

      const displayWidth = width ?? img.naturalWidth;
      const displayHeight = height ?? img.naturalHeight;

      canvas.width = Math.max(1, Math.floor(displayWidth * dpr));
      canvas.height = Math.max(1, Math.floor(displayHeight * dpr));
      canvas.style.width = `${displayWidth}px`;
      canvas.style.height = `${displayHeight}px`;

      const ctx = canvas.getContext("2d");
      if (!ctx) return;
      ctx.resetTransform();
      ctx.scale(dpr, dpr);

      // Create offscreen canvas for image processing
      const offscreen = document.createElement("canvas");
      offscreen.width = Math.max(1, Math.floor(displayWidth));
      offscreen.height = Math.max(1, Math.floor(displayHeight));
      const off = offscreen.getContext("2d");
      if (!off) return;

      const iw = img.naturalWidth || displayWidth;
      const ih = img.naturalHeight || displayHeight;
      let dw = displayWidth;
      let dh = displayHeight;
      let dx = 0;
      let dy = 0;

      // Handle object-fit
      if (objectFit === "cover") {
        const scale = Math.max(displayWidth / iw, displayHeight / ih);
        dw = Math.ceil(iw * scale);
        dh = Math.ceil(ih * scale);
        dx = Math.floor((displayWidth - dw) / 2);
        dy = Math.floor((displayHeight - dh) / 2);
      } else if (objectFit === "contain") {
        const scale = Math.min(displayWidth / iw, displayHeight / ih);
        dw = Math.ceil(iw * scale);
        dh = Math.ceil(ih * scale);
        dx = Math.floor((displayWidth - dw) / 2);
        dy = Math.floor((displayHeight - dh) / 2);
      } else if (objectFit === "fill") {
        dw = displayWidth;
        dh = displayHeight;
      } else {
        dw = iw;
        dh = ih;
        dx = Math.floor((displayWidth - dw) / 2);
        dy = Math.floor((displayHeight - dh) / 2);
      }

      off.drawImage(img, dx, dy, dw, dh);

      let imageData: ImageData;
      try {
        imageData = off.getImageData(0, 0, offscreen.width, offscreen.height);
        imageDataRef.current = imageData; // Cache for potential reuse
      } catch {
        ctx.drawImage(img, 0, 0, displayWidth, displayHeight);
        return;
      }

      const data = imageData.data;
      const stride = offscreen.width * 4;
      const effectiveDotSize = Math.max(1, Math.floor(cellSize * dotScale));
      dimsRef.current = {
        width: displayWidth,
        height: displayHeight,
        dot: effectiveDotSize,
      };

      // Optimized luminance calculation
      const luminanceAt = (px: number, py: number) => {
        const ix = Math.max(0, Math.min(offscreen.width - 1, px));
        const iy = Math.max(0, Math.min(offscreen.height - 1, py));
        const i = iy * stride + ix * 4;
        return 0.2126 * data[i] + 0.7152 * data[i + 1] + 0.0722 * data[i + 2];
      };

      const hash2D = (ix: number, iy: number) => {
        const s = Math.sin(ix * 12.9898 + iy * 78.233) * 43758.5453123;
        return s - Math.floor(s);
      };

      // Parse tint color once
      let tintRGB: [number, number, number] | null = null;
      if (tintColor && tintStrength > 0) {
        const parse = (c: string): [number, number, number] | null => {
          if (c.startsWith("#")) {
            const hex = c.slice(1);
            if (hex.length === 3) {
              const r = parseInt(hex[0] + hex[0], 16);
              const g = parseInt(hex[1] + hex[1], 16);
              const b = parseInt(hex[2] + hex[2], 16);
              return [r, g, b];
            }
            const r = parseInt(hex.slice(0, 2), 16);
            const g = parseInt(hex.slice(2, 4), 16);
            const b = parseInt(hex.slice(4, 6), 16);
            return [r, g, b];
          }
          const m = c.match(/rgb\((\d+)\s*,\s*(\d+)\s*,\s*(\d+)\)/i);
          if (m)
            return [parseInt(m[1], 10), parseInt(m[2], 10), parseInt(m[3], 10)];
          return null;
        };
        tintRGB = parse(tintColor);
      }

      const samples: typeof samplesRef.current = [];

      // Process samples
      for (let y = 0; y < offscreen.height; y += cellSize) {
        const cy = Math.min(offscreen.height - 1, y + Math.floor(cellSize / 2));
        for (let x = 0; x < offscreen.width; x += cellSize) {
          const cx = Math.min(
            offscreen.width - 1,
            x + Math.floor(cellSize / 2),
          );

          let r = 0;
          let g = 0;
          let b = 0;
          let a = 0;

          if (!sampleAverage) {
            const idx = cy * stride + cx * 4;
            r = data[idx];
            g = data[idx + 1];
            b = data[idx + 2];
            a = data[idx + 3] / 255;
          } else {
            let count = 0;
            for (let oy = -1; oy <= 1; oy++) {
              for (let ox = -1; ox <= 1; ox++) {
                const sx = Math.max(0, Math.min(offscreen.width - 1, cx + ox));
                const sy = Math.max(0, Math.min(offscreen.height - 1, cy + oy));
                const sIdx = sy * stride + sx * 4;
                r += data[sIdx];
                g += data[sIdx + 1];
                b += data[sIdx + 2];
                a += data[sIdx + 3] / 255;
                count++;
              }
            }
            r = Math.round(r / count);
            g = Math.round(g / count);
            b = Math.round(b / count);
            a = a / count;
          }

          // Apply color transformations
          if (grayscale) {
            const L = Math.round(0.2126 * r + 0.7152 * g + 0.0722 * b);
            r = L;
            g = L;
            b = L;
          } else if (tintRGB && tintStrength > 0) {
            const k = Math.max(0, Math.min(1, tintStrength));
            r = Math.round(r * (1 - k) + tintRGB[0] * k);
            g = Math.round(g * (1 - k) + tintRGB[1] * k);
            b = Math.round(b * (1 - k) + tintRGB[2] * k);
          }

          // Calculate dropout
          const Lc = luminanceAt(cx, cy);
          const Lx1 = luminanceAt(cx - 1, cy);
          const Lx2 = luminanceAt(cx + 1, cy);
          const Ly1 = luminanceAt(cx, cy - 1);
          const Ly2 = luminanceAt(cx, cy + 1);
          const grad =
            Math.abs(Lx2 - Lx1) +
            Math.abs(Ly2 - Ly1) +
            Math.abs(Lc - (Lx1 + Lx2 + Ly1 + Ly2) / 4);
          const gradientNorm = Math.max(0, Math.min(1, grad / 255));
          const dropoutProb = Math.max(
            0,
            Math.min(1, (1 - gradientNorm) * dropoutStrength),
          );
          const drop = hash2D(cx, cy) < dropoutProb;
          const seed = hash2D(cx, cy);

          samples.push({ x, y, r, g, b, a, drop, seed });
        }
      }

      samplesRef.current = samples;
      staticDrawnRef.current = false;
    };

    img.onload = () => {
      if (isCancelled) return;
      compute();

      if (!interactive) {
        drawStatic();
        return;
      }

      // Draw initial static version - interactivity will be enabled on first hover
      drawStatic();
    };

    img.onerror = () => {
      console.error("Failed to load image for PixelatedCanvas:", src);
    };

    if (responsive) {
      const onResize = () => {
        if (img.complete && img.naturalWidth) {
          compute();
          if (!interactive || !pointerInsideRef.current) {
            drawStatic();
          }
        }
      };
      window.addEventListener("resize", onResize);
      return () => {
        isCancelled = true;
        window.removeEventListener("resize", onResize);
        if ((img as any)._cleanup) (img as any)._cleanup();
        disableInteractivity();
      };
    }

    return () => {
      isCancelled = true;
      if ((img as any)._cleanup) (img as any)._cleanup();
      disableInteractivity();
    };
  }, [
    src,
    width,
    height,
    cellSize,
    dotScale,
    shape,
    backgroundColor,
    grayscale,
    responsive,
    dropoutStrength,
    interactive,
    distortionStrength,
    distortionRadius,
    distortionMode,
    followSpeed,
    sampleAverage,
    tintColor,
    tintStrength,
    maxFps,
    objectFit,
    jitterStrength,
    jitterSpeed,
    fadeOnLeave,
    fadeSpeed,
    drawStatic,
    animate,
    startAnimation,
    stopAnimation,
  ]);

  return (
    <canvas
      ref={canvasRef}
      className={className}
      onMouseEnter={onMouseEnter}
      aria-label="Pixelated rendering of source image"
      role="img"
    />
  );
};

export default PixelatedCanvas;
