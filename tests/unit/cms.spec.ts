import { test, expect } from '@playwright/test';
const mockDate = require('mockdate');
const fetchData = require('../../src/_data/cms');

// Run tests in serial mode to:
// - avoid conflicts with the mock date
// - use a global variable

test.describe.configure({ mode: 'serial' });

let marchOneTitle;

test.describe('get leap year data', () => {
  test('no changes when it is not a leap year', async () => {
    const mock = '2023-02-27';
    mockDate.set(mock);

    const allUpdates = await fetchData();
    const englishClassic = allUpdates.filter(
      (day) => day.locale === 'en' && day.variant === 'classic',
    );

    expect(englishClassic.length).toEqual(8);
    const day60 = englishClassic.filter((day) => day.number === 60);
    expect(day60.length).toBe(1);
    marchOneTitle = day60[0].bundle.title;
    console.log('marchOneTitle', marchOneTitle);
    expect(day60[0].bundle.title).not.toContain('Leap');

    mockDate.reset();
  });

  test('leap year adjustments', async () => {
    expect(marchOneTitle).toBeDefined();
    const mock = '2024-02-27';
    mockDate.set(mock);

    const allUpdates = await fetchData();
    const englishClassic = allUpdates.filter(
      (day) => day.locale === 'en' && day.variant === 'classic',
    );

    englishClassic.forEach((item) => {
      console.log(
        `have ${item.locale} ${item.variant} ${item.number} ${item.bundle.title} `,
      );
    });

    // we have added one day, so 8 + 1
    expect(englishClassic.length).toEqual(9);
    const day60 = englishClassic.filter((day) => day.number === 60);
    expect(day60.length).toBe(1);
    expect(day60[0].bundle.title).toContain('Leap');
    expect(day60[0].url).toBe('/en/classic/60');
    const marchOne = englishClassic.filter((day) => day.number === 61);
    expect(marchOne[0].bundle.title).toBe(marchOneTitle);
    expect(marchOne[0].url).toBe('/en/classic/61');

    mockDate.reset();
  });
});
