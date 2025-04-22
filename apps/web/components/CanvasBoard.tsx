"use client";

import { useEffect, useRef, useState } from "react";
import { Stage, Layer, Line } from "react-konva";
import { v4 as uuidv4 } from "uuid";

const userId = uuidv4(); // unique ID per user session

export default function CanvasBoard() {
  const [cursors, setCursors] = useState<
    Record<string, { x: number; y: number }>
  >({});
  const ws = useRef<WebSocket | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("token"); // your auth token
    if (!token) return;

    const socket = new WebSocket(`ws://localhost:3001?token=${token}`);
    ws.current = socket;

    socket.onmessage = (event) => {
      const data = JSON.parse(event.data);

      if (data.type === "CURSOR_MOVE") {
        setCursors((prev) => ({
          ...prev,
          [data.userId]: { x: data.x, y: data.y },
        }));
      }
    };

    return () => {
      socket.close();
    };
  }, []);

  const handleMouseMove = (e: any) => {
    const stage = e.target.getStage();
    const pointerPos = stage.getPointerPosition();
    if (!pointerPos || !ws.current) return;

    ws.current.send(
      JSON.stringify({
        type: "CURSOR_MOVE",
        userId,
        x: pointerPos.x,
        y: pointerPos.y,
      })
    );
  };

  return (

      <Stage width={500} height={500}>
        <Layer>
          <Line
            points={[5, 70, 140, 23, 250, 60, 300, 20]}
            stroke="red"
            strokeWidth={15}
            lineCap="round"
            lineJoin="round"
          />
          <Line
            points={[5, 70, 140, 23, 250, 60, 300, 20]}
            stroke="green"
            strokeWidth={2}
            lineJoin="round"
            dash={[33, 10]}
            y={50}
          />
        </Layer>
      </Stage>
  );
}
