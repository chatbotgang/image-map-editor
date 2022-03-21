import style from 'styled-components';
import { Block as BlockType } from '../store/appContext';
import Block from './Block';

const Wrapper = style.div`
  position: absolute;
  width: 355px;
  height: 100%;
  cursor: crosshair;
`;

function Blocks(props: {
  blocks: BlockType[],
}) {
  const {
    blocks,
  } = props;

  return (
    <Wrapper>
      {blocks.map(({ id, x, y, width, height }, index) => (
        <Block
          key={id || 'tempId'}
          index={index + 1}
          id={id} x={x}
          y={y}
          width={width}
          height={height}
        />
      ))}
    </Wrapper>
  );
}

export default Blocks;
