import '@mantine/core/styles.css';

import { createTheme, Loader, MantineProvider } from '@mantine/core';
import { Router } from './Router';
import { useMemo } from 'react';
import { useThemeStore } from './store/theme';

export default function App() {
  const { colors, isDarkMode } = useThemeStore();

  const theme = useMemo(() => {
    return createTheme({
      colors: {
        primary: colors,
      },

      components: {
        Paper: {
          styles: () => ({
            root: {
              backgroundColor: isDarkMode ? colors[5] : 'white',
            },
          }),
        },
        Loader: Loader.extend({
          defaultProps: {
            loaders: { ...Loader.defaultLoaders },
            type: 'ring',
          },
        }),
      },
    });
  }, [isDarkMode]);

  return (
    <MantineProvider theme={theme}>
      <Router />
    </MantineProvider>
  );
}
