


export interface coordinateType {
  x: number,
  y: number,
  width: number,
  height: number,
  scaleX: number,
  scaleY: number
}

export interface cropType {
  unit?: "px" | "%" | undefined,
  x?: number,
  y?: number,
  width?: number,
  height?: number,
  aspect?: number
}
