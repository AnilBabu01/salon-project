"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import {
  Logo,
} from "../../../assets";
import { useBusinessTypes } from "@/hooks/useApi";
import axios from "axios";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useSession } from "next-auth/react";

const page = () => {
  const router = useRouter();
  const session = useSession();
  const { data, error, isLoading } = useBusinessTypes();
  const [types, setTypes] = useState<string[]>([]);
  console.log({ data, types, session });

  useEffect(() => { setTypes(data?.selected?.map(d => d) ?? []); }, [data?.selected]);

  const handleSubmit = (e: any) => {
    // @ts-ignore
    e.preventDefault();
    axios.post("/api/salon/add-info", { types })
      .then(r => {
        if (r.data.message) router.push("/salon/signup/business-info");
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
            <Link href="/" className="block rounded-full lg:absolute left-3 lg:left-0 p-2 bg-[#F1F1F1] bg-opacity w-10 h-10 lg:mb-0 mb-5">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M9.57 5.93018L3.5 12.0002L9.57 18.0702" stroke="#292D32" strokeWidth="2" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M20.4999 12H3.66992" stroke="#292D32" strokeWidth="2" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </Link>
            <div className="lg:flex flex-col justify-center items-center">
              <div className="lg:text-[28px] text-[25px] leading-10 font-bold text-center satoshi-bold mb-0">
                Tell us about your business
              </div>
              <form className="w-full max-w-lg lg:mt-8 mt-4">

                <div className="flex flex-wrap -mx-3 mb-6">
                  {data?.data?.sort()?.map(d => <div key={d._id} className="flex items-center space-x-3 py-6 border-b w-full">
                    <input type="checkbox" checked={types.includes(d._id)}
                      onClick={() => {
                        if (types.includes(d._id)) setTypes(p => p.filter(t => t != d._id));
                        else setTypes(p => [...p, d._id]);
                      }}
                      className=" cursor-pointer border-gray-300 rounded-md h-5 w-5" />
                    <div className="flex flex-col">
                      <h3 className="text-black text-[16px] mb-0 text-opacity-60 font-medium leading-none satoshi-medium">{d.name}</h3>
                    </div>
                  </div>
                  )}

                </div>
                <button
                  onClick={handleSubmit}
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
