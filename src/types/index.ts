export type Object = {
  [key: string]: any;
};

export type Rectangle = {
  id: string;
  x: number;
  y: number;
  width: number;
  height: number;
  isHovered: boolean;
  isSelected: boolean;
};
