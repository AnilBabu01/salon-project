"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import {
  Logo,
} from "../../../assets";
import { useBusinessHours } from "@/hooks/useApi";
import { useRouter } from "next/navigation";
import axios from "axios";

const page = () => {
  const router = useRouter();
  const { data, error } = useBusinessHours();
  const [listHr, setListHr] = useState<any[]>([]);
  const [selectedHr, setSelectedHr] = useState<any[]>([]);

  console.log({ data, error });

  useEffect(() => {
    setListHr(data?.data ?? []);
    setSelectedHr(data?.selected ?? []);
  }, [data]);

  const handleUpdateHr = (e: any) => {
    e.preventDefault();
    axios.post("/api/salon/business-hr", {
      hours: selectedHr
    }).then(r => {
      console.log({ r });
      router.push("/salon/signup/add-service");
    })
      .catch(e => { });
  };

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
            <div onClick={() => router.push("/salon/signup/address")} className="block rounded-full lg:absolute left-3 lg:left-0 p-2 bg-[#F1F1F1] bg-opacity w-10 h-10 lg:mb-0 mb-5">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M9.57 5.93018L3.5 12.0002L9.57 18.0702" stroke="#292D32" strokeWidth="2" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M20.4999 12H3.66992" stroke="#292D32" strokeWidth="2" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <div className="lg:flex flex-col justify-center items-center">
              <div className="lg:text-[28px] text-[25px] leading-10 font-bold text-center mb-1 lg:mb-2 satoshi-bold ">
                Your business hours
              </div>
              <p className="satoshi-regular mx-auto lg:text-[16px] text-[14px] text-black text-opacity-70 tracking-tight max-w-80 text-center">When can clients book with you?</p>

              <form className="w-full max-w-lg lg:mt-8 mt-4 mx-auto">
                <div className="flex flex-wrap mb-6 ">

                  {listHr?.map((l, i) => <div key={i} className="flex justify-between items-center w-full py-4 border-b">
                    <div className="flex items-center justify-center">
                      <label htmlFor={l.day} className="flex items-center cursor-pointer">
                        <div className="relative">
                          <input
                            onChange={(e) => {
                              if (e.target.checked) {
                                setSelectedHr(p => [...p, l._id]);
                              } else {
                                setSelectedHr(p => p.filter(id => id != l._id));
                              }
                            }}
                            type="checkbox"
                            checked={selectedHr.includes(l._id)}
                            id={l.day}
                            className="sr-only"
                          />
                          <div className="block bg-[#D0D0D0] lg:w-12 lg:h-8 w-11 h-8 rounded-full"></div>
                          <div className="dot absolute left-1 top-1 bg-white w-6 h-6 rounded-full transition"></div>
                        </div>
                        <div className="ml-3 text-black text-opacity-70 lg:text-[16px] text-[14px] satoshi-black">
                          {l.day}
                        </div>
                      </label>
                    </div>

                    {l?.startTime
                      ? <h4 className="satoshi-medium text-black text-opacity-80 lg:text-[16px] text-[14px]">{l?.startTime} - {l?.endTime}</h4>
                      : <h4 className="satoshi-medium text-[#FF217E] lg:text-[16px] text-[14px]">Closed</h4>}

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
                  </div>)}

                </div>
                <button
                  onClick={handleUpdateHr}
                  className="bg-[#D78B30] rounded-xl py-3 w-full text-white uppercase satoshi-bold">CONTINUE</button>
              </form>

            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default page;
