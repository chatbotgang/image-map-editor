// import React, { useState } from "react";
import './ImageEditor.css';
import ImageUploader from "./ImageUploader";
import DragDiv from './DragDiv';

function ImageEditor() {
    const data = [{
       "x":100,
       "Y":100,
       "width":100,
       "height":100 
    }]
    let test = JSON.stringify(data, undefined, 2);
    return (
        <>
            <div>
                <div>
                    <ImageUploader />
                </div>
                <div>
                    <div>
                        <pre id="json">
                            {test}
                        </pre>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ImageEditor;