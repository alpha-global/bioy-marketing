import { test, expect } from "@playwright/test";
import { urls } from "./siteUrls";
import { today } from "../../src/_data/globals";

const range = (start, stop, step) =>
  Array.from(
    { length: (stop - start) / step + 1 },
    (_, i) => start + i * step
  ); /* Copy and pasta : https://stackoverflow.com/questions/3895478/does-javascript-have-a-method-like-range-to-generate-a-range-within-the-supp */

let devotions = range(today - 3, today, 1);
let locales = ["en", "de", "ar", "fr", "es"];

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

for (const locale of locales) {
  test.describe(`${locale} devotions`, () => {
    for (const devotion of devotions) {
      test(`Day ${devotion}`, async ({ page }) => {
        await page.goto(`${locale}/classic/${devotion}`);
        await expect(page).toHaveScreenshot(
          `${locale}-classic-${devotion}.png`,
          {
            fullPage: true,
          }
        );
      });
    }
  });
}
test.describe("Devotionals", () => {  
  test(`Devotionals`, async ({ page }) => {
    await page.goto(`en/classic/310`);
    await expect(page).toHaveScreenshot(
      `310-en-classic.png`,
      {
        fullPage: true,
      }
    );
  });
});