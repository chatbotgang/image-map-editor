import create from "zustand";

interface Block {
  id: string;
  el: HTMLDivElement;
}

const useBlocksStore = create<{
  blocks: Block[];
  addBlock: (block: Block) => void;
  removeBlock: (blockId: string) => void;
}>((set) => ({
  blocks: [],
  addBlock: (block) => {
    set((state) => ({
      blocks: [...state.blocks, block],
    }));
  },
  removeBlock: (blockId) => {
    set((state) => {
      return {
        blocks: state.blocks.filter((target) => target.id !== blockId),
      };
    });
  },
}));

export default useBlocksStore;
