import { StyleSheet } from 'react-native';
import { isTablet } from 'react-native-device-info';
import { createStitches } from 'stitches-native';
import type * as Stitches from 'stitches-native';

import type { TypographyVariant } from './utils';
import { native as typography } from './tokens/typography';
import * as utils from './utils';
import * as radii from './tokens/radii';
import * as colors from './tokens/colors';
import * as spacing from './tokens/spacing';

const { styled, css, createTheme, config, theme, useTheme, ThemeProvider } =
  createStitches({
    theme: {
      colors: colors.light,
      space: {
        none: 0,
        ...spacing,
      },
      sizes: {
        hairlineWidth: StyleSheet.hairlineWidth,
      },
      radii,
      // NOTE: React Native doesn't have factor based line heights (like 1, 1.5, 2, etc.)
      lineHeights: Object.entries(typography).reduce((acc, [t, v]) => {
        acc[t as TypographyVariant] = v.fontSize * v.lineHeight;
        return acc;
      }, {} as Record<TypographyVariant, number>),
    },
    utils: {
      size: utils.size,
      shadow: utils.shadow,
      typography: utils.typography,
      flexCenter: utils.flexCenter,
      absoluteFill: utils.absoluteFill,
    },
    media: {
      phone: !isTablet(),
      tablet: isTablet(),
      md: '(width >= 750px)',
      lg: '(width >= 1080px)',
      xl: '(width >= 1284px)',
      xxl: '(width >= 1536px)',
    },
  });

const darkTheme = createTheme({
  colors: colors.dark,
});

export {
  styled,
  css,
  createTheme,
  useTheme,
  config,
  theme,
  darkTheme,
  ThemeProvider,
};

export type CSS = Stitches.CSS<typeof config>;
export type Theme = typeof theme;
export type Color = keyof Theme['colors'];
export type Space = keyof Theme['space'];
export type Radii = keyof Theme['radii'];
export type LineHeight = keyof Theme['lineHeights'];
