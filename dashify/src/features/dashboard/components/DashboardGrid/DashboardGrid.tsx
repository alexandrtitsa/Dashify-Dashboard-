import React from 'react';
import { Responsive, WidthProvider } from 'react-grid-layout';
import type { Layout } from 'react-grid-layout';
import { useDashboardStore } from '@/store/useDashboardStore';
import { WidgetCard } from '@/components/ui/WidgetCard/WidgetCard';
import type { WidgetLayout } from '@/types/widget';

const ResponsiveGridLayout = WidthProvider(Responsive);

import { ChartWidget } from '@/features/widgets/chart-widget/ChartWidget';
import { WeatherWidget } from '@/features/widgets/weather-widget/WeatherWidget';
import { CurrencyWidget } from '@/features/widgets/currency-widget/CurrencyWidget';
import { TasksWidget } from '@/features/widgets/tasks-widget/TasksWidget';

const WIDGET_COMPONENTS: Record<string, React.FC<{ settings: any }>> = {
  chart: ChartWidget,
  weather: WeatherWidget,
  currency: CurrencyWidget,
  tasks: TasksWidget,
};

export const DashboardGrid: React.FC = () => {
  const { widgets, layouts, updateLayouts, removeWidget } = useDashboardStore();

  const gridLayouts = {
    lg: layouts.map((l) => ({ i: l.id, x: l.x, y: l.y, w: l.w, h: l.h, minW: l.minW, minH: l.minH })),
  };

  const handleLayoutChange = (_currentLayout: Layout[], allLayouts: { [key: string]: Layout[] }) => {
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
  };

  return (
    <ResponsiveGridLayout
      className="layout"
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
              {WidgetComponent ? (
                <WidgetComponent settings={widget.settings} />
              ) : (
                <div>Компонент віджета не знайдено</div>
              )}
            </WidgetCard>
          </div>
        );
      })}
    </ResponsiveGridLayout>
  );
};