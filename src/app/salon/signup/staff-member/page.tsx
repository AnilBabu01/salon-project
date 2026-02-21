"use client";

import React from "react";
import Image from "next/image";
import {
  Logo,
  ServiceImg
} from "../../../assets";
import { useRouter } from "next/navigation";

const page = () => {
  const router = useRouter();

  return (
    <>
      <div className="flex justify-center py-5 border-b border-[#D8D8D8]">
        <Image
          className="w-44"
          src={Logo} // Path to the image in the public directory
          alt="Description of the image"
        />
      </div>
      <div className="flex md:gap-0 md:flex-row flex-col relative">
        <div className="w-full h-screen py-10">
          <div className="px-7 lg:w-1/2 mx-auto relative">
            <a href="#" className="block rounded-full lg:absolute left-3 lg:left-0 p-2 bg-[#F1F1F1] bg-opacity w-10 h-10 lg:mb-0 mb-5">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M9.57 5.93018L3.5 12.0002L9.57 18.0702" stroke="#292D32" strokeWidth="2" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M20.4999 12H3.66992" stroke="#292D32" strokeWidth="2" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>
            <div className="lg:flex flex-col justify-center items-center">
              <div className="lg:text-[28px] text-[25px] leading-10 font-bold text-center mb-1 lg:mb-2 satoshi-bold ">
                Add more staff members
              </div>
              <p className="satoshi-regular mx-auto lg:text-[16px] text-[14px] text-black text-opacity-70 tracking-tight max-w-md text-center">Add basic information about your team. You'll be able to complete their profiles, assign services, and adjust working hours later on.</p>

              <form className="w-full max-w-lg lg:mt-12 mt-8 mx-auto">
                <div className="flex flex-wrap  mb-6 ">
                  <div className="py-4 border-b w-full">
                    <h4>Jason Mann</h4>
                    <p>Owner</p>
                  </div>

                  <div className="flex justify-between w-full py-4 border-b border-b-slate-400">
                    <div className="flex items-center gap-1">
                      <a href="#" className="lg:mr-4 mr-2">
                        <svg width="15" height="15" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M1 17L9 9L0.999999 1" stroke="#9C9C9C" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                          <path d="M17 17L9 9L17 1" stroke="#9C9C9C" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </a>
                      <Image
                        src={ServiceImg}
                        alt="Description of the image"
                        className="w-14 rounded-full"
                      />
                      <div className="ml-4">
                        <h4 className="mb-0 text-[16px] satoshi-bold">Marvin McKinney</h4>
                        <p className="flex gap-2 satoshi-regular">Hair Stylist</p>
                      </div>
                    </div>
                    <div className="flex gap-4 items-center">
                      <h5 className="text-[#D78B30] satoshi-medium">Info</h5>
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

                  <div className="flex justify-between w-full py-4 border-b border-b-slate-400 ">
                    <div className="flex items-center gap-1">
                      <a href="#" className="lg:mr-4 mr-2">
                        <svg width="15" height="15" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M1 17L9 9L0.999999 1" stroke="#9C9C9C" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                          <path d="M17 17L9 9L17 1" stroke="#9C9C9C" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </a>
                      <Image
                        src={ServiceImg}
                        alt="Description of the image"
                        className="w-14 rounded-full"
                      />
                      <div className="ml-4">
                        <h4 className="mb-0 text-[16px] satoshi-bold">Marvin McKinney</h4>
                        <p className="flex gap-2 satoshi-regular">Hair Stylist</p>
                      </div>
                    </div>
                    <div className="flex gap-4 items-center">
                      <h5 className="text-[#D78B30] satoshi-medium">Info</h5>
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

                </div>
                
                <div className="flex justify-between items-center w-full mt-9">
                  <a href="#" className="uppercase text-[#D78B30] satoshi-bold text-[15px] flex gap-2 items-center">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M6 12H18" stroke="#D78B30" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      <path d="M12 18V6" stroke="#D78B30" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    ADD NEW SERVICES
                  </a>
                  <button
                    onClick={() => router.push("/salon/signup/all-set")}
                    className="bg-[#D78B30] rounded-xl py-3 px-6 text-white uppercase satoshi-bold"
                  >CONTINUE</button>
                </div>
              </form>

            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default page;
