import { StyleSheet } from 'react-native-unistyles';

import * as colors from '~design-system/colors';
import * as radii from '~design-system/radii';
import * as shadows from '~design-system/shadows';
import space from '~design-system/spacing.json';
import * as typography from '~design-system/typography';
import * as designSystemUtils from '~design-system/utils';

const lightTheme = {
  typography,
  colors: designSystemUtils.transformColors(colors),
  radii: { ...radii, none: 0 },
  space: { ...space, none: 0 },
  sizes: { hairlineWidth: StyleSheet.hairlineWidth },
  fonts: designSystemUtils.getFonts(typography),
  fontSizes: designSystemUtils.getFontSizes(typography),
  fontWeights: designSystemUtils.getFontWeights(typography),
  letterSpacings: designSystemUtils.getLetterSpacings(typography), // prettier-ignore
  lineHeights: designSystemUtils.getLineHeights(typography),
  shadows: designSystemUtils.getShadows(shadows),
};

const appThemes = {
  light: lightTheme,
  dark: lightTheme, // TODO: Add dark theme when available
};

const breakpoints = {
  xs: 0,
  sm: 300,
  md: 500,
  lg: 800,
  xl: 1200,
};

type AppBreakpoints = typeof breakpoints;
export type AppThemes = typeof appThemes;

export type Typography = keyof typeof typography;
export type Color = keyof AppThemes['light']['colors'];
export type Space = keyof AppThemes['light']['space'];
export type Radii = keyof AppThemes['light']['radii'];
export type Fonts = keyof AppThemes['light']['fonts'];
export type FontSize = keyof AppThemes['light']['fontSizes'];
export type FontWeight = keyof AppThemes['light']['fontWeights'];
export type LetterSpace = keyof AppThemes['light']['letterSpacings'];
export type LineHeight = keyof AppThemes['light']['lineHeights'];
declare module 'react-native-unistyles' {
  // eslint-disable-next-line @typescript-eslint/no-empty-object-type
  export interface UnistylesThemes extends AppThemes {}
  // eslint-disable-next-line @typescript-eslint/no-empty-object-type
  export interface UnistylesBreakpoints extends AppBreakpoints {}
}

StyleSheet.configure({
  themes: appThemes,
  breakpoints,
  settings: {
    initialTheme: 'light',
  },
});
