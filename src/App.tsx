import React from 'react'
import styled from 'styled-components'
import { ImageMapDebugger } from './components/ImageMapDebugger'
import { ImageMapEditor } from './components/ImageMapEditor'
import { ImageUploader } from './components/ImageUploader'
import { useShapes } from './hooks/UseShapes'

const ImageMapEditorAppContainer = styled.div`
	display: flex;
	padding: 50px;
`

const ImageMapEditorContainer = styled.div`
	background: #f5f9fa;
	border-radius: 5px;
	box-shadow: 0px 7px 7px #d4d7dd;
	height: 792px;
	overflow: hidden;
	width: 433px;
`

const ImageMapEditorHeader = styled.div`
	align-items: center;
	background-color: #ecf0f3;
	display: flex;
	height: 56px;
`

const ImageMapEditorIcon = styled.div`
	background-color: #d4dade;
	border-radius: 100%;
	margin-left: 24px;
	height: 24px;
	width: 24px;
`

const ImageMapEditorMain = styled.div`
	align-items: center;
	box-sizing: border-box;
	display: flex;
	flex-direction: column;
	height: 100%;
	padding: 39px;
	width: 100%;
`

const ImageResetButton = styled.button`
	margin-top: 24px;
	width: 50%;
`

// Globals
const IMAGE_EDITOR_WIDTH = 355
const IS_DEBUG = false // Adds a "remove image" button

const ImageMapApp = () => {
	const [imagePreview, setImagePreview] = React.useState('')
	const [imageScale, setImageScale] = React.useState(1) // Since we have a fixed width for the shape editor we will need to scale the SVG element to match

	// A custom hook to organize some of the code associated with shape manipulation
	const { imageShapesData, imageShapesDispatch } = useShapes()

	React.useEffect(() => {
		URL.revokeObjectURL(imagePreview) // Prevent memory leaks
	}, [imagePreview])

	return (
		<ImageMapEditorAppContainer>
			<ImageMapEditorContainer>
				<ImageMapEditorHeader>
					<ImageMapEditorIcon />
				</ImageMapEditorHeader>
				<ImageMapEditorMain>
					{imagePreview && (
						<ImageMapEditor
							componentWidth={IMAGE_EDITOR_WIDTH}
							imagePreview={imagePreview}
							imageScale={imageScale}
							imageShapesData={imageShapesData}
							imageShapesDispatch={imageShapesDispatch}
							setImageScale={setImageScale}
						/>
					)}
					{IS_DEBUG && imagePreview && (
						<ImageResetButton
							onClick={() => {
								setImagePreview('')
								imageShapesDispatch({ type: 'reset' })
							}}
						>
							Remove image
						</ImageResetButton>
					)}
					{!imagePreview && (
						<ImageUploader componentWidth={IMAGE_EDITOR_WIDTH} setImagePreview={setImagePreview} />
					)}
				</ImageMapEditorMain>
			</ImageMapEditorContainer>
			<ImageMapDebugger imageScale={imageScale} imageShapesData={imageShapesData} />
		</ImageMapEditorAppContainer>
	)
}

export default ImageMapApp
