import React from 'react'
import styled from 'styled-components'

interface ImageMapDebuggerProps {
	imageScale: number
	imageShapesData: ImageShape[]
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

export const ImageMapDebugger = ({ imageScale, imageShapesData }: ImageMapDebuggerProps) => {
	// Image data needs to be normalized due to the use of SVG for shape elements
	const imageShapesDataFormatted = imageShapesData.map((imageShapeData) => ({
		x: imageShapeData.x * imageScale,
		y: imageShapeData.y * imageScale,
		width: imageShapeData.width * imageScale,
		height: imageShapeData.height * imageScale,
	}))

	return (
		<ImageMapDebuggerContainer>
			{imageShapesData.length > 0 && (
				<ImageMapDebuggerData>
					{JSON.stringify(imageShapesDataFormatted, null, '  ')}
				</ImageMapDebuggerData>
			)}
		</ImageMapDebuggerContainer>
	)
}
