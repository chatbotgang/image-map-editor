import React from "react";
import { render, screen } from "@testing-library/react";
import ImageMapEditor from "./ImageMapEditor";

it("renders without crash", () => {
  expect(() => {
    render(<ImageMapEditor />);
  }).not.toThrow();
});
