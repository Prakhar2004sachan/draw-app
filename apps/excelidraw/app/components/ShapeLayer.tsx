import React, { useEffect, useRef } from "react";
import { Layer, Rect, Transformer } from "react-konva";
import RectangleShape from "./shapes/RectangleShape";
import EllipseShape from "./shapes/EllipseShape";
import DiamondShape from "./shapes/DiamondShape";
import LineShape from "./shapes/LineShape";
import ArrowShape from "./shapes/ArrowShape";
import FreeDraw from "./shapes/FreeDrawShape";
import TextShape from "./shapes/TextShape";
import { canvasStore } from "../store/canvasStore";
import { useDrawShape } from "../hooks/useDrawShape";
import Konva from "konva";

function ShapeLayer() {
  const {
    shapes,
    updateShape,
    selectionRectangle,
    currentTool,
    isSelected,
    zoomPercent,
    transformerRef,
    setTransformerRef,
    stageRef,
    selectedIds,
    shapeRefs,
  } = canvasStore();
  const localTransRef = useRef<any>(null);
  const { handleTransformEnd, transRef } = useDrawShape();
  
  useEffect(() => {
    console.log(shapes);
    setTransformerRef(localTransRef);
    if (!transRef?.current) return;

    const transformer = transRef.current;
    if (!stageRef) return;
    const stage = stageRef.current;
    if (!stage) return;

    const nodes = shapes
      .filter((shape) => selectedIds.includes(shape.id))
      .map((shape) => {
        const shapeRef = shapeRefs.get(shape.id)?.current;
        return shapeRef || null;
      })
      .filter((node): node is Konva.Node => node !== null);

    // @ts-ignore
    transformer.nodes(nodes);

    // @ts-ignore
    const layer = transformer.getLayer();
    if (layer) {
      // @ts-ignore
      transformer.moveToTop();
      layer.batchDraw();
    }
  }, [
    selectedIds,
    transformerRef,
    shapes,
    zoomPercent,
    localTransRef,
    stageRef,
    isSelected,
  ]);

  return (
    <Layer>
      {currentTool === "selection" && isSelected && (
        <Transformer
          ref={transRef}
          anchorCornerRadius={10}
          boundBoxFunc={(oldBox, newBox) => {
            // Limit resize
            if (newBox.width < 5 || newBox.height < 5) {
              return oldBox;
            }
            return newBox;
          }}
          onTransformEnd={(e) => handleTransformEnd(e)}
        />
      )}
      {shapes.map((shape) => {
        switch (shape.type) {
          case "rectangle":
            return <RectangleShape key={shape.id} shape={shape} />;
          case "ellipse":
            return <EllipseShape key={shape.id} shape={shape} />;
          case "diamond":
            return <DiamondShape key={shape.id} shape={shape} />;
          case "line":
            return <LineShape key={shape.id} shape={shape} />;
          case "arrow":
            return <ArrowShape key={shape.id} shape={shape} />;
          case "freeDraw":
            return <FreeDraw key={shape.id} shape={shape} />;
          case "text":
            return (
              <TextShape
                key={shape.id}
                shape={shape}
                onChange={(updatedShapeI: any) => {
                  const newShapes = shapes.map((s) =>
                    s.id === updatedShapeI.id ? updatedShapeI : s
                  );
                  updateShape({
                    ...updatedShapeI,
                    newShapes,
                  });
                }}
              />
            );
        }
      })}

      {selectionRectangle.visible && (
        <Rect
          x={Math.min(selectionRectangle.x1, selectionRectangle.x2)}
          y={Math.min(selectionRectangle.y1, selectionRectangle.y2)}
          width={Math.abs(selectionRectangle.x2 - selectionRectangle.x1)}
          height={Math.abs(selectionRectangle.y2 - selectionRectangle.y1)}
          fill="#242329"
          cornerRadius={10}
          opacity={0.3}
        />
      )}
    </Layer>
  );
}

export default ShapeLayer;
