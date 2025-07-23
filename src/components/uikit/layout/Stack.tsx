import type { ReactNode } from 'react';
import { View, type ViewProps } from 'react-native';
import { StyleSheet } from 'react-native-unistyles';

import { type Space } from '~styles/styled';

type Props = ViewProps & {
  spacing: Space | 'none';
  axis: 'x' | 'y';
  align?: 'center' | 'start' | 'end' | 'stretch' | 'baseline';
  justify?: 'center' | 'start' | 'end' | 'between' | 'around';
  children: ReactNode;
};

export function Stack({
  children,
  axis,
  spacing,
  align,
  justify,
  style,
  ...rest
}: Props) {
  styles.useVariants({
    axis,
    align,
    justify,
    spacing,
  });

  return (
    <View style={[styles.wrapper, style]} {...rest}>
      {children}
    </View>
  );
}

const styles = StyleSheet.create((theme) => ({
  wrapper: {
    variants: {
      axis: {
        x: { flexDirection: 'row' },
        y: { flexDirection: 'column' },
      },
      align: {
        center: { alignItems: 'center' },
        start: { alignItems: 'flex-start' },
        end: { alignItems: 'flex-end' },
        stretch: { alignItems: 'stretch' },
        baseline: { alignItems: 'baseline' },
      },
      justify: {
        center: { justifyContent: 'center' },
        start: { justifyContent: 'flex-start' },
        end: { justifyContent: 'flex-end' },
        between: { justifyContent: 'space-between' },
        around: { justifyContent: 'space-around' },
      },
      spacing: Object.fromEntries(
        Object.entries(theme.space).map(([key, value]) => [key, { gap: value }])
      ),
    },
  },
}));
