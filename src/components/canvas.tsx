import React, {FunctionComponent, useState, useEffect, useRef} from 'react';

interface props {
    image: string;
}


const  Canvas: FunctionComponent<props> = ({image}) => {
    const img = useRef<HTMLImageElement>(null);
    const canvas = useRef<HTMLCanvasElement>(null);
    const [rect, setRect] = useState<number[][]>([])


    let ctx : CanvasRenderingContext2D | null | undefined = null;
    let isMouseDown: boolean = false;
    let offsetX: number = 0;
    let offsetY: number = 0;
    let startX: number = 0;
    let startY: number = 0;
    let mouseX: number = 0;
    let mouseY: number = 0;
    let width: number = 0;
    let height: number = 0;
    const rectangles: number[][] = []

    useEffect(() => {
        ctx = canvas.current?.getContext("2d");
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
                offsetX = canvasNode.offsetParent.offsetLeft + canvasNode.offsetParent.offsetParent.offsetLeft;
                offsetY = canvasNode.offsetParent.offsetTop + canvasNode.offsetParent.offsetParent.offsetTop;;
                console.log('offsetX', offsetX, 'offsetY', offsetY);
            }
           
        };
      }, [image]);

    const handleMouseUp = (e :React.MouseEvent<HTMLCanvasElement, MouseEvent>) => {
        console.log('handleMouseUp');
        isMouseDown = false;
        //setRectangles([]);
        rectangles.push([startX, startY, width, height]);
        
        console.log(rectangles);
        //setRect([...rectangles]);

    }  

    const handleMouseMove = (e :React.MouseEvent<HTMLCanvasElement, MouseEvent>) => {
        console.log('handleMouseMove');
        if(!isMouseDown) return;
        mouseX =  e.clientX - offsetX; 
        mouseY =  e.clientY - offsetY; 

        if(canvas && ctx){
            let canvasNode = canvas.current as any;
            ctx.clearRect(0, 0, canvasNode.width, canvasNode.height);
            width = mouseX - startX;
            height = mouseY - startY;
            console.log('draw', startX, startY, width, height);
            ctx.strokeStyle = '#0000FF';
            ctx.lineWidth = 2;
            
            ctx.strokeRect(startX, startY, width, height);
            rectangles.forEach((rect) => {
                const [x,y,w,h] = rect;
                ctx && ctx.strokeRect(x,y,w,h);
            })

        }

       
        
    }  

    const handleMouseDown = (e :React.MouseEvent<HTMLCanvasElement, MouseEvent>) => {
        console.log('handleMouseDown');
        startX = e.clientX - offsetX;
        startY = e.clientY - offsetY;
        console.log('startX', startX, 'startY', startY);

        isMouseDown = true;

    } 
    
    const deleteButtons = rectangles.map(r => (<button>r
    </button>) )

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
        {deleteButtons}
      </div>
   
  );
}

export default Canvas;