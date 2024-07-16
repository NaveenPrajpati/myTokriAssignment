import React from "react";
import { FaCheck } from "react-icons/fa";
import { IoCheckmark } from "react-icons/io5";

export default function MobileScreen() {
  return (
    <div className="flex flex-col items-center m-10">
      <div className=" relative ">
        {/* phone with strip */}
        <div className=" bg-gray-900 w-[150px] h-[280px] rounded-md relative overflow-hidden ">
          <div className=" w-14 h-[350px] bg-gray-600  rotate-[17deg] mx-auto absolute -top-10 right-11"></div>
          <div className=" bg-gray-500/60 h-16 w-12 top-[116px] rounded-r-sm absolute"></div>
        </div>
        <div className="h-[80px] w-[80px] absolute z-20 bg-slate-300 -right-8 -top-8 rounded-full flex flex-col justify-center items-center">
          <IoCheckmark size={45} />
        </div>

        <div className="flex justify-between items-center bg-gray-100 absolute p-1 top-28 -left-10 gap-x-1 py-6 rounded-sm">
          {Array.from({ length: 4 }).map((item, index) => (
            <div
              key={index}
              className="flex flex-col items-center justify-center gap-y-1"
            >
              <div className="w-2 h-2 bg-black rounded-full"></div>
              <div className="w-5 h-[2px] bg-black "></div>
            </div>
          ))}
        </div>
        <div className="h-[3px] w-[60px] rounded-full right-10 left-10  bg-black bottom-3 absolute"></div>
      </div>

      <p className="mt-2 font-medium">Enter your phone number</p>
    </div>
  );
}
