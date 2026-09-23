import type { WidgetConfig, WidgetLayout } from '@/types/widget';

export interface DashboardExportSchema {
  version: number;
  exportedAt: string;
  widgets: readonly WidgetConfig[];
  layouts: readonly WidgetLayout[];
}

const SCHEMA_VERSION = 1;

/**
 * Сервіс для роботи з завантаженням та вивантаженням файлів конфігурації
 */
export const dashboardStorageService = {

  exportConfig(widgets: readonly WidgetConfig[], layouts: readonly WidgetLayout[]): void {
    const data: DashboardExportSchema = {
      version: SCHEMA_VERSION,
      exportedAt: new Date().toISOString(),
      widgets,
      layouts,
    };

    const jsonString = JSON.stringify(data, null, 2);
    const blob = new Blob([jsonString], { type: 'application/json' });
    const url = URL.createObjectURL(blob);

    const link = document.createElement('a');
    link.href = url;
    link.download = `dashify-config-${new Date().toISOString().slice(0, 10)}.json`;
    document.body.appendChild(link);
    link.click();

    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  },


  async importConfig(file: File): Promise<DashboardExportSchema> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();

      reader.onload = (event) => {
        try {
          const content = event.target?.result as string;
          const parsed = JSON.parse(content) as DashboardExportSchema;

          if (!parsed || typeof parsed !== 'object') {
            throw new Error('Невалідний формат JSON файлу.');
          }

          if (!Array.isArray(parsed.widgets) || !Array.isArray(parsed.layouts)) {
            throw new Error('Файл не містить необхідних полів widgets або layouts.');
          }

          resolve(parsed);
        } catch (error) {
          reject(error instanceof Error ? error : new Error('Помилка зчитування файлу'));
        }
      };

      reader.onerror = () => reject(new Error('Не вдалося прочитати файл'));
      reader.readAsText(file);
    });
  },
};