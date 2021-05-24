import React, { useState } from 'react'
import styled from 'styled-components'
import { Layout, Upload, Image } from 'antd'
import 'antd/dist/antd.css';
import { useImg } from '../hooks/useImg'
import DragBox from './DragBox'

const { Content } = Layout

const StyledContent = styled(Content)`
    display: flex;
    width: 100%;
    justify-content: center;
    border: 1px solid black;
`

const StyledImageDiv = styled.div`
    width:355px;
    height: auto;
    background-color:gainsboro;
    z-index: 1;
`

const StyledDragBox = styled(DragBox)`
    position: absolute;
`

const ImgContent = () => {

    const [ defaultImg, setDefaultImg ] = useState(true)
    const { img, boxes, addBoxes, saveBoxes } = useImg()
    let isDraging = false;

    const handleDrag = async(e:any) => {
        if(e.type === "mousedown"){
            isDraging = true
            await addBoxes(e)
            console.log("in ImgContent,  mouseDown, ", isDraging, e, boxes)
        }else if(e.type === "mouseup"){
            isDraging = false
            await saveBoxes(e)
            console.log("in ImgContent,  mouseUp, ", isDraging, e, boxes)
        }
        return true
    }

    const handleMove = (e:any) => {
        if(isDraging){
            console.log("in handleMove, ", isDraging, e)
        }
    }

    return(
        <StyledContent>
            <StyledImageDiv 
                onMouseDown={e=>handleDrag(e)}
                onMouseMove={e=>handleMove(e)}
                onMouseUp={e=>handleDrag(e)}>
            </StyledImageDiv>       
            {boxes?(<StyledDragBox boxes={boxes} handleDrag={handleDrag} handleMove={handleMove}></StyledDragBox>):<></>}
        </StyledContent>
    )
}

export default ImgContent;