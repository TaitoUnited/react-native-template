import { useEffect, useLayoutEffect, useRef, useState } from 'react';

export function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export function truncate(str: string, len: number) {
  if (str.length > len) return `${str.substring(0, len - 3)}...`;
  return str;
}

type RGB = {
  r: number;
  g: number;
  b: number;
};

export function hexToRgb(hex: string): RGB | null {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16),
      }
    : null;
}

export function usePrevious<T>(state: T): T | undefined {
  const ref = useRef<T>();

  useEffect(() => {
    ref.current = state;
  });

  return ref.current;
}

export function useFirstMountState(): boolean {
  const isFirst = useRef(true);

  if (isFirst.current) {
    isFirst.current = false;
    return true;
  }

  return isFirst.current;
}

export function usePreviousDistinct<T>(value: T): T | undefined {
  const prevRef = useRef<T>();
  const curRef = useRef<T>(value);
  const isFirstMount = useFirstMountState();

  if (!isFirstMount && curRef.current !== value) {
    prevRef.current = curRef.current;
    curRef.current = value;
  }

  return prevRef.current;
}

export function useDebouncedValue(value: string, delayMs: number) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delayMs);

    return () => {
      clearTimeout(handler);
    };
  }, [value]); // eslint-disable-line

  return debouncedValue;
}

// https://usehooks-ts.com/react-hook/use-interval
export function useInterval(callback: () => void, delay: number | null) {
  const savedCallback = useRef(callback);

  useLayoutEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  useEffect(() => {
    if (!delay && delay !== 0) return;
    const id = setInterval(() => savedCallback.current(), delay);
    return () => clearInterval(id);
  }, [delay]);
}

export function nullifyFields<T extends object>(obj: T) {
  const newObj: any = { ...obj };

  for (const key in newObj) {
    if (newObj[key] === undefined) {
      newObj[key] = null;
    }
  }

  return newObj as { [key in keyof T]-?: T[key] | null };
}
