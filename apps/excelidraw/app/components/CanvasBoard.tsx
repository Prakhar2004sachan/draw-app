"use client";

import { Layer, Stage, Transformer } from "react-konva";
import RectangleShape from "./shapes/RectangleShape";
import { useDrawShape } from "../hooks/useDrawShape";
import { canvasStore } from "../store/canvasStore";
import { useEffect, useRef, useState } from "react";
import EllipseShape from "./shapes/EllipseShape";
import DiamondShape from "./shapes/DiamondShape";
import LineShape from "./shapes/LineShape";
import ArrowShape from "./shapes/ArrowShape";

const CanvasBoard = () => {
  const { handleMouseDown, handleMouseMove, handleMouseUp } = useDrawShape();

  const { setStageRef, shapes } = canvasStore();
  const stageRef = useRef(null);
  const [canvasSize, setCanvasSize] = useState({ width: 0, height: 0 });

  useEffect(() => {
    setCanvasSize({ width: window.innerWidth, height: window.innerHeight });
    setStageRef(stageRef);
    // @ts-ignore
    const container = stageRef.current.container();
    container.style.backgroundColor = "#FAF1E6";
  }, [setStageRef]);

  return (
    <Stage
      width={canvasSize.width}
      height={canvasSize.height}
      onMouseDown={handleMouseDown}
      onMousemove={handleMouseMove}
      onMouseup={handleMouseUp}
      ref={stageRef}
    >
      <Layer>
        {shapes.map((shape) => {
          switch (shape.type) {
            case "rectangle":
              return <RectangleShape key={shape.id} shape={shape} />;
            case "ellipse":
              return <EllipseShape key={shape.id} shape={shape} />;
            case "diamond":
              return <DiamondShape key={shape.id} shape={shape} />;
            case "line":
              return <LineShape key={shape.id} shape={shape} />;
            case "arrow":
              return <ArrowShape key={shape.id} shape={shape} />;
          }
        })}
      </Layer>
    </Stage>
  );
};

export default CanvasBoard;
