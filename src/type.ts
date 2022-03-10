export interface Block {
  x: number;
  y: number;
  width: number;
  height: number;
}

export type BlockWithId = Block & { id: string };
