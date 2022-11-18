import type * as Stitches from 'stitches-native';
import { StyleSheet } from 'react-native';
import { createStitches } from 'stitches-native';

import * as utils from './utils';
import * as typography from '~design-system/typography';
import * as colors from '~design-system/colors';
import * as space from '~design-system/spacing';
import * as radii from '~design-system/radii';
import * as designSystemUtils from '~design-system/utils';

const { styled, css, createTheme, config, theme, useTheme, ThemeProvider } =
  createStitches({
    theme: {
      colors: colors.light,
      radii: { ...radii, none: 0 },
      space: { ...space, none: 0 },
      sizes: { hairlineWidth: StyleSheet.hairlineWidth },
      fonts: designSystemUtils.getFonts(typography.native),
      fontSizes: designSystemUtils.getFontSizes(typography.native),
      fontWeights: designSystemUtils.getFontWeights(typography.native),
      letterSpacings: designSystemUtils.getLetterSpacings(typography.native), // prettier-ignore
      lineHeights: designSystemUtils.getLineHeights(typography.native),
    },
    utils,
  });

export const darkTheme = createTheme({ colors: colors.dark });
export { styled, css, createTheme, useTheme, config, theme, ThemeProvider };
export type CSS = Stitches.CSS<typeof config>;
export type Theme = typeof theme;
export type Typography = keyof typeof typography.native;
export type Color = keyof Theme['colors'];
export type Space = keyof Theme['space'];
export type Radii = keyof Theme['radii'];
export type Fonts = keyof Theme['fonts'];
export type FontSize = keyof Theme['fontSizes'];
export type FontWeight = keyof Theme['fontWeights'];
export type LetterSpace = keyof Theme['letterSpacings'];
export type LineHeight = keyof Theme['lineHeights'];
