import {
  useEditor,
  ImgData,
  Selection,
} from './editor.context';
import {
  width as imgDisplayWidth,
} from './image-group';
import * as Styled from './code-block.style';

const CodeBlock = () => {
  const {
    imgData,
    selections,
  } = useEditor();
  
  return (
    <Styled.CodeBlock>
      {selections.length > 0 
        && imgData 
        && formatOutput(selections, imgData)}
    </Styled.CodeBlock>
  );
};

function formatOutput(selections: Selection[], imgData: ImgData) {
  const rate = imgData.width / imgDisplayWidth;
  const revert = (num: number) => Math.floor(num * rate);
  
  const data = selections.map(({
    x,
    y,
    width,
    height,
  }) => ({
    x: revert(x),
    y: revert(y),
    width: revert(width),
    height: revert(height),
  }));
  
  return JSON.stringify(data, null, 2);
}

export default CodeBlock;
