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
  key: string;

  constructor(x: number, y: number, width: number, height: number) {
    this.position = new Position(x, y);
    this.size = new Size(width, height);
    this.key = this._uuid();
  }

  _uuid() {
    var d = Date.now();
    if (
      typeof performance !== "undefined" &&
      typeof performance.now === "function"
    ) {
      d += performance.now();
    }
    return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(
      /[xy]/g,
      function (c) {
        var r = (d + Math.random() * 16) % 16 | 0;
        d = Math.floor(d / 16);
        return (c === "x" ? r : (r & 0x3) | 0x8).toString(16);
      }
    );
  }
}
