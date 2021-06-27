import { RouteComponentProps } from "react-router-dom";
import { LeftSection } from "./ImgEditorLeftSection";
import { RightSection } from "./ImgEditorRightSection";
import { WithUploadLocalCtx } from "../../../presenters/Upload/uploadVM";
import { SectionContainer } from "../../../views/dump/SectionContainer";

const EditPicPage = ({ location }: RouteComponentProps) => {
  return (
    <SectionContainer>
      <LeftSection />
      <RightSection />
    </SectionContainer>
  );
};
const WrapEditPicPage = (props: Props) =>
  WithUploadLocalCtx(props)(EditPicPage)();
export default WrapEditPicPage;
