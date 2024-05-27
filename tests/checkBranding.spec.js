//open index page and check that the brand name is correct, also check address and about link is correct link

//import const { test } = require("@playwright/test");
const { test, expect } = require("@playwright/test");

test("Check brand name", async ({ page }) => {
  await page.goto("http://localhost:1234/");
  
  //check title for the word Ascentia
  await expect(page).toHaveTitle(/Ascentia/);
  
  //check ID CampusAddress for the word Kelowna
  await expect(page.locator("#CampusAddress")).toHaveText("Kelowna");
  
  //check brand name is correct
  await expect(page.locator("h1")).toHaveText("Ascentia");
  
  //check about link is correct
  await expect(page.locator("a")).toHaveText("Ascentia");
  
});
