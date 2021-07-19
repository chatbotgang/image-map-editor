import React from 'react'
import { ShapeEditor, ImageLayer, DrawLayer, wrapShape } from 'react-shape-editor'
import { Trash } from '@styled-icons/boxicons-regular/Trash'

interface ImageMapEditorProps {
	componentWidth: number
	imagePreview: string
	imageScale: number
	imageShapesData?: ImageShape[]
	imageShapesDispatch: any
	setImageScale: (imageScale: number) => void
}

interface ShapeHandleComponentProps {
	active: boolean
	cursor: string
	isInSelectionGroup: boolean
	onMouseDown: React.MouseEventHandler<SVGRectElement>
	scale: number
	x: number
	y: number
}

interface ShapeComponentProps {
	width: number
	height: number
	active: boolean
	scale: number
	shapeId: string
}

// This is copied from the default resize handle component to apply styles
const ShapeHandleComponent = ({
	active,
	cursor,
	isInSelectionGroup,
	onMouseDown,
	scale,
	x,
	y,
}: ShapeHandleComponentProps) => {
	const handleSize = 8

	return (
		<rect
			fill={active ? 'rgba(0,107,238,1)' : 'rgba(0,107,238,0.6)'}
			height={handleSize / scale}
			style={{ cursor, opacity: isInSelectionGroup ? 0 : 1 }}
			width={handleSize / scale}
			x={x - handleSize / 2 / scale}
			y={y - handleSize / 2 / scale}
			onMouseDown={onMouseDown}
		/>
	)
}

// This is also added here to adjust style
const ShapePreviewComponent = wrapShape(({ height, width }) => (
	<rect
		fill="rgba(0,107,238,0.2)"
		stroke={'rgba(0,107,238,0.6)'}
		strokeWidth={3}
		height={height}
		width={width}
	/>
))

export const ImageMapEditor = ({
	componentWidth,
	imagePreview,
	imageScale,
	imageShapesData,
	imageShapesDispatch,
	setImageScale,
}: ImageMapEditorProps) => {
	const [{ vectorHeight, vectorWidth }, setVectorDimensions] = React.useState({
		vectorHeight: 0,
		vectorWidth: 0,
	})

	const onImageLoad = ({
		naturalWidth,
		naturalHeight,
	}: {
		naturalWidth: number
		naturalHeight: number
	}) => {
		setVectorDimensions({
			vectorWidth: naturalWidth,
			vectorHeight: naturalHeight,
		})
		setImageScale(componentWidth / naturalWidth)
	}

	const constrainMove = ({ x, y, width, height }: ImageShapeCoords) => {
		x = x < 0 ? 0 : x
		x = x > vectorWidth - width ? vectorWidth - width : x
		y = y < 0 ? 0 : y
		y = y > vectorHeight - height ? vectorHeight - height : y
		return { x, y }
	}

	const ShapeComponent = wrapShape(
		({ width, height, active, scale, shapeId }: ShapeComponentProps) => (
			<>
				<rect
					fill="rgba(0,107,238,0.2)"
					stroke={active ? 'rgba(0,107,238,1)' : 'rgba(0,107,238,0.6)'}
					strokeWidth={2 / scale}
					width={width}
					height={height}
				/>
				<rect
					fill="rgba(0,107,238,0.6)"
					rx={3 / scale}
					x={width - 25 / scale}
					y={5 / scale}
					width={20 / scale}
					height={20 / scale}
					style={{
						cursor: 'pointer',
					}}
					onClick={() => imageShapesDispatch({ type: 'delete', payload: { id: shapeId } })}
				/>
				<Trash
					x={width - 25 / scale}
					y={5 / scale}
					width={20 / scale}
					height={20 / scale}
					style={{
						color: 'white',
						pointerEvents: 'none',
					}}
				/>
			</>
		),
	)

	return (
		<ShapeEditor
			scale={imageScale}
			style={{
				width: `${componentWidth}px`,
			}}
			vectorWidth={vectorWidth}
			vectorHeight={vectorHeight}
		>
			<ImageLayer src={imagePreview} onLoad={onImageLoad} />
			<DrawLayer
				onAddShape={({ x, y, width, height }: ImageShapeCoords) => {
					// Note: some additional code is necessary to prevent shapes from being drawn outside of the canvas
					imageShapesDispatch({ type: 'add', payload: { data: { x, y, width, height } } })
				}}
				DrawPreviewComponent={ShapePreviewComponent}
				constrainMove={constrainMove}
			/>
			{imageShapesData &&
				imageShapesData.map((imageShapeData) => (
					<ShapeComponent
						key={imageShapeData.id}
						shapeId={imageShapeData.id}
						height={imageShapeData.height}
						width={imageShapeData.width}
						x={imageShapeData.x}
						y={imageShapeData.y}
						onChange={(newShapeCoords: ImageShapeCoords) => {
							imageShapesDispatch({
								type: 'update',
								payload: { id: imageShapeData.id, data: newShapeCoords },
							})
						}}
						onDelete={() => {
							imageShapesDispatch({ type: 'delete', payload: { id: imageShapeData.id } }) // This handles keyboard shortcuts only
						}}
						constrainMove={constrainMove}
						ResizeHandleComponent={ShapeHandleComponent}
					/>
				))}
		</ShapeEditor>
	)
}
