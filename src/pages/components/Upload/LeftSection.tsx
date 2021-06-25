import { Header } from "../../../views/dump/Header";
import Upload from "../../../views/logic/Upload/Upload";
import { OneColumnGray } from "../../../views/dump/set-up/Gray";

export const LeftSection = () => {
  return (
    <OneColumnGray>
      <Header>Header</Header>
      <Upload />
    </OneColumnGray>
  );
};
