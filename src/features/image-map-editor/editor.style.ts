import styled from 'styled-components';

export const Layout = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`;

export const Left = styled.div`
  flex: 0 0 433px;
  height: 792px;
  margin-right: 135px;
  border-radius: 8px;
  overflow: hidden;
  background: #F4F9FA;
`;

export const LeftHeader = styled.div`
  display: inline-flex;
  align-items: center;
  padding: 0 30px;
  background: #EBF0F3;
  width: 100%;
  height: 56px;
`;

export const Avatar = styled.div`
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background: #ccc;
`;

export const Right = styled.div`
  flex: 0 0 548px;
  min-height: 300px;
`;
