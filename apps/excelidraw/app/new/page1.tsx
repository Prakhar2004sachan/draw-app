"use client";
import { useEffect, useRef } from "react";
import { canvasStore } from "../store/canvasStore";
import { useText } from "../hooks/useText";

export default function EditableTextOverlay() {
  const { handleCanvasClick, handleBlur, handleFocus } = useText();
  const {
    canvasRef,
    setCanvasRef,
    showInput,
    textInputRef,
    setTextInputRef,
    textPosition,
    isPlaceholder
  } = canvasStore();
  const localTextInputRef = useRef(null);
  const localCanvasRef = useRef<any>(null);

  useEffect(() => {
    setTextInputRef(localTextInputRef);
    setCanvasRef(localCanvasRef);
    if (!canvasRef) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    ctx.fillStyle = "#FAF1E6";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  }, [textInputRef, canvasRef]);

  return (
    <div style={{ position: "relative" }}>
      <canvas ref={localCanvasRef} onClick={handleCanvasClick} />
      {showInput && (
        <div
          ref={localTextInputRef}
          contentEditable
          suppressContentEditableWarning
          onBlur={handleBlur}
          onFocus={handleFocus}
          style={{
            position: "absolute",
            left: textPosition.x,
            top: textPosition.y,
            minWidth: 200,
            minHeight: 100,
            fontSize: 20,
            background: "white",
            border: "1px solid #ccc",
            padding: "24px",
            borderRadius: "12px",
            color: isPlaceholder ? "#999" : "black",
            outline: "none",
            direction: "ltr",
            textAlign: "left",
            zIndex: 10,
          }}
        >
          Type something...
        </div>
      )}
    </div>
  );
}
