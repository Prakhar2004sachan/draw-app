import React, { useState } from 'react'
import { PiArrowBendUpLeftLight, PiArrowBendUpRightLight, PiLineVerticalLight, PiMinusLight, PiPlusLight } from 'react-icons/pi';

function Footer() {
  const [zoomPercent, setZoomPercent] = useState<number>(100);

  return (
    <div className="absolute bottom-8 left-8 flex gap-4 z-10">
      <div className="bg-[#242329] px-8 py-3 flex items-center gap-4 rounded-xl">
        <PiMinusLight 
          onClick={() =>
            // @ts-ignore
            setZoomPercent((prev) => (prev > 10 ? prev - 10 : (prev = 100)))
          }
          className="cursor-pointer"
        />
        <p
          onClick={() => {
            setZoomPercent(100);
          }}
          className="cursor-pointer"
        >
          {zoomPercent}%
        </p>
        <PiPlusLight 
          onClick={() => setZoomPercent((prev) => prev + 10)}
          className="cursor-pointer"
        />
      </div>
      <div className="bg-[#242329] px-8 py-3 flex rounded-xl items-center justify-between gap-4">
        <PiArrowBendUpLeftLight className='cursor-pointer'/>
        <PiLineVerticalLight className='text-zinc-500'/>
        <PiArrowBendUpRightLight className='cursor-pointer'/>
      </div>
    </div>
  );
}

export default Footer