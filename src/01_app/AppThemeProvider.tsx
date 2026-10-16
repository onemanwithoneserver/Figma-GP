import { useState, type ReactNode } from 'react';
import { createTheme, StyledEngineProvider, ThemeProvider } from '@mui/material/styles';

/** CSS owns the design tokens; MUI reads the same values after CSS has loaded. */
export default function AppThemeProvider({ children }: { children: ReactNode }) {
  const [theme] = useState(() => {
    const css = getComputedStyle(document.documentElement);
    const token = (name: string) => css.getPropertyValue(name).trim();

    return createTheme({
      palette: {
        primary: { main: token('--brand'), dark: token('--brand-dark'), contrastText: '#ffffff' },
        secondary: { main: token('--ink'), contrastText: '#ffffff' },
        background: { default: token('--background'), paper: token('--card') },
        text: { primary: token('--ink'), secondary: token('--ink-muted') },
        divider: token('--outline'),
      },
      typography: { fontFamily: css.fontFamily, button: { textTransform: 'none' } },
      shape: { borderRadius: parseFloat(token('--radius-control')) },
      components: {
        MuiSvgIcon: { styleOverrides: { root: { display: 'block' } } },
        MuiButtonBase: { defaultProps: { disableRipple: true } },
        MuiButton: {
          defaultProps: { disableElevation: true, color: 'inherit' },
          styleOverrides: {
            root: {
              // Match a native button's baseline; Tailwind supplies every visual variant.
              display: 'inline-block', minWidth: 0, padding: 0, border: 0,
              borderRadius: 0, fontFamily: 'inherit', fontSize: 'var(--font-size)',
              fontWeight: 500, lineHeight: 'inherit', letterSpacing: 'inherit',
              textTransform: 'none', verticalAlign: 'baseline', whiteSpace: 'normal',
              color: 'inherit', backgroundColor: 'transparent',
              '&:hover': { backgroundColor: 'transparent' },
              '&.Mui-disabled': { color: 'inherit' },
            },
          },
        },
        MuiTab: {
          styleOverrides: {
            root: {
              minWidth: 0, minHeight: 0, padding: 0, maxWidth: 'none',
              fontFamily: 'inherit', fontWeight: 500, lineHeight: 'inherit',
              textTransform: 'none', letterSpacing: 'inherit', opacity: 1,
              color: 'inherit', '&.Mui-selected': { color: 'inherit' },
            },
          },
        },
        MuiTabs: { styleOverrides: { root: { minHeight: 0 }, indicator: { display: 'none' } } },
      },
    });
  });

  return (
    <StyledEngineProvider enableCssLayer>
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </StyledEngineProvider>
  );
}
