import React, { useState } from "react";
import { AiOutlineSave } from "react-icons/ai";
import { PiCursorText } from "react-icons/pi";
import { useForm } from "react-hook-form";
import { RiSendPlaneFill } from "react-icons/ri";

function SavingModal() {
  const [input, setInput] = useState<boolean>(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
     console.log("✅ Saved as:", data.fileName);
  };

  return (
    <div className="absolute top-10 right-0 bg-[#4C3D3D] p-4 rounded-2xl w-[15rem] flex gap-4 flex-col">
      <div className="flex justify-between items-center cursor-pointer hover:bg-[#967E76] px-4 py-2 hover:rounded-lg transition-all duration-500">
        <p className="text-sm">Save</p>
        <AiOutlineSave className="size-4" />
      </div>
      <div className="flex flex-col w-full gap-2">
        <div
          className="flex justify-between items-center cursor-pointer hover:bg-[#967E76] px-4 py-2 hover:rounded-lg transition-all duration-500"
          onClick={() => setInput(!input)}
        >
          <p className="text-sm">Rename</p>
          <PiCursorText className="size-4" />
        </div>
        {input && (
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex gap-4 items-center px-2"
          >
            <input
              {...register("fileName")}
              className="outline-none border border-white w-full rounded-lg p-2"
            />
            <button type="submit">
              <RiSendPlaneFill className="size-6 text-white cursor-pointer" />
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

export default SavingModal;
