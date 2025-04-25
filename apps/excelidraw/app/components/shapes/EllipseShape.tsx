import React from "react";
import { Shape } from "../../utils/shapes/shapeTypes";
import { Ellipse } from "react-konva";
import { useShapes } from "@/app/hooks/useShapes";
import { useDrawShape } from "@/app/hooks/useDrawShape";

type Props = {
  shape: Shape;
};

function EllipseShape({ shape }: Props) {
  const { shapeRef, isDraggable, handleSelect } = useShapes(shape.id);
  const { handleDragEnd, handleDragMove } = useDrawShape();

  // Use x and y as top-left corner (not center)
  const x = shape.x + Math.abs(shape.width) / 2; // Centering horizontally
  const y = shape.y + Math.abs(shape.height) / 2; // Centering vertically

  return (
    <Ellipse
      ref={shapeRef}
      id={shape.id}
      x={x} // Set X to top-left corner
      y={y} // Set Y to top-left corner
      radiusX={Math.abs(shape.width) / 2}
      radiusY={Math.abs(shape.height) / 2}
      fill={shape.color ? shape.color : "#F1BA88"}
      draggable={isDraggable}
      onClick={handleSelect}
      onDragEnd={handleDragEnd}
      onDragMove={handleDragMove}
      stroke={"black"}
      strokeWidth={4}
    />
  );
}

export default EllipseShape;
