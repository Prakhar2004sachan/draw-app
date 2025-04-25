import React, { useState } from "react";
import {
  PiEyeLight,
  PiMagnetStraightLight,
  PiRulerLight,
} from "react-icons/pi";
import { TbGridDots } from "react-icons/tb";
import { uiStore } from "../store/uiStore";
import { canvasStore } from "../store/canvasStore";
import {Slider} from "@mui/material"

function SideBar() {
  const colors = [
    "#FFD966",
    "#C4D7B2",
    "#B799FF",
    "#F0F8FF",
    "#E0FFFF",
    "#ADD8E6",
    "#87CEFA",
    "#B0E0E6",
    "#FAF0E6",
    "#FFE4C4",
    "#FFDAB9",
    "#EEE8AA",
    "#F5F5DC",
  ];
  const {
    setShowGrid,
    setShowGuides,
    showGrid,
    showGuides,
    fillColor,
    setFillColor,
    snapping,
    setSnapping,
  } = uiStore();
  const { selectedIds, shapes, updateShape } = canvasStore()
  const colorFill = (c) => {
    setFillColor(c);
    console.log(fillColor,c);
    if (!selectedIds || selectedIds.length === 0) return;
    const selected = shapes.filter((shape) => selectedIds.includes(shape.id));
    selected.forEach((item) => {
      updateShape({
        ...item,
        color: c,
      });
    });
  };
  return (
    <div className="absolute top-16 left-10 w-[20rem] bg-[#4C3D3D] rounded-2xl px-4 py-6 flex gap-4 flex-col">
      {/* items */}
      <div className="flex gap-4 flex-col">
        <div className="flex justify-between items-center hover:bg-[#967E76] px-4 py-2 hover:rounded-lg border-b cursor-pointer border-white transition-all duration-300 select-none">
          <p className="text-sm">Show Key Press</p>
          <PiEyeLight className="size-4" />
        </div>
        <div
          className="flex justify-between items-center hover:bg-[#967E76] px-4 py-2 hover:rounded-lg border-b cursor-pointer border-white transition-all duration-300 select-none"
          onClick={() => setShowGrid(!showGrid)}
        >
          <p className="text-sm">Show Grid</p>
          <TbGridDots className="size-4" />
        </div>
        <div
          className="flex justify-between items-center hover:bg-[#967E76] px-4 py-2 hover:rounded-lg border-b cursor-pointer border-white transition-all duration-300 select-none"
          onClick={() => setShowGuides(!showGuides)}
        >
          <p className="text-sm">Show Guides</p>
          <PiRulerLight className="size-4" />
        </div>
        <div
          className="flex justify-between items-center hover:bg-[#967E76] px-4 py-2 hover:rounded-lg border-b cursor-pointer border-white transition-all duration-300 select-none"
          onClick={() => setSnapping(!snapping)}
        >
          <p className="text-sm">Snap to Grid</p>
          <PiMagnetStraightLight className="size-4" />
        </div>
        <div
          className="flex flex-col justify-between hover:bg-[#967E76] px-4 py-2 hover:rounded-lg border-b cursor-pointer border-white transition-all duration-300 select-none"
        >
          <p className="text-sm">Shape Stroke</p>
          <Slider
            size="small"
            defaultValue={4}
            aria-label="Small"
            valueLabelDisplay="auto"
            max={30}
            color="white"
          />
        </div>
        <div
          className="flex flex-col justify-between hover:bg-[#967E76] px-4 py-2 hover:rounded-lg border-b cursor-pointer border-white transition-all duration-300 select-none"
        >
          <p className="text-sm">Shape Opacity</p>
          <Slider
            size="small"
            defaultValue={4}
            aria-label="Small"
            valueLabelDisplay="auto"
            max={30}
            color="white"
          />
        </div>
      </div>
      {/* colors */}
      <div className="flex flex-col gap-2 p-2 ">
        <p className="text-lg">Colors</p>
        <div className="flex flex-wrap items-center gap-2 px-2 ">
          {colors.map((color, index) => (
            <div
              style={{ backgroundColor: color }}
              key={index}
              className={`w-10 h-10 rounded-xl hover:scale-110 active:scale-90 transition-all duration-100 cursor-pointer ${fillColor === color ? "border-2 border-white shadow-sm shadow-white" : ""}`}
              onClick={() => colorFill(color)}
            ></div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default SideBar;
