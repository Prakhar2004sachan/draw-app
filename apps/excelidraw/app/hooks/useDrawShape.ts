import { useEffect, useRef, useState } from "react";
import Konva from "konva";
import { canvasStore } from "../store/canvasStore";
import { Shape } from "../utils/shapes/shapeTypes";

export const useDrawShape = () => {
  const newShapeRef = useRef<Shape | null>(null);
  const {
    shapes,
    selectedIds,
    setSelectedIds,
    transformerRef,
    stageRef,
    isSelecting,
    setIsSelecting,
    addShape,
    updateShape,
    currentTool,
  } = canvasStore();
  const isDrawing = useRef(false);
  const getPointer = (): { x: number; y: number } | null => {
    const stage = stageRef?.current;
    if (!stage) return null;
    const transform = stage.getAbsoluteTransform().copy().invert();
    const pos = stage.getPointerPosition();
    console.log(transform.point(pos));
    return pos ? transform.point(pos) : null;
  };

  const handleMouseDown = (e) => {
    const stage = stageRef?.current;
    if (!stage) return;

    const pointer = getPointer();
    if (!pointer) return;

    isDrawing.current = true;
    e.target.getStage().container().style.cursor = "crosshair";
    const shape: Shape = {
      id: `Shape-${Date.now()}`,
      type: currentTool,
      x: pointer.x,
      y: pointer.y,
      width: 0,
      height: 0,
      text: currentTool === "text" ? "Enter Your Text" : "",
    };
    addShape(shape);
    newShapeRef.current = shape;
    console.log("adding shape: ", shape);
  };

  const handleMouseMove = (e) => {
    const stage = stageRef?.current;
    if (!stage) return;

    const pointer = getPointer();
    if (!pointer) return;

    if (!isDrawing.current) return;
    if (!newShapeRef) return;

    const shape = newShapeRef.current;
    if (!shape) return;

    e.target.getStage().container().style.cursor = "crosshair";

    const newWidth = pointer.x - shape?.x;
    const newHeight = pointer.y - shape?.y;

    updateShape({
      ...shape,
      width: newWidth,
      height: newHeight,
    });
  };

  const handleMouseUp = (e) => {
      isDrawing.current = false;
      newShapeRef.current = null;
      e.target.getStage().container().style.cursor = "default";
  };

  return {
    handleMouseDown,
    handleMouseMove,
    handleMouseUp,
  };
};
