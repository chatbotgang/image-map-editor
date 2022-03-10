import { css, cx } from "@emotion/css";
import type { ComponentPropsWithoutRef } from "react";

export type ButtonProps = ComponentPropsWithoutRef<"button">;

const cssButton = css`
  --color: #ccc;
  --bgColor: #666;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  border: 1px solid var(--color);
  border-radius: 8px;
  background-color: var(--bgColor);
  color: var(--color);
  cursor: pointer;
  gap: 0.5em;
  padding: 4px 8px;
`;

const cssDisabled = css`
  --color: #bbb;
  --bgColor: #999;
  cursor: not-allowed;
`;

export default function Button({ className, disabled, ...props }: ButtonProps) {
  const cls = cx(cssButton, disabled && cssDisabled, className);
  return <button className={cls} {...props} />;
}
