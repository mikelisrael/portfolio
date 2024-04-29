"use server";

import puppeteer from "puppeteer";

export async function getScreenShot(url: string | undefined) {
  if (!url) {
    return "";
  }

  console.log("url", url, "running fetch");
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(url);
  const screenshotBuffer = await page.screenshot();
  await browser.close();
  return `data:image/png;base64,${screenshotBuffer.toString("base64")}`;
}

export default getScreenShot;
