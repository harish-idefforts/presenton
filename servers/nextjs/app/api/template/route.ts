// in /app/api/template/route.ts

import { NextResponse } from "next/server";
import { getBrowser } from "@/lib/puppeteer"; // Adjust the import path if needed

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

  let context; // Use a browser context for better isolation
  try {
    const browser = await getBrowser();
    context = await browser.createIncognitoBrowserContext();
    const page = await context.newPage();

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
      (el: Element) => ({ // Added type annotation for 'el'
        dataLayouts: el.getAttribute("data-layouts"),
        dataGroupSettings: el.getAttribute("data-settings"),
      })
    );
    
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
  } catch (err: unknown) { // <-- FIX #1: Explicitly type 'err' as 'unknown'
    
    let errorMessage = "An unknown error occurred";
    // FIX #2: Check if 'err' is an instance of Error before accessing .message
    if (err instanceof Error) {
      errorMessage = err.message;
    }

    console.error(`Error in template API for group '${groupName}':`, errorMessage);
    return NextResponse.json(
      { error: "Failed to fetch or parse client page", detail: errorMessage },
      { status: 500 }
    );

  } finally {
    if (context) {
      await context.close();
    }
    console.log(`Cleaned up browser context for group: ${groupName}`);
  }
}