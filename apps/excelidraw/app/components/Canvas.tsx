"use client";
import dynamic from "next/dynamic";

const Canvas = dynamic(
  () => import("./CanvasBoard"), // Replace './CanvasBoard' with the actual path to your component
  { ssr: false }
);

export default Canvas;
