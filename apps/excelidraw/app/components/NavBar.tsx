import React from "react";
import {
  PiBookOpenLight,
  PiDownloadSimpleLight,
  PiLineVerticalLight,
  PiLockLight,
} from "react-icons/pi";
import { Button } from "@repo/ui/button";
import { HiOutlineBars3CenterLeft } from "react-icons/hi2";
import Toolbar from "./Toolbar";

function NavBar() {
  return (
    <div className="w-full flex absolute top-3 items-center justify-between text-zinc-100 left-1/2 -translate-x-1/2 px-10 z-10">
      <div className="bg-[#242329] p-4 rounded-xl">
        <HiOutlineBars3CenterLeft className="cursor-pointer" />
      </div>
      <div className="flex gap-8 bg-[#242329] py-4 px-8 rounded-2xl">
        <div>
          <PiLockLight className="cursor-pointer" />
        </div>
        <PiLineVerticalLight className="text-zinc-500" />
        <Toolbar />
        <PiLineVerticalLight className="text-zinc-500" />
        <PiDownloadSimpleLight className="cursor-pointer" />
      </div>
      <div className="flex gap-4">
        <Button
          title={"share"}
          showIcon={false}
          className={
            "bg-[#a8a5fe] text-black text-sm py-2 px-6 rounded-xl cursor-pointer"
          }
        />
        <Button
          icon={<PiBookOpenLight className="size-4" />}
          showIcon={true}
          title="library"
          className={
            "bg-[#242329] py-2 px-6 rounded-xl text-sm flex gap-3 items-center justify-center cursor-pointer"
          }
        />
      </div>
    </div>
  );
}

export default NavBar;
