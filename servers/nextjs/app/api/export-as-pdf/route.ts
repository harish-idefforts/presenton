import path from "path";
import fs from "fs";
import puppeteer from "puppeteer";
import { getBrowser } from "@/lib/puppeteer";

import { sanitizeFilename } from "@/app/(presentation-generator)/utils/others";
import { NextResponse, NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  const { id, title } = await req.json();
  if (!id) {
    return NextResponse.json(
      { error: "Missing Presentation ID" },
      { status: 400 }
    );
  }
  const browser = await getBrowser();
  const page = await browser.newPage();
  try {
    await page.setViewport({ width: 1280, height: 720 });
    page.setDefaultNavigationTimeout(300000);
    page.setDefaultTimeout(300000);

    await page.goto(`http://localhost/pdf-maker?id=${id}`, {
      waitUntil: "networkidle0",
      timeout: 300000,
    });

    await page.waitForFunction('() => document.readyState === "complete"');

    try {
      await page.waitForFunction(
      `
      () => {
        const allElements = document.querySelectorAll('*');
        let loadedElements = 0;
        let totalElements = allElements.length;
        
        for (let el of allElements) {
            const style = window.getComputedStyle(el);
            const isVisible = style.display !== 'none' && 
                            style.visibility !== 'hidden' && 
                            style.opacity !== '0';
            
            if (isVisible && el.offsetWidth > 0 && el.offsetHeight > 0) {
                loadedElements++;
            }
        }
        
        return (loadedElements / totalElements) >= 0.99;
      }
      `,
        { timeout: 300000 }
      );

      await new Promise((resolve) => setTimeout(resolve, 1000));
    } catch (error) {
      console.log("Warning: Some content may not have loaded completely:", error);
    }

    await page
      .waitForFunction(
        () => {
          const wrapper = document.getElementById("presentation-slides-wrapper");
          if (!wrapper) return false;
          return Boolean(
            wrapper.querySelector("[data-slide-root]") ||
              wrapper.querySelector(":scope > div > div")
          );
        },
        { timeout: 300000 }
      )
      .catch(() => undefined);

    const { width: slideWidth, height: slideHeight } = await page.evaluate(() => {
      const wrapper = document.getElementById("presentation-slides-wrapper");
      const parseDimension = (value: string | null | undefined) => {
        if (!value) return NaN;
        const parsed = parseFloat(value);
        return Number.isFinite(parsed) ? parsed : NaN;
      };

      let width = parseDimension(wrapper?.getAttribute("data-slide-width"));
      let height = parseDimension(wrapper?.getAttribute("data-slide-height"));

      if (!width || !height) {
        const slideRoot = wrapper?.querySelector("[data-slide-root]") || wrapper?.querySelector(":scope > div > div");
        if (slideRoot) {
          const rect = (slideRoot as HTMLElement).getBoundingClientRect();
          width = rect.width;
          height = rect.height;
        }
      }

      if (!width || !height) {
        width = 1280;
        height = 720;
      }

      return { width, height };
    });

    if (slideWidth && slideHeight) {
      await page.setViewport({
        width: Math.round(slideWidth),
        height: Math.round(slideHeight),
      });
    }

    const pdfBuffer = await page.pdf({
      width: `${Math.round(slideWidth || 1280)}px`,
      height: `${Math.round(slideHeight || 720)}px`,
      printBackground: true,
      margin: { top: 0, right: 0, bottom: 0, left: 0 },
    });

    const sanitizedTitle = sanitizeFilename(title ?? "presentation");
    const destinationPath = path.join(
      process.env.APP_DATA_DIRECTORY!,
      "exports",
      `${sanitizedTitle}.pdf`
    );
    await fs.promises.mkdir(path.dirname(destinationPath), { recursive: true });
    await fs.promises.writeFile(destinationPath, pdfBuffer);

    return NextResponse.json({
      success: true,
      path: destinationPath,
    });
  } finally {
    await page.close();
  }
}
