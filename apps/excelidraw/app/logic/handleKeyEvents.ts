import { canvasStore } from "../store/canvasStore";

export const handleKeyDown = (
  e: any,
  setSelectedIds: any,
  shapes: any,
  selectedIds: any
) => {
  if (e.code === "Delete" || e.code === "Backspace") {
    e.preventDefault();
    const updatedShapes = shapes.filter(
      (shape: any) => !selectedIds.includes(shape.id)
    );
    setSelectedIds([]);
    canvasStore.setState({ shapes: updatedShapes });
  }
  if (e.code === "Shift" && e.code === "keyD") {
    e.preventDefault();
      const updatedShape = shapes
        .filter((shape: any) => selectedIds.includes(shape.id))
        .map((shape: any) => ({
          ...shape,
        }));
    selectedIds([]);
    canvasStore.setState({ shapes: [...shapes, updatedShape] });
  }
};
