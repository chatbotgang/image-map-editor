import React from 'react';
import { Record } from '../useAppReducer';
import {
  RecordItemHandlersContainer,
  RecordItemHandler,
  RecordItemContainer,
} from './RecordableImage.style';

interface Props {
  record: Record;
}

const RecordItem = ({
  record: { id, left, right, top, bottom },
}: Props): JSX.Element => (
  <RecordItemContainer
    data-position={`${id}`}
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
  </RecordItemContainer>
);

export default RecordItem;
