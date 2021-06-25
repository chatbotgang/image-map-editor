import { Children } from "react";
import styled from "styled-components";

type Props = {
  children: JSX.Element | JSX.Element[];
};

const OneColumn = styled.div.attrs((props) => ({
  className: props.className,
}))<any>`
  display: flex;
  flex-direction: column;
  background-color: ${(props) => props.bgc};
`;

export const OneColumnGray = ({ children }: Props) => (
  <OneColumn className="Left" bgc="#f4fafa">
    {Children.map(children, (child) => (
      <>{child}</>
    ))}
  </OneColumn>
);
export const OneColumnBlack = ({ children }: Props) => (
  <OneColumn className="Right" bgc="#293948">
    {children}
  </OneColumn>
);
