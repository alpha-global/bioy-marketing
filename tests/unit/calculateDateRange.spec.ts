import { test, expect } from '@playwright/test';
import { calculateDateRange } from '../../utils/helpers';

test.describe('calculateDateRange', () => {
  test('should return startDay and endDay for dayOfYear <= 5', () => {
    const now = new Date('2023-01-05');
    const expectedOutput = { startDay: 1, endDay: 8 };
    const actualOutput = calculateDateRange(now);
    expect(actualOutput).toEqual(expectedOutput);
  });

  test('should return startDay and endDay for dayOfYear >= 360 && dayOfYear <= 365', () => {
    const now = new Date('2023-12-31');
    const expectedOutput = { startDay: 361, endDay: 365 };
    const actualOutput = calculateDateRange(now);
    expect(actualOutput).toEqual(expectedOutput);
  });

  test('should return startDay and endDay for dayOfYear === 366', () => {
    const now = new Date('2024-12-31');
    const expectedOutput = { startDay: 361, endDay: 366 };
    const actualOutput = calculateDateRange(now);
    expect(actualOutput).toEqual(expectedOutput);
  });

  test('should return startDay and endDay for other dayOfYear values', () => {
    const now = new Date('2023-01-10');
    const expectedOutput = { startDay: 10 - 4, endDay: 10 + 3 };
    const actualOutput = calculateDateRange(now);
    expect(actualOutput).toEqual(expectedOutput);
  });
});
