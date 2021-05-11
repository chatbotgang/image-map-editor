import React from 'react';
import { Header, Body, Avatar, Container } from './Main.style';

export interface Props {
  children?: React.ReactNode;
}

const Main = ({ children }: Props): JSX.Element => (
  <Container>
    <Header>
      <Avatar />
    </Header>
    <Body>{children}</Body>
  </Container>
);

export default Main;
