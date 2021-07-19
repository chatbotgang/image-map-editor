import React from 'react'
import styled from 'styled-components'

interface ImageMapEditorProps {
	imagePreview: string
}

const ImageElement = styled.img`
	height: auto;
	width: 355px;
`

export const ImageMapEditor = ({ imagePreview }: ImageMapEditorProps) => {
	return <ImageElement src={imagePreview} alt="Upload preview" />
}
