import React ,{ useState, useEffect, useRef } from 'react';

type Nullable<T> = T | undefined | null;
type position = {
	_x: number,
	_y: number
}

function useDrag() {
	const [isMouseDown, setMouseDown] = useState(false);
	const [startMousePosition, setStartMousePosition] = useState<Nullable<position>>();
	const [lastMousePosition, setLastMousePosition] = useState<Nullable<position>>();
	const ref = useRef(null);

	function onMouseDown(event:React.MouseEvent<HTMLDivElement>) {
		setMouseDown(true);
		setStartMousePosition({_x:event.clientX, _y:event.clientY});
		console.log("_x", event.clientX, '_y', event.clientY);
	}

	useEffect(() => {
		function onMouseUp(event:any):void {
			setMouseDown(false);
			setStartMousePosition(null);
			setLastMousePosition(null);
		}
		function onMouseMove(event:any):void {
		    if (!isMouseDown) return;
			if (ref.current === null) return;
      		if (startMousePosition === null) return;

			if (event.clientX) {
                // endPosition = {x : e.clientX, y : e.clientY};
            } else if (event.touches) {
                // endposition = {x : e.touches[0].pageX, y : e.touches[0].pageY};            
            }
		
			// console.log("_x", event.clientX, '_y', event.clientY);
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
	};
}

export default useDrag;