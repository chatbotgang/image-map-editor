import { useMemo, useContext } from "react"
import { DeleteOutlined } from "@ant-design/icons"
import { ContextStore } from "pages/Main/context/useContext"
import { Border, Dot, Num, DeleteButton } from "./components/styledComponents"

const MIN_RECT_SIZE = 24

type Props = {
  style: { rec: { width: number; height: number; x: number; y: number }; dots: { x: number; y: number }[] }
  num?: number
}

export default function Rectangle({ style, num }: Props) {
  const context = useContext(ContextStore)

  const { rec, dots } = useMemo(() => style, [style])

  const isTooSmall = useMemo(() => {
    const { width, height } = rec
    return width < MIN_RECT_SIZE || height < MIN_RECT_SIZE
  }, [rec])

  return (
    <>
      <Border style={{ width: rec.width, height: rec.height, left: rec.x, top: rec.y }}>{num !== undefined && <Num isOut={isTooSmall}>{num + 1}</Num>}</Border>
      {dots.map((dot, dotIndex) => (
        <Dot style={{ left: dot.x, top: dot.y }} key={dotIndex} />
      ))}
      {num !== undefined && rec.x !== undefined && (
        <DeleteButton
          style={{ left: rec.x + rec.width + 10, top: rec.y }}
          onClick={() => {
            context?.removeRectangle(num)
          }}
        >
          <DeleteOutlined />
        </DeleteButton>
      )}
    </>
  )
}
