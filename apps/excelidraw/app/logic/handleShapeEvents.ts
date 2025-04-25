import Konva from "konva";
import { Shape } from "../utils/shapes/shapeTypes";
import { getTransformedPointer, setCursor } from "./reqFunc";
import React from "react";

export const handleMouseDown = (
  e: Konva.KonvaEventObject<MouseEvent>,
  state: any,
  newShapeRef: React.RefObject<Shape | null>,
  isDrawing: React.RefObject<boolean>
) => {
  // stage ref & pointer
  const stage = state.stageRef?.current;
  if (!stage) return;
  const pointer = getTransformedPointer(stage);
  setCursor("default", stage);

  // selection vs shape tool logic
  const tool = state.currentTool;
  if (tool === "selection") {
    isDrawing.current = false;
    stage.container().style.cursor = "move";

    // If clicked on shape, dont start box select
    if (e.target !== stage) return;

    state.setIsSelecting(true);
    state.setSelectionRectangle({
      visible: true,
      x1: pointer.x,
      y1: pointer.y,
      x2: pointer.x,
      y2: pointer.y,
    });
    return;
  }

  //   Drawing mode
  isDrawing.current = true;
  stage.container().style.cursor = "crosshair";

  //   FreeDraw or Eraser
  if (tool === "freeDraw" || tool === "eraser") {
    console.log("freedraw");
    const newLine = {
      tool: tool,
      points: [pointer.x, pointer.y],
    };
    state.setLines([...state.lines, newLine]);
    console.log(state.lines, state.setLines);
    return;
  }

  //   Add new shape
  const shape: Shape = {
    id: `Shape-${Date.now()}`,
    type: tool,
    x: pointer.x,
    y: pointer.y,
    width: 0,
    height: 0,
    text: state.currentTool === "text" ? "Enter Your Text" : "",
  };
  newShapeRef.current = shape;
};

export const handleMouseMove = (
  e: Konva.KonvaEventObject<MouseEvent>,
  state: any,
  newShapeRef: React.RefObject<Shape | null>,
  isDrawing: React.RefObject<boolean>
) => {
  // Resize / draw shapes
  const stage = state.stageRef?.current;
  const pointer = getTransformedPointer(stage);

  const tool = state.currentTool;
  if (tool === "selection" && !state.isSelecting) return;

  //   Selection tool selecting rectangle
  if (tool === "selection" && state.isSelecting) {
    setCursor("move", stage);
    state.setSelectionRectangle((prev: any) => ({
      ...prev,
      x2: pointer.x,
      y2: pointer.y,
    }));
    return;
  }

  if (!isDrawing.current || !newShapeRef.current) return;

  //   Drawing
  stage.container().style.cursor = "crosshair";

  //   FreeDraw or Eraser
  if (tool === "freeDraw" || tool === "eraser") {
    console.log("freedraw move");
    const lines = state.lines;
    state.updateLastLine([
      ...lines[lines.length - 1].points,
      pointer.x,
      pointer.y,
    ]);
    console.log(lines, state.updateLastLine);
    return;
  }

  //   add shape
  const shape = newShapeRef.current;
  const newWidth = pointer.x - shape.x;
  const newHeight = pointer.y - shape.y;

  //   save it
  if (
    !state.shapes.some((s) => s.id === shape.id) &&
    (Math.abs(newWidth) > 1 || Math.abs(newHeight) > 1)
  ) {
    state.addShape(shape);
  }

  state.updateShape({
    ...shape,
    width: newWidth,
    height: newHeight,
  });
};

export const handleMouseUp = (
  state: any,
  newShapeRef: React.RefObject<Shape | null>,
  isDrawing: React.RefObject<boolean>
) => {
  const stage = state.stageRef?.current;
  setCursor("default", stage);
  console.log(stage);
  // finalize shape or selection
  if (newShapeRef.current) {
    const shapeW = Math.abs(newShapeRef.current?.width);
    const shapeH = Math.abs(newShapeRef.current?.height);
    if (newShapeRef.current && (shapeW < 1 || shapeH < 1)) {
      shapes: state.shapes.filter((s) => s.id !== newShapeRef.current!.id);
    }
    newShapeRef.current = null;
    isDrawing.current = false;
  }

  const tool = state.currentTool;
  console.log(state.isSelecting);
  if (!state.isSelecting || tool !== "selection") return;

  state?.setIsSelecting(false);
  const selRectangle = state.selectionRectangle;
  const selBox = {
    x: Math.min(selRectangle.x1, selRectangle.x2),
    y: Math.min(selRectangle.y1, selRectangle.y2),
    width: Math.abs(selRectangle.x2 - selRectangle.x1),
    height: Math.abs(selRectangle.y2 - selRectangle.y1),
  };

  const selected = state.shapes.filter((shape: any) => {
    const shapeBox = {
      x: shape.x,
      y: shape.y,
      width: shape.width,
      height: shape.height,
    };

    return Konva.Util.haveIntersection(selBox, shapeBox);
  });
  const maps = selected.map((rect: any) => rect.id);
  state.setSelectedIds([...maps]);

  state?.setSelectionRectangle((prev: any) => ({ ...prev, visible: false }));
};

export const handleStageClick = (
  e: Konva.KonvaEventObject<MouseEvent>,
  state: any
) => {
  // selection logic with ctrl/shift
  if (state.selectionRectangle.visible) return;
  const clickedId = e.target.id();
  const metaPressed = e.evt.shiftKey || e.evt.ctrlKey;
  const isSelected = state.selectedIds.includes(clickedId);

  if (e.target === e.target.getStage()) {
    state.setSelectedIds([]);
    return;
  }
  if (!metaPressed && !isSelected) {
    console.log(
      "!metaPressed && !isSelected",
      metaPressed && isSelected,
      e.target
    );
    state.setSelectedIds([clickedId]);
  } else if (metaPressed && isSelected) {
    console.log("metaPressed && isSelected", metaPressed && isSelected);
    state.setSelectedIds(
      state.selectedIds.filter((id: string) => id !== clickedId)
    );
  } else if (metaPressed && !isSelected) {
    console.log("metaPressed && !isSelected", metaPressed && isSelected);
    state.setSelectedIds([...state.selectedIds, clickedId]);
  }
};
