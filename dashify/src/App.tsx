import React, { lazy, Suspense } from 'react';
import { Loader2 } from 'lucide-react';
import styles from './App.module.scss';

const Header = lazy(() => import('@/components/layout/Header/Header').then((m) => ({ default: m.Header })));
const WidgetSidebar = lazy(() =>
  import('@/features/dashboard/components/WidgetSidebar/WidgetSidebar').then((m) => ({ default: m.WidgetSidebar }))
);
const DashboardGrid = lazy(() =>
  import('@/features/dashboard/components/DashboardGrid/DashboardGrid').then((m) => ({ default: m.DashboardGrid }))
);

const PageLoader: React.FC = () => (
  <div className={styles.appLoader}>
    <Loader2 className="spin" size={32} aria-hidden="true" />
    <span>Завантаження інтерфейсу...</span>
  </div>
);

export const App: React.FC = () => {
  return (
    <div className={styles.appContainer}>
      <Suspense fallback={<PageLoader />}>
        <Header />
        <main className={styles.mainContent}>
          <aside className={styles.sidebarSection}>
            <WidgetSidebar />
          </aside>
          <section className={styles.gridSection}>
            <DashboardGrid />
          </section>
        </main>
      </Suspense>
    </div>
  );
};

App.displayName = 'App';