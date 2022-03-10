import { css } from "@emotion/css";
import { flip, shift, useFloating } from "@floating-ui/react-dom";
import Trash from "icon/phosphor/Trash";
import { useEffect } from "react";
import useStore from "useStore";
import useDeletionStore from "./useDeletionStore";

const cssButtonBlock = css`
  padding: 0 8px;
  box-sizing: border-box;
  --size: 36px;
  & button {
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 8px;
    border: none;
    background: #fff;
    color: #aaaaaa;
    height: var(--size);
    width: var(--size);
    font-size: 2em;
    cursor: pointer;
    box-shadow: rgba(0, 0, 0, 0.2) 0px 1px 3px;
  }
`;

export default function DeleteButton() {
  const { deletion, clearDeletion } = useDeletionStore(
    ({ deletion, clearDeletion }) => ({ deletion, clearDeletion })
  );
  const { blocks, deleteBlock } = useStore(({ blocks, deleteBlock }) => ({
    blocks,
    deleteBlock,
  }));

  const { x, y, reference, floating, strategy } = useFloating({
    placement: "right-start",
    middleware: [shift(), flip()],
  });
  useEffect(() => {
    if (!deletion) {
      return;
    }
    reference(deletion.el);
  }, [deletion, reference]);
  return !deletion ||
    !blocks.map(({ id }) => id).includes(deletion.id) ? null : (
    <div
      key={deletion.id}
      ref={floating}
      style={{
        position: strategy,
        top: y ?? "",
        left: x ?? "",
      }}
      className={cssButtonBlock}
    >
      <button
        onClick={() => {
          deleteBlock(deletion.id);
          clearDeletion();
        }}
      >
        <Trash />
      </button>
    </div>
  );
}
