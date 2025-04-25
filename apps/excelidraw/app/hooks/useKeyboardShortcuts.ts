import { useEffect } from "react";
import { canvasStore } from "../store/canvasStore";

export const useKeyboardShortcuts = (selectedId: string | null) => {
  const { shapes, setShapes } = canvasStore();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!selectedId) return;

      if (e.key === "[") {
        setShapes((prev: typeof shapes) => {
          const i = prev.findIndex((s) => s.id === selectedId);
          if (i === -1 || i === prev.length - 1) return prev;
          const newShapes = [...prev];
          [newShapes[i], newShapes[i + 1]] = [newShapes[i + 1], newShapes[i]];
          return newShapes;
        });
      } else if (e.key === "]") {
        setShapes((prev: typeof shapes) => {
          const i = prev.findIndex((s) => s.id === selectedId);
          if (i <= 0) return prev;
          const newShapes = [...prev];
          [newShapes[i], newShapes[i - 1]] = [newShapes[i - 1], newShapes[i]];
          return newShapes;
        });
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedId, setShapes]);
};
