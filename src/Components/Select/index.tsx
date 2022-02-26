import React, { useCallback, useState } from "react";
import { SelectWrapper, DeleteWrapper } from "./styles";
import { Area } from "../../Hooks/useUploadFile/types";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

export interface Props {
  area: Area;
  deleteArea?: (area: Area) => void;
}

const Select = (props: Props) => {
  const ref = React.useRef<HTMLInputElement>(null);
  const [onHover, setOnHover] = useState(false);
  const { area, deleteArea } = props;

  const onMouseEnter = useCallback(() => {
    setOnHover(true);
  }, [setOnHover]);

  const onMouseLeave = useCallback(() => {
    setOnHover(false);
  }, [setOnHover]);

  const onClickDelete = useCallback(() => {
    if (deleteArea) {
      deleteArea(area);
    }
  }, [deleteArea, area]);

  if (!area.size.width && !area.size.height) {
    return null;
  }

  return (
    <SelectWrapper
      ref={ref}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      draggable={false}
      area={area}
    >
      {onHover && (
        <DeleteWrapper area={area} onClick={onClickDelete}>
          <FontAwesomeIcon icon={faTrash} />
        </DeleteWrapper>
      )}
    </SelectWrapper>
  );
};

export default React.memo(Select);
