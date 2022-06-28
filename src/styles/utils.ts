import { CSSProperties } from 'react';
import { StyleSheet } from 'react-native';
import type * as Stitches from 'stitches-native';

import { native as typographyTokens } from './tokens/typography';

export type TypographyVariant = keyof typeof typographyTokens;

type TypographyVariantVar = `$${TypographyVariant}`;

const typographyVariants: {
  [variant in TypographyVariantVar]: CSSProperties;
} = {
  $title1: getTypographyFromToken(typographyTokens.title1),
  $title2: getTypographyFromToken(typographyTokens.title2),
  $title3: getTypographyFromToken(typographyTokens.title3),
  $subtitle: getTypographyFromToken(typographyTokens.subtitle),
  $body: getTypographyFromToken(typographyTokens.body),
  $bodyBold: getTypographyFromToken(typographyTokens.bodyBold),
  $bodySmall: getTypographyFromToken(typographyTokens.bodySmall),
  $bodySmallBold: getTypographyFromToken(typographyTokens.bodySmallBold),
  $bodyLarge: getTypographyFromToken(typographyTokens.bodyLarge),
  $bodyLargeBold: getTypographyFromToken(typographyTokens.bodyLargeBold), // prettier-ignore
  $overline: getTypographyFromToken(typographyTokens.overline),
  $caption: getTypographyFromToken(typographyTokens.caption),
};

function getTypographyFromToken(t: typeof typographyTokens['body']) {
  const fontFamily = t.fontFamily.replace(/\s/g, '');
  const suffix = t.fontWeight === 700 ? 'Bold' : 'Regular';

  return {
    fontSize: t.fontSize,
    fontFamily: `${fontFamily}-${suffix}`,
  };
}

export const typography = (value: TypographyVariantVar) => {
  return typographyVariants[value];
};

export const size = (value: Stitches.PropertyValue<'width'>) => ({
  width: value,
  height: value,
});

export const shadow = (level: 'none' | 'small' | 'medium' | 'large') => {
  return {
    none: {
      elevation: 0,
      shadowOffset: { width: 0, height: 0 },
      shadowRadius: 0,
      shadowOpacity: 0,
      shadowColor: '#000',
    },
    small: {
      elevation: 2,
      shadowOffset: { width: 0, height: 1 },
      shadowRadius: 3,
      shadowOpacity: 0.1,
      shadowColor: '#000',
    },
    medium: {
      elevation: 5,
      shadowOffset: { width: 0, height: 3 },
      shadowRadius: 6,
      shadowOpacity: 0.2,
      shadowColor: '#000',
    },
    large: {
      elevation: 10,
      shadowOffset: { width: 0, height: 6 },
      shadowRadius: 12,
      shadowOpacity: 0.4,
      shadowColor: '#000',
    },
  }[level];
};

export const flexCenter = (
  value?: Stitches.PropertyValue<'flexDirection'>,
) => ({
  flexDirection: value || 'column',
  justifyContent: 'center',
  alignItems: 'center',
});

export const absoluteFill = () => ({
  ...StyleSheet.absoluteFillObject,
});
