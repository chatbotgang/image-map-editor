import React, { useCallback } from "react";
import { InfoWrapper } from "./styles";
import { Area } from "../../Hooks/useUploadFile/types";

interface Props {
  areas: Area[];
}

const Info = (props: Props) => {
  const { areas } = props;
  const info = JSON.stringify(areas);

  return <InfoWrapper>{info}</InfoWrapper>;
};

export default React.memo(Info);
