import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import type { WidgetConfig, WidgetLayout, WidgetType } from '@/types/widget';

interface DashboardState {
  widgets: readonly WidgetConfig[];
  layouts: readonly WidgetLayout[];
  isEditMode: boolean;

  // Actions
  addWidget: (type: WidgetType, title?: string) => void;
  removeWidget: (id: string) => void;
  updateLayouts: (newLayouts: readonly WidgetLayout[]) => void;
  updateWidgetSettings: <T extends WidgetConfig['type']>(
    id: string,
    settings: Partial<Extract<WidgetConfig, { type: T }>['settings']>
  ) => void;
  toggleEditMode: () => void;
  restoreDashboard: (config: { widgets: readonly WidgetConfig[]; layouts: readonly WidgetLayout[] }) => void;
  resetDashboard: () => void;
}

const DEFAULT_LAYOUTS: readonly WidgetLayout[] = [
  { id: 'w-chart-1', x: 0, y: 0, w: 6, h: 4, minW: 3, minH: 3 },
  { id: 'w-weather-1', x: 6, y: 0, w: 3, h: 4, minW: 2, minH: 2 },
  { id: 'w-currency-1', x: 9, y: 0, w: 3, h: 4, minW: 2, minH: 2 },
];

const DEFAULT_WIDGETS: readonly WidgetConfig[] = [
  {
    id: 'w-chart-1',
    type: 'chart',
    title: 'Динаміка виручки',
    settings: { chartType: 'area', metrics: 'revenue', timeRange: '30d' },
  },
  {
    id: 'w-weather-1',
    type: 'weather',
    title: 'Погода у Києві',
    settings: { city: 'Kyiv', unit: 'celsius' },
  },
  {
    id: 'w-currency-1',
    type: 'currency',
    title: 'Курси валют',
    settings: { baseCurrency: 'USD', targetCurrencies: ['EUR', 'UAH', 'GBP'] },
  },
];

export const useDashboardStore = create<DashboardState>()(
  persist(
    (set) => ({
      widgets: DEFAULT_WIDGETS,
      layouts: DEFAULT_LAYOUTS,
      isEditMode: false,

      addWidget: (type: WidgetType, title) => {
        const id = `w-${type}-${Date.now()}`;
        const defaultTitle = title ?? `Новий віджет (${type})`;

        // Створення початкових налаштувань залежно від типу віджета
        let newWidget: WidgetConfig;
        switch (type) {
          case 'chart':
            newWidget = { id, type, title: defaultTitle, settings: { chartType: 'line', metrics: 'users', timeRange: '7d' } };
            break;
          case 'weather':
            newWidget = { id, type, title: defaultTitle, settings: { city: 'Kyiv', unit: 'celsius' } };
            break;
          case 'currency':
            newWidget = { id, type, title: defaultTitle, settings: { baseCurrency: 'USD', targetCurrencies: ['EUR', 'UAH'] } };
            break;
          case 'tasks':
            newWidget = { id, type, title: defaultTitle, settings: { showCompleted: true } };
            break;
        }

        const newLayout: WidgetLayout = {
          id,
          x: 0,
          y: Infinity,
          w: 4,
          h: 3,
          minW: 2,
          minH: 2,
        };

        set((state) => ({
          widgets: [...state.widgets, newWidget],
          layouts: [...state.layouts, newLayout],
        }));
      },

      removeWidget: (id: string) => {
        set((state) => ({
          widgets: state.widgets.filter((w) => w.id !== id),
          layouts: state.layouts.filter((l) => l.id !== id),
        }));
      },

      updateLayouts: (newLayouts) => {
        set({ layouts: newLayouts });
      },

      updateWidgetSettings: (id, settings) => {
        set((state) => ({
          widgets: state.widgets.map((w) =>
            w.id === id ? { ...w, settings: { ...w.settings, ...settings } } : w
          ) as readonly WidgetConfig[],
        }));
      },

      toggleEditMode: () => {
        set((state) => ({ isEditMode: !state.isEditMode }));
      },

      restoreDashboard: (config) => {
        set({ widgets: config.widgets, layouts: config.layouts });
      },

      resetDashboard: () => {
        set({ widgets: DEFAULT_WIDGETS, layouts: DEFAULT_LAYOUTS });
      },
    }),
    {
      name: 'dashify-dashboard-config',
      storage: createJSONStorage(() => localStorage),
    }
  )
);