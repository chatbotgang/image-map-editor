import React, { useState } from 'react'
import { Box } from '../hooks/useImg'
import styled from 'styled-components'

const SelectedBlock = styled.div`
    position: absolute;
`

const DragBox = (props:{boxes:Box[], handleDrag:(e:any)=>void, handleMove:(e:any)=>void}) => {
    
    const [ focus, setFocus ] = useState(false)

    return (
        <>
            {props.boxes.length>0?(
                props.boxes.map((box:Box, index:number)=>
                    <SelectedBlock  style={{"width":box.width, 
                                            "height":box.height, 
                                            "left": box.x, 
                                            "top":box.y,
                                            "zIndex":index+2,
                                            "border": focus?'1px solid red':'1px solid blue'}}
                                    onMouseDown={e=>props.handleDrag(e)}
                                    onMouseMove={e=>props.handleMove(e)}
                                    onMouseUp={e=>props.handleDrag(e)}
                                    onClick={e=>console.log("onFocus", index)}
                                    onBlur={e=>console.log("onBlur", index)} />)
            ) : <></> }
        </>
    )
}

export default DragBox