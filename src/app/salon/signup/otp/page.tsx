"use client";

import React, { useState } from "react";
import Image from "next/image";
import {
  Logo,
} from "../../../assets";
import { useSalonLastData } from "@/atoms/salonRegisterAtom";
import { useRouter } from "next/navigation";
import axios from "axios";
import { signIn } from "next-auth/react";
import CountdownTimer from "@/component/Timer/CountDown";

const page = () => {
  const router = useRouter();
  const [data, setData] = useSalonLastData();
  const [otp, setOtp] = useState(new Array(6).fill(''));
  const [resetTimer, setResetTimer] = useState(1);

  const handleChange = (element: any, index: number) => {
    if (isNaN(element.value)) return;

    const newOtp = [...otp];
    newOtp[index] = element.value;
    setOtp(newOtp);

    // Move to the next input box if the current one is filled
    if (element.value && index < 5) {
      // element.nextSibling?.focus();
      document.getElementById(`otp-input-box-${index + 1}`)?.focus();
    }
  };

  const handleKeyDown = (event: any, index: number) => {
    if (event.key === 'Backspace' && !otp[index] && index > 0) {
      // event.target.previousSibling?.focus();
      document.getElementById(`otp-input-box-${index - 1}`)?.focus();
    } else if (event.key === "Enter") {
      handleVerify();
    }
  };

  const handleVerify = () => {
    const OTP = otp.join("");
    if (OTP.length >= 6 && !isNaN(Number(OTP))) {
      axios.post(`/api/register/verify-otp`, {
        otp: OTP, email: data.email
      }).then(r => {
        console.log({ r });
        signIn('credentials', {
          email: data.email,
          password: data.password,
          redirect: false,
        }).then(result => {
          if (result) {
            router.replace('/salon/signup/about-business');
            setData(d => ({ ...d, password: "" }));
          }
        });
      }
      ).catch(e => { console.log({ e }); });
    }
  };

  return (
    <div className="page-content relative min-h-full h-screen no-scrollbar">
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
            <div onClick={() => { router.push("/salon/signup/about"); }} className="block cursor-pointer rounded-full lg:absolute left-3 lg:left-0 p-2 bg-[#F1F1F1] bg-opacity w-10 h-10 lg:mb-0 mb-5">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M9.57 5.93018L3.5 12.0002L9.57 18.0702" stroke="#292D32" stroke-width="2" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" />
                <path d="M20.4999 12H3.66992" stroke="#292D32" stroke-width="2" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" />
              </svg>
            </div>
            <div className="lg:flex flex-col justify-center items-center text-center">
              <div className="lg:text-[28px] text-[25px] satoshi-bold leading-10 font-bold text-center mb-3">
                We just sent you 6-digit code
              </div>
              <p className="text-black text-center">{data.phoneNumber} <a href="#" className="text-primary ml-2 satoshi-medium cursor-pointer" onClick={() => router.push("/salon/signup/about")}>Change</a></p>

              <form className="w-full max-w-lg mt-10 mx-auto">
                <div className="flex flex-wrap -mx-3 mb-6 gap-3 justify-center">
                  {otp.map((value, index) => (
                    <div className="w-10" key={index}>
                      <input
                        id={`otp-input-box-${index}`}
                        type="text"
                        maxLength={1}
                        value={value}
                        onChange={(e) => handleChange(e.target, index)}
                        onKeyDown={(e) => handleKeyDown(e, index)}
                        className="appearance-none block w-full rounded-xl bg-white text-black text-center text-[20px] font-bold border border-[#9C9C9C] mb-3 leading-tight focus:outline-none focus:bg-white"
                      />
                    </div>
                  ))}
                </div>
              </form>
              <h5 className="text-[#3F422E] text-[18px] mx-auto"><CountdownTimer minutes={1} seconds={30} key={resetTimer} /></h5>
              <h5 className="text-[#3F422E] text-[18px] mx-auto flex gap-2 items-center">
                <span
                  onClick={() => {
                    axios.post('/api/register/salon', data)
                      .then(r => {
                        setResetTimer(p => p + 1);
                      }).catch(e => { });
                  }}
                  className="bg-[#eee] rounded-full cursor-pointer p-2">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M2.9386 1.80575C6.08062 -0.769459 10.724 -0.590258 13.6573 2.34335C16.7809 5.46736 16.7809 10.533 13.6573 13.657C10.5337 16.781 5.46869 16.781 2.34507 13.657C1.38649 12.6996 0.686936 11.5143 0.312089 10.2123C-0.0627574 8.91029 -0.100593 7.53439 0.202135 6.21377L0.263727 5.96337L1.81074 6.37137C1.42722 7.82918 1.57052 9.3756 2.21539 10.7381C2.86026 12.1006 3.9653 13.1917 5.33577 13.8191C6.70624 14.4466 8.25418 14.5701 9.70677 14.1679C11.1594 13.7656 12.4234 12.8635 13.2761 11.6205C14.1288 10.3775 14.5154 8.87336 14.3678 7.37318C14.2202 5.87299 13.5479 4.47305 12.4693 3.42008C11.3908 2.36711 9.97519 1.72868 8.47206 1.61732C6.96894 1.50596 5.47476 1.92881 4.25284 2.81135L4.07606 2.94415L4.88956 3.75776L1.21321 4.60576L2.06111 0.928947L2.9386 1.80575Z" fill="#494A52" />
                  </svg>
                </span>
                Get new code</h5>
              <button
                onClick={handleVerify}
                className="bg-[#D78B30] rounded-xl py-3 px-12 text-white uppercase satoshi-bold mt-10 mx-auto">Verify</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
