import React, { useState, useEffect } from "react";
import './ImageUploader.css';
import useDebounce from "./useDebounce";

import MultiCrops from 'react-multi-crops'

// type coodiantesRes = {
// 	top:number,
// 	left:number,
// 	width:number,
// 	height:number
// }

function ImageUploader({coodiantesData}:{
	coodiantesData:any
}) {
	const [image, setImage] = useState<any>();
	const [coordinates, setCoordinates] = useState([]);
	const [resultDebounce, setResultDebounce] = useDebounce<any>([], 500);
    const ImageChangeHandler = (e:React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            setImage(e.target.files[0]);
        }
    }

	useEffect(() => {
		coodiantesData(resultDebounce);
	}, [resultDebounce, coodiantesData]);

	const changeCoordinate = (coordinate:any, index:any, coordinates:any) => {
		setCoordinates(coordinates);
		setResultDebounce(coordinates);
	}

	const deleteCoordinate = (coordinate:any, index:any, coordinates:any) => {
		setCoordinates(coordinates);
		setResultDebounce(coordinates);
	}

    return (
        <>  
			<div id="uploader">
				<div className="image_frame">
					{image && (
						<MultiCrops
							src={URL.createObjectURL(image)}
							width={350}
							coordinates={coordinates}
							onChange={changeCoordinate}
							onDelete={deleteCoordinate}
							/>
					)}
				</div>
				<div>
					<input type="file" name="file" id="file" className="input-file"  accept="image/*" onChange={ImageChangeHandler}/>
					<label htmlFor="file" className="btn uploadBtn labelFile">
						<span className="fileName">Choose a file</span>
					</label>
                </div>
			</div>
        </>
    )
};

export default ImageUploader;