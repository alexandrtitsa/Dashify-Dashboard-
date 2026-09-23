import { describe, it, expect, beforeEach } from 'vitest';
import { useDashboardStore } from '../useDashboardStore';

describe('useDashboardStore', () => {
  beforeEach(() => {
    // Скидання стору перед кожним тестом
    useDashboardStore.setState({
      widgets: [],
      layouts: [],
    });
  });

  it('повинен успішно додавати новий віджет та створювати для нього layout', () => {
    const store = useDashboardStore.getState();

    store.addWidget('weather', 'Погода в Києві');

    const updatedState = useDashboardStore.getState();
    expect(updatedState.widgets).toHaveLength(1);
    expect(updatedState.widgets[0].title).toBe('Погода в Києві');
    expect(updatedState.widgets[0].type).toBe('weather');

    expect(updatedState.layouts).toHaveLength(1);
    expect(updatedState.layouts[0].id).toBe(updatedState.widgets[0].id);
  });

  it('повинен видаляти віджет та його layout за ID', () => {
    const store = useDashboardStore.getState();

    store.addWidget('chart', 'Графік');
    const addedWidgetId = useDashboardStore.getState().widgets[0].id;

    useDashboardStore.getState().removeWidget(addedWidgetId);

    const stateAfterRemove = useDashboardStore.getState();
    expect(stateAfterRemove.widgets).toHaveLength(0);
    expect(stateAfterRemove.layouts).toHaveLength(0);
  });

  it('повинен оновлювати макет (layouts)', () => {
    const store = useDashboardStore.getState();

    store.addWidget('currency', 'Валюти');
    const widgetId = useDashboardStore.getState().widgets[0].id;

    const newLayouts = [{ id: widgetId, x: 2, y: 2, w: 4, h: 4 }];
    useDashboardStore.getState().updateLayouts(newLayouts);

    const updatedLayouts = useDashboardStore.getState().layouts;
    expect(updatedLayouts[0].x).toBe(2);
    expect(updatedLayouts[0].y).toBe(2);
  });
});