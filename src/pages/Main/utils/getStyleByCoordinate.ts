import _min from "lodash/min"
import { RecType, CoordinateListType } from "pages/Main/types/defaultTypes"

const getDotCoordinate = ({ width, height, x, y }: RecType) => {
  const halfWidth = width / 2
  const halfHeight = height / 2
  const midY = y + halfHeight
  const midX = x + halfWidth
  const endY = y + height
  const endX = x + width

  return [
    { x, y },
    { x: midX, y },
    { x: endX, y },
    { x, y: midY },
    { x: endX, y: midY },
    { x, y: endY },
    { x: midX, y: endY },
    { x: endX, y: endY }
  ]
}

export default function getStyleByCoordinate(coordinate: CoordinateListType) {
  const width = Math.abs(coordinate[0]?.x - coordinate[1]?.x)
  const height = Math.abs(coordinate[0]?.y - coordinate[1]?.y)
  const x = _min([coordinate[0]?.x, coordinate[1]?.x]) || 0
  const y = _min([coordinate[0]?.y, coordinate[1]?.y]) || 0

  const dotList = getDotCoordinate({ width, height, x, y })

  return { rec: { width, height, x, y }, dots: dotList }
}
