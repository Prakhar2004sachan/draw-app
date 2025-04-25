import { KonvaEventObject } from "konva/lib/Node";
import { useEffect, useRef } from "react";
import { canvasStore } from "../store/canvasStore";
import Konva from "konva";

export function useShapes(shapeId: string) {
  const shapeRef = useRef<Konva.Shape>(null);
  const {
    selectedIds,
    setSelectedIds,
    transformerRef,
    setShapeRefs,
    currentTool,
    setIsSelected,
  } = canvasStore();

  const isSelected = selectedIds.includes(shapeId);

  useEffect(() => {
    setShapeRefs(shapeId, shapeRef);
    if (isSelected && transformerRef?.current) {
      transformerRef.current.nodes([shapeRef.current]);
      transformerRef.current.getLayer().batchDraw();
    }
  }, [isSelected, transformerRef, shapeId, setShapeRefs]);

  const handleSelect = (e: KonvaEventObject<MouseEvent | TouchEvent>) => {
    if (currentTool === "selection") {
      if (selectedIds.includes(shapeId)) {
        setSelectedIds(selectedIds.filter((id) => id !== shapeId));
        setIsSelected(shapeId);
      } else {
        setSelectedIds([shapeId]);
      }
    }
  };

  // Define whether the shape is draggable
  const isDraggable = currentTool === "selection" && isSelected;
  return { isDraggable, handleSelect, shapeRef, isSelected };
}
