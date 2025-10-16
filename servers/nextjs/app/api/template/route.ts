import { NextResponse } from "next/server";
import { getBrowser } from "@/lib/puppeteer";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const groupName = searchParams.get("group");

  if (!groupName) {
    return NextResponse.json({ error: "Missing group name" }, { status: 400 });
  }

  const schemaPageUrl = `http://localhost/schema?group=${encodeURIComponent(
    groupName
  )}`;

  console.log(`Fetching schema from URL: ${schemaPageUrl}`);

  let page; // The page is the only resource we manage here
  try {
    const browser = await getBrowser(); // Get the single, shared browser instance
    page = await browser.newPage(); // Create a new, lightweight page directly

    await page.setViewport({ width: 1280, height: 720 });
    
    const navigationTimeout = 120000; // 2 minutes

    await page.goto(schemaPageUrl, {
      waitUntil: "networkidle0",
      timeout: navigationTimeout,
    });

    await page.waitForSelector("[data-layouts]", { timeout: navigationTimeout });
    await page.waitForSelector("[data-settings]", { timeout: navigationTimeout });

    console.log("Successfully loaded schema page and found data attributes.");

    const { dataLayouts, dataGroupSettings } = await page.$eval(
      "[data-layouts]",
      (el: Element) => ({
        dataLayouts: el.getAttribute("data-layouts"),
        dataGroupSettings: el.getAttribute("data-settings"),
      })
    );
    
    // ... (Your JSON parsing and response logic is correct and stays the same)
    let slides, groupSettings;
    try {
      slides = JSON.parse(dataLayouts || "[]");
    } catch (e) {
      console.error("Failed to parse data-layouts JSON:", e);
      slides = [];
    }
    try {
      groupSettings = JSON.parse(dataGroupSettings || "null");
    } catch (e) {
      console.error("Failed to parse data-settings JSON:", e);
      groupSettings = null;
    }

    const response = {
      name: groupName,
      ordered: groupSettings?.ordered ?? false,
      slides: slides.map((slide: any) => ({
        id: slide.id,
        name: slide.name,
        description: slide.description,
        json_schema: slide.json_schema,
        isTerminal: slide.isTerminal ?? false,
      })),
    };

    return NextResponse.json(response);
  } catch (err: unknown) {
    let errorMessage = "An unknown error occurred";
    if (err instanceof Error) {
      errorMessage = err.message;
    }

    console.error(`Error in template API for group '${groupName}':`, errorMessage);
    return NextResponse.json(
      { error: "Failed to. fetch or parse client page", detail: errorMessage },
      { status: 500 }
    );
  } finally {
    // We only need to close the page. The browser instance stays alive.
    if (page) {
      await page.close();
    }
    console.log(`Cleaned up browser page for group: ${groupName}`);
  }
}