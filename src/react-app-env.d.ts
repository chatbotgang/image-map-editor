/// <reference types="react-scripts" />

interface ImageShapesAction {
	type: 'add' | 'update' | 'delete' | 'reset'
	payload?: {
		id: string
		data: ImageShapeCoords
	}
}

interface ImageShapeCoords {
	x: number
	y: number
	height: number
	width: number
}

interface ImageShape extends ImageShapeCoords {
	id: string
}
