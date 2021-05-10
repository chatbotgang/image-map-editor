import React, { useCallback } from 'react';
import { Record, Actions } from '../useAppReducer';
import {
  RecordItemHandlersContainer,
  RecordItemHandler,
  DeleteButton,
  StyledTrashIcon,
  RecordItemContainer,
} from './RecordableImage.style';

interface Props {
  position: number;
  readonly: boolean;
  record: Record;
  onDelete: Actions['pullRecord'];
}

const RecordItem = ({
  position,
  readonly,
  record: { id, left, right, top, bottom },
  onDelete,
}: Props): JSX.Element => {
  const handleDelete = useCallback(() => {
    if (readonly) {
      return;
    }
    onDelete(id);
  }, [readonly, id, onDelete]);
  return (
    <RecordItemContainer
      data-position={`${position}`}
      data-width={`${right - left}px`}
      style={{
        left: `${left}px`,
        top: `${top}px`,
        width: `${right - left}px`,
        height: `${bottom - top}px`,
      }}
    >
      <RecordItemHandlersContainer>
        <RecordItemHandler />
        <RecordItemHandler />
        <RecordItemHandler />
        <RecordItemHandler />
        <RecordItemHandler />
        <RecordItemHandler />
        <RecordItemHandler />
        <RecordItemHandler />
      </RecordItemHandlersContainer>
      {!readonly && (
        <DeleteButton onClick={handleDelete}>
          <StyledTrashIcon />
        </DeleteButton>
      )}
    </RecordItemContainer>
  );
};

export default RecordItem;
