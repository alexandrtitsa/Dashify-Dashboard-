export interface ChartPoint {
  date: string;
  value: number;
  users: number;
}

export type TimeRange = '7d' | '30d' | '90d';

export const filterChartDataByRange = (data: ChartPoint[], range: TimeRange): ChartPoint[] => {
  if (!Array.isArray(data)) return [];

  switch (range) {
    case '7d':
      return data.slice(-3);
    case '30d':
      return data.slice(-5);
    case '90d':
    default:
      return data;
  }
};