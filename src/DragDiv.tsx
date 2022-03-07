import React from "react";

let style = {
    margin: '2px 2px',
    border: '1px solid black',
    position: 'absolute',
}as React.CSSProperties;

type dragDiv = {
    top:number,
    left:number,
    width:number,
    height:number
}

function DragDiv({...props}:dragDiv) {
    let divProps = {...style ,...props} 
    return (
        <>
            <div style={divProps}></div>
        </>
    )
}

export default DragDiv;