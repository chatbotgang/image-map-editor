import { useCallback, useEffect, useRef } from "react";

export default function useGetAlive() {
  const ref = useRef(true);
  useEffect(() => {
    return () => {
      ref.current = false;
    };
  }, []);
  const getAlive = useCallback(() => ref.current, []);
  return getAlive;
}
