import React, { useState } from "react";
import './ImageEditor.css';

function ImageEditor() {
    const [image, setImage] = useState<any>();
    const imageChangeHandler = (e:React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            setImage(e.target.files[0]);
        }
    }

    const styles = {
        container: {
          width: 350,
        } as React.CSSProperties,
    };


    return (
        <>
            <div>
                <div className="upload-btn-wrapper">
                    <button className="btn">Upload a file</button>
                    <input type="file" accept="image/*" name="editSource" onChange={imageChangeHandler} />
                </div>
                {image && (
                    <div>
                        <img
                            src={URL.createObjectURL(image)}
                            style={styles.container}
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
}

export default ImageEditor;