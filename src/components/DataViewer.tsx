import style from 'styled-components';
import { Block } from '../store/appContext';

const Wrapper = style.div`
  width: 548px;
  height: 703px;
  padding: 39px;
  color: #ffffff;
  background-color: #2c3947;
  border-radius: 4px;
  box-shadow: 0 0 20px 0 rgba(0, 0, 0, 0.2);
  overflow: auto;
`;

function DataViewer(props: { blocks: Block[] }) {
  const {
    blocks,
  } = props;
  return (
    <Wrapper>
      <pre>{JSON.stringify(blocks, ['x', 'y', 'width', 'height'], 2)}</pre>
    </Wrapper>
  );
}

export default DataViewer;
