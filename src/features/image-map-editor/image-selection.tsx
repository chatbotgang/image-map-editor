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
  const { dispatch } = useEditor();
  
  // event handlers
  const handleResizeStop: RndResizeCallback = (e, dir, el, delta, pos) => {
    const newSelection = {
      id: selection.id,
      x: pos.x,
      y: pos.y,
      width: el.offsetWidth,
      height: el.offsetHeight,
    };
    
    dispatch({
      id: selection.id,
      selection: newSelection,
      type: 'update-selection',
    })
  };
  const handleDragStop: RndDragCallback = (e, data) => {
    const newSeletion = {
      ...selection,
      x: data.x,
      y: data.y,
    };
    
    dispatch({
      id: selection.id,
      selection: newSeletion,
      type: 'update-selection',
    })
  };
  const handleDelete = () => dispatch({
    id: selection.id,
    type: 'delete-selection',
  });
  
  return (
    <Rnd
      style={{ pointerEvents: isDrawing ? 'none' : 'auto' }}
      default={{
        x: selection.x,
        y: selection.y,
        width: selection.width,
        height: selection.height,
      }}
      bounds="parent"
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
      <Styled.SelectionNum>
        {order}
      </Styled.SelectionNum>

      {Array.from({ length: 8}).map((_, i) => (
        <Styled.Dot key={i} data-index={i} />
      ))}
    </Styled.Selection> 
    </Rnd>
  );
};

export default ImageSelection;
