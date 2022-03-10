import { css } from "@emotion/css";
import Convert from "ansi-to-html";
import omit from "lodash/omit";
import { useMemo } from "react";
import useStore from "useStore";
import { inspect } from "util";

const convert = new Convert();

const cssConsole = css`
  width: 548px;
  height: 703px;
  background: rgb(44, 57, 71);
  border-radius: 2px;
  border: 1px solid rgb(103, 109, 119);
  padding: 32px;
  color: white;
  overflow: auto;
  font-size: 0.8em;
`;

export default function Console() {
  const blocks = useStore(({ blocks }) => blocks);
  const code = useMemo(
    () =>
      inspect(
        blocks.map((block) => omit(block, "id")),
        false,
        Infinity,
        true
      ),
    [blocks]
  );
  const html = useMemo(() => ({ __html: convert.toHtml(code) }), [code]);
  return (
    <pre className={cssConsole}>
      <code dangerouslySetInnerHTML={html} />
    </pre>
  );
}
