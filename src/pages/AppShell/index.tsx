import { lazy, Suspense } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { AppShell } from '@mantine/core';
import { useLayoutStore } from '@/store/layout';
import { useThemeStore } from '@/store/theme';
import Header from './Header';

export default function AppShellWrapper() {
  const SidebarStudio = lazy(() => import('./SidebarStudio'));
  const { sidebarStudioOpen, mobileOpened } = useLayoutStore();
  const { colors } = useThemeStore();
  const isStudioPage = useLocation().pathname === '/studio';

  return (
    <AppShell
      header={{ height: 60 }}
      navbar={{
        width: isStudioPage ? sidebarStudioOpen ? 300 : 60 : 0,
        breakpoint: 'sm',
        collapsed: { mobile: !mobileOpened },
      }}
      padding="sm"
      transitionDuration={500}
      transitionTimingFunction="ease-in-out"
    >
      <AppShell.Header>
        <Header />
      </AppShell.Header>

      {isStudioPage && (
        <AppShell.Navbar py="sm">
          <Suspense fallback={null}>
            <SidebarStudio />
          </Suspense>
        </AppShell.Navbar>
      )}

      <AppShell.Main bg={colors[9]}>
        <Outlet />
      </AppShell.Main>
    </AppShell>
  );
}
