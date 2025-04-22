import React from "react";
import { Shape } from "../../utils/shapes/shapeTypes";
import { Ellipse } from "react-konva";

type Props = {
  shape: Shape;
};

function EllipseShape({ shape }: Props) {
  return (
    <Ellipse
      id={shape.id}
      x={shape.x + shape.width / 2}
      y={shape.y + shape.height / 2}
      radiusX={Math.abs(shape.width) / 2}
      radiusY={Math.abs(shape.height) / 2}
      fill="#F1BA88"
      stroke={"black"}
      strokeWidth={1}
    />
  );
}

export default EllipseShape;
