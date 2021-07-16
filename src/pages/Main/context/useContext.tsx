import React, { createContext, useState, useCallback } from "react"

interface MainContextInterface {
  fileBase64: string
  setFileBase64: React.Dispatch<React.SetStateAction<string>>
  positionList: { x: number; y: number }[][]
  setPositionList: React.Dispatch<React.SetStateAction<{ x: number; y: number }[][]>>
  removeRectangle: (index: number) => void
  rectangleList: { rec: { width: number; height: number; top: number; left: number }; dots: { left: number; top: number }[] }[]
  setRectangleList: React.Dispatch<
    React.SetStateAction<{ rec: { width: number; height: number; top: number; left: number }; dots: { left: number; top: number }[] }[]>
  >
  resetRectangleList: () => void
  resetAll: () => void
}

const ContextStore = createContext<MainContextInterface | null>(null)

type Props = {
  children: JSX.Element
}

const ContextProvider = ({ children }: Props) => {
  const [fileBase64, setFileBase64] = useState("")
  const [positionList, setPositionList] = useState<{ x: number; y: number }[][]>([])
  const [rectangleList, setRectangleList] = useState<
    { rec: { width: number; height: number; top: number; left: number }; dots: { left: number; top: number }[] }[]
  >([])

  const removeRectangleByIndex = useCallback(index => {
    setRectangleList(state => state.filter((s, i) => i !== index))
  }, [])

  const resetRectangleList = useCallback(() => {
    setRectangleList([])
  }, [])

  const resetAll = useCallback(() => {
    resetRectangleList()
    setFileBase64("")
  }, [resetRectangleList])

  const GET_CONTEXT = {
    fileBase64,
    setFileBase64,
    positionList,
    setPositionList,
    removeRectangle: removeRectangleByIndex,
    rectangleList,
    setRectangleList,
    resetRectangleList,
    resetAll
  }

  return <ContextStore.Provider value={GET_CONTEXT}>{children}</ContextStore.Provider>
}

export { ContextStore, ContextProvider }
