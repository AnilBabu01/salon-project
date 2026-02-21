"use client";

import React from "react";
import { salonBG, Logo, sxlogo, groupclient, salonBGMobile } from "../../assets";
import Image from "next/image";
import Icon from "@/component/Icons";
import { mdiArrowLeftThin } from "@mdi/js";
import useWindowSize from '../../../hooks/useWindowSize';
import Link from "next/link";
import { useRouter } from "next/navigation";

const page = () => {
  const router = useRouter();
  const { width, height } = useWindowSize();
  console.log('-a0sd-0asd-0a-sda-s0d', width);

  return (
    <div className="flex md:gap-0 md:flex-row flex-col relative">
      <div className="md:fixed md:w-[400px] w-full md:h-screen h-40">
        <Image
          src={width > 450 ? salonBG : salonBGMobile}
          alt="Background"
          layout="fill"
          objectFit="cover"
          quality={100}
          className="!static"
        />
        <div className="absolute top-3 z-[1]">
          <div className="flex gap-2 items-center pt-2 pl-5">
            <Image src={sxlogo} alt="Logo" width={50} height={40} />
            <div className="text-xl font-semibold text-white">SALON-X</div>
          </div>
        </div>
      </div>
      <div className="lg:w-3/4 md:ml-[400px] w-full h-screen py-10">
        <div className="px-7">
          <div onClick={() => router.back()} className="block cursor-pointer rounded-full p-2 bg-[#F1F1F1] bg-opacity w-10 h-10 lg:mb-0 mb-5">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M9.57 5.93018L3.5 12.0002L9.57 18.0702" stroke="#292D32" stroke-width="2" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" />
              <path d="M20.4999 12H3.66992" stroke="#292D32" stroke-width="2" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" />
            </svg>
          </div>
          <div className="lg:flex flex-col justify-center items-center  gap-5">
            <div className="text-2xl leading-10 font-bold text-center mb-5">
              How would you like to sign up?
            </div>
            <div className="w-full flex flex-col justify-center items-center gap-4 ">
              {[
                {
                  id: 1,
                  title: `I'm a client`,
                  description: <>Streamlining Your Salon Experience. <br /> One click at a time</>,
                  nextPage: "/salon/signup/about"
                },
                {
                  id: 2,
                  title: `I'm a stylist`,
                  description: <>Empowering Stylists to Showcase Their <br /> Talent and Grow Their Business</>,
                  nextPage: "/salon/signup/about"
                },
                {
                  id: 3,
                  title: `We're Salon`,
                  description: <>Register Your Salon Today and Simplify <br /> Bookings for Your Clients</>,
                  nextPage: "/salon/signup/about"
                },
              ].map((item) => (
                <Link
                  href={item.nextPage}
                  key={item.id}
                  className="flex w-full border border-gray-500 lg:w-1/2 p-4 rounded-2xl justify-between items-center hover:bg-[#F5E6C5] hover:border-[#D78B30] transition-all duration-300 ease-in-out cursor-pointer"
                >
                  <div>
                    <h5 className="text-xl mb-2">{item.title}</h5>
                    <p className="text-sm font-semibold text-opacity-60">{item.description}</p>
                  </div>
                  <div>
                    <Image
                      src={groupclient}
                      alt="Groupclient"
                      width={150}
                      height={150}
                    />
                  </div>
                </Link>
              ))}
              <div className="text-base font-semibold">
                Already have an account?{" "}
                <Link href={"/signin"} className="text-[#D78B30] cursor-pointer" >Sign in</Link>
              </div>
            </div>
          </div>
        </div>
        <div className="w-full border-t border-slate-400 py-6 mt-12">
          <div className="w-full lg:flex justify-between px-8">
            <div className="text-sm lg:mb-0 mb-2 lg:text-left text-center">
              By proceeding, you agree to the Terms and Conditions and Privacy
              Policy
            </div>
            <div>
              <ul className="flex gap-10 text-sm lg:text-left lg:justify-left justify-center">
                <li>Help</li>
                <li>Help</li>
                <li>Help</li>
              </ul>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default page;
