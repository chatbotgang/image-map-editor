import React, { useCallback } from 'react'
import { useDropzone } from 'react-dropzone'
import { Image as ImageIconRaw } from '@styled-icons/boxicons-regular/Image'
import styled from 'styled-components'

interface ImageUploaderProps {
	setImagePreview: (imagePreview: string) => void
}

const ImageUploaderContainer = styled.div`
	align-items: center;
	background-color: #ffffff;
	border-radius: 8px;
	border: solid 1px #dfdfe4;
	color: #adb1b3;
	display: flex;
	flex-direction: column;
	height: 156px;
	justify-content: center;
	width: 355px;
`

const ImageIcon = styled(ImageIconRaw)`
	color: #c9c9cb;
	height: 45px;
	width: 45px;
`

export const ImageUploader = ({ setImagePreview }: ImageUploaderProps) => {
	const onDrop = useCallback(
		(acceptedFiles: File[]) => {
			if (acceptedFiles.length > 0) {
				acceptedFiles.forEach((file: File) => {
					setImagePreview(URL.createObjectURL(file))
				})
			}
		},
		[setImagePreview],
	)

	const { getRootProps, getInputProps, isDragActive } = useDropzone({
		onDrop,
		accept: 'image/*',
		multiple: false,
	})

	return (
		<ImageUploaderContainer {...getRootProps()}>
			<input {...getInputProps()} />
			<ImageIcon />
			{isDragActive ? <p>Drop image here</p> : <p>Upload image</p>}
		</ImageUploaderContainer>
	)
}
