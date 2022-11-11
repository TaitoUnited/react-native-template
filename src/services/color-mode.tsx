import { createContext, useContext, ReactNode } from 'react';
import { ColorSchemeName, useColorScheme } from 'react-native';

import { theme as lightTheme, darkTheme, ThemeProvider } from '~styles';
import { useEvent } from '~utils/common';
import { useStorageState } from '~utils/storage';

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
  const { state, setState } = useStorageState(
    '@app/color-mode',
    getColorMode(systemColorMode)
  );

  const colorMode = state || 'light';
  const theme = colorMode === 'light' ? lightTheme : darkTheme;

  const toggleColorMode = useEvent(() => {
    setState(colorMode === 'light' ? 'dark' : 'light');
  });

  return (
    <ColorModeContext.Provider
      value={{ colorMode, setColorMode: setState, toggleColorMode }}
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
