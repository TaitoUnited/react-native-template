import { type ComponentType, createElement, forwardRef } from 'react';
import type { TextProps as RNTextProps } from 'react-native';
import { StyleSheet, useUnistyles } from 'react-native-unistyles';

import type * as typographyTokens from '~design-system/typography';
import { type Color } from '~styles/styled';
import { getTypography } from '~styles/utils';

type TextProps = RNTextProps & {
  variant?: keyof typeof typographyTokens;
  align?: 'left' | 'right' | 'center';
  uppercase?: boolean;
  color?: Color;
  children: React.ReactNode;
};

const LeanText = forwardRef((props, ref) => {
  return createElement('RCTText', { ...props, ref });
}) as ComponentType<TextProps>;

LeanText.displayName = 'LeanText';

export function Text({
  variant = 'body',
  align = 'left',
  uppercase = false,
  color,
  children,
  style,
  ...props
}: TextProps) {
  const { theme } = useUnistyles();
  const typographyStyle = getTypography(theme, variant);

  styles.useVariants({
    align,
    uppercase,
    color,
  });
  return (
    <LeanText style={[typographyStyle, styles.text, style]} {...props}>
      {children}
    </LeanText>
  );
}

const styles = StyleSheet.create((theme) => ({
  text: {
    color: theme.colors.text,
    variants: {
      color: Object.fromEntries(
        Object.entries(theme.colors).map(([key, value]) => [
          key,
          { color: value },
        ])
      ),
      align: {
        left: { textAlign: 'left' },
        right: { textAlign: 'right' },
        center: { textAlign: 'center' },
      },
      uppercase: {
        true: { textTransform: 'uppercase' },
        false: { textTransform: 'none' },
      },
    },
  },
}));
