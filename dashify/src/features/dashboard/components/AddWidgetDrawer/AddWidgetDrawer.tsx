import React from 'react';
import { Plus, BarChart3, CloudSun, DollarSign, CheckSquare, X } from 'lucide-react';
import { useDashboardStore } from '@/store/useDashboardStore';
import type { WidgetType } from '@/types/widget';
import styles from './AddWidgetDrawer.module.scss';

interface AddWidgetDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

interface WidgetOption {
  type: WidgetType;
  title: string;
  description: string;
  icon: React.ReactNode;
}

const WIDGET_OPTIONS: readonly WidgetOption[] = [
  {
    type: 'chart',
    title: 'Аналітичний графік',
    description: 'Візуалізація метрик (виручка, користувачі) у часі',
    icon: <BarChart3 size={24} />,
  },
  {
    type: 'weather',
    title: 'Погода',
    description: 'Прогноз погоди для обраного міста',
    icon: <CloudSun size={24} />,
  },
  {
    type: 'currency',
    title: 'Курси валют',
    description: 'Моніторинг актуальних курсів валют',
    icon: <DollarSign size={24} />,
  },
  {
    type: 'tasks',
    title: 'Список завдань',
    description: 'Локальний чек-лист із відстеженням прогресу',
    icon: <CheckSquare size={24} />,
  },
];

export const AddWidgetDrawer: React.FC<AddWidgetDrawerProps> = ({ isOpen, onClose }) => {
  const addWidget = useDashboardStore((state) => state.addWidget);

  if (!isOpen) return null;

  const handleAdd = (type: WidgetType, title: string) => {
    addWidget(type, title);
    onClose();
  };

  return (
    <div className={styles.overlay} onClick={onClose}>
      <aside
        className={styles.drawer}
        onClick={(e) => e.stopPropagation()}
        aria-label="Каталог віджетів"
      >
        <header className={styles.drawerHeader}>
          <h2>Додати віджет</h2>
          <button type="button" className={styles.drawerCloseBtn} onClick={onClose}>
            <X size={20} />
          </button>
        </header>

        <div className={styles.drawerContent}>
          {WIDGET_OPTIONS.map((option) => (
            <div key={option.type} className={styles.widgetCard}>
              <div className={styles.widgetCardIcon}>{option.icon}</div>
              <div className={styles.widgetCardInfo}>
                <h4>{option.title}</h4>
                <p>{option.description}</p>
                <button
                  type="button"
                  className={styles.widgetCardAddBtn}
                  onClick={() => handleAdd(option.type, option.title)}
                >
                  <Plus size={16} /> Додати
                </button>
              </div>
            </div>
          ))}
        </div>
      </aside>
    </div>
  );
};