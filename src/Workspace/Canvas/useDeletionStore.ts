import create from "zustand";

interface Deletion {
  id: string;
  el: HTMLDivElement;
}

const useDeletionStore = create<{
  deletion: Deletion | null;
  setDeletion: (setDeletion: Deletion) => void;
  clearDeletion: () => void;
}>((set) => ({
  deletion: null,
  setDeletion: (deletion) => {
    set({ deletion });
  },
  clearDeletion: () => {
    set({ deletion: null });
  },
}));

export default useDeletionStore;
