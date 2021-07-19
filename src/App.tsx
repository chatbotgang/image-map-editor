import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { ImageMapEditor } from './components/ImageMapEditor'
import { ImageUploader } from './components/ImageUploader'

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

const ImageMapDebugger = styled.div`
	background-color: #2a3a48;
	border-radius: 5px;
	margin-left: 135px;
	height: 703px;
	width: 548px;
`

const ImageMapDebugUtil = styled.div`
	color: #a3aeb9;
	font: monospace;
`

const ImageMapApp = () => {
	const [imagePreview, setImagePreview] = useState('')

	useEffect(() => {
		URL.revokeObjectURL(imagePreview) // Prevent memory leaks
	}, [imagePreview])

	return (
		<ImageMapEditorAppContainer>
			<ImageMapEditorContainer>
				<ImageMapEditorHeader>
					<ImageMapEditorIcon />
				</ImageMapEditorHeader>
				<ImageMapEditorMain>
					{imagePreview && <ImageMapEditor imagePreview={imagePreview} />}
					{imagePreview && (
						<ImageResetButton onClick={() => setImagePreview('')}>Remove image</ImageResetButton>
					)}
					{!imagePreview && <ImageUploader setImagePreview={setImagePreview} />}
				</ImageMapEditorMain>
			</ImageMapEditorContainer>
			<ImageMapDebugger>
				<ImageMapDebugUtil />
			</ImageMapDebugger>
		</ImageMapEditorAppContainer>
	)
}

export default ImageMapApp
