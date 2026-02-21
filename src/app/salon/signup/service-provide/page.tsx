"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import {
  Logo,
} from "../../../assets";
import { useSalonServiceData } from "@/atoms/salonRegisterAtom";
import axios from "axios";
import { useRouter } from "next/navigation";
import { signIn, useSession, } from "next-auth/react";

const page = () => {
  const { data: session } = useSession();

  const [serviceData, setServiceData] = useSalonServiceData();
  const [where, setWhere] = useState("");
  const router = useRouter();

  const handleUpdate = (e: any) => {
    // @ts-ignore
    e.preventDefault();
    if (!serviceData.about || !serviceData.for) {
      router.push("/salon/signup/business-info");
    }
    if (!serviceData.where) {
      return;
    }
    axios.post("/api/salon/add-service", {
      serviceFor: serviceData.for,
      aboutBusiness: serviceData.about,
      whereToServe: serviceData.where
    })
      .then(r => {
        if (r.data.message) router.push("/salon/signup/address");
        signIn("credentials", {
          ...session.user,
          redirect: false,
        });
      }).catch(e => { });
  };
  useEffect(() => setServiceData(p => ({ ...p, where })), [where]);
  console.log({ serviceData });

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
            <div onClick={() => router.back()} className="block cursor-pointer rounded-full lg:absolute left-3 lg:left-0 p-2 bg-[#F1F1F1] bg-opacity w-10 h-10 lg:mb-0 mb-5">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M9.57 5.93018L3.5 12.0002L9.57 18.0702" stroke="#292D32" strokeWidth="2" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M20.4999 12H3.66992" stroke="#292D32" strokeWidth="2" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <div className="lg:flex flex-col justify-center items-center">
              <div className="lg:text-[28px] text-[25px] max-w-96 leading-10 font-bold text-center mb-3 satoshi-bold mx-auto">
                Where do you want to provide services?
              </div>
              <form className="w-full max-w-lg lg:mt-8 mt-4 mx-auto">
                <div className="flex flex-wrap -mx-3 mb-6 border border-[#D9D9D9] rounded-xl">
                  <div className="flex items-start space-x-4 py-7 px-7 border-b w-full">
                    <input type="checkbox"
                      onChange={() => {
                        setWhere("my");
                      }}
                      checked={"my" == where} className="border-gray-300 cursor-pointer rounded-md h-6 w-6" />
                    <div className="flex flex-col">
                      <h3 className="text-black text-[18px] mb-3 text-opacity-80 font-medium leading-none satoshi-bold">At my place</h3>
                      <p className="">My clients come to me. Iown the place or work in a salon/suite alongside other professionals.</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-4 py-7 px-7 w-full">
                    <input type="checkbox"
                      onChange={() => {
                        setWhere("client");
                      }}
                      checked={"client" == where} className="border-gray-300 cursor-pointer rounded-md h-6 w-6" />
                    <div className="flex flex-col">
                      <h3 className="text-black text-[18px] mb-3 text-opacity-80 font-medium leading-none satoshi-bold">At the client’s location</h3>
                      <p className="">We’re on the go. My services are performed at the client's location.</p>
                    </div>
                  </div>
                </div>
                <button
                  onClick={handleUpdate}
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
