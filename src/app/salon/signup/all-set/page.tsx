"use client";

import React from "react";
import Image from "next/image";
import {
  Logo,
} from "../../../assets";

const page = () => {

  return (
    <>
      <div className="flex justify-center items-center relative all-set h-screen px-5">
        <div className="bg-white rounded-3xl py-9 lg:px-14 px-3 text-center items-center flex flex-col max-w-96 gap-4">
          <span className="mx-auto text-center block">
            <svg width="80" height="80" viewBox="0 0 95 95" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M47.4983 94.9966C73.7309 94.9966 94.9966 73.7309 94.9966 47.4983C94.9966 21.2657 73.7309 0 47.4983 0C21.2657 0 0 21.2657 0 47.4983C0 73.7309 21.2657 94.9966 47.4983 94.9966Z" fill="#3AA76D" />
              <path d="M41.4612 64.8848L26.7266 50.1501L32.0303 44.8464L41.4612 54.2773L62.9748 32.7637L68.2785 38.0674L41.4612 64.8848Z" fill="white" />
            </svg>
          </span>
          <h3 className="text-[#01041D] lg:text-[28px] text-[24px] mb-0 satoshi-bold">You’re all set</h3>
          <p className="mb-4">Congratulations! Your account has been successfully create. Let’s explore it.</p>
          <button className="bg-[#D78B30] rounded-xl py-3 lg:px-9 px-5 text-white uppercase satoshi-bold">GREAT</button>
        </div>
      </div>
    </>
  );
};

export default page;
