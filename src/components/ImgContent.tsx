import { useState, useRef, useEffect } from 'react'
import styled from 'styled-components'
import 'antd/dist/antd.css'
import { Layout, Upload } from 'antd'
import { Stage, Layer, Image, Rect } from 'react-konva';
import { useImg } from '../hooks/useImg'
import Konva from 'konva'

const { Dragger } = Upload;
const { Content } = Layout

const StyledContent = styled(Content)`
    display: flex;
    width: 100%;
    justify-content: center;
`

const StyledImageDiv = styled.div`
    margin-top: 35px;
    width: 355px;
    height: auto;
`

const StyledDragger = styled(Dragger)`
    width: 355px;
    height: 156px;
    background-color: black;
`

const ImgContent = () => {
    const { img, setImg, rects, setRects, imgHeight } = useImg()
    const imgRef = useRef<any>()
    const layerRef = useRef<any>()
    const [ layer, setLayer ] = useState<any>()
    const [ stage, setStage ] = useState<any>()

    useEffect(() => {
        initialStage();
    }, []);

    const initialStage = () => {
        const newStage = new (Konva.Stage as any)({container: 'container',})
        const newLayer = new (Konva.Layer as any)()
        setLayer(newLayer)
        newStage.add(newLayer)
        setStage(newStage)
    }

    const loadImage = (file:any) => {
        const newImg = new window.Image()
        newImg.src = './IMG_5808.png';
        newImg.onload = function() { setImg(newImg) }
    }

    const addBox = () => {
        var rect = new Konva.Rect({
                            x: 0,
                            y: 0,
                            width: 100,
                            height: 50,
                            name: 'rect',
                            fill: 'pick',
                            stroke: 'black',
                            strokeWidth: 4,
                        });
        const newStage = new (Konva.Stage as any)({container: 'container',})
        const newLayer = new (Konva.Layer as any)()
        var group = new Konva.Group({
            x: 0,
            y: 0,
            rotation: 0,
          });

        rects.map((aRect:any)=>group.add(aRect))
        group.add(rect)
        newLayer.add(group)
        newStage.add(newLayer)
        
        setRects([...rects, rect])
        setLayer(newLayer)
        setStage(newStage)
    }

    const props = {
        name: 'file',
        multiple: false,
        action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
        onChange(info:any) {
            loadImage(info.file)
        },
        crossOrigin:"Anonymous"
    };

    return(
        <StyledContent>
            <StyledImageDiv >
                <Stage  width={355} 
                        height={img?700:0}
                        stage={stage}
                        onClick={()=>{addBox()}}>
                    <Layer ref={layerRef} layer={layer}>
                        <Image
                            x={0}
                            y={0}
                            image={img}
                            ref={imgRef}
                            width={355}
                            height={imgHeight}
                            keepRatio={true}
                        />
                        <Rect rect={rects[0]} />
                    </Layer>   
                </Stage>
                {
                    img? <></>: (
                        <StyledDragger {...props} >
                        </StyledDragger>
                    )
                }
            </StyledImageDiv>                         
        </StyledContent>
    )
}

export default ImgContent;


