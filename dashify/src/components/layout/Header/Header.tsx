import React from 'react';
import { LayoutDashboard } from 'lucide-react';
import { ThemeToggle } from '@/features/theme';
import styles from './Header.module.scss';

export const Header: React.FC = () => {
  return (
    <header className={styles.header} role="banner">
      <div className={styles.brand}>
        <div className={styles.logoIcon} aria-hidden="true">
          <LayoutDashboard size={20} />
        </div>
        <div className={styles.titleGroup}>
          <h1 className={styles.title}>Dashify</h1>
          <p className={styles.subtitle}>Персональний інтерактивний дашборд</p>
        </div>
      </div>

      <div className={styles.actions}>
        <ThemeToggle />
      </div>
    </header>
  );
};

Header.displayName = 'Header';