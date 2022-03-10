import { css } from "@emotion/css";
import { useEffect, useMemo, useRef } from "react";
import type { BlockWithId as BlockType } from "type";
import useBlocksStore from "./useBlocksStore";
import useDeletionStore from "./useDeletionStore";

const controlPointSize = 4;

const controls = [
  [
    ["left", "top"],
    ["center", "top"],
    ["right", "top"],
  ],
  [
    ["left", "center"],
    ["center", "center"],
    ["right", "center"],
  ],
  [
    ["left", "bottom"],
    ["center", "bottom"],
    ["right", "bottom"],
  ],
];

const cssIndex = css`
  --padding: 4px;
  --size: 24px;
  position: absolute;
  box-sizing: border-box;
  top: var(--padding);
  left: var(--padding);
  background: rgba(255, 255, 255, 0.8);
  color: #000;
  border-radius: calc(var(--size) / 2);
  padding: 0.2em;
  height: var(--size);
  min-width: var(--size);
  font-size: 0.8em;
  display: flex;
  align-items: center;
  justify-content: center;
  white-space: nowrap;
  pointer-events: none;
`;

export type BlockProps = BlockType & {
  index: number;
};

export default function Block({ x, y, height, width, id, index }: BlockProps) {
  const blockRef = useRef<null | HTMLDivElement>(null);
  const { deletion, setDeletion } = useDeletionStore(
    ({ deletion, setDeletion }) => ({ deletion, setDeletion })
  );
  const showDeletion = useMemo(
    () => deletion?.el === blockRef.current,
    [deletion?.el]
  );
  const { addBlock, removeBlock } = useBlocksStore(
    ({ addBlock, removeBlock }) => ({ addBlock, removeBlock })
  );
  const color = useMemo(
    () => (showDeletion ? "#FF4136" : "#0074D9"),
    [showDeletion]
  );
  useEffect(() => {
    const el = blockRef.current;
    if (!el) return;
    addBlock({ el, id });
    return () => {
      removeBlock(id);
    };
  }, [addBlock, id, removeBlock]);
  // auto focus on new block
  useEffect(() => {
    const el = blockRef.current;
    if (!el) return;
    el.focus();
  }, []);
  return (
    <>
      <div
        ref={blockRef}
        className={css`
          position: absolute;
          top: ${y}px;
          left: ${x}px;
          height: ${height}px;
          width: ${width}px;
          border: 1px solid ${color};
          box-sizing: border-box;
          overflow: hidden;
          z-index: ${showDeletion ? 1 : 0};
          outline: none;
        `}
        {...{
          tabIndex: 0,
          onFocus: () => {
            let el = blockRef.current;
            if (!el) return;
            setDeletion({
              id,
              el,
            });
          },
        }}
      >
        {typeof index === "number" && (
          <div className={cssIndex}>{index + 1}</div>
        )}
      </div>
      {controls.flat().map(([horizon, vertical], i) =>
        (horizon === "center" && vertical === "center") ||
        (horizon === "center" && width < controlPointSize * 2 + 2) ||
        (vertical === "center" && height < controlPointSize * 2 + 2) ? null : (
          <div
            key={i}
            className={css`
              position: absolute;
              left: ${horizon === "left"
                ? x - controlPointSize / 2
                : horizon === "center"
                ? x + (width - controlPointSize) / 2
                : x + width - controlPointSize / 2}px;
              top: ${vertical === "top"
                ? y - controlPointSize / 2
                : vertical === "center"
                ? y + (height - controlPointSize) / 2
                : y + height - controlPointSize / 2}px;
              height: ${controlPointSize}px;
              width: ${controlPointSize}px;
              background-color: ${color};
            `}
          />
        )
      )}
    </>
  );
}
