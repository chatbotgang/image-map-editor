import React, {FunctionComponent,useState, useEffect, useRef} from 'react';
import { FiTrash2 } from "react-icons/fi";

interface props {
    image: string;
}

interface Offset {
    offsetX: number, 
    offsetY: number
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
    const [settings, setSettings] = useState<Offset>({ offsetX: 0, offsetY: 0})
    const [ctx, setCtx] = useState<CanvasRenderingContext2D | null | undefined>(null);
   
    let isMouseDown: boolean = false;
    let startX: number = 0;
    let startY: number = 0;
    let mouseX: number = 0;
    let mouseY: number = 0;
    let rectWidth: number = 0;
    let rectHeight: number = 0;


    useEffect(() => {
        setCtx(canvas.current?.getContext("2d"));
      }, []);  


    useEffect(() => {
        const loadImage = new Image();
        loadImage.src = image;
        loadImage.onload = () => {
            if(canvas && img){
                let canvasNode = canvas.current as any;
                let imageNode = img.current as any;
                canvasNode.height = imageNode?.height;
                console.log(canvas);
                setSettings(({
                    offsetX:canvasNode.offsetParent.offsetLeft + canvasNode.offsetParent.offsetParent.offsetLeft,
                    offsetY:canvasNode.offsetParent.offsetTop + canvasNode.offsetParent.offsetParent.offsetTop,
                }))
                
            }
           
        };
      }, [image]);

      useEffect(() => {
        const canvasNode = canvas.current as any;
        if(ctx){
             ctx.clearRect(0, 0, canvasNode.width, canvasNode.height);
             rects.forEach((rect) => {
                const {x,y,width,height} = rect;
                ctx && ctx.strokeRect(x,y,width,height);
            })
        }
      }, [rects]);    

    const handleMouseUp = (e :React.MouseEvent<HTMLCanvasElement, MouseEvent>) => {
        console.log('handleMouseUp');
        isMouseDown = false;
        console.log(rects);
        setRects([...rects, {x: startX, y:startY, width: rectWidth, height: rectHeight}]);
    }  

    const handleMouseMove = (e :React.MouseEvent<HTMLCanvasElement, MouseEvent>) => {
        console.log('handleMouseMove');
        if(!isMouseDown) return;
        mouseX =  e.clientX - settings.offsetX; 
        mouseY =  e.clientY - settings.offsetY; 
        
        if(canvas && ctx){
            let canvasNode = canvas.current as any;
            ctx.clearRect(0, 0, canvasNode.width, canvasNode.height);
            rectWidth = mouseX - startX;
            rectHeight = mouseY - startY;
            ctx.strokeStyle = '#0000FF';
            ctx.lineWidth = 2;
            
            ctx.strokeRect(startX, startY, rectWidth, rectHeight);
            rects.forEach((rect) => {
                const {x,y,width,height} = rect;
                ctx && ctx.strokeRect(x,y,width,height);
            })

        }

       
        
    }  

    const handleMouseDown = (e :React.MouseEvent<HTMLCanvasElement, MouseEvent>) => {
        console.log('handleMouseDown');
        startX = e.clientX - settings.offsetX;
        startY = e.clientY - settings.offsetY;
        console.log('startX', startX, 'startY', startY);

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