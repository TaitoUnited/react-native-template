import { cloneElement, isValidElement, type ReactNode, useState } from 'react';
import { type LayoutChangeEvent, View, type ViewProps } from 'react-native';
import { StyleSheet, useUnistyles } from 'react-native-unistyles';

import { type Space } from '~styles/styled';

import { flattenChildren } from '../helpers';

type Props = ViewProps & {
  spacing: Space;
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
  const { theme } = useUnistyles();
  const [width, setWidth] = useState(-1);
  const colWidth =
    columns !== undefined && width !== -1 ? width / columns : undefined;

  styles.useVariants({
    align,
    justify,
  });

  return (
    <View
      {...rest}
      style={[
        styles.wrapper,
        rest.style,
        { margin: theme.space[spacing] / -2 },
      ]}
      onLayout={(e: LayoutChangeEvent) => setWidth(e.nativeEvent.layout.width)}
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
    </View>
  );
}

const styles = StyleSheet.create(() => ({
  wrapper: {
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
  },
}));
