import { Children, Fragment, ReactElement, ReactNode } from 'react';

type ReactChildArray = ReturnType<typeof Children.toArray>;

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
