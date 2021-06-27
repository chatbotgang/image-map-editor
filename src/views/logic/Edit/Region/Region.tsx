import { useMemo, useEffect, useContext } from "react";
import { ImgEditorVMContext } from "../../../../presenters/Upload/uploadVM";
import { CreateCropSelection } from "../Crop/Crop";

export const EditRegion = () => {
  const { layoutState, handleComponentPointerDown } =
    useContext(ImgEditorVMContext);
  let selectionList: any = useMemo(() => {
    return [];
  }, []);
  let cropSelectionList: any = useMemo(() => {
    return [];
  }, []);
  let cropSelection = CreateCropSelection(layoutState);
  useEffect(() => {
    // selectionList.push(layoutState);
    // cropSelectionList.push(cropSelection);
    return () => {
      // cropSelectionList.slice(cropSelection);
    };
  }, [layoutState, cropSelectionList, selectionList]);
  return (
    <>
      <div
        onPointerDown={handleComponentPointerDown}
        style={{ position: "relative" }}
      >
        <div
          style={{
            width: "300px",
            height: "200px",
            backgroundColor: "#ebf0f3",
          }}
        ></div>
        {/* {cropSelectionList.map((cropSelection: any, index: any) => (
          <div key={index}>{cropSelection}</div>
        ))} */}
        <div>{cropSelection}</div>
      </div>
    </>
  );
};
