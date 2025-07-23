import { StyleSheet, type ViewStyle } from 'react-native';

import * as typographyTokens from '~design-system/typography';
import * as designSystemUtils from '~design-system/utils';

import { type AppThemes } from './styled';

type Typography = keyof typeof typographyTokens;
type FlexCenter = {
  flexDirection: ViewStyle['flexDirection'];
  justifyContent: ViewStyle['justifyContent'];
  alignItems: ViewStyle['alignItems'];
};

export const typography = (theme: AppThemes['light'], variant: Typography) => {
  const { fontWeight, textTransform } = typographyTokens[variant];

  return {
    fontFamily: `${designSystemUtils.getFontFromWeight(fontWeight)}`,
    fontSize: theme.fontSizes[variant],
    fontWeight: theme.fontWeights[variant],
    letterSpacing: theme.letterSpacings[variant],
    lineHeight: theme.lineHeights[variant],
    textTransform,
  } as designSystemUtils.TypographyDefinition;
};

export const flexCenter = (): FlexCenter => ({
  flexDirection: 'row',
  justifyContent: 'center',
  alignItems: 'center',
});

export const absoluteFill = () => ({
  ...StyleSheet.absoluteFillObject,
});

export const getTypography = (
  theme: AppThemes['light'],
  variant: Typography
): designSystemUtils.TypographyDefinition => {
  return typography(theme, variant);
};
