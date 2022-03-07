import React ,{ useState, useEffect, useRef } from 'react';

type Nullable<T> = T | undefined | null;
type position = {
	_x: number,
	_y: number
}

function useDrag() {
	const [isMouseDown, setMouseDown] = useState(false);
	const [mousePosition, setMousePosition] = useState<Nullable<position>>();
	const ref = useRef(null);

	function onMouseDown(event:React.MouseEvent<HTMLDivElement>) {
		setMouseDown(true);
		setMousePosition({_x:event.clientX, _y:event.clientY});
	}

	useEffect(() => {
		function onMouseUp(event:any):void {
			setMouseDown(false);
			setMousePosition(null);
		}
		function onMouseMove(event:any):void {
		  if (!isMouseDown) return;
		
			console.log("_x", event.clientX, '_y', event.clientY);
		}
	
		  	window.addEventListener('mouseup', onMouseUp);
			window.addEventListener('mousemove', onMouseMove);
		return () => {
		  	window.removeEventListener('mouseup', onMouseUp);
		  	window.removeEventListener('mousemove', onMouseMove);
		};
	}, [isMouseDown, mousePosition]);

	return {
		ref,
		onMouseDown,
	};
}

export default useDrag;