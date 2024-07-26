import { describe, it, expect, afterAll, beforeAll, vi } from 'vitest';

import {
  formatCurrency,
  formatDate,
  getElapsedTime,
  ReturnOfTransformData,
  sortByKey,
  transformData,
} from '../index';
import { DataItem, PriceResponse } from 'types/data';

const mockData: DataItem[] = [
  {
    id: '3',
    score: 85,
    guess: 'up',
    initialPrice: 150,
    resolvedPrice: 140,
    correct: false,
    resolved: false,
    updatedAt: '2023-10-03T06:57:14.564Z',
    createdAt: '2023-10-03T06:57:14.564Z',
  },
  {
    id: '1',
    score: 85,
    guess: 'up',
    initialPrice: 150,
    resolvedPrice: 140,
    correct: false,
    resolved: false,
    updatedAt: '2023-10-03T05:57:14.564Z',
    createdAt: '2023-10-03T05:57:14.564Z',
  },
  {
    id: '2',
    score: 85,
    guess: 'up',
    initialPrice: 150,
    resolvedPrice: 140,
    correct: false,
    resolved: false,
    updatedAt: '2023-10-03T06:57:24.564Z',
    createdAt: '2023-10-03T06:57:24.564Z',
  },
];

describe('utils', () => {
  beforeAll(() => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date('2023-10-01T12:34:56Z'));
  });

  afterAll(() => {
    vi.useRealTimers();
  });

  describe('sortByKey', () => {
    it('should sort array of objects by key in ascending order', () => {
      const sortedArray = sortByKey(mockData, 'createdAt', 'asc');
      expect(sortedArray).toEqual([
        {
          correct: false,
          createdAt: '2023-10-03T05:57:14.564Z',
          guess: 'up',
          id: '1',
          initialPrice: 150,
          resolved: false,
          resolvedPrice: 140,
          score: 85,
          updatedAt: '2023-10-03T05:57:14.564Z',
        },
        {
          correct: false,
          createdAt: '2023-10-03T06:57:14.564Z',
          guess: 'up',
          id: '3',
          initialPrice: 150,
          resolved: false,
          resolvedPrice: 140,
          score: 85,
          updatedAt: '2023-10-03T06:57:14.564Z',
        },
        {
          correct: false,
          createdAt: '2023-10-03T06:57:24.564Z',
          guess: 'up',
          id: '2',
          initialPrice: 150,
          resolved: false,
          resolvedPrice: 140,
          score: 85,
          updatedAt: '2023-10-03T06:57:24.564Z',
        },
      ]);
    });

    it('should sort array of objects by key in desc order', () => {
      const sortedArray = sortByKey(mockData, 'createdAt', 'desc');
      expect(sortedArray).toEqual([
        {
          correct: false,
          createdAt: '2023-10-03T06:57:24.564Z',
          guess: 'up',
          id: '2',
          initialPrice: 150,
          resolved: false,
          resolvedPrice: 140,
          score: 85,
          updatedAt: '2023-10-03T06:57:24.564Z',
        },
        {
          correct: false,
          createdAt: '2023-10-03T06:57:14.564Z',
          guess: 'up',
          id: '3',
          initialPrice: 150,
          resolved: false,
          resolvedPrice: 140,
          score: 85,
          updatedAt: '2023-10-03T06:57:14.564Z',
        },
        {
          correct: false,
          createdAt: '2023-10-03T05:57:14.564Z',
          guess: 'up',
          id: '1',
          initialPrice: 150,
          resolved: false,
          resolvedPrice: 140,
          score: 85,
          updatedAt: '2023-10-03T05:57:14.564Z',
        },
      ]);
    });
  });

  describe('transformData', () => {
    it('should transform a valid PriceResponse object', () => {
      const data: PriceResponse = {
        time: {
          updated: 'Jul 26, 2024 09:12:12 UTC',
          updatedISO: '2024-07-26T09:12:12+00:00',
          updateduk: 'Jul 26, 2024 at 10:12 BST',
        },
        disclaimer:
          'This data was produced from the CoinDesk Bitcoin Price Index (USD). Non-USD currency data converted using hourly conversion rate from openexchangerates.org',
        bpi: {
          USD: {
            code: 'USD',
            rate: '67,159.578',
            description: 'United States Dollar',
            rate_float: 67159.5782,
          },
          BTC: {
            code: 'BTC',
            rate: '1.0000',
            description: 'Bitcoin',
            rate_float: 1,
          },
        },
      };
      const transformed: ReturnOfTransformData = transformData(data);
      expect(transformed).toEqual({
        price: 67159.5782,
        updatedAt: 'Jul 26, 2024 09:12:12 UTC',
      });
    });

    it('should return null if data is null', () => {
      const transformed: ReturnOfTransformData = transformData(null);
      expect(transformed).toBeNull();
    });
  });

  describe('getElapsedTime', () => {
    it('should calculate elapsed time correctly for createdAt', () => {
      const date = new Date();
      date.setTime(date.getTime() - 10000);
      const createdAt = date.toISOString();
      const elapsedTime = getElapsedTime(createdAt);
      expect(elapsedTime).toBe(10); // 10 seconds
    });

    it('should return null if value passed is null', () => {
      const elapsedTime = getElapsedTime(null);
      expect(elapsedTime).toBe(0);
    });
  });

  describe('formatCurrency', () => {
    it('should format a number as a currency string', () => {
      const formatted = formatCurrency(1234.56);
      expect(formatted).toBe('$1,234.56');
    });
  });

  describe('formatDate', () => {
    it('should format a date object to a specific string format', () => {
      const dateStr = new Date('Jul 26, 2024 09:12:12 UTC').toISOString();
      const formatted = formatDate(dateStr);
      expect(formatted).toBe('Jul 26, 24');
    });
  });
});
