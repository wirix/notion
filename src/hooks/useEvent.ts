import { useCallback, useLayoutEffect, useRef } from 'react';

interface EventFunction {
  (...args: any[]): void;
}

export const useEvent = <T extends EventFunction>(fn: T) => {
  const fnRef = useRef(fn);

  useLayoutEffect(() => {
    fnRef.current = fn;
  }, [fn]);

  const eventCb = useCallback(
    (...args: unknown[]) => {
      return fnRef.current.apply(null, args);
    },
    [fnRef],
  );

  return eventCb as unknown as T;
};
