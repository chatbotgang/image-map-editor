import { useCallback, Dispatch } from 'react';
import DropZone from 'react-dropzone';
import style from 'styled-components';
import ImageIcon from '../icons/ImageIcon';
import { AppAction, ActionEnum } from '../store/appContext';

const DropHint = style.div`
  width: 355px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 156px;
  color: #a8a8ad;
  border: 2px solid #dadadf;
  border-radius: 8px;
  background: #ffffff;
  box-sizing: border-box;
  cursor: pointer;
`;

function Uploader(props: { dispatch: Dispatch<AppAction> }) {
  const {
    dispatch,
  } = props;
  const onDrop = useCallback((accepted, rejected) => {
    if (accepted && accepted.length > 0) {
      const file = URL.createObjectURL(accepted[0]);
      dispatch({ type: ActionEnum.SET_IMAGE_SRC, payload: file });
    }
  }, [dispatch]);

  return (
    <>
      <DropZone
        accept="image/*"
        multiple={false}
        onDrop={onDrop}
      >
        {({getRootProps, getInputProps}) => (
          <DropHint {...getRootProps()}>
            <input {...getInputProps()} />
            <ImageIcon />
            <div>Upload image</div>
          </DropHint>
        )}
      </DropZone>
    </>
  );
}

export default Uploader;
