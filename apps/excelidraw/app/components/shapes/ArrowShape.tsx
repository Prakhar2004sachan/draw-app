import { Shape } from "@/app/utils/shapes/shapeTypes";
import React from "react";
import { Arrow } from "react-konva";

type Props = {
  shape: Shape;
};

function ArrowShape({ shape }: Props) {
  return (
    <Arrow
      id={shape.id}
      points={[shape.x, shape.y, shape.x + shape.width, shape.y + shape.height]}
      fill={"black"}
      stroke={"black"}
      strokeWidth={4}
    />
  );
}

export default ArrowShape;
