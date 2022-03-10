import type { RefObject } from "react";
import { createContext, useContext } from "react";

const CanvasRefContext = createContext<RefObject<HTMLDivElement | null>>({
  current: null,
});

export const CanvasRefContextProvider = CanvasRefContext.Provider;

const useCanvasRef = () => useContext(CanvasRefContext);

export default useCanvasRef;
