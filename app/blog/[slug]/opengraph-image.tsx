import { client } from "@/sanity/lib/client";
import { IPost } from "@/types";
import { groq } from "next-sanity";
import { ImageResponse } from "next/og";

// Image metadata
export const alt = "Blog post image";
export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

// Image generation
export default async function Image({
  params: { slug },
}: {
  params: { slug: string };
}) {
  const titleQuery = groq`*[_type == "post" && slug.current == $slug][0]{title}`;
  const res: IPost = await client.fetch(titleQuery, { slug });

  // Font
  const comfortaaSemiBold = fetch(
    new URL("../../../public/font/Comfortaa-SemiBold.ttf", import.meta.url),
  ).then((res) => res.arrayBuffer());

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          fontSize: 40,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: "0.75rem",
          backgroundColor: "#333647",
          padding: "2.5rem",
          color: "#eaeaeb",
        }}
      >
        <svg width="75" height="75" viewBox="0 0 178 194" version="1.1">
          <path
            d="M 92.699 2.022 C 89.372 4.639, 84.722 16.658, 80.350 33.942 C 78.479 41.335, 76.777 47.556, 76.567 47.766 C 76.357 47.977, 75.856 44.643, 75.454 40.357 C 74.616 31.409, 75.377 15.919, 77.033 8.249 C 77.656 5.361, 78.016 2.569, 77.833 2.043 C 77.516 1.134, 14.115 36.910, 14.037 38.042 C 14.017 38.341, 19.361 39.573, 25.912 40.780 C 42.820 43.895, 60.498 49.976, 78.735 58.951 C 92.658 65.803, 111.735 76.671, 121.574 83.357 L 124.918 85.629 120.265 89.110 L 115.612 92.591 102.284 84.385 C 77.915 69.381, 48.349 56.413, 29.792 52.589 C 19.568 50.481, 7.711 50.488, 4.483 52.603 C 3.138 53.484, 1.581 55.847, 1.024 57.853 C -0.072 61.799, -0.422 125.645, 0.612 133.183 C 1.395 138.895, 3.712 141.921, 8.050 142.895 C 13.669 144.157, 27.059 142.194, 41.233 138.029 L 54.500 134.130 50.500 137.529 C 45.380 141.880, 29.489 150.115, 20.661 152.993 C 15.867 154.556, 14.137 155.537, 14.877 156.277 C 16.463 157.863, 77.409 192.924, 77.837 192.496 C 78.041 192.293, 76.588 187.260, 74.609 181.313 C 70.604 169.278, 67.660 156.619, 65.361 141.545 C 63.630 130.197, 62.176 71.973, 63.625 72.041 C 64.106 72.064, 66.525 73.076, 69 74.291 L 73.500 76.500 74.105 102 C 74.863 133.978, 77.525 153.767, 83.721 173.500 C 88.461 188.595, 92.969 194.813, 98.418 193.771 C 99.745 193.517, 115.996 184.577, 134.530 173.905 C 173.137 151.673, 173.274 151.552, 168.746 143.835 C 165.398 138.127, 148.567 118.487, 142.936 113.717 C 138.904 110.301, 138.773 110.058, 141.500 111.046 C 150.849 114.435, 164.026 122.614, 172.684 130.403 L 177.868 135.066 178.478 130.783 C 178.814 128.427, 178.956 111.255, 178.794 92.621 L 178.500 58.742 168.842 69.713 C 157.964 82.068, 143.221 95.200, 128.459 105.683 C 118.144 113.007, 97.340 125.792, 88.345 130.334 C 82.527 133.272, 82 132.919, 82 126.073 C 82 121.492, 82.402 121.131, 96.500 113.047 C 118.026 100.704, 135.654 87.423, 148.533 73.845 C 158.595 63.236, 169.632 49.852, 170.422 47.300 C 171.861 42.651, 168.848 39.853, 151.848 30.051 C 106.457 3.878, 99.435 -0, 97.435 -0 C 96.244 -0, 94.113 0.910, 92.699 2.022 M 0.452 96 C 0.452 116.075, 0.585 124.288, 0.749 114.250 C 0.912 104.213, 0.912 87.788, 0.749 77.750 C 0.585 67.713, 0.452 75.925, 0.452 96"
            stroke="none"
            fill="#ffc45c"
            fill-rule="evenodd"
          />
          <path d="" stroke="none" fill="#fcc45c" fill-rule="evenodd" />
        </svg>
        <div style={{ marginTop: 40, fontWeight: 700, textAlign: "center" }}>
          {res.title}
        </div>
        <div style={{ fontSize: "22px" }}>Michael Israel</div>
      </div>
    ),
    // ImageResponse options
    {
      // For convenience, we can re-use the exported opengraph-image
      // size config to also set the ImageResponse's width and height.
      ...size,
      fonts: [
        {
          name: "Comfortaa",
          data: await comfortaaSemiBold,
          style: "normal",
        },
      ],
    },
  );
}
