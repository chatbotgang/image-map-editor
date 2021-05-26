import React, { useState, useEffect, useContext } from 'react'

export interface Box{
    x: number
    y: number
    width?: number
    height?: number
}

const Context:React.Context<any>  = React.createContext({} as any)

export const useImg = () => {
    return useContext(Context)
}

export const ImgProvider = ({children} : any) => {
    const [ img, setImg ] = useState<any>()
    const [ boxes, setBoxes ] = useState<Array<Box>>([])
    const [ imgHeight, setImgHeight ] = useState<number>(0)
    const [ rects, setRects ] = useState<Array<any>>([])

    useEffect(() => {
        console.log("in useImg useRffect: ", img)
        if(img){
            let height =  img.naturalHeight / img.naturalWidth * 355
            setImgHeight(height)
            console.log(img.naturalHeight, img.naturalWidth, height)
        }
    }, [img])

    useEffect(() => {
        const newBoxes:Array<Box> = []
        rects.map(aRect=>{newBoxes.push({x: aRect.attrs.x,
                                        y: aRect.attrs.y,
                                        width: aRect.attrs.width,
                                        height: aRect.attrs.height})})
        setBoxes(newBoxes)
    }, [rects])
    
    const addBoxes = (e: MouseEvent) => {
        const newBox:Box = { x:e.pageX, y:e.pageY }
        let newList:Array<Box> = []

        if(boxes){
            boxes.map((item:Box)=>newList.push(item))
        }

        newList.push(newBox)
        setBoxes(newList)
    }

    const value = {
        img,
        setImg,
        boxes,
        setBoxes,
        addBoxes,
        imgHeight,
        rects,
        setRects
    }

    return(
        <Context.Provider value={value}>
            {children}
        </Context.Provider>
    )
}



