import {
  SelectionElement,
  DragBar,
  DragPoint,
  DeleSelection,
} from "../../../dump/SelectionElement";
import { useCrop } from "./cropHooks";

export const CreateCropSelection = (crop: ILayoutState) => {
  const { handleCropDown } = useCrop(crop);
  console.log("crop", crop);
  return (
    <SelectionElement
      onPointerDown={handleCropDown}
      className="drag-elements"
      layout={crop}
    >
      <DragBar className="drag-bar ord-n" ord="n"></DragBar>
      <DragBar className="drag-bar ord-e" ord="e"></DragBar>
      <DragBar className="drag-bar ord-s" ord="s"></DragBar>
      <DragBar className="drag-bar ord-w" ord="w"></DragBar>

      <DragPoint className="drag-point ord-nw" ord="nw"></DragPoint>
      <DragPoint className="drag-point ord-n" ord="n"></DragPoint>
      <DragPoint className="drag-point ord-ne" ord="ne"></DragPoint>
      <DragPoint className="drag-point ord-e" ord="e"></DragPoint>
      <DragPoint className="drag-point ord-se" ord="se"></DragPoint>
      <DragPoint className="drag-point ord-s" ord="s"></DragPoint>
      <DragPoint className="drag-point ord-sw" ord="sw"></DragPoint>
      <DragPoint className="drag-point ord-w" ord="w"></DragPoint>
      <DeleSelection>Remove</DeleSelection>
    </SelectionElement>
  );
};
