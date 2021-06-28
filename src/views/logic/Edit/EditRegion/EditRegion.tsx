import { useContext, memo } from "react";
import { usePointer, useFrame } from "./editRegionsHooks";
import { ImgEditorVMContext } from "../../../../presenters/Upload/uploadVM";
import { CropRegion } from "../../../dump/CropRegion";
import { CropSelection } from "../Crop/Crop";

export const EditRegion = memo(({ children }: Props) => {
  const { cropRegionRef } = useContext(ImgEditorVMContext);
  const ret = useFrame(cropRegionRef);
  const { handleComponentPointerDown, cropSelectionDict } = usePointer(
    ret as DOMRect
  );

  return (
    <CropRegion
      onPointerDown={handleComponentPointerDown}
      className="editor-region"
      ref={cropRegionRef}
      tabIndex={0}
    >
      {Object.keys(cropSelectionDict).map((value, index, array) => (
        <CropSelection
          key={index}
          cropIndex={value}
          crop={cropSelectionDict[Number(value)]}
        />
      ))}
      {children}
    </CropRegion>
  );
});
