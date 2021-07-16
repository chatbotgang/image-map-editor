import { useContext, useMemo } from "react"
import { Wrapper, Container, StartEnd, Result } from "./components/styledComponents"
import { ContextStore } from "pages/Main/context/useContext"
import _get from "lodash/get"

const DATA_MAP_LIST = [
  { name: "x", key: "left" },
  { name: "y", key: "top" },
  { name: "width", key: "width" },
  { name: "height", key: "height" }
]

const LAST_DATA_INDEX = DATA_MAP_LIST.length - 1

export default function DataDisplay() {
  const context = useContext(ContextStore)

  const result = useMemo(() => {
    const lastRectangle = context?.rectangleList.length ? context?.rectangleList.length - 1 : 0
    return context?.rectangleList.map((rectangle, rectangleIndex) => {
      const isLastRectangle = lastRectangle === rectangleIndex
      return DATA_MAP_LIST.map((data, dataIndex) => {
        if (LAST_DATA_INDEX !== dataIndex) {
          return <div key={dataIndex}>{`"${data.name}": ${_get(rectangle.rec, data.key)}, `}</div>
        }

        return (
          <div key={dataIndex}>
            {`"${data.name}": ${_get(rectangle.rec, data.key)}`}
            {!isLastRectangle && <div>{`},{`}</div>}
          </div>
        )
      })
    })
  }, [context?.rectangleList])

  const showResult = useMemo(() => result && result.length > 0, [result])

  return (
    <Wrapper>
      {showResult && (
        <Container>
          <StartEnd>
            <div>{`[{`}</div>
            <div>{`}]`}</div>
          </StartEnd>
          <Result>{result}</Result>
        </Container>
      )}
    </Wrapper>
  )
}
