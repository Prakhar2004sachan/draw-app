import { useDrawShape } from "@/app/hooks/useDrawShape";
import { useShapes } from "@/app/hooks/useShapes";
import { Shape } from "@/app/utils/shapes/shapeTypes";
import React from "react";
import { Arrow } from "react-konva";

type Props = {
  shape: Shape;
};

function ArrowShape({ shape }: Props) {
  const { shapeRef, isDraggable, handleSelect } = useShapes(shape.id);
       const {handleDragEnd} = useDrawShape();
  
  return (
    <Arrow
      ref={shapeRef}
      id={shape.id}
      points={[shape.x, shape.y, shape.x + shape.width, shape.y + shape.height]}
      fill={"black"}
      stroke={"black"}
      strokeWidth={shape.strokeWidth}
      draggable={isDraggable}
      onClick={handleSelect}
      onDragEnd={handleDragEnd}
      opacity={shape.opacity}
    />
  );
}

export default ArrowShape;
