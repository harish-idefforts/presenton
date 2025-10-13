// lib/puppeteer.js
import puppeteer from "puppeteer";

let browserInstance = null;

export async function getBrowser() {
  if (browserInstance) {
    return browserInstance;
  }

  browserInstance = await puppeteer.launch({
    executablePath: process.env.PUPPETEER_EXECUTABLE_PATH,
    headless: true,
    args: [
      "--no-sandbox",
      "--disable-setuid-sandbox",
      "--disable-dev-shm-usage",
      "--disable-gpu",
      "--disable-web-security",
      // ... keep your other args
    ],
  });

  return browserInstance;
}