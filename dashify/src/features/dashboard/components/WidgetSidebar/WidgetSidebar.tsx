import React, { useState } from 'react';
import { Plus, Check, BarChart2, CloudSun, DollarSign, CheckSquare } from 'lucide-react';
import { useDashboardStore } from '@/store/useDashboardStore';
import { LiveAnnouncer } from '@/components/ui';
import type { WidgetType } from '@/types/widget';
import styles from './WidgetSidebar.module.scss';

interface WidgetOption {
  type: WidgetType;
  title: string;
  description: string;
  icon: React.ReactNode;
}

const AVAILABLE_WIDGETS: WidgetOption[] = [
  {
    type: 'chart',
    title: 'Аналітика',
    description: 'Графік активності користувачів',
    icon: <BarChart2 size={18} />,
  },
  {
    type: 'weather',
    title: 'Погода',
    description: 'Поточна температура та прогноз',
    icon: <CloudSun size={18} />,
  },
  {
    type: 'currency',
    title: 'Курси валют',
    description: 'Актуальні котирування НБУ',
    icon: <DollarSign size={18} />,
  },
  {
    type: 'tasks',
    title: 'Список завдань',
    description: 'Менеджер щоденних задач',
    icon: <CheckSquare size={18} />,
  },
];

export const WidgetSidebar: React.FC = () => {
  const addWidget = useDashboardStore((state) => state.addWidget);
  const widgets = useDashboardStore((state) => state.widgets);
  const [announcement, setAnnouncement] = useState<string>('');

  const activeWidgetTypes = new Set(widgets.map((w) => w.type));

  const handleAddWidget = (type: WidgetType, title: string) => {
    addWidget(type, title);
    setAnnouncement(`Віджет "${title}" успішно додано на дашборд`);
  };

  return (
    <nav className={styles.sidebar} aria-label="Панель додавання віджетів">
      <LiveAnnouncer message={announcement} />

      <header className={styles.header}>
        <h2 className={styles.title}>Додати віджети</h2>
        <p className={styles.description}>Оберіть віджети для відображення на робочому столі</p>
      </header>

      <ul className={styles.list}>
        {AVAILABLE_WIDGETS.map(({ type, title, description, icon }) => {
          const isAdded = activeWidgetTypes.has(type);

          return (
            <li key={type} className={styles.item}>
              <div className={styles.itemInfo}>
                <div className={styles.iconWrapper} aria-hidden="true">
                  {icon}
                </div>
                <div className={styles.textGroup}>
                  <span className={styles.itemName}>{title}</span>
                  <span className={styles.itemDesc}>{description}</span>
                </div>
              </div>

              <button
                type="button"
                className={styles.addBtn}
                disabled={isAdded}
                onClick={() => handleAddWidget(type, title)}
                aria-label={isAdded ? `Віджет ${title} вже додано` : `Додати віджет ${title}`}
              >
                {isAdded ? (
                  <>
                    <Check size={14} aria-hidden="true" />
                    <span>Додано</span>
                  </>
                ) : (
                  <>
                    <Plus size={14} aria-hidden="true" />
                    <span>Додати</span>
                  </>
                )}
              </button>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

WidgetSidebar.displayName = 'WidgetSidebar';