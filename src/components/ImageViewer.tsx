import { useContext, useMemo, useState, useCallback } from 'react';
import throttle from 'lodash/throttle';
import { v4 as uuidv4 } from 'uuid';
import style from 'styled-components';
import Uploader from './Uploader';
import Blocks from './Blocks';
import { appContext, ActionEnum } from '../store/appContext';

const Wrapper = style.div`
  width: 433px;
  height: 792px;
  background-color: #f5f9fa;
  border-radius: 8px;
  box-shadow: 0 0 20px 0 rgba(0, 0, 0, 0.2);
`;
const Header = style.div`
  display: flex;
  align-items: center;
  height: 56px;
  padding: 8px 34px;
  background-color: #ecf0f3;
  box-sizing: border-box;
`;
const CloseCircle = style.div`
  width: 24px;
  height: 24px;
  background-color: #d5dade;
  border-radius: 50%;
  box-sizing: border-box;
`;
const ImageWrapper = style.div`
  position: relative;
  display: flex;
  height: fit-content;
  margin: 39px;
`;

type Range = {
  x: number,
  y: number,
  x2: number,
  y2: number,
  width: number,
  height: number,
}

const computedRange = (x: number, limit: number): number => {
  if(x < 0) return 0;
  if(x > limit) return limit;
  return x;
}

function ImageViewer() {
  const { state, dispatch } = useContext(appContext);
  const [range, setRange] = useState<Range>({
    x: 0,
    y: 0,
    x2: 0,
    y2: 0,
    width: 0,
    height: 0
  });
  const throttleSetRange = useMemo(() => throttle(setRange, 17), []);

  const handleMouseDown = useCallback((e) => {
    if(e.target.tagName !== 'DIV') return;
    if(!state.imageSrc) return;
    const {
      offsetX: x,
      offsetY: y,
    } = e.nativeEvent;
    const {
      width: imageWidth,
      height: imageHeight,
      left,
      top,
    } = e.currentTarget.getBoundingClientRect();
    setRange({ x, y, x2: 0, y2: 0, width: 0, height: 0 });
    const handleMouseMove = (e: MouseEvent) => {
      const moveX = e.clientX - left;
      const moveY = e.clientY - top;
      const x2 = computedRange(moveX, imageWidth);
      const y2 = computedRange(moveY, imageHeight);
      throttleSetRange((prevState) => ({
        ...prevState,
        x2,
        y2,
        width: Math.abs(prevState.x - x2),
        height: Math.abs(prevState.y - y2),
      }));
    }

    const handleMouseUp = (e: MouseEvent) => {
      document.removeEventListener('mouseup', handleMouseUp, false);
      document.removeEventListener('mousemove', handleMouseMove, false);
      setRange({ x: 0, y: 0, x2: 0, y2: 0, width: 0, height: 0 });
      const moveX = e.clientX - left;
      const moveY = e.clientY - top;
      const computedX = computedRange(moveX, imageWidth);
      const computedY = computedRange(moveY, imageHeight);
      if(x === computedX || y === computedY) return;
      dispatch({
        type: ActionEnum.ADD_BLOCK,
        payload: {
          id: uuidv4(),
          x: Math.min(x, computedX),
          y: Math.min(y, computedY),
          width: Math.abs(x - computedX),
          height: Math.abs(y - computedY),
        },
      });
    }
    document.addEventListener('mousemove', handleMouseMove, false);
    document.addEventListener('mouseup', handleMouseUp, false);
  }, [dispatch, state.imageSrc, throttleSetRange]);

  return (
    <Wrapper>
      <Header>
        <CloseCircle />
      </Header>
      <ImageWrapper onMouseDown={handleMouseDown}>
        {state.imageSrc ? <img width="355" draggable={false} style={{ userSelect: 'none' }} src={state.imageSrc} alt="uploadedImage" /> :
          <Uploader dispatch={dispatch} />}
        {state.imageSrc && <Blocks
          blocks={state.blocks.concat({
            x: Math.min(range.x, range.x2),
            y: Math.min(range.y, range.y2),
            width:range.width,
            height:range.height,
          })}
        />}
      </ImageWrapper>
    </Wrapper>
  );
}

export default ImageViewer;
