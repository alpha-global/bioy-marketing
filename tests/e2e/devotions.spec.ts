// Tests for the checking if all devotion pages are working

import { test, expect } from '@playwright/test';

import globals from '../../src/_data/globals';

test.afterEach(async ({ page }) => {
  await page.close();
});

import translations from '../../src/devotions/devotions.11tydata.json';

test.describe('Today', () => {
  // Test for all classic variants
  for (const lang of globals.variants.classic) {
    if (translations[lang] && 'day' in translations[lang]) {
      test(`Classic today for ${lang} locale`, async ({ page }) => {
        test.setTimeout(120000);
        await page.goto(`${lang}/classic/${globals.today}`);
        expect(await page.isVisible('main')).toBeTruthy();
        await expect(page.getByText(`${translations[lang].day} ${today}`)).toBeVisible();
      });
    }
  }
  // Test for all youth variants
  for (const lang of globals.variants.youth) {
    if (translations[lang] && 'day' in translations[lang]) {
      test(`Youth today for ${lang} locale`, async ({ page }) => {
        test.setTimeout(120000);
        await page.goto(`${lang}/youth/${globals.today}`);
        expect(await page.isVisible('main')).toBeTruthy();
        await expect(
          page.getByText(`${translations[lang].day} ${globals.today}`),
        ).toBeVisible();
      });
    }
  }
  // Test for all express variants
  for (const lang of globals.variants.express) {
    if (translations[lang] && 'day' in translations[lang]) {
      test(`Express today for ${lang} locale`, async ({ page }) => {
        test.setTimeout(120000);
        await page.goto(`${lang}/express/${globals.today}`);
        expect(await page.isVisible('main')).toBeTruthy();
        await expect(
          page.getByText(`${translations[lang].day} ${globals.today}`),
        ).toBeVisible();
      });
    }
  }
});

test.describe('All Devotions', () => {
  // Test for all classic variants
  for (const lang of globals.variants.classic) {
    if (translations[lang] && 'day' in translations[lang]) {
      for (let day = 1; day <= 365; day++) {
        test(`Classic ${day} for ${lang} locale`, async ({ page }) => {
          test.setTimeout(120000);
          await page.goto(`${lang}/classic/${day}`);
          expect(await page.isVisible('main')).toBeTruthy();
          await expect(page.getByText(`${translations[lang].day} ${day}`)).toBeVisible();
        });
      }
    }
  }
  // Test for all youth variants
  for (const lang of globals.variants.youth) {
    if (translations[lang] && 'day' in translations[lang]) {
      for (let day = 1; day <= 365; day++) {
        test(`Youth ${day} for ${lang} locale`, async ({ page }) => {
          test.setTimeout(120000);
          await page.goto(`${lang}/youth/${day}`);
          expect(await page.isVisible('main')).toBeTruthy();
          await expect(page.getByText(`${translations[lang].day} ${day}`)).toBeVisible();
        });
      }
    }
  }
  // Test for all express variants
  for (const lang of globals.variants.express) {
    if (translations[lang] && 'day' in translations[lang]) {
      for (let day = 1; day <= 365; day++) {
        test(`Express ${day} for ${lang} locale`, async ({ page }) => {
          test.setTimeout(120000);
          await page.goto(`${lang}/express/${day}`);
          expect(await page.isVisible('main')).toBeTruthy();
          await expect(page.getByText(`${translations[lang].day} ${day}`)).toBeVisible();
        });
      }
    }
  }
});
