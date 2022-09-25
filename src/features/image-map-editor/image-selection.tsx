import { useRef } from 'react';
import {
  Rnd,
  RndDragCallback,
  RndResizeCallback,
} from 'react-rnd';
import { AiFillDelete } from 'react-icons/ai';
import {
  useEditor,
  Selection,
} from './editor.context';
import { detectIsOverlap } from './utils';
import * as Styled from './image-selection.style';

interface ImageSelectionProps {
  order: number;
  isDrawing: boolean;
  selection: Selection;
}

const ImageSelection = ({ 
  order,
  selection,
  isDrawing = false,
}: ImageSelectionProps ) => {
  const { dispatch, selections } = useEditor();
  const rndRef = useRef<Rnd>(null);
  
  const revertOrUpdate = (newSelection: Selection) => {
    const isUnchanged = (
      newSelection.x === selection.x
      && newSelection.y === selection.y
      && newSelection.width === selection.width
      && newSelection.height === selection.height
    );
    if (isUnchanged) return;

    const isOverlap = selections.some((otherSelection) => {
      if (otherSelection.id === selection.id) return false;
      return detectIsOverlap(newSelection, otherSelection);
    });

    // revert
    if (isOverlap) {
      const instance = rndRef.current;
      if (!instance) return;
      instance.updatePosition({ x: selection.x, y: selection.y });
      instance.updateSize({ width: selection.width, height: selection.height });
      return;
    };

    // update
    dispatch({
      id: selection.id,
      selection: newSelection,
      type: 'update-selection',
    });
  };
  
  // event handlers
  const handleResizeStop: RndResizeCallback = (e, dir, el, delta, pos) => {
    const newSelection = {
      ...selection,
      x: pos.x,
      y: pos.y,
      width: el.offsetWidth,
      height: el.offsetHeight,
    };
    revertOrUpdate(newSelection);
  };
  const handleDragStop: RndDragCallback = (e, data) => {
    const newSeletion = {
      ...selection,
      x: data.x,
      y: data.y,
    };
    revertOrUpdate(newSeletion);
  };

  const handleDelete = () => {
    dispatch({
      id: selection.id,
      type: 'delete-selection',
    });
  };
  
  return (
    <Rnd
      ref={rndRef}
      style={{ pointerEvents: isDrawing ? 'none' : 'auto' }}
      default={{
        x: selection.x,
        y: selection.y,
        width: selection.width,
        height: selection.height,
      }}
      bounds="parent"
      dragHandleClassName="drag-handler"
      onDragStop={handleDragStop}
      onResizeStop={handleResizeStop}
    >
      <Styled.Selection>
        <Styled.DeleteButton
          type="button"
          aria-label="Delete the selection block"
          onClick={handleDelete}
        >
          <AiFillDelete />
        </Styled.DeleteButton>
        <Styled.DragHandler className="drag-handler">
          <Styled.SelectionNum>
            {order}
          </Styled.SelectionNum>
          {Array.from({ length: 8 }).map((_, i) => (
            <Styled.Dot key={i} data-index={i} />
          ))}
        </Styled.DragHandler>
      </Styled.Selection> 
    </Rnd>
  );
};

export default ImageSelection;
