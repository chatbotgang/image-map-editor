import React, {FunctionComponent,useState, useEffect, useRef} from 'react';
import { FiTrash2 } from "react-icons/fi";
import useCanvas from "../hooks/useCanvas"

interface props {
    image: string;
}

interface rectProperties {
    x: number,
    y: number,
    width: number,
    height: number,
}

const  Canvas: FunctionComponent<props> = ({image}) => {
    const img = useRef<HTMLImageElement>(null);
    const canvas = useRef<HTMLCanvasElement>(null);
    const [rects, setRects] = useState<rectProperties[]>([])
    const {offset,clear,drawRect} = useCanvas(canvas);
   
    let isMouseDown: boolean = false;
    let startX: number = 0;
    let startY: number = 0;
    let mouseX: number = 0;
    let mouseY: number = 0;
    let rectWidth: number = 0;
    let rectHeight: number = 0;
 

    useEffect(() => {
        const loadImage = new Image();
        loadImage.src = image;
        loadImage.onload = () => {
            if(canvas && img){
                let canvasNode = canvas.current as any;
                let imageNode = img.current as any;
                canvasNode.height = imageNode?.height;            
            }
           
        };
      }, [image]);

      useEffect(() => {
        clear();
        rects.forEach((rect) => drawRect(rect));
      }, [rects]);    

    const handleMouseUp = (e :React.MouseEvent<HTMLCanvasElement, MouseEvent>) => {
        isMouseDown = false;
        setRects([...rects, {x: startX, y:startY, width: rectWidth, height: rectHeight}]);
    }  

    const handleMouseMove = (e :React.MouseEvent<HTMLCanvasElement, MouseEvent>) => {
        if(!isMouseDown) return;
        mouseX =  e.clientX - offset.x; 
        mouseY =  e.clientY - offset.y; 
        
        clear();
        rectWidth = mouseX - startX;
        rectHeight = mouseY - startY;
    
        drawRect({x:startX, y:startY, width: rectWidth, height:rectHeight})
        rects.forEach((rect) => drawRect(rect))
    }  

    const handleMouseDown = (e :React.MouseEvent<HTMLCanvasElement, MouseEvent>) => {
        startX = e.clientX - offset.x;
        startY = e.clientY - offset.y;
        isMouseDown = true;
    } 

    const handleDeleteRect = (index: number) => {
        const excludeIndexRects = [...rects.slice(0, index), ...rects.slice(index + 1)];
        setRects(excludeIndexRects);
    }
    
    const deleteButtons = rects.map((r, index) => (
        <button key={index}  className="absolute trash" style={{left: r.x + r.width + 4, top: r.y}} onClick={()=>handleDeleteRect(index)}>{<FiTrash2/>}</button>)
    )

     const labels = rects.map((r, index) => (
        <span key={index} className="absolute sm round" style={{left: r.x +1 , top: r.y + 1}}>{index + 1}</span>)
    )

  return (
      <div className="canvas-container">
        <img ref={img} src={image} alt={image} className="canvas-img" width="355" height="auto" draggable="false" />
        <canvas ref={canvas} 
            className="canvas-area"
            width="355" 
            onMouseUp={(e) =>handleMouseUp(e)}
            onMouseMove={(e) =>handleMouseMove(e)}
            onMouseDown={(e) =>handleMouseDown(e)}>     
        </canvas>
        {labels}
        {deleteButtons}
      </div>
   
  );
}

export default Canvas;