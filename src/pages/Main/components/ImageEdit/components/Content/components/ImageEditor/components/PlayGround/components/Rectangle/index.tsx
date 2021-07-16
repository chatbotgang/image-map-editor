import { useMemo, useContext } from "react"
import { DeleteOutlined } from "@ant-design/icons"
import { ContextStore } from "pages/Main/context/useContext"
import { Border, Dot, Num, DeleteButton } from "./components/styledComponents"

const MIN_RECT_SIZE = 24

type Props = {
  style: { rec: { width: number; height: number; top: number; left: number }; dots: { left: number; top: number }[] }
  num?: number
}

export default function Rectangle({ style, num }: Props) {
  const context = useContext(ContextStore)

  const isTooSmall = useMemo(() => {
    const { width, height } = style.rec
    return width < MIN_RECT_SIZE || height < MIN_RECT_SIZE
  }, [style])

  return (
    <>
      <Border style={{ ...style.rec }}>{num !== undefined && <Num isOut={isTooSmall}>{num + 1}</Num>}</Border>
      {style.dots.map((dot, i) => (
        <Dot style={{ ...dot }} key={i} />
      ))}
      {num !== undefined && style.rec.left !== undefined && (
        <DeleteButton
          style={{ left: style.rec.left + style.rec.width + 10, top: style.rec.top }}
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
