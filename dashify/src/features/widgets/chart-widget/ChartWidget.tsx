import React, { useState, useMemo } from 'react';
import cn from 'classnames';
import {
  ResponsiveContainer,
  AreaChart,
  BarChart,
  LineChart,
  Area,
  Bar,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from 'recharts';
import styles from './ChartWidget.module.scss';

type TimeRange = '7d' | '30d' | '90d';
type ChartType = 'area' | 'bar' | 'line';

interface ChartWidgetProps {
  settings?: {
    defaultRange?: TimeRange;
    defaultType?: ChartType;
  };
}

const RAW_DATA = [
  { date: '01.09', value: 1200, users: 320 },
  { date: '05.09', value: 1900, users: 450 },
  { date: '10.09', value: 1500, users: 410 },
  { date: '15.09', value: 2400, users: 580 },
  { date: '20.09', value: 2100, users: 510 },
  { date: '25.09', value: 3100, users: 690 },
  { date: '30.09', value: 2800, users: 630 },
];

export const ChartWidget: React.FC<ChartWidgetProps> = ({ settings }) => {
  const [range, setRange] = useState<TimeRange>(settings?.defaultRange || '30d');
  const [chartType, setChartType] = useState<ChartType>(settings?.defaultType || 'area');

  const filteredData = useMemo(() => {
    if (range === '7d') return RAW_DATA.slice(-3);
    if (range === '30d') return RAW_DATA.slice(-5);
    return RAW_DATA;
  }, [range]);

  const renderChartComponent = () => {
    switch (chartType) {
      case 'bar':
        return (
          <BarChart data={filteredData}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--color-border)" />
            <XAxis dataKey="date" tick={{ fontSize: 12 }} stroke="var(--color-text-muted)" />
            <YAxis tick={{ fontSize: 12 }} stroke="var(--color-text-muted)" />
            <Tooltip />
            <Bar dataKey="value" fill="var(--color-primary)" radius={[4, 4, 0, 0]} />
          </BarChart>
        );
      case 'line':
        return (
          <LineChart data={filteredData}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--color-border)" />
            <XAxis dataKey="date" tick={{ fontSize: 12 }} stroke="var(--color-text-muted)" />
            <YAxis tick={{ fontSize: 12 }} stroke="var(--color-text-muted)" />
            <Tooltip />
            <Line type="monotone" dataKey="value" stroke="var(--color-primary)" strokeWidth={2} />
          </LineChart>
        );
      case 'area':
      default:
        return (
          <AreaChart data={filteredData}>
            <defs>
              <linearGradient id="chartColor" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="var(--color-primary)" stopOpacity={0.4} />
                <stop offset="95%" stopColor="var(--color-primary)" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--color-border)" />
            <XAxis dataKey="date" tick={{ fontSize: 12 }} stroke="var(--color-text-muted)" />
            <YAxis tick={{ fontSize: 12 }} stroke="var(--color-text-muted)" />
            <Tooltip />
            <Area
              type="monotone"
              dataKey="value"
              stroke="var(--color-primary)"
              fillOpacity={1}
              fill="url(#chartColor)"
            />
          </AreaChart>
        );
    }
  };

  return (
    <div className={styles.chartContainer}>
      <div className={styles.chartControls}>
        <div className={styles.buttonGroup}>
          {(['7d', '30d', '90d'] as TimeRange[]).map((r) => (
            <button
              key={r}
              type="button"
              className={cn(styles.controlBtn, { [styles.controlBtnActive]: range === r })}
              onClick={() => setRange(r)}
            >
              {r}
            </button>
          ))}
        </div>

        <div className={styles.buttonGroup}>
          {(['area', 'bar', 'line'] as ChartType[]).map((t) => (
            <button
              key={t}
              type="button"
              className={cn(styles.controlBtn, { [styles.controlBtnActive]: chartType === t })}
              onClick={() => setChartType(t)}
            >
              {t.toUpperCase()}
            </button>
          ))}
        </div>
      </div>

      <div className={styles.chartArea}>
        <ResponsiveContainer width="100%" height="100%">
          {renderChartComponent()}
        </ResponsiveContainer>
      </div>
    </div>
  );
};