import React, {useRef, useState} from 'react'
import styled from 'styled-components'

type ImagePaneProps = {
  className?: string
}

const ImagePaneJSX = ({className}: ImagePaneProps) => {
  const inputRef = useRef<HTMLInputElement>(null)
  const imageRef = useRef<HTMLImageElement>(null)
  const [isUploaded, setIsUploaded] = useState(false)

  const fileUploadHandler = () => {
    const image = inputRef.current!.files![0]!
    const url = URL.createObjectURL(image)
    imageRef.current!.src = url
    setIsUploaded(true)
  }

  return (<main className={className}>
    <header className="header">
      <div className="circle"></div>
    </header>
    
    <section className="content">
      <label 
        htmlFor="file-input" 
        className={`label ${isUploaded ? 'hidden' : ''}`}
      >
        Upload image
      </label>

      <img className="image" ref={imageRef} src="" alt="" />

      <input 
        className="file-input"
        type="file" 
        accept="image/*" 
        id="file-input" 
        onChange={fileUploadHandler}
        ref={inputRef}
        />
    </section>
  </main>)
}

const ImagePane = styled(ImagePaneJSX)`
  width: 433px;
  min-height: 792px;
  outline: 1px solid black;
  background-color: gray;

  .header {
    height: 56px;
    padding: 16px 39px;
    outline: 1px solid black;
  }

  .circle {
    width: 24px;
    height: 24px;

    border-radius: 50%;
    background-color: white;
  }

  .content {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    padding-top: 56px;
  }

  .label {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 355px;
    height: 156px;
    outline: 1px solid gray;
    border-radius: 5px;
    background-color: white;
  }

  .image {
    width: 355px;
  }

  .file-input {
    display: none;
  }

  .hidden {
    display: none;
  }
`

export default ImagePane