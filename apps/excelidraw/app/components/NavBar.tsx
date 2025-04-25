import React, { useState } from "react";
import {
  PiBookOpenLight,
  PiDownloadSimpleLight,
  PiFileLight,
  PiLineVerticalLight,
  PiShareNetworkLight,
} from "react-icons/pi";
import { Button } from "@repo/ui/button";
import { HiOutlineBars3CenterLeft } from "react-icons/hi2";
import Toolbar from "./Toolbar";
import SideBar from "./SideBar";

function NavBar() {
  const [showSideBar, setShowSideBar] = useState<boolean>(false)
  return (
    <div className="w-full flex absolute top-3 items-center justify-between text-zinc-100 left-1/2 -translate-x-1/2 px-10 z-10">
      <div className="bg-[#4C3D3D] p-4 rounded-xl">
        <HiOutlineBars3CenterLeft className="cursor-pointer text-white" onClick={()=>setShowSideBar(!showSideBar)}/>
        {
          showSideBar && <SideBar/>
        }
      </div>
      <div className="flex gap-8 bg-[#4C3D3D] py-4 px-8 rounded-2xl">
        <div>
          <PiFileLight className="cursor-pointer text-white" />
        </div>
        <PiLineVerticalLight className="text-zinc-300" />
        <Toolbar />
        <PiLineVerticalLight className="text-zinc-300" />
        <PiDownloadSimpleLight className="cursor-pointer" />
      </div>
      <div className="flex gap-4">
        <Button
          title={"share"}
          showIcon={true}
          icon={<PiShareNetworkLight className="size-4" />}
          className={
            "bg-[#4C3D3D] py-2 px-6 rounded-xl text-sm flex gap-3 items-center justify-center cursor-pointer"
          }
        />
        <Button
          icon={<PiBookOpenLight className="size-4" />}
          showIcon={true}
          title="library"
          className={
            "bg-[#4C3D3D] py-2 px-6 rounded-xl text-sm flex gap-3 items-center justify-center cursor-pointer"
          }
        />
      </div>
    </div>
  );
}

export default NavBar;
