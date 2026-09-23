import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { App } from './App';
import { ThemeProvider } from '@/features/theme';
import '@/app/styles/index.scss';

const rootElement = document.getElementById('root');

if (!rootElement) {
  throw new Error('Не вдалося знайти кореневий елемент #root у DOM.');
}

createRoot(rootElement).render(
  <StrictMode>
    <ThemeProvider>
      <App />
    </ThemeProvider>
  </StrictMode>
);