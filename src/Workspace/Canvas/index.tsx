import { css } from "@emotion/css";
import { canvasWidth } from "constant";
import useUnmount from "hook/useUnmount";
import { useSnackbar } from "notistack";
import { useCallback, useRef } from "react";
import useStore from "useStore";
import Blocks from "./Blocks";
import DeleteButton from "./DeleteButton";
import { CanvasRefContextProvider } from "./useCanvasRef";
import useDeletionStore from "./useDeletionStore";
import useHeightStore from "./useHeightStore";

const cssCanvas = css`
  position: relative;
  user-select: none;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  height: fit-content;
`;

const cssImg = css`
  pointer-events: none;
`;

export default function Canvas() {
  const imgRef = useRef<HTMLImageElement | null>(null);
  const { img, reset } = useStore(({ img, reset }) => ({ img, reset }));
  const { height, setHeight } = useHeightStore(({ height, setHeight }) => ({
    height,
    setHeight,
  }));
  const { enqueueSnackbar } = useSnackbar();
  const imgLoadError = useCallback(() => {
    enqueueSnackbar("Failed to load image.", { variant: "error" });
    reset();
  }, [enqueueSnackbar, reset]);
  useUnmount(() => {
    return () => {
      setHeight(0);
    };
  });
  const canvasRef = useRef<HTMLDivElement | null>(null);
  const deletion = useDeletionStore(({ deletion }) => deletion);
  return !img ? null : ( // Never happen in this case. In real production cases I will implement error message here.
    <CanvasRefContextProvider value={canvasRef}>
      <div className={cssCanvas} ref={canvasRef}>
        {height > 0 && <Blocks />}
        <img
          className={cssImg}
          ref={imgRef}
          alt="base"
          src={img}
          width={canvasWidth}
          onLoad={() => {
            if (!imgRef.current) {
              imgLoadError();
              return;
            }
            const rect = imgRef.current.getBoundingClientRect();
            if (rect.height === 0) {
              imgLoadError();
              return;
            }
            setHeight(rect.height);
          }}
          onError={imgLoadError}
        />
        {deletion && <DeleteButton key={deletion.id} />}
      </div>
    </CanvasRefContextProvider>
  );
}
