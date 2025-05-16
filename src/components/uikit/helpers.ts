/* eslint-disable typescript-eslint/no-explicit-any */
import { Children, Fragment, type ReactElement, type ReactNode } from 'react';

type ReactChildArray = ReturnType<typeof Children.toArray>;

/** Reference of this function: https://github.com/gregberge/react-flatten-children/blob/master/src/index.tsx */
export function flattenChildren(children: ReactNode): ReactChildArray {
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
