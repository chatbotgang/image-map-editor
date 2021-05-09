import styled from 'styled-components';

export const Container = styled.main`
  width: 433px;
  min-height: 792px;
  background-color: rgb(244, 249, 250);
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0px 11px 15px 0px rgba(112, 112, 112, 0.33);
`;

export const Header = styled.div`
  height: 56px;
  background-color: rgb(235, 240, 243);
  display: flex;
  align-items: center;
  padding: 0 28px;
`;

export const Body = styled.div`
  padding-top: 56px;
`;

export const Avatar = styled.div`
  background-color: rgb(212, 218, 222);
  width: 24px;
  height: 24px;
  border-radius: 50%;
`;

export const ImageInput = styled.input.attrs({
  type: 'file',
  accept: 'image/*',
})`
  display: none;
`;

export const ImageUploader = styled.div`
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
`;
