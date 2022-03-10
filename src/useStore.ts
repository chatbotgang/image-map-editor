import create from "zustand";
import type { BlockWithId } from "./type";

const useStore = create<{
  img: null | string;
  setImg: (img: string) => void;
  blocks: BlockWithId[];
  pushBlock: (block: BlockWithId) => void;
  deleteBlock: (blockId: string) => void;
  reset: () => void;
}>((set) => ({
  img: null,
  setImg: (img: string) => set({ img }),
  blocks: [],
  pushBlock: (block) => set((state) => ({ blocks: [...state.blocks, block] })),
  deleteBlock: (blockId) =>
    set((state) => ({
      blocks: state.blocks.filter((block) => block.id !== blockId),
    })),
  reset: () =>
    set({
      img: null,
      blocks: [],
    }),
}));

export default useStore;
