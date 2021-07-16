type CoordinateType = { x: number; y: number }
export type RecType = { width: number; height: number } & CoordinateType
export type CoordinateListType = CoordinateType[]
export type RectangleType = { rec: RecType; dots: CoordinateListType }
