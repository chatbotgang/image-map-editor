import _min from "lodash/min"

type Props = {
  width: number
  height: number
  top: number
  left: number
}

const getDotPosition = ({ width, height, top, left }: Props) => {
  const halfWidth = width / 2
  const halfHeight = height / 2
  const midTop = top + halfHeight
  const midLeft = left + halfWidth
  const endTop = top + height
  const endLeft = left + width

  return [
    { left, top },
    { left: midLeft, top },
    { left: endLeft, top },
    { left, top: midTop },
    { left: endLeft, top: midTop },
    { left, top: endTop },
    { left: midLeft, top: endTop },
    { left: endLeft, top: endTop }
  ]
}

export default function getStyleByPosition(position: { x: number; y: number }[]) {
  const width = Math.abs(position[0]?.x - position[1]?.x)
  const height = Math.abs(position[0]?.y - position[1]?.y)
  const top = _min([position[0]?.y, position[1]?.y]) || 0
  const left = _min([position[0]?.x, position[1]?.x]) || 0

  const dotList = getDotPosition({ width, height, top, left })

  return { rec: { width, height, top, left }, dots: dotList }
}
