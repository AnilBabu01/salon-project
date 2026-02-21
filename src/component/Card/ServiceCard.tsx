import React from "react";
import Image from "next/image";
import { ServiceImg } from "../../app/assets";

function ServiceCard() {
  return (
    <div className="flex justify-between pb-4 border-b border-b-slate-400 mb-4">
      <div className="flex items-center gap-3">
        <Image
          src={ServiceImg} // Path to the image in the public directory
          alt="Description of the image"
          className="w-20"
        />
        <div className="">
          <h4 className="mb-2">Haircut</h4>
          <p className="flex gap-2">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M22 12C22 17.52 17.52 22 12 22C6.48 22 2 17.52 2 12C2 6.48 6.48 2 12 2C17.52 2 22 6.48 22 12Z"
                stroke="#292D32"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M15.7089 15.1798L12.6089 13.3298C12.0689 13.0098 11.6289 12.2398 11.6289 11.6098V7.50977"
                stroke="#292D32"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            34 Min
          </p>
        </div>
      </div>
      <div className="flex gap-4 items-center">
        <h5>$28.00</h5>
        <button
          type="button"
          className="text-white bg-slate-950 rounded-xl uppercase py-2 px-3"
        >
          Add
        </button>
      </div>
    </div>
  );
}

export default ServiceCard;
