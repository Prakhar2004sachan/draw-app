import { useDrawShape } from "@/app/hooks/useDrawShape";
import { useShapes } from "@/app/hooks/useShapes";
import { canvasStore } from "@/app/store/canvasStore";
import { Shape } from "@/app/utils/shapes/shapeTypes";
import React from "react";
import { Line } from "react-konva";

type Props = {
  shape: Shape;
};

function DiamondShape({ shape }: Props) {
  const { shapeRef, isDraggable, handleSelect, } = useShapes(shape.id);
  const { handleDragEnd, handleDragMove } = useDrawShape();

  // diamond relative points (centered)
  const points = [
    shape.width / 2,
    0,
    shape.width,
    shape.height / 2,
    shape.width / 2,
    shape.height,
    0,
    shape.height / 2,
  ];

  return (
    <Line
      ref={shapeRef}
      id={shape.id}
      x={shape.x}
      y={shape.y}
      points={points}
      closed
      fill={shape.color ? shape.color : "#81E7AF"}
      tension={0.05}
      stroke={"black"}
      strokeWidth={shape.strokeWidth}
      draggable={isDraggable}
      onClick={handleSelect}
      onDragEnd={handleDragEnd}
      onDragMove={handleDragMove}
      opacity={shape.opacity}
    />
  );
}

export default DiamondShape;
