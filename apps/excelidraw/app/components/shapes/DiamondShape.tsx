import { Shape } from "@/app/utils/shapes/shapeTypes";
import React from "react";
import { Line } from "react-konva";

type Props = {
  shape: Shape;
};

function DiamondShape({ shape }: Props) {
  return (
    <Line
      id={shape.id}
      points={[
        shape.x + shape.width / 2,
        shape.y,
        shape.x + shape.width,
        shape.y + shape.height / 2,
        shape.x + shape.width / 2,
        shape.y + shape.height,
        shape.x,
        shape.y + shape.height / 2,
      ]}
      closed
      fill={"#81E7AF"}
      tension={.08}
      stroke={"black"}
      strokeWidth={1}
    />
  );
}

export default DiamondShape;
