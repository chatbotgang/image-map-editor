import React, { useState } from "react";
import useDrag from "./useDrag";
import './ImageUploader.css';

function ImageUploader() {
	const [image, setImage] = useState<any>();
    const ImageChangeHandler = (e:React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            setImage(e.target.files[0]);
        }
    }

	const useDragProps = useDrag();

    const styles = {
        container: {
          width: 350,
        } as React.CSSProperties,
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
                            style={styles.container}
							className="non_draggable_image"
                            alt="Thumb"
                        />
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