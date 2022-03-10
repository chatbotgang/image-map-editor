import { css } from "@emotion/css";

const cssHeader = css`
  height: 56px;
  padding: 8px 32px;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  background: rgb(236, 240, 243);
`;

const cssCircle = css`
  --size: 24px;
  border-radius: 50%;
  height: 24px;
  width: 24px;
  background: rgb(213, 218, 222);
`;

export default function Header() {
  return (
    <div className={cssHeader}>
      <div className={cssCircle} />
    </div>
  );
}
