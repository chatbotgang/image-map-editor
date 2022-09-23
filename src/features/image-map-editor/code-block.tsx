import {
  useEditor,
  ImgData,
  Selection,
} from './editor.context';
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
  const revert = (num: number) => Math.floor(num * imgData.width / 355);
  
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
