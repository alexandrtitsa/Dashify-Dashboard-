export type WidgetType = 'chart' | 'weather' | 'currency' | 'tasks';

export interface WidgetLayout {
  /** Унікальний ідентифікатор екземпляра віджета */
  readonly id: string;
  /** Позиція по горизонталі (в колонках сітки 0..11) */
  x: number;
  /** Позиція по вертикалі (у рядках) */
  y: number;
  /** Ширина віджета (кількість колонок) */
  w: number;
  /** Висота віджета (кількість рядків) */
  h: number;
  /** Мінімально припустима ширина */
  minW?: number;
  /** Мінімально припустима висота */
  minH?: number;
}

/* Specific Widget Settings Discriminated Unions */

export interface ChartWidgetSettings {
  readonly chartType: 'area' | 'bar' | 'line';
  readonly metrics: 'revenue' | 'users' | 'conversions';
  readonly timeRange: '7d' | '30d' | '90d';
}

export interface WeatherWidgetSettings {
  readonly city: string;
  readonly unit: 'celsius' | 'fahrenheit';
}

export interface CurrencyWidgetSettings {
  readonly baseCurrency: string;
  readonly targetCurrencies: readonly string[];
}

export interface TasksWidgetSettings {
  readonly showCompleted: boolean;
}

/**
 * Discrimination Union для конфігурацій віджетів.
 * Гарантує Type Safety при налаштуванні конкретного віджета.
 */
export type WidgetConfig =
  | { readonly id: string; readonly type: 'chart'; title: string; settings: ChartWidgetSettings }
  | { readonly id: string; readonly type: 'weather'; title: string; settings: WeatherWidgetSettings }
  | { readonly id: string; readonly type: 'currency'; title: string; settings: CurrencyWidgetSettings }
  | { readonly id: string; readonly type: 'tasks'; title: string; settings: TasksWidgetSettings };