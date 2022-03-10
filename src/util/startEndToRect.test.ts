import startEndToRect from "./startEndToRect";

describe("test", () => {
  it("x positive, y positive", () => {
    expect(
      startEndToRect({
        startX: 1,
        startY: 2,
        endX: 3,
        endY: 4,
      })
    ).toEqual({
      x: 1,
      y: 2,
      width: 2,
      height: 2,
    });
  });
  it("x positive, y zero", () => {
    expect(
      startEndToRect({
        startX: 1,
        startY: 2,
        endX: 3,
        endY: 2,
      })
    ).toEqual({
      x: 1,
      y: 2,
      width: 2,
      height: 0,
    });
  });
  it("x position, y negative", () => {
    expect(
      startEndToRect({
        startX: 1,
        startY: 2,
        endX: 3,
        endY: 0,
      })
    ).toEqual({
      x: 1,
      y: 0,
      width: 2,
      height: 2,
    });
  });
  it("x zero, y position", () => {
    expect(
      startEndToRect({
        startX: 1,
        startY: 2,
        endX: 1,
        endY: 4,
      })
    ).toEqual({
      x: 1,
      y: 2,
      width: 0,
      height: 2,
    });
  });
  it("x zero, y zero", () => {
    expect(
      startEndToRect({
        startX: 1,
        startY: 2,
        endX: 1,
        endY: 2,
      })
    ).toEqual({
      x: 1,
      y: 2,
      width: 0,
      height: 0,
    });
  });
  it("x zero, y negative", () => {
    expect(
      startEndToRect({
        startX: 1,
        startY: 2,
        endX: 1,
        endY: 0,
      })
    ).toEqual({
      x: 1,
      y: 0,
      width: 0,
      height: 2,
    });
  });
  it("x negative, y negative", () => {
    expect(
      startEndToRect({
        startX: 1,
        startY: 2,
        endX: 0,
        endY: 0,
      })
    ).toEqual({
      x: 0,
      y: 0,
      width: 1,
      height: 2,
    });
  });
});
