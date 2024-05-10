import { StyleSheet } from 'react-native';
import type * as Stitches from 'stitches-native';
import { createStitches } from 'stitches-native';

import * as utils from './utils';

import * as colors from '~design-system/colors';
import * as radii from '~design-system/radii';
import space from '~design-system/spacing.json';
import * as typography from '~design-system/typography';
import * as designSystemUtils from '~design-system/utils';

const { styled, css, createTheme, config, theme, useTheme, ThemeProvider } =
  createStitches({
    theme: {
      colors: designSystemUtils.transformColors(colors),
      radii: { ...radii, none: 0 },
      space: { ...space, none: 0 },
      sizes: { hairlineWidth: StyleSheet.hairlineWidth },
      fonts: designSystemUtils.getFonts(typography),
      fontSizes: designSystemUtils.getFontSizes(typography),
      fontWeights: designSystemUtils.getFontWeights(typography),
      letterSpacings: designSystemUtils.getLetterSpacings(typography), // prettier-ignore
      lineHeights: designSystemUtils.getLineHeights(typography),
    },
    utils,
  });

export const darkTheme = createTheme({
  colors: designSystemUtils.transformColors(colors), // TODO: add dark theme support once we get dark mode colors from Figma
});
export { styled, css, createTheme, useTheme, config, theme, ThemeProvider };
export type CSS = Stitches.CSS<typeof config>;
export type Theme = typeof theme;
export type Typography = keyof typeof typography;
export type Color = keyof Theme['colors'];
export type Space = keyof Theme['space'];
export type Radii = keyof Theme['radii'];
export type Fonts = keyof Theme['fonts'];
export type FontSize = keyof Theme['fontSizes'];
export type FontWeight = keyof Theme['fontWeights'];
export type LetterSpace = keyof Theme['letterSpacings'];
export type LineHeight = keyof Theme['lineHeights'];
