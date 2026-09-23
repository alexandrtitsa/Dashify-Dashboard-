import { describe, it, expect } from 'vitest';
import { filterChartDataByRange } from '../chart';
import type { ChartPoint } from '../chart';

const MOCK_DATA: ChartPoint[] = [
  { date: '01.09', value: 100, users: 10 },
  { date: '02.09', value: 200, users: 20 },
  { date: '03.09', value: 300, users: 30 },
  { date: '04.09', value: 400, users: 40 },
  { date: '05.09', value: 500, users: 50 },
  { date: '06.09', value: 600, users: 60 },
];

describe('filterChartDataByRange', () => {
  it('повертає останні 3 елементи для діапазону 7d', () => {
    const result = filterChartDataByRange(MOCK_DATA, '7d');
    expect(result).toHaveLength(3);
    expect(result[0].date).toBe('04.09');
  });

  it('повертає останні 5 елементів для діапазону 30d', () => {
    const result = filterChartDataByRange(MOCK_DATA, '30d');
    expect(result).toHaveLength(5);
    expect(result[0].date).toBe('02.09');
  });

  it('повертає всі елементи для діапазону 90d', () => {
    const result = filterChartDataByRange(MOCK_DATA, '90d');
    expect(result).toEqual(MOCK_DATA);
  });

  it('коректно обробляє порожній масив', () => {
    const result = filterChartDataByRange([], '7d');
    expect(result).toEqual([]);
  });
});