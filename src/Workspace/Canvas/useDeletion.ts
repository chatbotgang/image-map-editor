import { useCallback, useEffect } from "react";
import useBlocksStore from "./useBlocksStore";
import useCanvasRef from "./useCanvasRef";
import useDeletionStore from "./useDeletionStore";

export default function useDeletion(active: boolean) {
  const canvasRef = useCanvasRef();
  const blocks = useBlocksStore(({ blocks }) => blocks);
  const { setDeletion, clearDeletion } = useDeletionStore(
    ({ setDeletion, clearDeletion }) => ({ setDeletion, clearDeletion })
  );
  const deletionHandler = useCallback(
    (e: MouseEvent) => {
      const canvasEl = canvasRef.current;
      if (!canvasEl) return;
      const el: unknown = e.target;
      if (!el) return;
      if (!active || (el !== canvasEl && !canvasEl?.contains(el as Node))) {
        clearDeletion();
        return;
      }
      if (!(el instanceof HTMLDivElement)) return;
      const targetBlock = blocks.find((target) => target.el === el);
      if (!targetBlock) return;
      setDeletion(targetBlock);
    },
    [active, blocks, canvasRef, clearDeletion, setDeletion]
  );
  useEffect(() => {
    document.addEventListener("mousemove", deletionHandler, true);
    return () => {
      document.removeEventListener("mousemove", deletionHandler, true);
    };
  }, [deletionHandler]);
}
