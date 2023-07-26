import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from 'react';

export function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export function truncate(str: string, len: number) {
  if (str.length > len) return `${str.substring(0, len - 3)}...`;
  return str;
}

export function useFirstMountState(): boolean {
  const isFirst = useRef(true);

  if (isFirst.current) {
    isFirst.current = false;
    return true;
  }

  return isFirst.current;
}

export function usePrevious<T>(state: T): T | undefined {
  const ref = useRef<T>();

  useEffect(() => {
    ref.current = state;
  });

  return ref.current;
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

// Userland version of upcoming official `useEffectEvent` React hook:
// RFC: https://github.com/reactjs/rfcs/blob/useEffectEvent/text/0000-useEffectEvent.md
export function useEffectEvent<T extends (...args: any[]) => any>(handler: T) {
  const handlerRef = useRef<T>();

  useLayoutEffect(() => {
    handlerRef.current = handler;
  });

  return useCallback((...args: any[]) => {
    const fn = handlerRef.current;
    return fn?.(...args);
  }, []);
}
