import { useRef, useEffect, useState, useCallback, useContext } from "react"
import { useMouse } from "react-use"
import Rectangle from "./components/Rectangle"
import _isEqual from "lodash/isEqual"
import { ContextStore } from "pages/Main/context/useContext"
import getStyleByPosition from "pages/Main/utils/getStyleByPosition"
import { Container } from "./components/styledComponents"

export default function PlayGround() {
  const ref = useRef(null)
  const { elX, elY, elW, elH } = useMouse(ref)
  const context = useContext(ContextStore)
  const [newPosition, setNewPosition] = useState<{ x: number; y: number }[]>([])

  const getValidPosition = useCallback(() => {
    let validPosition = { x: elX, y: elY }
    if (elX < 0 || elX > elW) {
      validPosition.x = elX < 0 ? 0 : elW
    }
    if (elY < 0 || elY > elH) {
      validPosition.y = elY < 0 ? 0 : elH
    }

    return validPosition
  }, [elX, elY, elW, elH])

  const handleMouseUp = useCallback(() => {
    if (newPosition.length !== 0 && !_isEqual(newPosition[0], newPosition[1])) {
      const newRectangle = getStyleByPosition(newPosition)
      console.log({ newPosition, newRectangle })
      context?.setRectangleList(state => [...state, newRectangle])
    }
    setNewPosition([])
  }, [newPosition, context])

  const handleMouseMove = useCallback(() => {
    if (newPosition.length !== 0) {
      const position = getValidPosition()
      setNewPosition(state => {
        state[1] = position
        return [...state]
      })
    }
  }, [newPosition, getValidPosition])

  useEffect(() => {
    window.addEventListener("mouseup", handleMouseUp)
    window.addEventListener("mousemove", handleMouseMove)
    return () => {
      window.removeEventListener("mouseup", handleMouseUp)
      window.removeEventListener("mousemove", handleMouseMove)
    }
  }, [handleMouseUp, handleMouseMove])

  return (
    <Container
      ref={ref}
      onMouseDown={e => {
        if (e.button === 0) {
          const position = getValidPosition()
          setNewPosition([position, position])
        }
      }}
    >
      {context?.rectangleList.map((rectangle, rectangleIndex) => (
        <Rectangle key={rectangleIndex} style={rectangle} num={rectangleIndex} />
      ))}
      {newPosition.length > 0 && <Rectangle style={getStyleByPosition(newPosition)} />}
    </Container>
  )
}
