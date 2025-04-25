import React from "react";
import { Shape, ShapeType } from "../utils/shapes/shapeTypes";
import { create } from "zustand";

type LineType = {
  points: number[];
  tool: ShapeType;
};

type SelectionRectangleType = {
  visible: boolean;
  x1: number;
  y1: number;
  x2: number;
  y2: number;
};

type CanvasStoreProps = {
  shapes: Shape[];
  addShape: (shape: Shape) => void;
  updateShape: (updatedShape: Shape) => void;
  setShapes: (updater: (prev: Shape[]) => Shape[]) => void;

  lines: LineType[];
  setLines: (lines: LineType[]) => void;
  addLine: (line: LineType) => void;
  updateLastLine: (points: number[]) => void;

  isSelected: string[];
  setIsSelected: (id: string) => void;

  isPanning: boolean;
  setIsPanning: (val: boolean) => void;

  textPosition: { x: number; y: number };
  setTextPosition: (x: number, y: number) => void;

  isPlaceholder: boolean;
  setIsPlaceholder: (val: boolean) => void;

  textInputRef: any;
  setTextInputRef: (ref: any) => void;

  showInput: boolean;
  setShowInput: (val: boolean) => void;

  canvasRef: React.RefObject<any> | null;
  setCanvasRef: (ref: React.RefObject<any>) => void;

  activeTextId: string | null;
  setActiveTextId: (id: string) => void;

  // stage ref
  stageRef: React.RefObject<any> | null;
  setStageRef: (ref: React.RefObject<any>) => void;

  isSelecting: boolean;
  setIsSelecting: (val: boolean) => void;

  // transformer ref
  // transformerRef: any;
  // setTransformerRef: (ref: any) => void;
  transformerRef: { current: null };
  setTransformerRef: (ref: any) => void;

  // selected id
  selectedIds: string[];
  setSelectedIds: (updater: ((prev: string[]) => string[]) | string[]) => void;

  // shapeRef
  shapeRefs: Map<string, any>;
  setShapeRefs: (id: string, ref: any) => void;

  // selection rectangle
  selectionRectangle: SelectionRectangleType;
  setSelectionRectangle: (
    updater:
      | ((prev: SelectionRectangleType) => SelectionRectangleType)
      | SelectionRectangleType
  ) => void;

  // currenttool
  currentTool: ShapeType;
  setCurrentTool: (val: ShapeType) => void;

  // rulers
  snapLines: { x: number | null; y: number | null };
  setSnapLines: (lines: { x: number | null; y: number | null }) => void;
  clearSnapLines: () => void;

  // Zoom
  zoomPercent: number;
  setZoomPercent: (val: number) => void;

};

export const canvasStore = create<CanvasStoreProps>((set) => ({
  
  isPanning: false,
  setIsPanning: (val) => set({ isPanning: val }),

  zoomPercent: 100,
  setZoomPercent: (val) => set({ zoomPercent: val }),

  snapLines: { x: null, y: null },
  setSnapLines: (lines) => set({ snapLines: lines }),
  clearSnapLines: () => set({ snapLines: { x: null, y: null } }),

  isSelected: [],
  setIsSelected: (id: string) =>
    set((state) => ({
      isSelected: state.isSelected.includes(id)
        ? state.isSelected.filter((shapeId) => shapeId !== id)
        : [...state.isSelected, id],
    })),

  selectionRectangle: { visible: false, x1: 0, y1: 0, x2: 0, y2: 0 },
  setSelectionRectangle: (updater) => {
    if (typeof updater === "function") {
      set((state) => ({
        selectionRectangle: updater(state.selectionRectangle),
      }));
    } else {
      set({ selectionRectangle: updater });
    }
  },

  lines: [],
  setLines: (lines) => set({ lines }),
  addLine: (line) => set((state) => ({ lines: [...state.lines, line] })),
  updateLastLine: (points) =>
    set((state) => {
      const updatedLines = [...state.lines];
      const lastLine = updatedLines.pop();
      if (lastLine) {
        updatedLines.push({ ...lastLine, points });
      }
      return { lines: updatedLines };
    }),

  textPosition: { x: 0, y: 0 },
  setTextPosition: (pos1, pos2) => set({ textPosition: { x: pos1, y: pos2 } }),

  isPlaceholder: true,
  setIsPlaceholder: (val) => set({ isPlaceholder: val }),

  textInputRef: null,
  setTextInputRef: (val) => set({ textInputRef: val }),

  showInput: false,
  setShowInput: (val) => set({ showInput: val }),

  canvasRef: null,
  setCanvasRef: (ref) => set({ canvasRef: ref }),

  activeTextId: null,
  setActiveTextId: (id) => set({ activeTextId: id }),

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
  setSelectedIds: (updater) => {
    if (typeof updater === "function") {
      set((state) => ({ selectedIds: updater(state.selectedIds) }));
    } else {
      set({ selectedIds: updater });
    }
  },

  transformerRef: { current: null },
  setTransformerRef: (ref) => set({ transformerRef: ref }),

  isSelecting: false,
  setIsSelecting: (val) => set({ isSelecting: val }),

  stageRef: null,
  setStageRef: (ref) => set({ stageRef: ref }),

  shapes: [],
  addShape: (shape) => set((state) => ({ shapes: [...state.shapes, shape] })),
  setShapes: (updater) => set((state) => ({ shapes: updater(state.shapes) })),
  updateShape: (updatedShape) =>
    set((state) => ({
      shapes: state.shapes.map((s) =>
        s.id === updatedShape.id ? updatedShape : s
      ),
    })),
}));
