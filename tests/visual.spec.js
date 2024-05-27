import { test, expect } from "@playwright/test";
import fs from "fs";
import path from "path";

// Read ../dist folder and list all the .html files into the urls array
const getHtmlFiles = async () => {
  const files = await fs.promises.readdir("./dist");
  return files.filter((file) => file.endsWith(".html"));
};

test.describe("Visual Comparison Tests", () => {
  let urls = [];

  test.beforeAll(async () => {
    urls = await getHtmlFiles();
    console.log(urls); // Output the list of URLs for debugging
  });

  urls.forEach((url, index) => {
    test.describe(`Visual Comparison for ${url}`, () => {
      test(`takes screenshot for ${url}`, async ({ page, browserName }, testInfo) => {
        const fullUrl = `http://localhost:1234/${url}`;

        // Capture console errors
        const consoleErrors = [];
        page.on("console", (msg) => {
          if (msg.type() === "error") {
            consoleErrors.push(msg.text());
          }
        });

        await page.goto(fullUrl);

        // Take a screenshot with the project name and page index in the file path
        const screenshotPath = `test-results/${browserName}-${index + 1}.png`;
        await page.screenshot({ path: screenshotPath, fullPage: true });

        // Generate report
        const reportPath = `test-results/report-${browserName}-${index + 1}.html`;
        const reportContent = `
          <html>
            <head>
              <title>Report for ${url} - ${browserName}</title>
            </head>
            <body>
              <h1>Report for ${url} - ${browserName}</h1>
              <h2>Screenshot</h2>
              <img src="${path.basename(screenshotPath)}" alt="Screenshot">
              <h2>Console Errors</h2>
              <ul>
                ${consoleErrors.map((error) => `<li>${error}</li>`).join("")}
              </ul>
            </body>
          </html>
        `;
        fs.writeFileSync(reportPath, reportContent);
      });
    });
  });
});

export {};
