import { Children, Fragment } from 'react';

type ReactChildArray = ReturnType<typeof Children.toArray>;

export function flattenChildren(children: React.ReactNode): ReactChildArray {
  const childrenArray = Children.toArray(children);
  return childrenArray.reduce((flatChildren: ReactChildArray, child) => {
    if ((child as React.ReactElement<any>).type === Fragment) {
      return flatChildren.concat(
        flattenChildren((child as React.ReactElement<any>).props.children),
      );
    }
    flatChildren.push(child);
    return flatChildren;
  }, []);
}

export const capitalize = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

export const range = (n: number) => Array.from({ length: n }, (x, i) => i);
