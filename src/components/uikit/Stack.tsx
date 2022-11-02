import {
  Children,
  cloneElement,
  Fragment,
  isValidElement,
  ReactElement,
  ReactNode,
} from 'react';

import { ViewStyle } from 'react-native';

import { Spacer } from './Spacer';
import { styled, Theme } from '~styles';

type Props = {
  spacing: keyof Theme['space'];
  axis?: 'x' | 'y';
  align?: 'center' | 'start' | 'end' | 'stretch';
  justify?: 'center' | 'start' | 'end' | 'between' | 'around';
  style?: ViewStyle;
  debug?: boolean;
  children: ReactNode;
};

export function Stack({
  children,
  axis,
  spacing,
  align,
  justify,
  debug,
  ...rest
}: Props) {
  // Handle `Fragments` by flattening children
  const elements = flattenChildren(children).filter((e) => isValidElement(e));

  const lastIndex = Children.count(elements) - 1;

  return (
    <StyledStack axis={axis} align={align} justify={justify} {...rest}>
      {elements.map((child, index) => {
        if (!isValidElement(child)) return null;

        const isSpacer = (child as any).type.__SPACER__;

        // Just return spacers as is so that they can override the default spacing
        if (isSpacer) return cloneElement(child);

        const isLast = index === lastIndex;
        const nextElement = isLast ? null : (elements[index + 1] as any);
        const isNextSpacer = nextElement && nextElement.type.__SPACER__;
        const shouldAddSpacing = !isLast && !isNextSpacer;

        return (
          <Fragment key={index}>
            {cloneElement(child)}
            {shouldAddSpacing && (
              <Spacer axis={axis} size={spacing} debug={debug} />
            )}
          </Fragment>
        );
      })}
    </StyledStack>
  );
}

const StyledStack = styled('View', {
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

// Helpers ---------------------------------------------------------------------

type ReactChildArray = ReturnType<typeof Children.toArray>;

function flattenChildren(children: ReactNode): ReactChildArray {
  const childrenArray = Children.toArray(children);
  return childrenArray.reduce((flatChildren: ReactChildArray, child) => {
    if ((child as ReactElement<any>).type === Fragment) {
      return flatChildren.concat(
        flattenChildren((child as ReactElement<any>).props.children)
      );
    }
    flatChildren.push(child);
    return flatChildren;
  }, []);
}
