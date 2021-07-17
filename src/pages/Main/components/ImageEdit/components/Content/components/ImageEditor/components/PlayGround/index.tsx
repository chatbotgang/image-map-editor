import { useRef, useEffect, useState, useCallback, useContext, useMemo } from "react"
import { useMouse } from "react-use"
import Rectangle from "./components/Rectangle"
import _isEqual from "lodash/isEqual"
import { ContextStore } from "pages/Main/context/useContext"
import getStyleByCoordinate from "pages/Main/utils/getStyleByCoordinate"
import { Container } from "./components/styledComponents"
import { CoordinateListType } from "pages/Main/types/defaultTypes"

export default function PlayGround() {
  const ref = useRef(null)
  const { elX, elY, elW, elH } = useMouse(ref)
  const context = useContext(ContextStore)
  const [newCoordinate, setNewCoordinate] = useState<CoordinateListType>([])

  const getValidCoordinate = useCallback(() => {
    let coordinate = { x: elX, y: elY }
    if (elX < 0 || elX > elW) {
      coordinate.x = elX < 0 ? 0 : elW
    }
    if (elY < 0 || elY > elH) {
      coordinate.y = elY < 0 ? 0 : elH
    }

    return coordinate
  }, [elX, elY, elW, elH])

  const handleMouseUp = useCallback(() => {
    if (newCoordinate.length !== 0 && !_isEqual(newCoordinate[0], newCoordinate[1])) {
      const newRectangle = getStyleByCoordinate(newCoordinate)

      context?.setRectangleList(state => [...state, newRectangle])
    }
    setNewCoordinate([])
  }, [newCoordinate, context])

  const handleMouseMove = useCallback(() => {
    if (newCoordinate.length !== 0) {
      const coordinate = getValidCoordinate()
      setNewCoordinate(state => {
        state[1] = coordinate
        return [...state]
      })
    }
  }, [newCoordinate, getValidCoordinate])

  useEffect(() => {
    window.addEventListener("mouseup", handleMouseUp)
    window.addEventListener("mousemove", handleMouseMove)
    return () => {
      window.removeEventListener("mouseup", handleMouseUp)
      window.removeEventListener("mousemove", handleMouseMove)
    }
  }, [handleMouseUp, handleMouseMove])

  const newRectangle = useMemo(() => newCoordinate.length > 0 && getStyleByCoordinate(newCoordinate), [newCoordinate])

  return (
    <Container
      ref={ref}
      onMouseDown={e => {
        if (e.button === 0) {
          const coordinate = getValidCoordinate()
          setNewCoordinate([coordinate, coordinate])
        }
      }}
    >
      {context?.rectangleList.map((rectangle, rectangleIndex) => (
        <Rectangle key={rectangleIndex} style={rectangle} num={rectangleIndex} />
      ))}
      {newRectangle && <Rectangle style={newRectangle} />}
    </Container>
  )
}
