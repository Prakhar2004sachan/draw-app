import { useEffect, useRef } from "react";
import Konva from "konva";
import { canvasStore } from "../store/canvasStore";
import { uiStore } from "../store/uiStore";
import { Shape } from "../utils/shapes/shapeTypes";
import {
  handleMouseDown,
  handleMouseMove,
  handleMouseUp,
  handleStageClick,
} from "../logic/handleShapeEvents";
import {
  handleDragMove,
  handleDragEnd,
  handleTransformEnd,
} from "../logic/transformUtils";
import { handleKeyDown } from "../logic/handleKeyEvents";

export const useDrawShape = () => {
  const newShapeRef = useRef<Shape | null>(null);
  const isDrawing = useRef(false);
  const transRef = useRef<React.RefObject<Konva.Transformer | null>>(null);

  const { shapeRefs, ...canvasState } = canvasStore();
  const { snapping } = uiStore();

  useEffect(() => {
    const nodes = canvasState.selectedIds
      .map((id) => shapeRefs.get(id)?.current)
      .filter((node): node is Konva.Node => Boolean(node));

    transRef?.current?.nodes(nodes);
    transRef?.current?.getLayer()?.batchDraw();

    window.addEventListener("keydown", (e) =>
      handleKeyDown(
        e,
        canvasState.setSelectedIds,
        canvasState.shapes,
        canvasState.selectedIds
      )
    );

    return () => {
      // @ts-ignore
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [canvasState.selectedIds]);

  return {
    handleMouseDown: (e: Konva.KonvaEventObject<MouseEvent>) =>
      handleMouseDown(e, canvasState, newShapeRef, isDrawing),
    handleMouseMove: (e: Konva.KonvaEventObject<MouseEvent>) =>
      handleMouseMove(e, canvasState, newShapeRef, isDrawing),
    handleMouseUp: () => handleMouseUp(canvasState, newShapeRef, isDrawing),
    handleStageClick: (e: Konva.KonvaEventObject<MouseEvent>) =>
      handleStageClick(e, canvasState),
    handleDragEnd: (e: Konva.KonvaEventObject<MouseEvent>) =>
      handleDragEnd(e, canvasState, snapping),
    handleTransformEnd: (e: Konva.KonvaEventObject<MouseEvent>) =>
      handleTransformEnd(e, canvasState, transRef),
    handleDragMove: (e: Konva.KonvaEventObject<MouseEvent>) =>
      handleDragMove(e, canvasState, snapping),
    transRef,
  };
};
