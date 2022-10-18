import { test, expect } from "@playwright/test";
import { urls } from "./siteUrls";

test.afterEach(async ({ page }) => {
  await page.close();
});

test.describe("Pages", () => {
  for (const url of urls) {
    test(`${url.split("/").join("-")}`, async ({ page }) => {
      await page.goto(url);
      await expect(page).toHaveScreenshot(`${url.split("/").join("-")}.png`, {
        fullPage: true,
      });
    });
  }
});
