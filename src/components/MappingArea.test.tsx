import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";

import MappingArea from "./MappingArea";
import { List } from "immutable";

const dummyImg600x400 =
  "data:image/png;base64,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";

it("should have an img with correct src attribute", async () => {
  render(
    <MappingArea
      deleteMapping={() => {}}
      createMapping={() => {}}
      editMapping={() => {}}
      mappings={List([])}
      image={dummyImg600x400}
      originalImageDimensions={{ width: 600, height: 400 }}
    />
  );

  const imgTag = await screen.findByAltText("you uploaded this");
  expect(imgTag).toHaveAttribute("src", dummyImg600x400);
});

it("should render Mapping component with correct css style", async () => {
  const mappings = List([
    {
      x: 150,
      y: 200,
      width: 300,
      height: 200,
    },
  ]);

  render(
    <MappingArea
      deleteMapping={() => {}}
      createMapping={() => {}}
      editMapping={() => {}}
      mappings={mappings}
      image={dummyImg600x400}
      originalImageDimensions={{
        width: 600,
        height: 400,
      }}
    />
  );

  const mapping = await screen.findByTestId("mappings-0");
  expect(mapping).toHaveStyle({
    left: `25%`,
    top: `50%`,
    width: `${355 / 2}px`,
    height: `${(355 * 400) / 600 / 2}px`,
  });
});

describe("creating a mapping", () => {
  xit("should create a mapping by clicking and draging on the MappingArea", () => {
    // It cannot be tested under jsdom env due to the task
    // is relying on browser apis like `getClientRect`.
    // Instead, try testing it on cypress or puppeteer.
  });
});