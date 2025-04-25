"use client";

import React, { useEffect, useRef } from "react";

const FabricTextTool = () => {
  const canvasRef = useRef(null);
  const fabricRef = useRef(null); // to hold the imported fabric module

  useEffect(() => {
    const loadFabric = async () => {
      const { fabric } = await import("fabric"); // ← dynamic import
      fabricRef.current = fabric;

      const canvas = new fabric.Canvas(canvasRef.current, {
        width: window.innerWidth,
        height: window.innerHeight,
        selection: true,
      });

      // Add text on click
      canvas.on("mouse:down", function (options) {
        if (options.target) return; // don’t add text over existing objects

        const pointer = canvas.getPointer(options.e);
        const text = new fabric.IText("Double-click to edit", {
          left: pointer.x,
          top: pointer.y,
          fontSize: 20,
          fill: "#333",
          editable: true,
        });

        canvas.add(text).setActiveObject(text);
      });
    };

    loadFabric();

    // No cleanup for now, but you could do canvas.dispose() on unmount if needed
  }, []);

  return (
    <div>
      <h2 style={{ textAlign: "center" }}>Fabric.js Text Tool 🎨</h2>
      <canvas ref={canvasRef} />
    </div>
  );
};

export default FabricTextTool;
