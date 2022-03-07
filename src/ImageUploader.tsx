import React, { useState } from "react";
import useDrag from "./useDrag";
import './ImageUploader.css';
import DragDiv from "./DragDiv";

function ImageUploader() {
	const [image, setImage] = useState<any>();
    const ImageChangeHandler = (e:React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            setImage(e.target.files[0]);
        }
    }

	const useDragProps = useDrag();

    const styles = {
        imgContainer: {
          width: 350,
          position: 'relative'
        } as React.CSSProperties,
        imgPic: {
            with:'100%'
        } as React.CSSProperties,
    };

    const TestdivSet = [
        {
            top:100,
            left:100,
            width:50,
            height:50
        },
        {
            top:200,
            left:200,
            width:50,
            height:50
        }
    ]

    type dragDiv = {
        top:number,
        left:number,
        width:number,
        height:number
    }

    const createImages = function (divSet:dragDiv[]) {
        return divSet.map(({...data}:dragDiv) => {
            return (<DragDiv {...data} />)
        });
    };
    

    return (
        <>
            <div>
                <div className="upload-btn-wrapper">
                    <button className="btn uploadBtn">Upload a file</button>
                    <input type="file" accept="image/*" name="editSource" onChange={ImageChangeHandler} />
                </div>
                {image && (
                    <div {...useDragProps}>
                        <img
                            src={URL.createObjectURL(image)}
                            style={styles.imgContainer}
							className="non_draggable_image"
                            alt="uploadPicture"
                        />
                        {createImages(TestdivSet)}
                        {/* <button onClick={removeSelectedImage} style={styles.delete}>
                        Remove This Image
                        </button> */}
                    </div>
                )}
            </div>
        </>
    )
};

export default ImageUploader;