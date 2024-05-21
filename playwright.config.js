// @ts-check
const { devices } = require("@playwright/test");

module.exports = {
  reporter: [
    ["json", { outputFile: "playwright-report/report.json" }],
    ["list"],
    ["html", { outputFolder: "playwright-report", open: "never" }],
  ],
  webServer: {
    command: "npm run start",
    port: 1234,
    timeout: 120 * 1000,
    reuseExistingServer: !process.env.CI,
  },
  use: {
    baseURL: "http://localhost:1234",
    trace: "on-first-retry",
  },
  projects: [
    {
      name: "Chromium",
      use: {
        browserName: "chromium",
        headless: true,
      },
    },
    {
      name: "Firefox",
      use: {
        browserName: "firefox",
        headless: true,
      },
    },
    {
      name: "WebKit",
      use: {
        browserName: "webkit",
        headless: true,
      },
    },
    {
      name: "Mobile Safari",
      use: {
        browserName: "webkit",
        ...devices["iPhone 13"],
        headless: true,
      },
    },
  ],
};
