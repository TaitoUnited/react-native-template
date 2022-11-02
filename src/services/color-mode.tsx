import {
  createContext,
  useContext,
  ReactNode,
  useState,
  useCallback,
  useEffect,
} from 'react';

import { ColorSchemeName, useColorScheme } from 'react-native';

import { theme as lightTheme, darkTheme, ThemeProvider } from '~styles';

type ColorMode = 'light' | 'dark';

type ContextValue = {
  colorMode: ColorMode;
  setColorMode: (t: ColorMode) => void;
  toggleColorMode: () => void;
};

const ColorModeContext = createContext<undefined | ContextValue>(undefined);

// If in the future there can be more than two color modes we want to ensure that
// our light/dark are always applied correctly.
const getColorMode = (c: ColorSchemeName): ColorMode =>
  c === 'dark' ? 'dark' : 'light';

export function ColorModeProvider({ children }: { children: ReactNode }) {
  const systemColorMode = useColorScheme();
  const [colorMode, setColorMode] = useState(getColorMode(systemColorMode));
  const theme = colorMode === 'light' ? lightTheme : darkTheme;
  const toggleColorMode = useCallback(() => {
    setColorMode((p) => (p === 'dark' ? 'light' : 'dark'));
  }, []);

  // Keep theme in sync with OS settings
  useEffect(() => {
    setColorMode(getColorMode(systemColorMode));
  }, [systemColorMode]);

  return (
    <ColorModeContext.Provider
      value={{ colorMode, setColorMode, toggleColorMode }}
    >
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export const useColorMode = () => {
  const context = useContext(ColorModeContext);
  if (!context) throw new Error('Missing ColorModeProvider!');
  return context;
};
