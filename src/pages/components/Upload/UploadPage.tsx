import { RouteComponentProps } from "react-router-dom";
import { LeftSection } from "./LeftSection";
import { RightSection } from "./RightSection";
import { WithUploadLocalCtx } from "../../../presenters/Upload/uploadVM";
import { SectionContainer } from "../../../views/dump/SectionContainer";

const UploadPage = ({ location }: RouteComponentProps) => {
  return (
    <SectionContainer>
      <LeftSection></LeftSection>
      <RightSection></RightSection>
    </SectionContainer>
  );
};
const WrapUploadPage = (props: Props) =>
  WithUploadLocalCtx(props)(UploadPage)();
export default WrapUploadPage;
