import { Children } from "react";
import styled from "styled-components";

type Props = {
  children: JSX.Element | JSX.Element[];
};

const OneColumn = styled.div.attrs((props) => ({
  className: props.className,
}))<any>`
  display: flex;
  border-radius: 5px;
  flex-direction: column;
  width: ${(props) => props.width};
  height: ${(props) => props.height};
  ${(props) =>
    props.shadow &&
    `box-shadow: 5px 10px 15px #d8dbe2, -5px 10px 15px #d8dbe2;`}
  background-color: ${(props) => props.bgc};
`;

export const OneColumnGray = ({ children }: Props) => (
  <OneColumn
    className="Left"
    bgc="#f4fafa"
    width="433px"
    height="792px"
    shadow="true"
  >
    {Children.map(children, (child) => (
      <>{child}</>
    ))}
  </OneColumn>
);
export const OneColumnBlack = ({ children }: Props) => (
  <OneColumn className="Right" bgc="#293948" width="548px" height="703px">
    {children}
  </OneColumn>
);
