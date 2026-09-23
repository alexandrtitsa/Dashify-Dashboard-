import React from 'react';
import cn from 'classnames';
import { GripVertical, X, AlertCircle, Loader2 } from 'lucide-react';
import styles from './WidgetCard.module.scss';

interface WidgetCardProps {
  id: string;
  title: string;
  children: React.ReactNode;
  isLoading?: boolean;
  error?: string | null;
  onRemove?: (id: string) => void;
}

export const WidgetCard: React.FC<WidgetCardProps> = ({
  id,
  title,
  children,
  isLoading = false,
  error = null,
  onRemove,
}) => {
  return (
    <article className={styles.card} aria-label={`Віджет: ${title}`}>
      <header className={styles.cardHeader}>
        <div className={cn('widget-drag-handle', styles.cardDragHandle)}>
          <GripVertical size={16} aria-hidden="true" />
          <h3 className={styles.cardTitle}>{title}</h3>
        </div>
        {onRemove && (
          <div className={styles.cardActions}>
            <button
              type="button"
              className={cn(styles.cardIconBtn, styles.cardIconBtnDanger)}
              onClick={() => onRemove(id)}
              aria-label={`Видалити віджет ${title}`}
            >
              <X size={16} />
            </button>
          </div>
        )}
      </header>

      <div className={styles.cardContent}>
        {isLoading ? (
          <div className={styles.cardState}>
            <Loader2 size={24} className="spin" aria-hidden="true" />
            <span>Завантаження даних...</span>
          </div>
        ) : error ? (
          <div className={styles.cardState}>
            <AlertCircle size={24} color="var(--color-danger)" aria-hidden="true" />
            <span>Помилка: {error}</span>
          </div>
        ) : (
          children
        )}
      </div>
    </article>
  );
};