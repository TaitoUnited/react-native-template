import { StyleSheet } from 'react-native';
import type * as Stitches from 'stitches-native';

import * as colors from '~design-system/colors';
import * as shadows from '~design-system/shadows';
import * as typographyTokens from '~design-system/typography';
import * as designSystemUtils from '~design-system/utils';

type Typography = keyof typeof typographyTokens;

export const typography = (variant: Typography) => {
  const { fontWeight, textTransform } = typographyTokens[variant];

  return {
    fontFamily: `$${designSystemUtils.getFontFromWeight(fontWeight)}`,
    fontSize: `$${variant}`,
    fontWeight: `$${variant}`,
    letterSpacing: `$${variant}`,
    lineHeight: `$${variant}`,
    textTransform,
  };
};

export const size = (value: Stitches.PropertyValue<'width'>) => ({
  width: value,
  height: value,
});

export const shadow = (
  level: 'none' | designSystemUtils.ShadowName<shadows.ShadowsToken>
) => {
  return {
    none: {
      elevation: 0,
      shadowOffset: { width: 0, height: 0 },
      shadowRadius: 0,
      shadowOpacity: 0,
      shadowColor: '#000',
    },
    ...designSystemUtils.getShadows(shadows),
  }[level];
};

export const flexCenter = (
  value?: Stitches.PropertyValue<'flexDirection'>
) => ({
  flexDirection: value || 'column',
  justifyContent: 'center',
  alignItems: 'center',
});

export const absoluteFill = () => ({
  ...StyleSheet.absoluteFillObject,
});

export function tokenName(value: string | number) {
  return `${value}`;
}

// TODO: check if there is a better way to handle this
export function transformColors(
  colorGroups: Record<keyof typeof colors, Record<string, string>>
) {
  const tokens: Record<string, string> = {};

  Object.values(colorGroups).forEach((colorGroup) => {
    Object.entries(colorGroup).forEach(([key, value]) => {
      tokens[tokenName(key)] = value;
    });
  });

  return tokens as Record<colors.ColorsToken, string>;
}
