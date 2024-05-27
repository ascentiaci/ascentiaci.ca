// @ts-check
const { devices, expect } = require("@playwright/test");

module.exports = {
  // reporter: [
  //   ["json", { outputFile: "results.json" }], // Ensure results.json is correctly specified
  //   ["list"],
  //   ["html", { outputFolder: "playwright-report", open: "never" }], // Ensure the folder path is correct
  // ],
  webServer: {
    port: 1234,
    timeout: 120 * 1000,
    reuseExistingServer: false, // Always start a new server
  },
  use: {
    baseURL: "http://localhost:1234",
    trace: "on-first-retry",
  },
  projects: [
    {
      name: "Chromium - Ascentia",
      use: {
        browserName: "chromium",
        headless: true,
        launchOptions: {
          env: {
            BRAND: 'ascentia',
            BRAND_SC: 'Ascentia',
            CITY: 'Kelowna'
          },
        },
      },
    },
    {
      name: "Chromium - Elevare",
      use: {
        browserName: "chromium",
        headless: true,
        launchOptions: {
          env: {
            BRAND: 'elevare',
            BRAND_SC: 'Elevare',
            CITY: 'Langley'
          },
        },
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
