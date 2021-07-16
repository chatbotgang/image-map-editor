import _min from "lodash/min"
import { RecType, CoordinateListType } from "pages/Main/types/defaultTypes"

const getDotPosition = ({ width, height, x, y }: RecType) => {
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

export default function getStyleByPosition(position: CoordinateListType) {
  const width = Math.abs(position[0]?.x - position[1]?.x)
  const height = Math.abs(position[0]?.y - position[1]?.y)
  const x = _min([position[0]?.x, position[1]?.x]) || 0
  const y = _min([position[0]?.y, position[1]?.y]) || 0

  const dotList = getDotPosition({ width, height, x, y })

  return { rec: { width, height, x, y }, dots: dotList }
}
