export type ActionMap<M extends { [index: string]: any }> = {
  [Key in keyof M]: M[Key] extends undefined
    ? {
        type: Key;
      }
    : {
        type: Key;
        payload: M[Key];
      };
};

export type Point = {
  x: number;
  y: number;
};

export type Dimension = {
  width: number;
  height: number;
};

export interface Coordinate extends Point, Dimension {
  id: string;
}
