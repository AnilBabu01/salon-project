import React from "react";
import Image from "next/image";
import { ServiceImg } from "../../app/assets";

function TeamBox() {
  return (
    <div className="flex justify-between pb-4 border-b border-b-slate-400 mb-4">
      <div className="flex items-center gap-3">
        <Image
          src={ServiceImg}
          alt="Description of the image"
          className="w-20 rounded-full"
        />
        <div className="ml-4">
          <h4 className="mb-1">Marvin McKinney</h4>
          <p className="flex gap-2 font-semibold">Hair Stylist</p>
        </div>
      </div>
      <div className="flex gap-4 items-center">
        <h5 className="text-[#D78B30]">Info</h5>
        <a href="#">
          <svg
            width="9"
            height="16"
            viewBox="0 0 9 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M1.08984 14.1016L7.21653 7.97488L1.08984 1.84819"
              stroke="#9C9C9C"
              strokeWidth="2.0051"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </a>
      </div>
    </div>
  );
}

export default TeamBox;
