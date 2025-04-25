"use client";

import { Stage } from "react-konva";
import { useDrawShape } from "../hooks/useDrawShape";
import { canvasStore } from "../store/canvasStore";
import { useEffect, useRef, useState } from "react";
import GridLayer from "./GridLayer";
import SnapGuideLines from "./SnapGuideLines";
import { useZoom } from "../hooks/useZoom";
import { useKeyboardShortcuts } from "../hooks/useKeyboardShortcuts";
import ShapeLayer from "./ShapeLayer";
import { uiStore } from "../store/uiStore";

const CanvasBoard = () => {
  const { handleMouseDown, handleMouseMove, handleMouseUp, handleStageClick } =
    useDrawShape();

  const {
    setStageRef,
    transformerRef,
    setTransformerRef,
    selectedIds,
    isSelected,
    zoomPercent,
  } = canvasStore();
  const stageRef = useRef(null);
  const [canvasSize, setCanvasSize] = useState({ width: 0, height: 0 });
  const { handleWheel } = useZoom();
  const { showGrid, showGuides } = uiStore();

  useKeyboardShortcuts(selectedIds[0] || null);
  useEffect(() => {
    setCanvasSize({ width: window.innerWidth, height: window.innerHeight });
    setStageRef(stageRef);
    // @ts-ignore
    const container = stageRef.current.container();
    container.style.backgroundColor = "#FDF7E4";
    // container.style.backgroundColor = "#FAF1E6";
    // container.style.backgroundColor = "#121212";
  }, [setStageRef, stageRef, setTransformerRef, transformerRef, isSelected]);

  return (
    <Stage
      width={canvasSize.width}
      height={canvasSize.height}
      onMouseDown={handleMouseDown}
      onMousemove={handleMouseMove}
      onMouseup={handleMouseUp}
      onClick={handleStageClick}
      ref={stageRef}
      onWheel={handleWheel}
    >
      {showGrid && (
        <GridLayer
          width={canvasSize.width}
          height={canvasSize.height}
          scale={zoomPercent / 100}
          stageX={stageRef.current?.x() || 0}
          stageY={stageRef.current?.y() || 0}
        />
      )}
      {showGuides && (
        <SnapGuideLines
          stageWidth={canvasSize.width}
          stageHeight={canvasSize.height}
          scale={zoomPercent / 100}
          stageX={stageRef.current?.x() || 0}
          stageY={stageRef.current?.y() || 0}
        />
      )}

      <ShapeLayer />
    </Stage>
  );
};

export default CanvasBoard;
