"use client";

import React from "react";
import Image from "next/image";
import {
  Logo,
} from "../../../assets";
import { Formik, Form, Field, ErrorMessage } from 'formik';
import axios from 'axios';
import { useRouter } from "next/navigation";
import * as Yup from 'yup';
import { useSalonLastData } from "@/atoms/salonRegisterAtom";

const page = () => {
  const router = useRouter();
  const [data, setData] = useSalonLastData();

  // Define validation schema using Yup
  const validationSchema = Yup.object().shape({
    firstName: Yup.string()
      .required('First name is required'),
    lastName: Yup.string()
      .required('Last name is required'),
    email: Yup.string()
      .email('Invalid email format')
      .required('Email is required'),
    businessName: Yup.string()
      .required('Business name is required'),
    phoneNumber: Yup.string()
      .matches(/^[0-9]+$/, 'Phone number must be only digits')
      .required('Phone number is required'),
    password: Yup.string()
      .matches(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>])[A-Za-z\d!@#$%^&*(),.?":{}|<>]{8,}$/, 'Password must be at least 8 characters and should include alleast one A-Z, a-z, 0-9 and special character!')
      .required('Password is required'),
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
            <div onClick={() => router.push("/salon/signup")} className="block cursor-pointer rounded-full lg:absolute left-3 lg:left-0 p-2 bg-[#F1F1F1] bg-opacity w-10 h-10 lg:mb-0 mb-5">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M9.57 5.93018L3.5 12.0002L9.57 18.0702" stroke="#292D32" strokeWidth="2" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M20.4999 12H3.66992" stroke="#292D32" strokeWidth="2" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <div className="lg:flex flex-col justify-center items-center">
              <div className="lg:text-[28px] text-[25px] leading-10 font-bold text-center mb-1 lg:mb-2 satoshi-bold">
                About you salon
              </div>
              <p className="">Welcome to our platform! Please tell us about yourself and your business</p>


              {/* <form action={"/api/register/salon"} className="w-full max-w-lg mt-10">
                <div className="flex flex-wrap -mx-3 mb-6">
                  <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                    <input className="appearance-none block w-full h-14 border-b !border-[#9C9C9C] bg-white text-gray-700 border rounded-xl py-3 px-4 leading-tight focus:outline-none focus:bg-white" id="grid-first-name" type="text" placeholder="First name" />
                  </div>
                  <div className="w-full md:w-1/2 px-3">
                    <input className="appearance-none block w-full border-b h-14 !border-[#9C9C9C] bg-white text-gray-700 border rounded-xl py-3 px-4 leading-tight focus:outline-none focus:bg-white" id="grid-first-name" type="text" placeholder="Last name" />
                  </div>
                </div>

                <div className="flex flex-wrap -mx-3 mb-6">
                  <div className="w-full px-3">
                    <input className="appearance-none block w-full border-b h-14 !border-[#9C9C9C] bg-white text-gray-700 border rounded-xl py-3 px-4 leading-tight focus:outline-none focus:bg-white" id="grid-first-name" type="email" placeholder="Email address" />
                  </div>
                </div>
                <div className="flex flex-wrap -mx-3 mb-6">
                  <div className="w-full px-3">
                    <input className="appearance-none block w-full border-b h-14 !border-[#9C9C9C] bg-white text-gray-700 border rounded-xl py-3 px-4 leading-tight focus:outline-none focus:bg-white" id="grid-first-name" type="email" placeholder="Business Name" />
                  </div>
                </div>
                <div className="flex flex-wrap -mx-3 mb-6">
                  <div className="w-full px-3">
                    <input className="appearance-none block w-full border-b h-14 !border-[#9C9C9C] bg-white text-gray-700 border rounded-xl py-3 px-4 leading-tight focus:outline-none focus:bg-white" id="grid-first-name" type="email" placeholder="Phone number" />
                  </div>
                </div>
                <div className="flex flex-wrap -mx-3 mb-6">
                  <div className="w-full px-3">
                    <input className="appearance-none block w-full border-b h-14 !border-[#9C9C9C] bg-white text-gray-700 border rounded-xl py-3 px-4 leading-tight focus:outline-none focus:bg-white" id="grid-password" type="password" placeholder="Create password" />
                  </div>
                </div>

                <button
                  type="submit"
                  className="bg-[#D78B30] rounded-xl py-3 w-full text-white uppercase satoshi-bold">
                  CONTINUE
                </button>
              </form> */}

              <Formik
                initialValues={data}
                validationSchema={validationSchema}
                onSubmit={async (values, { setSubmitting, setFieldError }) => {
                  try {
                    const response = await axios.post('/api/register/salon', values);
                    console.log('Registration successful:', response.data);
                    setData(values);
                    router.push('/salon/signup/otp');
                  } catch (error) {
                    console.error('Registration failed:', error);
                    setFieldError("email", "Email already exist!");
                  } finally {
                    setSubmitting(false);
                  }
                }}
              >
                {({ isSubmitting }) => (
                  <Form className="w-full max-w-lg mt-10">
                    <div className="flex flex-wrap -mx-3 mb-6">
                      <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                        <Field
                          name="firstName"
                          type="text"
                          placeholder="First name"
                          className="appearance-none block w-full h-14 border-b !border-[#9C9C9C] bg-white text-gray-700 border rounded-xl py-3 px-4 leading-tight focus:outline-none focus:bg-white"
                        />
                        <ErrorMessage name="firstName" component="div" className="text-red-500 text-sm" />
                      </div>
                      <div className="w-full md:w-1/2 px-3">
                        <Field
                          name="lastName"
                          type="text"
                          placeholder="Last name"
                          className="appearance-none block w-full border-b h-14 !border-[#9C9C9C] bg-white text-gray-700 border rounded-xl py-3 px-4 leading-tight focus:outline-none focus:bg-white"
                        />
                        <ErrorMessage name="lastName" component="div" className="text-red-500 text-sm" />
                      </div>
                    </div>

                    <div className="flex flex-wrap -mx-3 mb-6">
                      <div className="w-full px-3">
                        <Field
                          name="email"
                          type="email"
                          placeholder="Email address"
                          className="appearance-none block w-full border-b h-14 !border-[#9C9C9C] bg-white text-gray-700 border rounded-xl py-3 px-4 leading-tight focus:outline-none focus:bg-white"
                        />
                        <ErrorMessage name="email" component="div" className="text-red-500 text-sm" />
                      </div>
                    </div>

                    <div className="flex flex-wrap -mx-3 mb-6">
                      <div className="w-full px-3">
                        <Field
                          name="businessName"
                          type="text"
                          placeholder="Business Name"
                          className="appearance-none block w-full border-b h-14 !border-[#9C9C9C] bg-white text-gray-700 border rounded-xl py-3 px-4 leading-tight focus:outline-none focus:bg-white"
                        />
                        <ErrorMessage name="businessName" component="div" className="text-red-500 text-sm" />
                      </div>
                    </div>

                    <div className="flex flex-wrap -mx-3 mb-6">
                      <div className="w-full px-3">
                        <Field
                          name="phoneNumber"
                          type="text"
                          placeholder="Phone number"
                          className="appearance-none block w-full border-b h-14 !border-[#9C9C9C] bg-white text-gray-700 border rounded-xl py-3 px-4 leading-tight focus:outline-none focus:bg-white"
                        />
                        <ErrorMessage name="phoneNumber" component="div" className="text-red-500 text-sm" />
                      </div>
                    </div>

                    <div className="flex flex-wrap -mx-3 mb-6">
                      <div className="w-full px-3">
                        <Field
                          name="password"
                          type="password"
                          placeholder="Create password"
                          className="appearance-none block w-full border-b h-14 !border-[#9C9C9C] bg-white text-gray-700 border rounded-xl py-3 px-4 leading-tight focus:outline-none focus:bg-white"
                        />
                        <ErrorMessage name="password" component="div" className="text-red-500 text-sm" />
                      </div>
                    </div>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="bg-[#D78B30] rounded-xl py-3 w-full text-white uppercase satoshi-bold"
                    >
                      {isSubmitting ? 'Submitting...' : 'Continue'}
                    </button>
                  </Form>
                )}
              </Formik>

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
    </>
  );
};

export default page;
