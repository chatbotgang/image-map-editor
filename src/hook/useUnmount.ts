import { useEffect } from "react";

/**
 * Dangerous hooks break dependencies.
 */
export default function useUnmount(fn: () => void) {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(fn, []);
}
