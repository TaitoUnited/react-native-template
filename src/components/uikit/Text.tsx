import { Text as RNText } from 'react-native';
import { StyleSheet, useUnistyles } from 'react-native-unistyles';

import { type Color, type Typography } from '~styles/styled';
import { getTypography } from '~styles/utils';

type TextProps = RNText['props'] & {
  variant?: Typography;
  align?: 'left' | 'right' | 'center';
  uppercase?: boolean;
  color?: Color;
  children: React.ReactNode;
};

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

export function Text({
  variant = 'body',
  align = 'left',
  uppercase = false,
  color,
  children,
  ...props
}: TextProps) {
  const { theme } = useUnistyles();
  styles.useVariants({
    align,
    uppercase,
    color,
  });

  return (
    <RNText style={[getTypography(theme, variant), styles.text]} {...props}>
      {children}
    </RNText>
  );
}
