import create from "zustand";

const useHeightStore = create<{
  height: number;
  setHeight: (height: number) => void;
}>((set) => ({
  height: 0,
  setHeight: (height: number) => set({ height }),
}));

export default useHeightStore;
