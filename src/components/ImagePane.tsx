import React, {useRef} from 'react'
import styled from 'styled-components'

type ImagePaneProps = {
  className?: string
}

const ImagePaneJSX = ({className}: ImagePaneProps) => {
  const inputRef = useRef<HTMLInputElement>(null)
  const imageRef = useRef<HTMLImageElement>(null)

  const fileUploadHandler = () => {
    // console.log('change')
    // const reader = new FileReader()
    // const image = inputRef.current!.files![0]!

    // const url = URL.createObjectURL(image)
    // imageRef.current!.src = url
  }

  return (<main className={className}>
    <header className="header">
      <div className="circle"></div>
    </header>
    <section className="content">
      <label htmlFor="file" className="label">Upload images</label>
      <img ref={imageRef} src="" alt="" />
      <input 
        type="file" 
        accept="image/*" 
        id="file" 
        onChange={fileUploadHandler}
        ref={inputRef}
        />
    </section>
  </main>)
}

const ImagePane = styled(ImagePaneJSX)`
  width: 433px;
  height: 792px;
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
    width: 355px;
    height: 156px;
    outline: 1px solid gray;
    border-radius: 5px;
    background-color: white;
  }
`

export default ImagePane