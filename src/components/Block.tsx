import { useContext } from 'react';
import style from 'styled-components';
import { Block as BlockType } from '../store/appContext';
import TrashIcon from '../icons/TrashIcon';
import { appContext, ActionEnum } from '../store/appContext';

type DotProp = {
  top: string,
  left: string,
}

const StyledBlock = style.div.attrs((prop) => ({
  style: prop.style
}))`
  position: absolute;
  border: 1px solid blue;
  pointer-events: none;
`;

const Dot = style.div<DotProp>`
  position: absolute;
  top: ${props => props.top};
  left: ${props => props.left};
  width: 4px;
  height: 4px;
  background-color: blue;
  transform: translate(-50%, -50%);
`;

const IndexDiv = style.div`
  width: 20px;
  height: 20px;
  margin: 5px;
  text-align: center;
  background-color: rgba(255, 255, 255, .5);
  border-radius: 50%;
`;

const IconWrapper = style.div.attrs((prop) => ({
  style: prop.style
}))`
  position: absolute;
  width: 24px;
  height: 24px;
  border-radius: 4px;
  background-color: #ffffff;
  cursor: pointer;
  box-shadow: 0 0 20px 0 rgba(0, 0, 0, 0.2);
`;

function Block(props: BlockType) {
  const {
    id,
    index,
    x,
    y,
    width,
    height,
  } = props;
  const { dispatch } = useContext(appContext);
  if(!width || !height) return null;
  return (
    <>
      <StyledBlock style={{ left: x, top: y, width, height }}>
        {index && <IndexDiv>{index}</IndexDiv>}
        {[{ top: '0px', left: '0px' },
          { top: '0px', left: '100%' },
          { top: '100%', left: '0px' },
          { top: '100%', left: '100%' }].map((d, index) => (
          <Dot key={index} top={d.top} left={d.left} />
        ))}
      </StyledBlock>
      <IconWrapper
        style={{
          top: y,
          left: x + width + 2
        }}
        onClick={() => {
          dispatch({
            type: ActionEnum.DELETE_BLOCK,
            payload: {
              id,
            },
          });
        }}
      >
        <TrashIcon
          color="gray"
          width="24"
          height="24"
        />
      </IconWrapper>
    </>
  );
}

export default Block;
