import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { App } from './App';
import '@/styles/index.scss';

const rootElement = document.getElementById('root');

if (!rootElement) {
  throw new Error('Не вдалося знайти кореневий елемент #root у DOM.');
}

createRoot(rootElement).render(
  <StrictMode>
    <App />
  </StrictMode>
);