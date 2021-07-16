import React, { createContext, useState, useCallback } from "react"
import { RectangleType } from "pages/Main/types/defaultTypes"

interface MainContextInterface {
  fileBase64: string
  setFileBase64: React.Dispatch<React.SetStateAction<string>>
  removeRectangle: (index: number) => void
  rectangleList: RectangleType[]
  setRectangleList: React.Dispatch<React.SetStateAction<RectangleType[]>>
  resetRectangleList: () => void
  resetAll: () => void
}

const ContextStore = createContext<MainContextInterface | null>(null)

type Props = {
  children: JSX.Element
}

const ContextProvider = ({ children }: Props) => {
  const [fileBase64, setFileBase64] = useState("")
  const [rectangleList, setRectangleList] = useState<RectangleType[]>([])

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
    removeRectangle: removeRectangleByIndex,
    rectangleList,
    setRectangleList,
    resetRectangleList,
    resetAll
  }

  return <ContextStore.Provider value={GET_CONTEXT}>{children}</ContextStore.Provider>
}

export { ContextStore, ContextProvider }
