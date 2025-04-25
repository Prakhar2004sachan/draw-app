import React, { useEffect, useState } from "react";
import {
  PiArrowBendUpLeftLight,
  PiArrowBendUpRightLight,
  PiLineVerticalLight,
  PiMinusLight,
  PiPlusLight,
} from "react-icons/pi";
import { useZoom } from "../hooks/useZoom";
import { canvasStore } from "../store/canvasStore";

function Footer() {
  const { zoomIn, zoomOut, resetZoom } = useZoom();
  const [totalS, setTotalS] = useState(0);
  const { zoomPercent, shapes } = canvasStore();
  useEffect(() => {
    setTotalS(shapes.length);
  }, [shapes]);

  return (
    <div className="absolute bottom-8 px-8 flex justify-between w-full z-10">
      <div className="flex gap-4">
        <div className="bg-[#4C3D3D] px-8 py-3 flex items-center gap-4 rounded-xl">
          <PiMinusLight
            onClick={zoomOut} // Decrease zoom by 10%
            className="cursor-pointer"
          />
          <p
            onClick={resetZoom} // Reset zoom to 100%
            className="cursor-pointer"
          >
            {zoomPercent}%
          </p>
          <PiPlusLight
            onClick={zoomIn} // Increase zoom by 10%
            className="cursor-pointer hover:text-white"
          />
        </div>

        <div className="bg-[#4C3D3D] px-8 py-3 flex rounded-xl items-center justify-between gap-4">
          <PiArrowBendUpLeftLight className="cursor-pointer" />
          <PiLineVerticalLight className="text-zinc-500" />
          <PiArrowBendUpRightLight className="cursor-pointer" />
        </div>
      </div>

      <div className="bg-[#4C3D3D] px-8 py-3 rounded-xl text-sm flex items-center">
        Total Shapes: {totalS}
      </div>
    </div>
  );
}

export default Footer;
