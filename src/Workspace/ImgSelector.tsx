import { css, cx } from "@emotion/css";
import Image from "icon/phosphor/Image";
import { useSnackbar } from "notistack";
import { useCallback } from "react";
import type { DropzoneOptions } from "react-dropzone";
import { useDropzone } from "react-dropzone";
import useStore from "useStore";

const cssImageSelector = css`
  border: 2px rgb(218, 218, 223) solid;
  color: #a8a8ad;
  border-radius: 8px;
  background: white;
  height: 156px;
  width: var(--contentWidth);
  display: flex;
  flex-direction: column;
  gap: 1em;
  justify-content: center;
  align-items: center;
  text-align: center;
  font-size: 0.8em;
  cursor: pointer;
`;

const cssActive = css`
  border-color: #0074d9;
`;

const cssIcon = css`
  font-size: 2em;
`;

const accept = "image/*";

export default function ImageSelector() {
  const { enqueueSnackbar } = useSnackbar();
  const setImg = useStore((state) => state.setImg);
  const onDrop = useCallback<NonNullable<DropzoneOptions["onDrop"]>>(
    (acceptedFiles) => {
      const images = acceptedFiles.filter((file) =>
        file.type.startsWith("image/")
      );
      if (images.length === 0) {
        enqueueSnackbar("Please select an image file.", { variant: "warning" });
        return;
      }
      const src = URL.createObjectURL(images[0]);
      setImg(src);
    },
    [enqueueSnackbar, setImg]
  );
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    multiple: false,
    accept,
  });
  return (
    <div
      {...getRootProps()}
      className={cx(cssImageSelector, isDragActive && cssActive)}
    >
      <input {...getInputProps()} />
      <Image className={cssIcon} />
      <div>{"Drag 'n' drop some files here, or click to select files"}</div>
    </div>
  );
}
