import { memo } from "react";
import { RouteComponentProps } from "react-router-dom";
import { LeftSection } from "./ImgEditorLeftSection";
import { RightSection } from "./ImgEditorRightSection";
import { WithUploadLocalCtx } from "../../../presenters/Upload/uploadVM";
import { SectionContainer } from "../../../views/dump/SectionContainer";

const EditPicPage = memo(({ location }: RouteComponentProps) => {
  return (
    <SectionContainer>
      <LeftSection />
      <RightSection />
    </SectionContainer>
  );
});

export const WrapEditPicPage = (props: Props) => {
  return WithUploadLocalCtx(props)(EditPicPage)();
};
