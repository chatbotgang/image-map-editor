import * as Styled from './editor.style';
import { EditorProvider } from './editor.context';
import ImageGroup from './image-group';
import CodeBlock from './code-block';

const Editor = () => {
  return (
    <EditorProvider>
      <Styled.Layout>
        <Styled.Left>
          <Styled.LeftHeader>
            <Styled.Avatar />
          </Styled.LeftHeader>
          <Styled.LeftBody>
            <ImageGroup />
          </Styled.LeftBody>
        </Styled.Left>

        <Styled.Right>
          <CodeBlock />
        </Styled.Right>
      </Styled.Layout>
    </EditorProvider>
  );
};

export default Editor;
