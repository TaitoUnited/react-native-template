import { cloneElement, isValidElement, ReactNode, useState } from 'react';
import { View, ViewProps } from 'react-native';

import { flattenChildren } from './helpers';
import { styled, Theme, useTheme } from '~styles';

type Props = ViewProps & {
  spacing: keyof Theme['space'];
  align?: 'center' | 'start' | 'end' | 'stretch';
  justify?: 'center' | 'start' | 'end' | 'between' | 'around';
  columns?: number;
  children: ReactNode;
};

export function Grid({
  children,
  spacing = 'none',
  align,
  justify,
  columns,
  ...rest
}: Props) {
  // Handle `Fragments` by flattening children
  const elements = flattenChildren(children).filter((e) => isValidElement(e));
  const theme = useTheme();
  const [width, setWidth] = useState(-1);
  const colWidth =
    columns !== undefined && width !== -1 ? width / columns : undefined;

  return (
    <Wrapper
      {...rest}
      align={align}
      justify={justify}
      style={[rest.style, { marginHorizontal: theme.space[spacing] / -2 }]}
      onLayout={(e) => setWidth(e.nativeEvent.layout.width)}
    >
      {elements.map((child, index) => {
        return (
          <View
            key={index}
            style={{
              margin: theme.space[spacing] / 2,
              width: colWidth && colWidth - theme.space[spacing],
            }}
          >
            {isValidElement(child) ? cloneElement(child) : null}
          </View>
        );
      })}
    </Wrapper>
  );
}

const Wrapper = styled('View', {
  flexDirection: 'row',
  flexWrap: 'wrap',
  variants: {
    align: {
      center: { alignItems: 'center' },
      start: { alignItems: 'flex-start' },
      end: { alignItems: 'flex-end' },
      stretch: { alignItems: 'stretch' },
    },
    justify: {
      center: { justifyContent: 'center' },
      start: { justifyContent: 'flex-start' },
      end: { justifyContent: 'flex-end' },
      between: { justifyContent: 'space-between' },
      around: { justifyContent: 'space-around' },
    },
  },
});
