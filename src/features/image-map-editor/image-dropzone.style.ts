import styled from 'styled-components';
import { AiFillPicture } from 'react-icons/ai';

export const Root = styled.div`
  cursor: pointer;
  display: grid;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 150px;
  background: #fff;
  border: 1px solid #b4b4b4;
  border-radius: 8px;
  color: #b4b4b4;
`;

export const HelperMessage = styled.p`
  display: grid;
  gap: 8px;
  font-size: 16px;
`;

export const UploadIcon = styled(AiFillPicture)`
  margin: 0 auto;
  width: 24px;
  height: 24px;
`;
