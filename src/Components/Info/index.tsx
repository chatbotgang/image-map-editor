import React, { useCallback } from "react";
import { InfoWrapper } from "./styles";

interface Props {
  height: number;
  width: number;
}

const Info = (props: Props) => {
  const { height, width } = props;

  return (
    <InfoWrapper>
      width: {width} <br />
      height: {height}
    </InfoWrapper>
  );
};

export default React.memo(Info);
