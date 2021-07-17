import _min from "lodash/min"
import { RecType, CoordinateListType } from "pages/Main/types/defaultTypes"
import defaultSettings from "../styles/defaultSettings"

const { dotSize, borderWidth } = defaultSettings.rectangle

const getDotCoordinate = ({ width, height, x, y }: RecType) => {
  const startOffset = (dotSize - borderWidth) / 2
  const midAndEndOffset = (dotSize + borderWidth) / 2

  const halfWidth = width / 2
  const halfHeight = height / 2
  const startX = x - startOffset
  const startY = y - startOffset
  const midY = y + halfHeight - midAndEndOffset
  const midX = x + halfWidth - midAndEndOffset
  const endY = y + height - midAndEndOffset
  const endX = x + width - midAndEndOffset

  return [
    { x: startX, y: startY },
    { x: midX, y: startY },
    { x: endX, y: startY },
    { x: startX, y: midY },
    { x: endX, y: midY },
    { x: startX, y: endY },
    { x: midX, y: endY },
    { x: endX, y: endY }
  ]
}

export default function getStyleByCoordinate(coordinate: CoordinateListType) {
  const width = Math.abs(coordinate[0]?.x - coordinate[1]?.x) || 0
  const height = Math.abs(coordinate[0]?.y - coordinate[1]?.y) || 0
  const x = _min([coordinate[0]?.x, coordinate[1]?.x]) || 0
  const y = _min([coordinate[0]?.y, coordinate[1]?.y]) || 0

  const dotList = getDotCoordinate({ width, height, x, y })

  return { rec: { width, height, x, y }, dots: dotList }
}
