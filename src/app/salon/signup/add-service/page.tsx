"use client";

import React, { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import {
  Logo,
} from "../../../assets";
import { useRouter } from "next/navigation";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from 'yup';
import { AddServiceCard, UpdateServiceCard } from "@/component/Card/AddServiceCard";
import { showDuration } from "@/lib/utils";
import { useServiceList } from "@/hooks/useApi";
import axios from "axios";

const page = () => {
  const router = useRouter();

  const { data } = useServiceList();
  const [services, setServices] = useState(data);
  useEffect(() => { setServices(data); }, [data]);

  console.log({ services });

  const [modalOpen, setModalOpen] = React.useState(false);
  const [modalOpen2, setModalOpen2] = React.useState(false);

  const handleDelete = (id: string) => {
    axios.delete(`/api/salon/add-service-list?serviceId=${id}`)
      .then((res) => {
        setServices(services.filter((service) => service._id !== id));
      }).catch(e => { });
  };

  return (
    <div className="relative">

      <div className="">
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
              <div onClick={() => router.push("/salon/signup/business-hours")} className="block cursor-pointer rounded-full lg:absolute left-3 lg:left-0 p-2 bg-[#F1F1F1] bg-opacity w-10 h-10 lg:mb-0 mb-5">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M9.57 5.93018L3.5 12.0002L9.57 18.0702" stroke="#292D32" strokeWidth="2" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M20.4999 12H3.66992" stroke="#292D32" strokeWidth="2" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <div className="lg:flex flex-col justify-center items-center">
                <div className="lg:text-[28px] text-[25px] leading-10 font-bold text-center mb-1 lg:mb-2 satoshi-bold ">
                  Add Services
                </div>
                <p className="satoshi-regular mx-auto lg:text-[16px] text-[14px] text-black text-opacity-70 tracking-tight max-w-md text-center">Add the basic information for this service now. You'll be able to add a lescription and adjust the advanced settings for this service later on.</p>

                <div className="w-full max-w-lg lg:mt-12 mt-4 mx-auto">
                  <div className="flex flex-wrap  mb-6 ">

                    {services?.map((service, index) => (
                      <div className="flex justify-between items-center w-full py-4 border-b">
                        <div className="flex items-center justify-center">
                          <div onClick={() => handleDelete(service._id)} className="lg:mr-4 mr-2 cursor-pointer">
                            <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path d="M1 17L9 9L0.999999 1" stroke="#9C9C9C" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                              <path d="M17 17L9 9L17 1" stroke="#9C9C9C" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                          </div>
                          <div className="ml-3 text-black text-opacity-70 lg:text-[16px] text-[14px] satoshi-black">
                            {service.serviceName}
                          </div>
                        </div>

                        <div className="flex items-center gap-10">
                          <h4 className="satoshi-medium text-black text-opacity-60 lg:text-[16px] text-[14px]">
                            {showDuration(service.serviceHours.toString(), service.serviceMinutes.toString())}
                          </h4>
                          <h4 className="satoshi-bold text-black  lg:text-[16px] text-[14px]">${service.servicePrice}</h4>
                          <Dialog>
                            <DialogTrigger>
                              <span>
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
                              </span>
                            </DialogTrigger>
                            <DialogContent>
                              <DialogHeader>
                                <DialogTitle>
                                  <div className="lg:text-[28px] text-[25px] leading-10 font-bold text-left mb-1 lg:mb-2 satoshi-bold ">
                                    Add Service
                                  </div>
                                </DialogTitle>
                                <DialogDescription>
                                  <UpdateServiceCard
                                    id={service._id}
                                    serviceName={service.serviceName}
                                    serviceHours={service.serviceHours}
                                    serviceMinutes={service.serviceMinutes}
                                    serviceType={service.serviceType}
                                    servicePrice={service.servicePrice}
                                    img={service.img}
                                    mobile={service.mobile}
                                  />
                                </DialogDescription>
                              </DialogHeader>
                            </DialogContent>
                          </Dialog>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="flex justify-between items-center w-full mt-9">
                    <Dialog>
                      <DialogTrigger>
                        <div className="uppercase text-[#D78B30] satoshi-bold text-[15px] flex gap-2 items-center">
                          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M6 12H18" stroke="#D78B30" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M12 18V6" stroke="#D78B30" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                          ADD NEW SERVICES
                        </div>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>
                            <div className="lg:text-[28px] text-[25px] leading-10 font-bold text-left mb-1 lg:mb-2 satoshi-bold ">
                              Add Service
                            </div>
                          </DialogTitle>
                          <DialogDescription>
                            <AddServiceCard close={() => { setModalOpen(false); }} />
                          </DialogDescription>
                        </DialogHeader>
                      </DialogContent>
                    </Dialog>

                    <button
                      onClick={() => router.push("/salon/signup/staff-member")}
                      className="bg-[#D78B30] rounded-xl py-3 px-6 text-white uppercase satoshi-bold"
                    >CONTINUE</button>

                  </div>

                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
};

export default page;
