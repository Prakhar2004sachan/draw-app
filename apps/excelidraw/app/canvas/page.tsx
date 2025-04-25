"use client";
import CanvasBoard from "../components/CanvasBoard";
import Footer from "../components/Footer";
import NavBar from "../components/NavBar";

export default function CanvasBoardMain() {
  return (
    <div className="w-full h-screen relative overflow-hidden">
      <CanvasBoard />
      <NavBar />
      <Footer/>
    </div>
  );
}
