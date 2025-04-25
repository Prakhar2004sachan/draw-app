export type ShapeType =
  | "selection"
  | "hand"
  | "rectangle"
  | "diamond"
  | "ellipse"
  | "arrow"
  | "line"
  | "freeDraw"
  | "text"
  | "eraser";

export type Shape = {
  id: string;
  type: ShapeType;
  x: number;
  y: number;
  width: number;
  height: number;
  points?: number[];
  text?: string;
  rotation?: number;
  scaleX?: number;
  scaleY?: number;
  color?: string;
  strokeWidth?: number;
  opacity?: number;
  cornerRadius?: number;
};
