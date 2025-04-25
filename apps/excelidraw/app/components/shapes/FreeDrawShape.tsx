import { useDrawShape } from "@/app/hooks/useDrawShape";
import { useShapes } from "@/app/hooks/useShapes";
import { canvasStore } from "@/app/store/canvasStore";
import { Shape } from "@/app/utils/shapes/shapeTypes";
import React from "react";
import { Line } from "react-konva";

type Props = {
  shape: Shape;
};

function FreeDraw({ shape }: Props) {
  const { shapeRef, isDraggable, handleSelect } = useShapes(
    shape.id
  );
  const { lines } = canvasStore();
  const { handleDragEnd } = useDrawShape();

  return (
    <>
      {lines.map((line, i) => (
        <Line
          onClick={handleSelect}
          draggable={isDraggable}
          ref={shapeRef}
          key={i}
          id={shape.id}
          points={line.points}
          stroke={"black"}
          strokeWidth={line.tool === "eraser" ? 30 : 4}
          tension={0.3}
          lineCap="round"
          lineJoin="round"
          globalCompositeOperation={
            line.tool === "eraser" ? "destination-out" : "source-over"
          }
        />
      ))}
    </>
  );
}

export default FreeDraw;
