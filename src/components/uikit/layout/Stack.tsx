import type { ReactNode } from 'react';
import type { ViewProps } from 'react-native';

import { styled, theme, Theme } from '~styles';

type Props = ViewProps & {
  spacing: keyof Theme['space'] | 'none';
  axis?: 'x' | 'y';
  align?: 'center' | 'start' | 'end' | 'stretch';
  justify?: 'center' | 'start' | 'end' | 'between' | 'around';
  children: ReactNode;
};

export function Stack({
  children,
  axis,
  spacing,
  align,
  justify,
  ...rest
}: Props) {
  return (
    <Wrapper
      axis={axis}
      align={align}
      justify={justify}
      spacing={spacing}
      {...rest}
    >
      {children}
    </Wrapper>
  );
}

const spacingVariants: { [key in Props['spacing']]: { gap: number } } =
  Object.entries(theme.space).reduce(
    (acc, [key, value]) => {
      acc[key as Props['spacing']] = {
        gap: Number(value.value),
      };
      return acc;
    },
    {} as { [key in Props['spacing']]: { gap: number } }
  );

const Wrapper = styled('View', {
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
    spacing: spacingVariants,
  },
});
