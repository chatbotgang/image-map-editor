import React, { useState, useRef, useCallback, useEffect } from "react";
import './ImageEditor.css';
import ImageUploader from "./ImageUploader";
interface jsonDataObject {
    x:number,
	y:number,
	width:number,
	height:number,
    id?:number
}

interface jsonDataObjectSet {
    [key: string]: jsonDataObject;
}

function ImageEditor() {
    const [coodiantesData, SetCoodiantesData] = useState(null);
    const [jsonCoodiantesData, SetJsonCoodiantesData] = useState('');
    const coodiantesDataRef = useRef(null);
    const getcoodiantesData = useCallback((data) => {
        SetCoodiantesData(data);
        coodiantesDataRef.current = data;
        // console.log('coodiantesDataRef.current', data);
    }, [coodiantesDataRef]);
    useEffect(()=>{
        const jsonData = (coodiantesSet:Array<jsonDataObjectSet> | null) => {
            if(!coodiantesSet) return;
            let res = [];
            for (let i = 0; i < coodiantesSet.length; i++) {
                let {x,y,width,height} = coodiantesSet[i];
                res.push({x,y,width,height});
            }
            let coodianteString:string = JSON.stringify(res, undefined, 2);
            SetJsonCoodiantesData(coodianteString);
        }
        jsonData(coodiantesData ?? null);
    },[coodiantesData]);


    return (
        <>
            <div className='main-content'>
                <div className='image_editor_wrapper'>
                    <ImageUploader coodiantesData={getcoodiantesData}/>
                    <div>
                        <div>
                            <pre id="json">
                                {jsonCoodiantesData}
                            </pre>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ImageEditor;