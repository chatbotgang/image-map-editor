import React, { useEffect } from "react";
import { InfoWrapper } from "./styles";
import { Area } from "../../Hooks/useUploadFile/types";
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
