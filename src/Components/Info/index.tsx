import React from "react";
import { InfoWrapper } from "./styles";
import ReactJson from "react-json-view-ts";

interface Props {
  data: any[];
}

const Info = (props: Props) => {
  const { data } = props;

  return (
    <InfoWrapper>
      <ReactJson
        src={data}
        name={false}
        theme="brewer"
        displayDataTypes={false}
        displayObjectSize={false}
        enableClipboard={false}
      />
    </InfoWrapper>
  );
};

export default React.memo(Info);
