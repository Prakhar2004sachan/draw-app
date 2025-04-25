import { canvasStore } from "../store/canvasStore";

export const handleKeyDown = (
  e: any,
  setSelectedIds: any,
  shapes: any,
  selectedIds: any
) => {
  if (e.code === "Delete" || e.code === "Backspace") {
    e.preventDefault();
    console.log("Deleting...")
    const updatedShapes = shapes.filter(
      (shape: any) => !selectedIds.includes(shape.id)
    );
    setSelectedIds([]);
    canvasStore.setState({ shapes: updatedShapes });
  }
  if (e.shiftKey && e.code === "KeyD") {
    e.preventDefault();
    console.log("Duplicating...")
      const newShapes = shapes
        .filter((shape:any) => selectedIds.includes(shape.id))
        .map((shape:any) => ({
          ...shape,
          id: `${shape.id}-${Math.random().toString(36).substr(2, 5)}`, // give unique id
          x: shape.x + 20, // offset so it’s not on top
          y: shape.y + 20,
        }));
    canvasStore.setState({ shapes: [...shapes, ...newShapes] });
    setSelectedIds(newShapes.map((shape:any) => shape.id));
  }
};
