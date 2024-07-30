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

  test('leap year is included in nightly', async () => {
    // date well beyond 29 Feb
    mockDate.set('2024-05-27');
    const postWindow = await fetchData();
    let day60 = postWindow.find((day) => day.number === 60);
    expect(day60).toBeUndefined();

    // date well before 29 Feb
    mockDate.set('2024-01-27');
    const preWindow = await fetchData();
    day60 = preWindow.find((day) => day.number === 60);
    expect(day60).toBeUndefined();

    // first day to include leap year,
    // fetches 3 days ahead
    mockDate.set('2024-02-25');
    const leadUp = await fetchData();
    day60 = leadUp.find((day) => day.number === 60);
    expect(day60).toBeDefined();

    // last day to include leap year,
    // fetches 4 days before
    mockDate.set('2024-03-04');
    const trail = await fetchData();
    day60 = trail.find((day) => day.number === 60);
    expect(day60).toBeDefined();

    // trail.forEach((day) => {
    //   if (day.locale === 'en' && day.variant === 'classic')
    //     console.log(
    //       `have ${day.locale} ${day.variant} ${day.number} ${day.bundle.title} `,
    //     );
    // });
  });
});
