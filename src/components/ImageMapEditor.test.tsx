import React from "react";
import { render } from "@testing-library/react";
import ImageMapEditor from "./ImageMapEditor";

it("renders without crash", () => {
  expect(() => {
    render(
      <ImageMapEditor onImageUpload={() => {}} mappings={[]} uploadedImage="" />
    );
  }).not.toThrow();
});
