"use client";
import CanvasBoard from "../components/CanvasBoard";
import NavBar from "../components/NavBar";

export default function CanvasBoardMain() {
  return (
    <div className="w-full h-screen relative overflow-hidden">
      <CanvasBoard />
      <NavBar />
    </div>
  );
}
