import React, { useCallback, useState } from "react";
import { SelectWrapper } from "./styles";
import { Area } from "../../Hooks/useUploadFile/types";

export interface Props {
  area: Area;
}

const Select = (props: Props) => {
  const { area } = props;

  return <SelectWrapper draggable={false} area={area} />;
};

export default React.memo(Select);
