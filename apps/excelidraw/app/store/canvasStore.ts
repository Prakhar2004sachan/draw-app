import React from "react";
import { Shape, ShapeType } from "../utils/shapes/shapeTypes";
import { create } from "zustand";

type CanvasStoreProps = {
  shapes: Shape[];
  addShape: (shape: Shape) => void;
  updateShape: (updatedShape: Shape) => void;

  // stage ref
  stageRef: React.RefObject<any> | null;
  setStageRef: (ref: React.RefObject<any>) => void;

  isSelecting: boolean;
  setIsSelecting: (val: boolean) => void;

  // transformer ref
  transformerRef: any;
  setTransformerRef: (ref: any) => void;

  // selected id
  selectedIds: string[];
  setSelectedIds: (val: string[]) => void;

  // shapeRef
  shapeRefs: Map<string, any>;
  setShapeRefs: (id: string, ref: any) => void;

  // currenttool
  currentTool: ShapeType;
  setCurrentTool: (val: ShapeType) => void;
};

export const canvasStore = create<CanvasStoreProps>((set) => ({
  currentTool: "selection",
  setCurrentTool: (tool) => set({ currentTool: tool }),

  shapeRefs: new Map(),
  setShapeRefs: (id, ref) =>
    set((state) => {
      const updatedMap = new Map(state.shapeRefs);
      updatedMap.set(id, ref);
      return { shapeRefs: updatedMap };
    }),

  selectedIds: [],
  setSelectedIds: (val) => set({ selectedIds: val }),

  transformerRef: null,
  setTransformerRef: (ref) => set({ transformerRef: ref }),

  isSelecting: false,
  setIsSelecting: (val) => set({ isSelecting: val }),

  stageRef: null,
  setStageRef: (ref) => set({ stageRef: ref }),

  shapes: [],
  addShape: (shape) => set((state) => ({ shapes: [...state.shapes, shape] })),
  updateShape: (updatedShape) =>
    set((state) => ({
      shapes: state.shapes.map((s) =>
        s.id === updatedShape.id ? updatedShape : s
      ),
    })),
}));
