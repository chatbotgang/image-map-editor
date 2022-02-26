export interface iPosition {
  X: number;
  Y: number;
}

export class Position implements iPosition {
  X: number;
  Y: number;
  constructor(x: number, y: number) {
    this.X = x;
    this.Y = y;
  }
}

export interface iSize {
  width: number;
  height: number;
}

export class Size implements iSize {
  width: number;
  height: number;
  constructor(width: number, height: number) {
    this.width = width;
    this.height = height;
  }
}

export interface iArea {
  position: Position;
  size: Size;
}

export class Area {
  position: Position;
  size: Size;

  constructor(x: number, y: number, width: number, height: number) {
    this.position = new Position(x, y);
    this.size = new Size(width, height);
  }
}
