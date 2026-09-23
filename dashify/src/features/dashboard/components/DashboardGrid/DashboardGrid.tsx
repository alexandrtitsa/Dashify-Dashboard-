import React, { lazy, Suspense, useCallback, useMemo } from 'react';
import cn from 'classnames';
import { Responsive, WidthProvider } from 'react-grid-layout';
import type { Layout } from 'react-grid-layout';
import { Loader2 } from 'lucide-react';
import { useDashboardStore } from '@/store/useDashboardStore';
import { WidgetCard } from '@/components/ui/WidgetCard/WidgetCard';
import type { WidgetLayout } from '@/types/widget';
import styles from './DashboardGrid.module.scss';

import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';

const ResponsiveGridLayout = WidthProvider(Responsive);

// Lazy loading для ізольованого збирання чанків
const ChartWidget = lazy(() =>
  import('@/features/widgets/chart-widget/ChartWidget').then((m) => ({ default: m.ChartWidget }))
);
const WeatherWidget = lazy(() =>
  import('@/features/widgets/weather-widget/WeatherWidget').then((m) => ({ default: m.WeatherWidget }))
);
const CurrencyWidget = lazy(() =>
  import('@/features/widgets/currency-widget/CurrencyWidget').then((m) => ({ default: m.CurrencyWidget }))
);
const TasksWidget = lazy(() =>
  import('@/features/widgets/tasks-widget/TasksWidget').then((m) => ({ default: m.TasksWidget }))
);

const WIDGET_COMPONENTS: Record<string, React.LazyExoticComponent<React.FC<{ settings?: any }>>> = {
  chart: ChartWidget,
  weather: WeatherWidget,
  currency: CurrencyWidget,
  tasks: TasksWidget,
};

const WidgetLoader: React.FC = () => (
  <div className={styles.loaderFallback}>
    <Loader2 size={24} className="spin" aria-hidden="true" />
    <span>Завантаження модуля...</span>
  </div>
);

export const DashboardGrid: React.FC = React.memo(() => {
  const widgets = useDashboardStore((state) => state.widgets);
  const layouts = useDashboardStore((state) => state.layouts);
  const updateLayouts = useDashboardStore((state) => state.updateLayouts);
  const removeWidget = useDashboardStore((state) => state.removeWidget);

  const gridLayouts = useMemo(
    () => ({
      lg: layouts.map((l) => ({ i: l.id, x: l.x, y: l.y, w: l.w, h: l.h, minW: l.minW, minH: l.minH })),
    }),
    [layouts]
  );

  const handleLayoutChange = useCallback(
    (_currentLayout: Layout[], allLayouts: { [key: string]: Layout[] }) => {
      const lgLayout = allLayouts.lg;
      if (!lgLayout) return;

      const updatedLayouts: WidgetLayout[] = lgLayout.map((item) => ({
        id: item.i,
        x: item.x,
        y: item.y,
        w: item.w,
        h: item.h,
        minW: item.minW,
        minH: item.minH,
      }));

      updateLayouts(updatedLayouts);
    },
    [updateLayouts]
  );

  return (
    <div className={styles.gridWrapper}>
      <ResponsiveGridLayout
        className={cn('layout', styles.dashboardGrid)}
        layouts={gridLayouts}
        breakpoints={{ lg: 1024, md: 768, sm: 480 }}
        cols={{ lg: 12, md: 6, sm: 2 }}
        rowHeight={90}
        draggableHandle=".widget-drag-handle"
        onLayoutChange={handleLayoutChange}
        isDraggable
        isResizable
      >
        {widgets.map((widget) => {
          const WidgetComponent = WIDGET_COMPONENTS[widget.type];

          return (
            <div key={widget.id}>
              <WidgetCard id={widget.id} title={widget.title} onRemove={removeWidget}>
                <Suspense fallback={<WidgetLoader />}>
                  {WidgetComponent ? (
                    <WidgetComponent settings={widget.settings} />
                  ) : (
                    <div>Компонент віджета не знайдено</div>
                  )}
                </Suspense>
              </WidgetCard>
            </div>
          );
        })}
      </ResponsiveGridLayout>
    </div>
  );
});

DashboardGrid.displayName = 'DashboardGrid';