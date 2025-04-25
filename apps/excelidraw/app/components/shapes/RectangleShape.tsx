import React from "react";
import { Rect } from "react-konva";
import { Shape } from "../../utils/shapes/shapeTypes";
import { useShapes } from "@/app/hooks/useShapes";
import { useDrawShape } from "@/app/hooks/useDrawShape";

type Props = {
  shape: Shape;
};

function RectangleShape({ shape }: Props) {
  const { shapeRef, isDraggable, handleSelect } = useShapes(shape.id);
  const { handleDragEnd, handleDragMove } = useDrawShape();

  return (
    <Rect
      ref={shapeRef}
      id={shape.id}
      x={shape.x}
      y={shape.y}
      width={shape.width}
      height={shape.height}
      fill={shape.color ? shape.color : "#E9F5BE"}
      cornerRadius={5}
      draggable={isDraggable}
      onClick={handleSelect}
      onTap={handleSelect}
      stroke="black"
      strokeWidth={4}
      onDragEnd={handleDragEnd}
      onDragMove={handleDragMove}
    />
  );
}

export default RectangleShape;
