import { Header } from "../../../views/dump/Header";
import { Avatar } from "../../../views/dump/Avatar";
import Uploader from "../../../views/logic/Uploader/Uploader";
import { EditRegion } from "../../../views/logic/Edit/Region/Region";
import { OneColumnGray } from "../../../views/dump/set-up/Gray";

export const LeftSection = () => {
  return (
    <OneColumnGray>
      <Header>
        <Avatar />
      </Header>
      <Uploader />
      <EditRegion />
    </OneColumnGray>
  );
};
