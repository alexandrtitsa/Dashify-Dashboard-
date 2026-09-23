import React from 'react';
import cn from 'classnames';
import { Sun, Moon, Monitor } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import type { ThemeMode } from '../../types/theme';
import styles from './ThemeToggle.module.scss';

const OPTIONS: { mode: ThemeMode; label: string; icon: React.ReactNode }[] = [
  { mode: 'light', label: 'Світла', icon: <Sun size={14} /> },
  { mode: 'dark', label: 'Темна', icon: <Moon size={14} /> },
  { mode: 'system', label: 'Системна', icon: <Monitor size={14} /> },
];

export const ThemeToggle: React.FC = () => {
  const { theme, setTheme } = useTheme();

  return (
    <div
      className={styles.toggleGroup}
      role="radiogroup"
      aria-label="Вибір теми оформлення"
    >
      {OPTIONS.map(({ mode, label, icon }) => (
        <button
          key={mode}
          type="button"
          role="radio"
          aria-checked={theme === mode}
          className={cn(styles.toggleBtn, { [styles.toggleBtnActive]: theme === mode })}
          onClick={() => setTheme(mode)}
        >
          {icon}
          <span>{label}</span>
        </button>
      ))}
    </div>
  );
};