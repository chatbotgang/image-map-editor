import { css, cx } from "@emotion/css";
import { canvasWidth } from "constant";
import useGetAlive from "hook/useGetAlive";
import throttle from "lodash/throttle";
import {
  ComponentPropsWithoutRef,
  useCallback,
  useMemo,
  useState,
} from "react";
import useStore from "useStore";
import startEndToRect from "util/startEndToRect";
import { v4 } from "uuid";
import Block from "./Block";
import useDeletion from "./useDeletion";
import useHeightStore from "./useHeightStore";

const cssBlocks = css`
  position: absolute;
  cursor: crosshair;
  inset: 0;
`;

export default function Blocks() {
  const getAlive = useGetAlive();
  const { blocks, pushBlock } = useStore(({ blocks, pushBlock }) => ({
    blocks,
    pushBlock,
  }));
  const height = useHeightStore(({ height }) => height);
  const [newBlock, setNewBlock] = useState<null | {
    startX: number;
    startY: number;
    endX: number;
    endY: number;
    id: string;
  }>(null);
  useDeletion(!newBlock);
  const cls = useMemo(
    () =>
      cx(
        cssBlocks,
        css`
          height: ${height}px;
        `
      ),
    [height]
  );
  const onMouseDown = useCallback<
    NonNullable<ComponentPropsWithoutRef<"div">["onMouseDown"]>
  >(
    (e) => {
      const el = e.currentTarget;
      const rect = el.getBoundingClientRect();
      const startX = e.pageX - rect.x - window.scrollX;
      const startY = e.pageY - rect.y - window.scrollY;
      if (newBlock) return;
      const id = v4();
      setNewBlock({
        startX,
        startY,
        endX: startX,
        endY: startY,
        id,
      });
      function end(e: MouseEvent) {
        const rect = el.getBoundingClientRect();
        const x = e.pageX - rect.x - window.scrollX;
        const y = e.pageY - rect.y - window.scrollY;
        document.removeEventListener("mouseup", end, false);
        document.removeEventListener("mousemove", moveHandler, false);
        if (!getAlive()) return;
        setNewBlock(null);
        if (startX === x || startY === y) return;
        pushBlock({
          ...startEndToRect({
            startX,
            startY,
            endX: x < 0 ? 0 : x > canvasWidth ? canvasWidth : x,
            endY: y < 0 ? 0 : y > rect.height ? rect.height : y,
          }),
          id,
        });
      }
      function move(e: MouseEvent) {
        const rect = el.getBoundingClientRect();
        const x = e.pageX - rect.x - window.scrollX;
        const y = e.pageY - rect.y - window.scrollY;
        setNewBlock(
          (newBlock) =>
            newBlock && {
              ...newBlock,
              endX: x < 0 ? 0 : x > canvasWidth ? canvasWidth : x,
              endY: y < 0 ? 0 : y > rect.height ? rect.height : y,
            }
        );
      }
      const throttledMove = throttle(move, 100);
      const moveHandler: typeof move = (e) => {
        if (!getAlive()) return;
        throttledMove(e);
      };
      document.addEventListener("mouseup", end, false);
      document.addEventListener("mousemove", moveHandler, false);
    },
    [getAlive, newBlock, pushBlock]
  );
  return height === 0 ? null : (
    <div className={cls} onMouseDown={onMouseDown}>
      {newBlock && (
        <Block
          {...(() => {
            const { startX, startY, endX, endY, id } = newBlock;
            return {
              ...startEndToRect({ startX, startY, endX, endY }),
              id,
            };
          })()}
          index={blocks.length}
        />
      )}
      {blocks.map((block, index) => (
        <Block key={block.id} index={index} {...block} />
      ))}
    </div>
  );
}
