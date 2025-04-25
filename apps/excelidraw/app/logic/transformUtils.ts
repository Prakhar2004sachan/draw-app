import Konva from "konva";
import { canvasStore } from "../store/canvasStore";
import { getSnapOffset, SNAP_THRESHOLD, snapToGrid } from "../utils/snapUtils";

export const handleDragEnd = (
  e: Konva.KonvaEventObject<MouseEvent>,
  state: any,
  snapping: any
) => {
  // snapping logic + update shape pos
  const node = e.target;
  const id = node.id();

  if (state?.selectedIds.length > 1) return;

  const shape = state?.shapes.find((s) => s.id === id);
  if (!shape) return;

  if (snapping) {
    const scale = state?.zoomPercent / 100;
    const spacing = 50 / scale;

    if (
      shape.type === "ellipse" ||
      shape.type === "line" ||
      shape.type === "arrow"
    ) {
      state.clearSnapLines();
      return;
    }

    const rawX = snapToGrid(node.x(), spacing);
    const rawY = snapToGrid(node.y(), spacing);

    const otherXs = state?.shapes
      .filter((s) => s.id !== id)
      .flatMap((s) => [s.x, s.x + (s.width || 0)]);

    const otherYs = state?.shapes
      .filter((s) => s.id !== id)
      .flatMap((s) => [s.y, s.y + (s.height || 0)]);

    const snappedX = getSnapOffset(rawX, otherXs);
    const snappedY = getSnapOffset(rawY, otherYs);

    state?.updateShape({
      ...shape,
      x: snappedX,
      y: snappedY,
    });
  } else {
    if (shape.type === "ellipse") return;
    state?.updateShape({
      ...shape,
      x: node.x(),
      y: node.y(),
    });
  }
  state.clearSnapLines();
};

export const handleTransformEnd = (e: any, state: any, transRef) => {
  // update shape size/rotation
  console.log(transRef?.current);
  if (!transRef?.current) return;

  const nodes = transRef?.current.nodes();
  nodes.forEach((node: Konva.Node) => {
    const id = node.id();
    const index = state.shapes.findIndex((shape: any) => shape.id === id);
    if (index === -1) return;

    const shape = state.shapes[index];
    const scaleX = (node as any).scaleX();
    const scaleY = (node as any).scaleY();

    // Reset the scale so future transforms are relative to new size
    (node as any).scaleX(1);
    (node as any).scaleY(1);

    let updatedShape = { ...shape };

    switch (shape.type) {
      case "rectangle":
      case "ellipse":
      case "diamond":
      case "line":
      case "arrow":
        console.log("rect");
        updatedShape = {
          ...shape,
          x: (node as any).x(),
          y: (node as any).y(),
          width: shape.width * scaleX,
          height: shape.height * scaleY,
          rotation: (node as any).rotation?.() || 0,
        };
        break;

      case "freeDraw":
        // Assuming freeDraw also uses points and is scaled similarly
        const points = (node as any).points?.() || shape.points;
        const newPoints = points.map((point: number, index: number) =>
          index % 2 === 0 ? point * scaleX : point * scaleY
        );

        updatedShape = {
          ...shape,
          x: (node as any).x(),
          y: (node as any).y(),
          points: newPoints,
          rotation: (node as any).rotation?.() || 0,
        };
        break;

      default:
        updatedShape = {
          ...shape,
          x: (node as any).x(),
          y: (node as any).y(),
          rotation: (node as any).rotation?.() || 0,
        };
        break;
    }

    state.updateShape(updatedShape);
  });

  // optional: redraw transformer layer
  transRef.current.getLayer()?.batchDraw();
};

export const handleDragMove = (
  e: Konva.KonvaEventObject<MouseEvent>,
  state: any,
  snapping: any
) => {
  // show snap lines dynamically
  const node = e.target;
  const id = node.id();

  if (state.selectedIds.length > 1) return;

  if (snapping) {
    const scale = state.zoomPercent / 100;
    const spacing = 50 / scale;

    const otherXs = state.shapes
      .filter((s: any) => s.id !== id)
      .flatMap((s: any) => [s.x, s.x + (s.width || 0)]);
    const otherYs = state.shapes
      .filter((s: any) => s.id !== id)
      .flatMap((s: any) => [s.y, s.y + (s.height || 0)]);

    const rawX = snapToGrid(node.x(), spacing);
    const rawY = snapToGrid(node.y(), spacing);

    const snappedX = getSnapOffset(rawX, otherXs);
    const snappedY = getSnapOffset(rawY, otherYs);

    const isSnapX = Math.abs(snappedX - rawX) < SNAP_THRESHOLD;
    const isSnapY = Math.abs(snappedY - rawY) < SNAP_THRESHOLD;

    node.position({ x: snappedX, y: snappedY });

    state.setSnapLines({
      x: isSnapX ? snappedX : null,
      y: isSnapY ? snappedY : null,
    });
  }
};
