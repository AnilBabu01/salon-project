"use client";
import Image from "next/image";
import React, { useRef, useState } from "react";
import css from "globals";
import Navbar from "@/component/Navbar/Index";
import ServiceCard from "@/component/Card/ServiceCard";
import TeamBox from "@/component/Card/TeamBox";
import Slider from "react-slick";
import { SalonCard } from "@/component/Card";

import { Single, EmptyCart, ServiceImg, Menu1, Starwhite } from "../../assets";

export default function Home() {
  let sliderRef = useRef(null);
  const [slideIndex, setSlideIndex] = useState(0);

  const salonSliderSettings = {
    dots: false,
    infinite: true,
    autoplay: true,
    speed: 500,
    autoplaySpeed: 2000,
    slidesToShow: 1,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          arrows: false,
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 480,
        settings: {
          arrows: false,
          slidesToShow: 1,
        },
      },
    ],
    beforeChange: (current: number, next: number) => setSlideIndex(next),
  };

  return (
    <>
      <Navbar />

      <section className="pt-5 pb-20 sm:pb-5 px-4">
        <div className="container mx-auto">
          <div className="lg:grid lg:grid-cols-3 gap-6">
            <div className="col-span-2">
              <div className="pt-0 pb-8">
                <Slider
                  ref={(slider) => {
                    // @ts-ignore
                    sliderRef = slider;
                  }}
                  {...salonSliderSettings}
                >
                  {[1, 2, 3, 4].map((item, index) => (
                    <div key={index} className="flex flex-row gap-3">
                      <div className="basis-1/4">
                        <div className="imgbox relative">
                          <span className="img-badge bg-blue-100 text-blue-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded dark:bg-blue-900 dark:text-blue-300">
                            Unisex
                          </span>
                          <Image
                            src={Single} // Path to the image in the public directory
                            alt="Description of the image"
                          />
                          <div className="ratingbox">
                            <Image
                              src={Starwhite} // Path to the image in the public directory
                              alt="Description of the image"
                            />
                            <p>4.25</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </Slider>
              </div>

              <div className="flex justify-between">
                <div className="lg:grid lg:grid-cols-6">
                  <div className="col-span-4">
                    <h2 className="mb-4">Velvet Vibe Salon Lounge</h2>
                    <p className="text-left tracking-tighter">
                      A salon is a space dedicated to beauty and personal care
                      services, often specializing in hairstyling, hair
                      treatments, manicures, pedicures, facials, and other
                      aesthetic treatments. It's a place where individuals can
                      go to relax, unwind,
                    </p>
                    <div className="flex gap-2 mt-5 items-center">
                      <svg
                        width="18"
                        height="16"
                        viewBox="0 0 18 16"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M13.168 0.916992H4.83464C2.33464 0.916992 0.667969 2.16699 0.667969 5.08366V10.917C0.667969 13.8337 2.33464 15.0837 4.83464 15.0837H13.168C15.668 15.0837 17.3346 13.8337 17.3346 10.917V5.08366C17.3346 2.16699 15.668 0.916992 13.168 0.916992ZM13.5596 5.99199L10.9513 8.07533C10.4013 8.51699 9.7013 8.73366 9.0013 8.73366C8.3013 8.73366 7.59297 8.51699 7.0513 8.07533L4.44297 5.99199C4.1763 5.77533 4.13464 5.37533 4.34297 5.10866C4.55964 4.84199 4.9513 4.79199 5.21797 5.00866L7.8263 7.09199C8.45964 7.60033 9.53464 7.60033 10.168 7.09199L12.7763 5.00866C13.043 4.79199 13.443 4.83366 13.6513 5.10866C13.868 5.37533 13.8263 5.77533 13.5596 5.99199Z"
                          fill="#292D32"
                        />
                      </svg>
                      <a href="#" className="text-[15px] text-opacity-60">
                        velvet_salon@gmail.com
                      </a>
                    </div>
                    <div className="flex gap-2 mt-3 items-center">
                      <svg
                        width="20"
                        height="20"
                        viewBox="0 0 20 20"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M9.20964 12.4587L7.66797 14.0003C7.34297 14.3253 6.8263 14.3253 6.49297 14.0087C6.4013 13.917 6.30964 13.8337 6.21797 13.742C5.35964 12.8753 4.58464 11.967 3.89297 11.017C3.20964 10.067 2.65964 9.11699 2.25964 8.17533C1.86797 7.22533 1.66797 6.31699 1.66797 5.45033C1.66797 4.88366 1.76797 4.34199 1.96797 3.84199C2.16797 3.33366 2.48464 2.86699 2.9263 2.45033C3.45964 1.92533 4.04297 1.66699 4.65964 1.66699C4.89297 1.66699 5.1263 1.71699 5.33464 1.81699C5.5513 1.91699 5.74297 2.06699 5.89297 2.28366L7.8263 5.00866C7.9763 5.21699 8.08464 5.40866 8.15964 5.59199C8.23464 5.76699 8.2763 5.94199 8.2763 6.10033C8.2763 6.30033 8.21797 6.50033 8.1013 6.69199C7.99297 6.88366 7.83464 7.08366 7.63463 7.28366L7.0013 7.94199C6.90964 8.03366 6.86797 8.14199 6.86797 8.27533C6.86797 8.34199 6.8763 8.40033 6.89297 8.46699C6.91797 8.53366 6.94297 8.58366 6.95964 8.63366C7.10964 8.90866 7.36797 9.26699 7.73463 9.70033C8.10963 10.1337 8.50963 10.5753 8.94297 11.017C9.0263 11.1003 9.11797 11.1837 9.2013 11.267C9.53464 11.592 9.54297 12.1253 9.20964 12.4587Z"
                          fill="#292D32"
                        />
                        <path
                          d="M18.3083 15.2752C18.3083 15.5085 18.2667 15.7502 18.1833 15.9835C18.1583 16.0502 18.1333 16.1169 18.1 16.1835C17.9583 16.4835 17.775 16.7669 17.5333 17.0335C17.125 17.4835 16.675 17.8085 16.1667 18.0169C16.1583 18.0169 16.15 18.0252 16.1417 18.0252C15.65 18.2252 15.1167 18.3335 14.5417 18.3335C13.6917 18.3335 12.7833 18.1335 11.825 17.7252C10.8667 17.3169 9.90833 16.7669 8.95833 16.0752C8.63333 15.8335 8.30833 15.5919 8 15.3335L10.725 12.6085C10.9583 12.7835 11.1667 12.9169 11.3417 13.0085C11.3833 13.0252 11.4333 13.0502 11.4917 13.0752C11.5583 13.1002 11.625 13.1085 11.7 13.1085C11.8417 13.1085 11.95 13.0585 12.0417 12.9669L12.675 12.3419C12.8833 12.1335 13.0833 11.9752 13.275 11.8752C13.4667 11.7585 13.6583 11.7002 13.8667 11.7002C14.025 11.7002 14.1917 11.7335 14.375 11.8085C14.5583 11.8835 14.75 11.9919 14.9583 12.1335L17.7167 14.0919C17.9333 14.2419 18.0833 14.4169 18.175 14.6252C18.2583 14.8335 18.3083 15.0419 18.3083 15.2752Z"
                          fill="#292D32"
                        />
                      </svg>
                      <a href="#" className="text-[15px] text-opacity-60">
                        +00 234 334 2323
                      </a>
                    </div>
                  </div>
                  <div className="mt-5 lg:mt-0 col-span-2">
                    <div className="flex gap-2 lg:justify-end items-start">
                      <button
                        type="button"
                        className="focus:outline-none text-white hover:text-white bg-[#D78B30] focus:ring-4 focus:text-[#D78B30] font-medium uppercase rounded-xl text-[16px] text-sm px-5 py-2.5 me-2 mb-2 dark:focus:ring-yellow-900"
                      >
                        FOLLOW
                      </button>
                      <a href="#" className="border rounded-xl px-4 py-2">
                        <svg
                          width="16"
                          height="22"
                          viewBox="0 0 16 22"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M2.3077 21.5004C1.80257 21.5004 1.375 21.3254 1.025 20.9754C0.675 20.6254 0.5 20.1979 0.5 19.6927V9.30818C0.5 8.80305 0.675 8.37548 1.025 8.02548C1.375 7.67548 1.80257 7.50048 2.3077 7.50048H4.86535V9.00045H2.3077C2.23077 9.00045 2.16024 9.03251 2.09612 9.09661C2.03202 9.16072 1.99997 9.23125 1.99997 9.30818V19.6927C1.99997 19.7697 2.03202 19.8402 2.09612 19.9043C2.16024 19.9684 2.23077 20.0005 2.3077 20.0005H13.6922C13.7692 20.0005 13.8397 19.9684 13.9038 19.9043C13.9679 19.8402 14 19.7697 14 19.6927V9.30818C14 9.23125 13.9679 9.16072 13.9038 9.09661C13.8397 9.03251 13.7692 9.00045 13.6922 9.00045H11.1346V7.50048H13.6922C14.1974 7.50048 14.625 7.67548 14.975 8.02548C15.325 8.37548 15.5 8.80305 15.5 9.30818V19.6927C15.5 20.1979 15.325 20.6254 14.975 20.9754C14.625 21.3254 14.1974 21.5004 13.6922 21.5004H2.3077V21.5004ZM7.25 14.7505V3.71971L5.39997 5.56971L4.34615 4.50048L7.99997 0.84668L11.6538 4.50048L10.6 5.56971L8.74995 3.71968V14.7504L7.25 14.7505Z"
                            fill="black"
                            fillOpacity="0.5"
                          />
                        </svg>
                      </a>
                    </div>
                    <p className="text-opacity-50 lg:text-right">12km</p>
                  </div>
                </div>
              </div>

              <div className="mt-8">
                <div className="sm:hidden">
                  <label htmlFor="Tab" className="sr-only">
                    Tab
                  </label>

                  <select
                    id="Tab"
                    className="w-full rounded-md border-gray-200"
                  >
                    <option>Settings</option>
                    <option>Messages</option>
                    <option>Archive</option>
                    <option
                      // @ts-ignore
                      select>Notifications</option>
                  </select>
                </div>

                <div className="hidden sm:block">
                  <div className="border-y border-gray-200">
                    <nav className="pt-3 flex gap-6" aria-label="Tabs">
                      <a
                        href="#"
                        className="shrink-0 border-b-2 border-transparent px-1 pb-3 text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700"
                      >
                        About
                      </a>

                      <a
                        href="#"
                        className="shrink-0 border-b-2 border-transparent px-1 pb-3 text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700"
                      >
                        Menu
                      </a>

                      <a
                        href="#"
                        className="shrink-0 border-b-2 border-transparent px-1 pb-3 text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700"
                      >
                        Reviews
                      </a>

                      <a
                        href="#"
                        className="shrink-0 border-b-2 border-sky-500 px-1 pb-3 text-sm font-medium text-sky-600"
                        aria-current="page"
                      >
                        Team
                      </a>
                    </nav>
                  </div>
                  <div className="tab-content pt-8">
                    <h3 className="mb-5">Services</h3>
                    <ServiceCard />
                    <ServiceCard />
                    <ServiceCard />
                    <ServiceCard />
                    <ServiceCard />
                    <ServiceCard />

                    <div className="service-menu pt-9">
                      <h3 className="mb-4">Our Service Menu</h3>
                      <div className="flex gap-3">
                        <Image
                          src={Menu1} // Path to the image in the public directory
                          alt="Description of the image"
                          className="max-w-44"
                        />
                        <Image
                          src={Menu1} // Path to the image in the public directory
                          alt="Description of the image"
                          className="max-w-44"
                        />
                        <Image
                          src={Menu1} // Path to the image in the public directory
                          alt="Description of the image"
                          className="max-w-44"
                        />
                        <Image
                          src={Menu1} // Path to the image in the public directory
                          alt="Description of the image"
                          className="max-w-44"
                        />
                      </div>
                    </div>

                    <div className="service-menu pt-9">
                      <h3 className="mb-4">Salon Gallary</h3>
                      <div className="flex gap-3">
                        <Image
                          src={Menu1} // Path to the image in the public directory
                          alt="Description of the image"
                          className="max-w-44"
                        />
                        <Image
                          src={Menu1} // Path to the image in the public directory
                          alt="Description of the image"
                          className="max-w-44"
                        />
                        <Image
                          src={Menu1} // Path to the image in the public directory
                          alt="Description of the image"
                          className="max-w-44"
                        />
                        <Image
                          src={Menu1} // Path to the image in the public directory
                          alt="Description of the image"
                          className="max-w-44"
                        />
                      </div>
                    </div>

                    <div className="service-menu pt-9">
                      <h3 className="mb-2">Meet our team</h3>
                      <p className="text-[20px]">
                        Meet Our Talented Team of Stylists
                      </p>
                      <div className="mt-9">
                        <TeamBox />
                        <TeamBox />
                        <TeamBox />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="sidebar mt-4 lg:mt-0">
              <div className="rounded-2xl border border-[#E2E2E2]">
                <div className="px-6 pt-7 pb-4">
                  <h3 className="text-[26px] mb-4">Business hours</h3>
                  <div className="flex gap-2">
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M22 12C22 17.52 17.52 22 12 22C6.48 22 2 17.52 2 12C2 6.48 6.48 2 12 2C17.52 2 22 6.48 22 12Z"
                        stroke="#292D32"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M15.7089 15.1798L12.6089 13.3298C12.0689 13.0098 11.6289 12.2398 11.6289 11.6098V7.50977"
                        stroke="#292D32"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    <h5>Monday</h5>
                    <p className="ml-3">10:00 AM - 8:00 PM</p>
                  </div>
                </div>
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d52869365.670444705!2d-161.68008603129175!3d36.02297960957226!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x54eab584e432360b%3A0x1c3bb99243deb742!2sUnited%20States!5e0!3m2!1sen!2sin!4v1728395109609!5m2!1sen!2sin"
                  width="100%"
                  height="300"
                  className="rounded-b-2xl"
                  allowFullScreen={false}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
              </div>

              <div className="rounded-2xl bg-[#F9F9F9] border border-[#DBDBDB] lg:mt-24 mt-5 text-center py-10">
                <Image
                  src={EmptyCart} // Path to the image in the public directory
                  alt="Description of the image"
                  className="w-32 mx-auto"
                />
                <p className="text-opacity-70 mt-2">
                  Your service cart is currently empty
                </p>
              </div>

              <div className="rounded-2xl bg-[#F9F9F9] border border-[#DBDBDB] mt-5 text-center p-4">
                <h5 className="text-left">Have any promo code?</h5>
                <div className="max-w-sm mx-auto">
                  <div className="flex mt-3">
                    <span className="inline-flex items-center px-3 text-sm text-gray-900 bg-white border border-e-0 border-r-0 border-[#E9E9E9] rounded-s-md dark:bg-white dark:text-slate-950">
                      <svg
                        width="18"
                        height="15"
                        viewBox="0 0 23 19"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M16.7327 0.342773H9.15016V3.74027C9.15016 4.17902 8.79016 4.52777 8.36266 4.52777C7.93516 4.52777 7.57516 4.17902 7.57516 3.74027V0.342773H6.27016C1.82641 0.342773 0.363914 1.67027 0.262664 5.82152C0.251414 6.02402 0.341414 6.23777 0.487664 6.38402C0.633914 6.54152 0.825164 6.62027 1.05016 6.62027C2.62516 6.62027 3.91891 7.92527 3.91891 9.50027C3.91891 11.0753 2.62516 12.3803 1.05016 12.3803C0.836414 12.3803 0.633914 12.459 0.487664 12.6165C0.341414 12.7628 0.251414 12.9765 0.262664 13.179C0.363914 17.3303 1.82641 18.6578 6.27016 18.6578H7.57516V15.2603C7.57516 14.8215 7.93516 14.4728 8.36266 14.4728C8.79016 14.4728 9.15016 14.8215 9.15016 15.2603V18.6578H16.7327C21.3452 18.6578 22.7514 17.2515 22.7514 12.639V6.36152C22.7514 1.74902 21.3452 0.342773 16.7327 0.342773ZM18.7802 9.38777L17.7339 10.4003C17.6889 10.434 17.6777 10.5015 17.6889 10.5578L17.9364 11.9865C17.9814 12.2453 17.8802 12.5153 17.6552 12.6728C17.4414 12.8303 17.1602 12.8528 16.9239 12.729L15.6302 12.054C15.5852 12.0315 15.5177 12.0315 15.4727 12.054L14.1789 12.729C14.0777 12.7853 13.9652 12.8078 13.8527 12.8078C13.7064 12.8078 13.5714 12.7628 13.4477 12.6728C13.2339 12.5153 13.1214 12.2565 13.1664 11.9865L13.4139 10.5578C13.4252 10.5015 13.4027 10.4453 13.3689 10.4003L12.3227 9.38777C12.1314 9.20777 12.0639 8.92652 12.1427 8.67902C12.2214 8.42027 12.4352 8.24027 12.7052 8.20652L14.1452 7.99277C14.2014 7.98152 14.2464 7.94777 14.2802 7.90277L14.9214 6.59777C15.0452 6.36152 15.2814 6.21527 15.5514 6.21527C15.8214 6.21527 16.0577 6.36152 16.1702 6.59777L16.8114 7.90277C16.8339 7.95902 16.8789 7.99277 16.9352 7.99277L18.3752 8.20652C18.6452 8.24027 18.8589 8.43152 18.9377 8.67902C19.0389 8.92652 18.9714 9.19652 18.7802 9.38777Z"
                          fill="black"
                          fillOpacity="0.7"
                        />
                      </svg>
                    </span>
                    <input
                      type="text"
                      id="website-admin"
                      className="rounded-none rounded-e-lg bg-white border border-l-0 border-[#E9E9E9] text-gray-900 focus:ring-0 focus:border-y-[#E9E9E9] block flex-1 min-w-0 w-full text-sm p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-0 dark:focus:border-0 border-r-0 font-bold rounded-r-none"
                      placeholder="Enter Code"
                    />
                    <button
                      type="submit"
                      className="text-slate-900 uppercase bg-white hover:bg-white border rounded-l-0  hover:bg-transparent focus:ring-4 focus:outline-none focus:bg-ransparent font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-slate-600 dark:hover:bg-slate-700 dark:focus:ring-slate-800 rounded-l-none border-l-0"
                    >
                      Apply
                    </button>
                  </div>
                  <p className="text-center mt-3 text-[14px]">
                    Terms and Conditions
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section >

      <section className="bg-[#F3F3F3B2] py-20 review-sec px-5">
        <div className="container mx-auto">
          <div className="lg:flex justify-between items-start">
            <div>
              <h2 className="text-[60px]">Reviews</h2>
              <p>
                Découvrez les témoignages de nos clients qui ont acheté cet
                article
              </p>
            </div>
            <div className="lg:mt-0 mt-5">
              <div className="rating-circle flex justify-center items-center">
                <h2 className="text-[40px] text-[#3F422E]">4.2</h2>
              </div>
            </div>
          </div>
          <div className="lg:grid grid-cols-2 gap-4 mt-16">
            <div className="bg-white rounded-xl px-12 py-9 mb-4 lg:mb-0">
              <p>
                {" "}
                I've been coming to this salon for years, and I wouldn't trust
                anyone else with my hair! The stylists here are incredibly
                talented and always know exactly what I want. Plus, the
                atmosphere is so welcoming and relaxing. Highly recommend!
              </p>
              <h5 className="text-[#D78B30] text-[16px] mt-6">
                Darrell Steward
              </h5>
            </div>
            <div className="bg-white rounded-xl px-12 py-9 mb-4 lg:mb-0">
              <p>
                {" "}
                I've been coming to this salon for years, and I wouldn't trust
                anyone else with my hair! The stylists here are incredibly
                talented and always know exactly what I want. Plus, the
                atmosphere is so welcoming and relaxing. Highly recommend!
              </p>
              <h5 className="text-[#D78B30] text-[16px] mt-6">
                Darrell Steward
              </h5>
            </div>
            <div className="bg-white rounded-xl px-12 py-9 mb-4 lg:mb-0">
              <p>
                {" "}
                I've been coming to this salon for years, and I wouldn't trust
                anyone else with my hair! The stylists here are incredibly
                talented and always know exactly what I want. Plus, the
                atmosphere is so welcoming and relaxing. Highly recommend!
              </p>
              <h5 className="text-[#D78B30] text-[16px] mt-6">
                Darrell Steward
              </h5>
            </div>
            <div className="bg-white rounded-xl px-12 py-9 mb-4 lg:mb-0">
              <p>
                {" "}
                I've been coming to this salon for years, and I wouldn't trust
                anyone else with my hair! The stylists here are incredibly
                talented and always know exactly what I want. Plus, the
                atmosphere is so welcoming and relaxing. Highly recommend!
              </p>
              <h5 className="text-[#D78B30] text-[16px] mt-6">
                Darrell Steward
              </h5>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
