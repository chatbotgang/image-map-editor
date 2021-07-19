import React from 'react'

let idIterator = 1

const getNewShapeId = () => {
	const newShapeId = `id-${idIterator}`

	idIterator += 1

	return newShapeId
}

const shapesReducer = (state: ImageShape[], action: ImageShapesAction) => {
	switch (action.type) {
		case 'add':
			return [...state, Object.assign({ id: getNewShapeId() }, action.payload?.data)]
		case 'update':
			const index = state.findIndex((shape) => shape.id === action.payload?.id)
			const newArray = [...state]

			newArray[index] = Object.assign(state[index], action.payload?.data)
			return newArray
		case 'delete':
			return state.filter((shape) => shape.id !== action.payload?.id)
		case 'reset':
			return []
		default:
			throw new Error()
	}
}

export const useShapes = () => {
	const [imageShapesData, imageShapesDispatch] = React.useReducer<
		React.Reducer<ImageShape[], ImageShapesAction>
	>(shapesReducer, [])

	return { imageShapesData, imageShapesDispatch }
}
