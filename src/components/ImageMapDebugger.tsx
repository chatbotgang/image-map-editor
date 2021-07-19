import React from 'react'
import styled from 'styled-components'

interface ImageMapDebuggerProps {
	imageScale: number
	imageShapes: ImageShape[]
}

const ImageMapDebuggerContainer = styled.div`
	background-color: #2a3a48;
	border-radius: 5px;
	color: #a3aeb9;
	font: monospace;
	margin-left: 135px;
	overflow: auto;
	height: 703px;
	width: 548px;
`

const ImageMapDebuggerData = styled.pre`
	padding: 0 15px;
`

export const ImageMapDebugger = ({ imageScale, imageShapes }: ImageMapDebuggerProps) => {
	// Image data needs to be normalized due to the use of SVG for shape elements
	const imageShapeData = imageShapes.map((imageShape) => ({
		x: imageShape.x * imageScale,
		y: imageShape.y * imageScale,
		width: imageShape.width * imageScale,
		height: imageShape.height * imageScale,
	}))

	return (
		<ImageMapDebuggerContainer>
			{imageShapes.length > 0 && (
				<ImageMapDebuggerData>{JSON.stringify(imageShapeData, null, '  ')}</ImageMapDebuggerData>
			)}
		</ImageMapDebuggerContainer>
	)
}
