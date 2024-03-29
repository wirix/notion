import { useCallback, useLayoutEffect, useRef } from 'react';

export const useIsMounted = () => {
  const isMounted = useRef(false);

  useLayoutEffect(() => {
    isMounted.current = true;

    return () => {
      isMounted.current = false;
    };
  });

  return useCallback(() => isMounted.current, []);
};
