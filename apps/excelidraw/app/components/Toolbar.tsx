import React from "react";
import { MdOutlineHorizontalRule } from "react-icons/md";
import {
  PiArrowRightLight,
  PiCircleLight,
  PiCursorLight,
  PiCursorTextLight,
  PiDiamondLight,
  PiEraserLight,
  PiHandLight,
  PiPencilSimpleLineLight,
  PiRectangleLight,
} from "react-icons/pi";
import { ShapeType } from "../utils/shapes/shapeTypes";
import { canvasStore } from "../store/canvasStore";

function Toolbar() {
  const { currentTool,setCurrentTool } = canvasStore();
  const tools: { icon: React.ReactNode; type: ShapeType }[] = [
    { icon: <PiCursorLight />, type: "selection" },
    { icon: <PiHandLight />, type: "hand" },
    { icon: <PiRectangleLight />, type: "rectangle" },
    { icon: <PiDiamondLight />, type: "diamond" },
    { icon: <PiCircleLight />, type: "ellipse" },
    { icon: <PiArrowRightLight />, type: "arrow" },
    { icon: <MdOutlineHorizontalRule />, type: "line" },
    { icon: <PiPencilSimpleLineLight />, type: "freeDraw" },
    { icon: <PiCursorTextLight />, type: "text" },
    { icon: <PiEraserLight />, type: "eraser" },
  ];
  return (
    <div className="flex gap-6">
      {tools.map(({ icon, type }) => (
        <div
          key={type}
          className={`cursor-pointer ${currentTool === type ? "text-[#a8a5fe]" : ""}`}
          onClick={()=>{
            setCurrentTool(type)
          }}
        >
          {icon}
        </div>
      ))}
    </div>
  );
}

export default Toolbar;
