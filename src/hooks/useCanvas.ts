import {useState, useEffect} from 'react';

interface TReturn {
    offset: {
        x: number;
        y: number;
    },
    clear: () => void;
    drawRect: (rectInfo: RectInfo) => void;
}

interface Offset {
    x: number, 
    y: number
}

interface RectInfo {
    x: number,
    y: number,
    width: number,
    height: number,
}

const useCanvas = (canvas: React.RefObject<HTMLCanvasElement>): TReturn => {
    const [offset, setOffset] = useState<Offset>({ x: 0, y: 0})
    const [ctx, setCtx] = useState<CanvasRenderingContext2D | null | undefined>(null);

    useEffect(() => {
        const canvasNode = canvas.current as any;
        setCtx(canvas.current?.getContext("2d"));
        setOffset({
             x:canvasNode.offsetParent.offsetLeft + canvasNode.offsetParent.offsetParent.offsetLeft,
             y:canvasNode.offsetParent.offsetTop + canvasNode.offsetParent.offsetParent.offsetTop,
        })
    }, []); 

    
    const clear = ()=>{
        const canvasNode = canvas.current as any;
            ctx && ctx.clearRect(0, 0, canvasNode.width, canvasNode.height);
    }

    const drawRect = (rectInfo : RectInfo) => {
        if(ctx){
            ctx.strokeStyle = '#0000FF';
            ctx.lineWidth = 2;
            const {x,y,width,height} = rectInfo;
            ctx.strokeRect(x,y,width,height);
        }
    }


  return {
    offset,
    clear,
    drawRect
  };
};

export default useCanvas;
