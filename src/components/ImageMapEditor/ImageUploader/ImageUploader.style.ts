import styled from 'styled-components';
import { Image as ImageIcon } from '../../Icons';

export const ImageInput = styled.input.attrs({
  type: 'file',
  accept: 'image/*',
})`
  display: none;
`;

export const StyledImageIcon = styled(ImageIcon)`
  width: 24px;
  height: 24px;
  margin-bottom: 8px;
`;

export const Button = styled.div.attrs({
  role: 'button',
})`
  margin: 0 auto;
  width: 355px;
  height: 156px;
  border: 2px solid rgb(221, 222, 226);
  border-radius: 8px;
  background-color; white;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: rgb(152, 157, 159);
  background-color: white;
  cursor: pointer;
`;
