import React, { useState, useEffect, useContext, FunctionComponent } from 'react'

export interface Box{
    x: number
    y: number
    width?: number
    height?: number
}

const deepCopyABoxes = (Boxes:Array<Box>) => {
    let copyBoxes:Array<Box> = []
    Boxes.map(box=>{copyBoxes.push(box)})
    return copyBoxes
}

const adjustBox = (box:Box, e: MouseEvent) => {
    box.width = e.pageX-box.x
    box.height = e.pageY-box.y

    if(e.pageX < box.x){
        box.width *= -1
        box.x = e.pageX
        console.log("useImg.adjustBox.now<x")
    }

    if(e.pageY < box.y){
        box.height *= -1
        box.y = e.pageY
        console.log("useImg.adjustBox.now<y")
    }

    return box
}

const Context:React.Context<any>  = React.createContext({} as any)

export const useImg = () => {
    return useContext(Context)
}

export const ImgProvider = ({children} : any) => {

    const [ img, setImg ] = useState("../components/IMG_5808.JPG")
    const [ boxes, setBoxes ] = useState<Array<Box>>([])

    const addBoxes = (e: MouseEvent) => {
        const newBox:Box = { x:e.pageX, y:e.pageY }
        let newList:Array<Box> = []

        if(boxes){
            boxes.map((item:Box)=>newList.push(item))
        }

        newList.push(newBox)
        setBoxes(newList)
        console.log("in useImg, addBoxes:", boxes)

    }

    const saveBoxes = (e: MouseEvent) => {
        if(boxes.length!==0){
            let copyBoxes = deepCopyABoxes(boxes)
            let box = { ...copyBoxes[boxes.length-1]}
            // box.width = e.pageX-box.x
            // box.height = e.pageY-box.y
            box = adjustBox(box, e)
            copyBoxes[boxes.length-1] = box
            setBoxes(copyBoxes)

            console.log("in useImg, saveBoxes: ", copyBoxes, boxes, box, e)
        }else{
            console.log("in useImg, saveBoxes, there is no boxes")
        }
    }

    const value = {
        img,
        boxes,
        setBoxes,
        addBoxes,
        saveBoxes,
    }

    return(
        <Context.Provider value={value}>
            {children}
        </Context.Provider>
    )
}



