// app/api/template/route.js
import { NextResponse } from "next/server";
import { getBrowser } from "@/lib/puppeteer"; // Adjust the import path

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const groupName = searchParams.get("group");

  if (!groupName) {
    return NextResponse.json({ error: "Missing group name" }, { status: 400 });
  }

  const schemaPageUrl = `http://localhost/schema?group=${encodeURIComponent(groupName)}`;

  let page; // Only the page is temporary
  try {
    const browser = await getBrowser(); // Get the single, shared browser instance
    page = await browser.newPage(); // Create a new, lightweight page

    await page.setViewport({ width: 1280, height: 720 });
    // You can likely remove these timeouts or lower them significantly
    page.setDefaultNavigationTimeout(60000); 
    page.setDefaultTimeout(60000);

    await page.goto(schemaPageUrl, {
      waitUntil: "networkidle0",
      timeout: 60000,
    });

    await page.waitForSelector("[data-layouts]", { timeout: 60000 });
    await page.waitForSelector("[data-settings]", { timeout: 60000 });

    const { dataLayouts, dataGroupSettings } = await page.$eval(
      "[data-layouts]",
      (el:any) => ({
        dataLayouts: el.getAttribute("data-layouts"),
        dataGroupSettings: el.getAttribute("data-settings"),
      })
    );
    
    // ... (rest of your parsing logic is fine) ...
    let slides, groupSettings;
    try {
      slides = JSON.parse(dataLayouts || "[]");
    } catch (e) {
      slides = [];
    }
    try {
      groupSettings = JSON.parse(dataGroupSettings || "null");
    } catch (e) {
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
  } catch (err) {
    console.error("Error in template API:", err); // Log the actual error
    return NextResponse.json(
      { error: "Failed to fetch or parse client page" },
      { status: 500 }
    );
  } finally {
    // We only close the page, not the entire browser
    if (page) await page.close();
  }
}