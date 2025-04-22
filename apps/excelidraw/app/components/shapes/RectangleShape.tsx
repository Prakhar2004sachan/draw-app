import React from "react";
import { Rect } from "react-konva";
import { Shape } from "../../utils/shapes/shapeTypes";

type Props = {
  shape: Shape;
};

function RectangleShape({ shape }: Props) {
  return (
    <Rect
      id={shape.id}
      x={shape.x}
      y={shape.y}
      width={shape.width}
      height={shape.height}
      fill="#E9F5BE"
      cornerRadius={15}
      stroke={"black"}
      strokeWidth={1}
    />
  );
}

export default RectangleShape;
