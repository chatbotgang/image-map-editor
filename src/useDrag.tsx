import React ,{ useState, useEffect, useRef } from 'react';

type Nullable<T> = T | undefined | null;
type position = {
	_x: number,
	_y: number
}
type dragDiv = {
	width:number,
	height:number,
	top:number,
	left:number
}

function useDrag() {
	const [isMouseDown, setMouseDown] = useState(false);
	const [startMousePosition, setStartMousePosition] = useState<Nullable<position>>();
	const [lastMousePosition, setLastMousePosition] = useState<Nullable<position>>();
	const [currentDragDiv, setCurrentDragDiv] = useState<Nullable<dragDiv>>();
	const ref = useRef(null);

	function onMouseDown(event:React.MouseEvent<HTMLDivElement>) {
		setMouseDown(true);
		setStartMousePosition({_x:event.nativeEvent.offsetX, _y:event.nativeEvent.offsetY});
		event.stopPropagation();
   		event.preventDefault();
	}

	useEffect(() => {
		function onMouseUp(event:any):void {
			setMouseDown(false);
			setStartMousePosition(null);
			setLastMousePosition(null);
			event.stopPropagation();
   			event.preventDefault();
		}
		function onMouseMove(event:MouseEvent):void {
		    if (!isMouseDown) return;
			if (ref.current === null) return;
      		// if (startMousePosition === null) return;

			console.log(event, startMousePosition);
			let max_X = Math.max(startMousePosition?._x || 0, lastMousePosition?._x || 0);
			let max_Y = Math.max(startMousePosition?._y || 0, lastMousePosition?._y || 0);
			let min_X = Math.min(startMousePosition?._x || 0, lastMousePosition?._x || 0);
			let min_Y = Math.min(startMousePosition?._y || 0, lastMousePosition?._y || 0);
			
			setCurrentDragDiv({width : max_X-min_X, height: max_Y-min_Y, top: min_X, left: min_Y});

			// if (event.offsetX) {
			// 	setLastMousePosition({_x : event.offsetX, _y : event.offsetY});
            // } else if (event.touches) {
			// 	setLastMousePosition({_x : event.touches[0].pageX, _y : event.touches[0].pageY});
            // }
		
			// if(startMousePosition){
			// 	let last_width = Math.abs(event.clientX - (startMousePosition?._x || 0) );
			// 	let last_height = Math.abs(event.clientY - (startMousePosition?._y || 0) );
			// 	console.log("width", last_width, "height", last_height, "_x", startMousePosition?._x, '_y', startMousePosition?._y);
			// 	// setCurrentDragDiv({width : `${last_width}px`, height: `${last_height}px`, top: `${startMousePosition?._x}`, left:`${startMousePosition?._y}`});
			// 	setCurrentDragDiv({width : last_width, height: last_height, top: startMousePosition?._x || 0, left:startMousePosition?._y || 0});
			// }
			event.stopPropagation();
   			event.preventDefault();
		}
	
		  	window.addEventListener('mouseup', onMouseUp);
			window.addEventListener('mousemove', onMouseMove);
		return () => {
		  	window.removeEventListener('mouseup', onMouseUp);
		  	window.removeEventListener('mousemove', onMouseMove);
		};
	}, [isMouseDown, lastMousePosition]);

	return {
		ref,
		onMouseDown,
		currentDragDiv
	};
}

export default useDrag;