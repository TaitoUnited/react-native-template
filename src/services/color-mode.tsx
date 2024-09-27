import { ReactNode, createContext, useContext } from 'react';
import { ColorSchemeName, useColorScheme } from 'react-native';

import { ThemeProvider, darkTheme, theme as lightTheme } from '~styles';
import { STORAGE_KEYS, useStorageString } from '~utils/storage';

type ColorMode = 'light' | 'dark' | 'system';
type ColorScheme = 'light' | 'dark';

type ContextValue = {
  colorMode: ColorMode;
  colorScheme: ColorScheme;
  setColorMode: (t: ColorMode) => void;
};

const ColorModeContext = createContext<undefined | ContextValue>(undefined);

// If in the future there can be more than two color modes we want to ensure that
// our light/dark are always applied correctly.
const getColorScheme = (c: ColorSchemeName): ColorScheme =>
  c === 'dark' ? 'dark' : 'light';

export function ColorModeProvider({ children }: { children: ReactNode }) {
  const systemColorMode = useColorScheme();
  const [persistedColorMode, setPersistedColorMode] = useStorageString(
    STORAGE_KEYS.COLOR_MODE
  );

  const colorMode = (persistedColorMode || 'system') as ColorMode;

  let colorScheme: ColorScheme;

  if (colorMode === 'system') {
    colorScheme = getColorScheme(systemColorMode);
  } else if (colorMode === 'dark') {
    colorScheme = 'dark';
  } else {
    colorScheme = 'light';
  }

  const theme = colorScheme === 'light' ? lightTheme : darkTheme;

  return (
    <ColorModeContext.Provider
      value={{ colorMode, colorScheme, setColorMode: setPersistedColorMode }}
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
