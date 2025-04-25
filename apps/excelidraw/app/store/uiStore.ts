import { create } from "zustand";

type uiStoreProps = {
  // Grid
  showGrid: boolean;
  setShowGrid: (val: boolean) => void;

  // Guides
  showGuides: boolean;
  setShowGuides: (val: boolean) => void;

  // Colors
  fillColor: string;
  setFillColor: (val: string) => void;

  // Snap
  snapping: boolean;
  setSnapping: (val: boolean) => void;

  // Stroke
  strokeWidth: number;
  setStrokeWidth: (value: number) => void;

  // Stroke
  opacity: number;
  setOpacity: (value: number) => void;
};

export const uiStore = create<uiStoreProps>((set) => ({
  showGrid: true,
  setShowGrid: (val) => set({ showGrid: val }),

  showGuides: true,
  setShowGuides: (val) => set({ showGuides: val }),

  fillColor: "#FFD966",
  setFillColor: (val) => set({ fillColor: val }),

  snapping: true,
  setSnapping: (val) => set({ snapping: val }),

  strokeWidth: 4,
  setStrokeWidth: (value) => set({ strokeWidth: value }),

  opacity: 1,
  setOpacity: (value) => set({ opacity: value / 100 }),
}));
