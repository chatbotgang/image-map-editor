import { Header } from "../../../views/dump/Header";
import Upload from "../../../views/logic/Uploader/Uploader";
import { Editor } from "../../../views/logic/ImageEditor/Editor/Editor";
import { OneColumnGray } from "../../../views/dump/set-up/Gray";

export const LeftSection = () => {
  return (
    <OneColumnGray>
      <Header>Header</Header>
      <Upload />
      <Editor />
    </OneColumnGray>
  );
};
