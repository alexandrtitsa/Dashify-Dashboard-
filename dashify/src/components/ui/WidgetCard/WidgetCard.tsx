import React, { useState } from 'react';
import cn from 'classnames';
import { GripVertical, X, AlertCircle, Loader2 } from 'lucide-react';
import { LiveAnnouncer } from '../LiveAnnouncer/LiveAnnouncer';
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
  const [announcement, setAnnouncement] = useState<string>('');

  const handleRemove = () => {
    setAnnouncement(`Віджет "${title}" видалено`);
    if (onRemove) {
      onRemove(id);
    }
  };

  const handleKeyDownHandle = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      setAnnouncement(`Віджет "${title}" у режимі переміщення.`);
    }
  };

  return (
    <article
      className={styles.card}
      aria-labelledby={`widget-title-${id}`}
      role="region"
    >
      <LiveAnnouncer message={announcement} />

      <header className={styles.cardHeader}>
        <div
          tabIndex={0}
          role="button"
          aria-grabbed="false"
          aria-describedby={`widget-drag-desc-${id}`}
          className={cn('widget-drag-handle', styles.cardDragHandle)}
          onKeyDown={handleKeyDownHandle}
        >
          <GripVertical size={16} aria-hidden="true" />
          <h3 id={`widget-title-${id}`} className={styles.cardTitle}>
            {title}
          </h3>
          <span id={`widget-drag-desc-${id}`} className="sr-only" style={{ display: 'none' }}>
            Натисніть Enter або Пробіл, щоб активувати перетягування
          </span>
        </div>

        {onRemove && (
          <div className={styles.cardActions}>
            <button
              type="button"
              className={cn(styles.cardIconBtn, styles.cardIconBtnDanger)}
              onClick={handleRemove}
              aria-label={`Видалити віджет ${title}`}
            >
              <X size={16} />
            </button>
          </div>
        )}
      </header>

      <div className={styles.cardContent}>
        {isLoading ? (
          <div className={styles.cardState} role="status" aria-label="Завантаження">
            <Loader2 size={24} className="spin" aria-hidden="true" />
            <span>Завантаження даних...</span>
          </div>
        ) : error ? (
          <div className={styles.cardState} role="alert">
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