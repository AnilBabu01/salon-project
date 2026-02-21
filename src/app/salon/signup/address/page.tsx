"use client";

import React, { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import {
  Logo,
} from "../../../assets";
import { useRouter } from "next/navigation";
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from "axios";
import { useSession } from "next-auth/react";
import { useBusinessAddress } from "@/hooks/useApi";

const page = () => {
  const router = useRouter();
  const session = useSession();
  const [defualtAddr, setDefaultAddr] = useState({
    search: '',
    address: '',
    street: '',
    city: '',
    state: '',
    zip: '',
    country: '',
  });
  console.log({ session });
  const { data } = useBusinessAddress();

  useEffect(() => {
    if (data?.data) setDefaultAddr(data?.data as any);
  }, [data?.data]);

  console.log({ defualtAddr });

  const validationSchema = Yup.object({
    address: Yup.string().required('Address is required'),
    street: Yup.string().required('Street is required'),
    city: Yup.string().required('City is required'),
    state: Yup.string().required('State/Province is required'),
    zip: Yup.string().required('ZIP/Postal Code is required'),
    country: Yup.string().required('Country is required'),
  });


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
            <div onClick={() => router.back()} className="block rounded-full p-2 lg:absolute left-3 lg:left-0 bg-[#F1F1F1] bg-opacity w-10 h-10 lg:mb-0 mb-5">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M9.57 5.93018L3.5 12.0002L9.57 18.0702" stroke="#292D32" strokeWidth="2" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M20.4999 12H3.66992" stroke="#292D32" strokeWidth="2" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>

            <div className="lg:flex flex-col justify-center items-center">
              <div className="lg:text-[28px] text-[25px] leading-10 font-bold text-center mb-1 satoshi-bold">
                Enter your salon address
              </div>
              <p className="satoshi-regular mx-auto text-[16px] text-black text-opacity-70 tracking-tight max-w-80 text-center">Where can clients find you?</p>

              <Formik
                initialValues={defualtAddr}
                enableReinitialize // Allow Formik to reinitialize when initialValues change
                validationSchema={validationSchema}
                onSubmit={async (values, { setSubmitting }) => {
                  console.log({ values });
                  setSubmitting(true);
                  axios.post("/api/salon/address", values).then(r => {
                    setSubmitting(false);
                    console.log({ r });
                    router.push("/salon/signup/business-hours");
                  }).catch(e => { });
                  console.log('Form submitted with values:', values);
                }}
              >
                {({ isSubmitting }) => (

                  <Form className="w-full max-w-lg mt-10 mx-auto">
                    <div className="flex flex-wrap -mx-3 mb-6">
                      <div className="w-full px-3 relative">
                        <span className="absolute left-6 top-0 bottom-0 my-auto h-6">
                          <svg
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M11.5 21C16.7467 21 21 16.7467 21 11.5C21 6.25329 16.7467 2 11.5 2C6.25329 2 2 6.25329 2 11.5C2 16.7467 6.25329 21 11.5 21Z"
                              stroke="black"
                              strokeOpacity="0.6"
                              strokeWidth="1.5"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                            <path
                              d="M22 22L20 20"
                              stroke="black"
                              strokeOpacity="0.6"
                              strokeWidth="1.5"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        </span>
                        <Field
                          name="search"
                          type="text"
                          placeholder="Search"
                          className="appearance-none pl-12 block w-full border-b h-14 !border-[#E6E5E5] bg-[#E6E5E5] bg-opacity-60 text-gray-700 border rounded-xl py-3 px-4 leading-tight focus:outline-none focus:bg-white"
                        />
                        <ErrorMessage name="search" component="div" className="text-red-500 text-sm" />
                      </div>
                    </div>

                    <div className="or text-center relative mb-5">
                      <hr className="absolute w-full top-0 bottom-0 my-auto" />
                      <span className="text-[16px] text-black text-opacity-40 relative bg-white px-4">OR</span>
                    </div>

                    <div className="flex flex-wrap -mx-3 mb-6">
                      <div className="w-full px-3">
                        <Field
                          name="address"
                          type="text"
                          placeholder="Address"
                          className="appearance-none block w-full border-b h-14 !border-[#9C9C9C] bg-white text-gray-700 border rounded-xl py-3 px-4 leading-tight focus:outline-none focus:bg-white"
                        />
                        <ErrorMessage name="address" component="div" className="text-red-500 text-sm" />
                      </div>
                    </div>

                    <div className="flex flex-wrap -mx-3 mb-6">
                      <div className="w-full px-3">
                        <Field
                          name="street"
                          type="text"
                          placeholder="Street"
                          className="appearance-none block w-full border-b h-14 !border-[#9C9C9C] bg-white text-gray-700 border rounded-xl py-3 px-4 leading-tight focus:outline-none focus:bg-white"
                        />
                        <ErrorMessage name="street" component="div" className="text-red-500 text-sm" />
                      </div>
                    </div>

                    <div className="flex flex-wrap -mx-3 mb-6">
                      <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                        <Field
                          name="city"
                          type="text"
                          placeholder="City"
                          className="appearance-none block w-full h-14 border-b !border-[#9C9C9C] bg-white text-gray-700 border rounded-xl py-3 px-4 leading-tight focus:outline-none focus:bg-white"
                        />
                        <ErrorMessage name="city" component="div" className="text-red-500 text-sm" />
                      </div>
                      <div className="w-full md:w-1/2 px-3">
                        <Field
                          name="state"
                          type="text"
                          placeholder="State/Province"
                          className="appearance-none block w-full border-b h-14 !border-[#9C9C9C] bg-white text-gray-700 border rounded-xl py-3 px-4 leading-tight focus:outline-none focus:bg-white"
                        />
                        <ErrorMessage name="state" component="div" className="text-red-500 text-sm" />
                      </div>
                    </div>

                    <div className="flex flex-wrap -mx-3 mb-6">
                      <div className="w-full px-3">
                        <Field
                          name="zip"
                          type="text"
                          placeholder="ZIP/Postal Code"
                          className="appearance-none block w-full border-b h-14 !border-[#9C9C9C] bg-white text-gray-700 border rounded-xl py-3 px-4 leading-tight focus:outline-none focus:bg-white"
                        />
                        <ErrorMessage name="zip" component="div" className="text-red-500 text-sm" />
                      </div>
                    </div>

                    <div className="flex flex-wrap -mx-3 mb-6">
                      <div className="relative w-full px-3">
                        <Field
                          as="select"
                          name="country"
                          className="appearance-none block w-full border-b h-14 !border-[#9C9C9C] bg-white text-gray-700 border rounded-xl py-3 px-4 leading-tight focus:outline-none focus:bg-white"
                        >
                          <option value="">Country</option>
                          <option value="Missouri">Missouri</option>
                          <option value="Texas">Texas</option>
                        </Field>
                        <ErrorMessage name="country" component="div" className="text-red-500 text-sm" />
                      </div>
                    </div>

                    <button
                      type="submit"
                      className="bg-[#D78B30] rounded-xl py-4 w-full text-white uppercase satoshi-bold mt-3"
                    >
                      CONTINUE
                    </button>
                  </Form>
                )}
              </Formik>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default page;
