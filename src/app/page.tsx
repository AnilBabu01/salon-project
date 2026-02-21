"use client";
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import css from "globals";
import { mdiCartOutline } from "@mdi/js";
import Icons from "../component/Icons";
import { SearchParamsContext } from "next/dist/shared/lib/hooks-client-context.shared-runtime";
import {
  Logo,
  Cart,
  User,
  LocationUp,
  Search,
  SalonImg,
  Filters,
  Ratings,
  Shorts,
  Product1,
  Clock,
  Location,
  Starwhite,
  Partner,
  Affiliate,
  Email,
  Phone,
  Facebook,
  Twitter,
  Insta,
  Arate,
  Youtube,
  FooterLogo,
  Banner,
  Category1,
  BigSlider1,
} from "./assets";
import Select, { ISelectList } from "@/component/Select";
import { Salon } from "@/utils/constants";
import { PartnerCard, PromoCodeCard, SalonCard } from "@/component/Card";
import Slider from "react-slick";
import Faq from "@/component/Faq";
import Navbar from "@/component/Navbar/Index";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function Home() {
  const stateList: ISelectList[] = [
    { label: "Choose a state", value: "", checked: false },
    { label: "California", value: "CA", checked: false },
    { label: "Texas", value: "TX", checked: false },
    { label: "Washington", value: "WH", checked: false },
    { label: "Florida", value: "FL", checked: false },
    { label: "Virginia", value: "VG", checked: false },
    { label: "Georgia", value: "GE", checked: false },
    { label: "Michigan", value: "MI", checked: false },
  ];

  const [slideIndex, setSlideIndex] = useState(0);
  const [promoCodeSlideIndex, setPromoCodeSlideIndex] = useState(0);
  const [recommandedSlideIndex, setRecomandedSlideIndex] = useState(0);
  let sliderRef = useRef(null);
  let promoCodeSliderRef = useRef(null);
  let recomandedSliderRef = useRef(null);
  const handleRecomandedPreviousNext = (type: string) => {
    // @ts-ignore
    recomandedSliderRef?.slickGoTo(
      type == "next" ? recommandedSlideIndex + 1 : recommandedSlideIndex - 1
    );
  };
  const handlePomoCodePreviousNext = (type: string) => {
    // @ts-ignore
    promoCodeSliderRef?.slickGoTo(
      type == "next" ? promoCodeSlideIndex + 1 : promoCodeSlideIndex - 1
    );
  };
  // @ts-ignore
  const handlePreviousNext = (type: string) => {
    // @ts-ignore
    sliderRef?.slickGoTo(type == "next" ? slideIndex + 1 : slideIndex - 1);
  };

  const recommandedSliderSettings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
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
    beforeChange: (current: number, next: number) => {
      setRecomandedSlideIndex(next);
    },
  };

  const salonSliderSettings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
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

  const PromoSlider = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
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
    beforeChange: (current: number, next: number) => {
      setPromoCodeSlideIndex(next);
    },
  };

  const bannerSliderSetting = {
    dots: true,
    infinite: true,
    speed: 500,
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
    appendDots: (dots: React.ReactNode) => (
      <div
        style={{
          borderRadius: "10px",
          padding: "48px",
          display: "flex",
          justifyContent: "end",
        }}
      >
        <div className="text-black">{dots}</div>
      </div>
    ),
    customPaging: (i: number) => (
      <div
        style={{
          width: "10px",
          height: "6px",
          borderRadius: "10px",
          backgroundColor: "transparent",
          border: "1px solid black",
          marginTop: "10px",
          marginLeft: "90%",
        }}
      />
    ),
  };

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 6,
    slidesToScroll: 5,
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

    appendDots: (dots: React.ReactNode) => (
      <div
        style={{
          borderRadius: "10px",
          padding: "10px",
        }}
      >
        <div className="text-black-800">{dots}</div>
      </div>
    ),
    customPaging: (i: number) => (
      <div
        style={{
          width: "50px",
          height: "4px",
          backgroundColor: "transparent",
          border: "1px solid black",
          marginTop: "60px",
        }}
      />
    ),
  };
  const router = useRouter();
  const session = useSession();
  useEffect(() => {
    if (session && session.data?.user.stage == 1)
      router.push("/salon/signup/about-business");
    console.log({ session });
  }, [session]);

  const [salonXList, setsalonXList] = useState<Salon[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchValue, setsearchValue] = useState<string>("");
  const [selectLoaction, setselectLoaction] = useState("");
  const [isSearching, setisSearching] = useState(false);
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setsearchValue(newValue);
  };

  const fetchSalons = async (searchValue: string, map: string) => {
    try {
      const res = await fetch(
        `/api/salon/search?map=${map}&name=${searchValue}`
      );
      const data = await res.json();

      if (res.ok) {
        setsalonXList(data.data);
      } else {
        console.error(data.error);
      }
    } catch (error) {
      console.error("Error fetching salons:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (searchValue != "" || selectLoaction != "") {
      setisSearching(true);
      fetchSalons(searchValue, selectLoaction);
    } else {
      setisSearching(false);
    }
  }, [searchValue, selectLoaction]);

  return (
    <>
      <Navbar onChange={handleSearch} setSelect={setselectLoaction} />
      <section className="pt-16 bg-[#F3F3F3B2] bg-opacity-70 pb-32  px-4">
        <div className="container mx-auto">
          <div className="lg:flex items-center justify-between">
            <h2 className="lg:text-[30px] lg:mb-9 mb-2 text-[25px] text-center lg:text-left">
              What are you looking for?
            </h2>
            <a
              href="#"
              className="text-[#D78B30] lg:text-[18px] text-[14px] flex gap-2 mb-4 lg:mb-0 justify-center"
            >
              Explore all
              <svg
                width="21"
                height="23"
                viewBox="0 0 21 23"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M1 13.2C0.558172 13.2 0.2 13.5582 0.2 14C0.2 14.4418 0.558172 14.8 1 14.8V13.2ZM20.5657 14.5657C20.8781 14.2533 20.8781 13.7467 20.5657 13.4343L15.4745 8.34315C15.1621 8.03073 14.6556 8.03073 14.3431 8.34315C14.0307 8.65557 14.0307 9.1621 14.3431 9.47452L18.8686 14L14.3431 18.5255C14.0307 18.8379 14.0307 19.3444 14.3431 19.6569C14.6556 19.9693 15.1621 19.9693 15.4745 19.6569L20.5657 14.5657ZM1 14.8H20V13.2H1V14.8Z"
                  fill="#D78B30"
                />
              </svg>
            </a>
          </div>
        </div>
        <div className="container mx-auto border-1 border-black">
          {/* Rounded selected component */}
          <Slider {...settings}>
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((item) => (
              <div key={item} className="flex flex-col gap-4 mb-2">
                <div className="flex justify-center items-center">
                  <Image
                    className="w-44 rounded-full mb-10"
                    src={Category1} // Path to the image in the public directory
                    alt="Description of the image"
                  />
                </div>
                <h5 className="font-semibold text-lg text-center text-[19px]">
                  Hair Services
                </h5>
              </div>
            ))}
          </Slider>
        </div>
      </section>

      <section className="pt-10 lg:pb-16 pb-8 px-4">
        <div className="container mx-auto">
          <div>
            <Slider {...bannerSliderSetting}>
              {[1, 2, 3, 4].map((item, index) => (
                <Image
                  key={index}
                  className="w-full"
                  src={BigSlider1} // Path to the image in the public directory
                  alt="Description of the image"
                />
              ))}
            </Slider>
          </div>
        </div>
      </section>

      <section className="top-rated px-4">
        <div className="container mx-auto">
          <div className="filters flex flex-wrap  gap-1">
            <button
              type="button"
              className="flex gap-2 py-2.5 px-5 me-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-full border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
            >
              <Image
                src={Filters} // Path to the image in the public directory
                alt="Description of the image"
                width={16} // Set width
                height={21} // Set height
              />
              Filters
            </button>
            <button
              type="button"
              className="flex gap-2 py-2.5 px-5 me-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-full border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
            >
              <Image
                src={Shorts} // Path to the image in the public directory
                alt="Description of the image"
                width={16} // Set width
                height={21} // Set height
              />
              Shorts
            </button>
            <button
              type="button"
              className="flex gap-2 py-2.5 px-5 me-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-full border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
            >
              <Image
                src={Ratings} // Path to the image in the public directory
                alt="Description of the image"
                width={16} // Set width
                height={21} // Set height
              />
              4+ Ratings
            </button>
            <button
              type="button"
              className="py-2.5 px-5 me-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-full border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
            >
              Offers
            </button>
          </div>
          {isSearching && (
            <section className=" text-center px-1">
              <div className="container mx-auto">
                <div className="headbox flex space-between mb-4">
                  <h2>Searching for</h2>
                </div>
                <div className="grid lg:grid-cols-4 gap-3 pb-3">
                  {salonXList?.length > 0 ? (
                    salonXList?.map((item: Salon, index: number) => {
                      return <SalonCard item={item} key={index} />;
                    })
                  ) : (
                    <p>Data not found</p>
                  )}
                </div>
              </div>
            </section>
          )}
          <div className="product-slider">
            <div className="headbox flex justify-between items-center space-between mb-4">
              <h2>Top Rated Salons</h2>
              <div className="control-btn flex items-center">
                <button
                  onClick={() => handlePreviousNext("previous")}
                  style={{
                    backgroundColor: "#eee",
                    padding: "13px",
                    borderRadius: "100px",
                    marginRight: "5px",
                  }}
                >
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 18 18"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M8.51253 16.3362L1.64045 9.33029C1.55805 9.24628 1.50037 9.16228 1.46741 9.07827C1.43445 8.99427 1.41797 8.90186 1.41797 8.80106C1.41797 8.70025 1.43445 8.60785 1.46741 8.52384C1.50037 8.43984 1.55805 8.35584 1.64045 8.27183L8.53725 1.24067C8.66909 1.10627 8.83389 1.03906 9.03165 1.03906C9.2294 1.03906 9.40244 1.11467 9.55076 1.26587C9.69908 1.41708 9.77324 1.59349 9.77324 1.7951C9.77324 1.99671 9.69908 2.17312 9.55076 2.32433L3.93938 8.04502H16.2004C16.4146 8.04502 16.5918 8.11642 16.7318 8.25923C16.8719 8.40204 16.942 8.58265 16.942 8.80106C16.942 9.01947 16.8719 9.20008 16.7318 9.34289C16.5918 9.48569 16.4146 9.5571 16.2004 9.5571H3.93938L9.57548 15.303C9.70732 15.4374 9.77324 15.6054 9.77324 15.807C9.77324 16.0086 9.69908 16.185 9.55076 16.3362C9.40244 16.4875 9.2294 16.5631 9.03165 16.5631C8.83389 16.5631 8.66085 16.4875 8.51253 16.3362Z"
                      fill="black"
                      fillOpacity="0.6"
                    />
                    <path
                      d="M1.42628 9.54036L1.64 9.33072L1.42628 9.54036L8.29836 16.5463C8.49865 16.7505 8.74718 16.8631 9.03165 16.8631C9.31611 16.8631 9.56464 16.7505 9.76493 16.5463C9.96517 16.3422 10.0732 16.0915 10.0732 15.807C10.0732 15.533 9.98066 15.2876 9.78965 15.0929L4.65388 9.8571H16.2004C16.4888 9.8571 16.7452 9.75767 16.946 9.55296C17.1464 9.34866 17.242 9.09011 17.242 8.80106C17.242 8.512 17.1464 8.25346 16.946 8.04915C16.7452 7.84445 16.4888 7.74502 16.2004 7.74502H4.65388L9.76493 2.5344C9.96517 2.33026 10.0732 2.07957 10.0732 1.7951C10.0732 1.51063 9.96517 1.25994 9.76493 1.0558C9.56464 0.851609 9.31611 0.739062 9.03165 0.739062C8.75785 0.739062 8.51443 0.835517 8.32308 1.0306L1.42628 8.06176C1.32383 8.1662 1.23956 8.2832 1.18814 8.41427C1.13997 8.53704 1.11797 8.66713 1.11797 8.80106C1.11797 8.93499 1.13997 9.06508 1.18814 9.18785C1.23956 9.31892 1.32383 9.43592 1.42628 9.54036Z"
                      stroke="black"
                      strokeOpacity="0.6"
                      strokeWidth="0.6"
                    />
                  </svg>
                </button>
                <button
                  onClick={() => handlePreviousNext("next")}
                  style={{
                    backgroundColor: "#eee",
                    padding: "13px",
                    borderRadius: "100px",
                    marginRight: "5px",
                  }}
                >
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 18 18"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M9.48747 16.3362L16.3596 9.33029C16.442 9.24628 16.4996 9.16228 16.5326 9.07827C16.5656 8.99427 16.582 8.90186 16.582 8.80106C16.582 8.70025 16.5656 8.60785 16.5326 8.52384C16.4996 8.43984 16.442 8.35584 16.3596 8.27183L9.46275 1.24067C9.33091 1.10627 9.16611 1.03906 8.96835 1.03906C8.7706 1.03906 8.59756 1.11467 8.44924 1.26587C8.30092 1.41708 8.22676 1.59349 8.22676 1.7951C8.22676 1.99671 8.30092 2.17312 8.44924 2.32433L14.0606 8.04502H1.79963C1.58539 8.04502 1.40824 8.11642 1.26816 8.25923C1.12808 8.40204 1.05804 8.58265 1.05804 8.80106C1.05804 9.01947 1.12808 9.20008 1.26816 9.34289C1.40824 9.48569 1.58539 9.5571 1.79963 9.5571H14.0606L8.42452 15.303C8.29268 15.4374 8.22676 15.6054 8.22676 15.807C8.22676 16.0086 8.30092 16.185 8.44924 16.3362C8.59756 16.4875 8.7706 16.5631 8.96835 16.5631C9.16611 16.5631 9.33915 16.4875 9.48747 16.3362Z"
                      fill="black"
                      fillOpacity="0.6"
                    />
                    <path
                      d="M16.5737 9.54036L16.36 9.33072L16.5737 9.54036L9.70164 16.5463C9.50135 16.7505 9.25282 16.8631 8.96835 16.8631C8.68389 16.8631 8.43536 16.7505 8.23507 16.5463C8.03483 16.3422 7.92676 16.0915 7.92676 15.807C7.92676 15.533 8.01934 15.2876 8.21035 15.0929L13.3461 9.8571H1.79963C1.51117 9.8571 1.25478 9.75767 1.05399 9.55296C0.853592 9.34866 0.758039 9.09011 0.758039 8.80106C0.758039 8.512 0.853592 8.25346 1.05399 8.04915C1.25478 7.84445 1.51118 7.74502 1.79963 7.74502H13.3461L8.23507 2.5344C8.03483 2.33026 7.92676 2.07957 7.92676 1.7951C7.92676 1.51063 8.03483 1.25994 8.23507 1.0558C8.43536 0.851609 8.68389 0.739062 8.96835 0.739062C9.24215 0.739062 9.48557 0.835517 9.67692 1.0306L16.5737 8.06176C16.6762 8.1662 16.7604 8.2832 16.8119 8.41427C16.86 8.53704 16.882 8.66713 16.882 8.80106C16.882 8.93499 16.86 9.06508 16.8119 9.18785C16.7604 9.31892 16.6762 9.43592 16.5737 9.54036Z"
                      stroke="black"
                      strokeOpacity="0.6"
                      strokeWidth="0.6"
                    />
                  </svg>
                </button>
              </div>
            </div>
            <Slider
              ref={(slider) => {
                // @ts-ignore
                sliderRef = slider;
              }}
              {...salonSliderSettings}
            >
              {[1, 2, 3, 4].map((item, index) => (
                <div key={index} className="flex flex-row gap-3">
                  <SalonCard key={index} />
                </div>
              ))}
            </Slider>
          </div>
        </div>
      </section>

      <section className="area-sec text-center px-4">
        <div className="container mx-auto">
          <div className="headbox flex space-between mb-4">
            <h2>Near by your area</h2>
          </div>
          <div className="grid lg:grid-cols-4 gap-3 pb-3">
            <SalonCard />
            <SalonCard />
            <SalonCard />
            <SalonCard />
            <SalonCard />
            <SalonCard />
            <SalonCard />
            <SalonCard />
            <SalonCard />
          </div>
          <p className="pt-7 pb-4">Continue exploring salons</p>
          <button
            type="button"
            className="view-more text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
          >
            View More
          </button>
        </div>
      </section>

      {/*<section className="py-16 px-4 border-t border-[#eee] bg-gradient-to-b from-slate-50 to-slate-100">
        <div className="container mx-auto">
          <div className="headbox flex justify-between mb-6">
            <h2>Promo Codes For More Savings</h2>
            <div className="control-btn flex items-center">
              <button
                onClick={() => handlePomoCodePreviousNext("previous")}
                style={{
                  backgroundColor: "#eee",
                  padding: "13px",
                  borderRadius: "100px",
                  marginRight: "5px",
                }}
              >
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 18 18"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M8.51253 16.3362L1.64045 9.33029C1.55805 9.24628 1.50037 9.16228 1.46741 9.07827C1.43445 8.99427 1.41797 8.90186 1.41797 8.80106C1.41797 8.70025 1.43445 8.60785 1.46741 8.52384C1.50037 8.43984 1.55805 8.35584 1.64045 8.27183L8.53725 1.24067C8.66909 1.10627 8.83389 1.03906 9.03165 1.03906C9.2294 1.03906 9.40244 1.11467 9.55076 1.26587C9.69908 1.41708 9.77324 1.59349 9.77324 1.7951C9.77324 1.99671 9.69908 2.17312 9.55076 2.32433L3.93938 8.04502H16.2004C16.4146 8.04502 16.5918 8.11642 16.7318 8.25923C16.8719 8.40204 16.942 8.58265 16.942 8.80106C16.942 9.01947 16.8719 9.20008 16.7318 9.34289C16.5918 9.48569 16.4146 9.5571 16.2004 9.5571H3.93938L9.57548 15.303C9.70732 15.4374 9.77324 15.6054 9.77324 15.807C9.77324 16.0086 9.69908 16.185 9.55076 16.3362C9.40244 16.4875 9.2294 16.5631 9.03165 16.5631C8.83389 16.5631 8.66085 16.4875 8.51253 16.3362Z"
                    fill="black"
                    fillOpacity="0.6"
                  />
                  <path
                    d="M1.42628 9.54036L1.64 9.33072L1.42628 9.54036L8.29836 16.5463C8.49865 16.7505 8.74718 16.8631 9.03165 16.8631C9.31611 16.8631 9.56464 16.7505 9.76493 16.5463C9.96517 16.3422 10.0732 16.0915 10.0732 15.807C10.0732 15.533 9.98066 15.2876 9.78965 15.0929L4.65388 9.8571H16.2004C16.4888 9.8571 16.7452 9.75767 16.946 9.55296C17.1464 9.34866 17.242 9.09011 17.242 8.80106C17.242 8.512 17.1464 8.25346 16.946 8.04915C16.7452 7.84445 16.4888 7.74502 16.2004 7.74502H4.65388L9.76493 2.5344C9.96517 2.33026 10.0732 2.07957 10.0732 1.7951C10.0732 1.51063 9.96517 1.25994 9.76493 1.0558C9.56464 0.851609 9.31611 0.739062 9.03165 0.739062C8.75785 0.739062 8.51443 0.835517 8.32308 1.0306L1.42628 8.06176C1.32383 8.1662 1.23956 8.2832 1.18814 8.41427C1.13997 8.53704 1.11797 8.66713 1.11797 8.80106C1.11797 8.93499 1.13997 9.06508 1.18814 9.18785C1.23956 9.31892 1.32383 9.43592 1.42628 9.54036Z"
                    stroke="black"
                    strokeOpacity="0.6"
                    strokeWidth="0.6"
                  />
                </svg>
              </button>
              <button
                onClick={() => handlePomoCodePreviousNext("next")}
                style={{
                  backgroundColor: "#eee",
                  padding: "13px",
                  borderRadius: "100px",
                  marginRight: "5px",
                }}
              >
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 18 18"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M9.48747 16.3362L16.3596 9.33029C16.442 9.24628 16.4996 9.16228 16.5326 9.07827C16.5656 8.99427 16.582 8.90186 16.582 8.80106C16.582 8.70025 16.5656 8.60785 16.5326 8.52384C16.4996 8.43984 16.442 8.35584 16.3596 8.27183L9.46275 1.24067C9.33091 1.10627 9.16611 1.03906 8.96835 1.03906C8.7706 1.03906 8.59756 1.11467 8.44924 1.26587C8.30092 1.41708 8.22676 1.59349 8.22676 1.7951C8.22676 1.99671 8.30092 2.17312 8.44924 2.32433L14.0606 8.04502H1.79963C1.58539 8.04502 1.40824 8.11642 1.26816 8.25923C1.12808 8.40204 1.05804 8.58265 1.05804 8.80106C1.05804 9.01947 1.12808 9.20008 1.26816 9.34289C1.40824 9.48569 1.58539 9.5571 1.79963 9.5571H14.0606L8.42452 15.303C8.29268 15.4374 8.22676 15.6054 8.22676 15.807C8.22676 16.0086 8.30092 16.185 8.44924 16.3362C8.59756 16.4875 8.7706 16.5631 8.96835 16.5631C9.16611 16.5631 9.33915 16.4875 9.48747 16.3362Z"
                    fill="black"
                    fillOpacity="0.6"
                  />
                  <path
                    d="M16.5737 9.54036L16.36 9.33072L16.5737 9.54036L9.70164 16.5463C9.50135 16.7505 9.25282 16.8631 8.96835 16.8631C8.68389 16.8631 8.43536 16.7505 8.23507 16.5463C8.03483 16.3422 7.92676 16.0915 7.92676 15.807C7.92676 15.533 8.01934 15.2876 8.21035 15.0929L13.3461 9.8571H1.79963C1.51117 9.8571 1.25478 9.75767 1.05399 9.55296C0.853592 9.34866 0.758039 9.09011 0.758039 8.80106C0.758039 8.512 0.853592 8.25346 1.05399 8.04915C1.25478 7.84445 1.51118 7.74502 1.79963 7.74502H13.3461L8.23507 2.5344C8.03483 2.33026 7.92676 2.07957 7.92676 1.7951C7.92676 1.51063 8.03483 1.25994 8.23507 1.0558C8.43536 0.851609 8.68389 0.739062 8.96835 0.739062C9.24215 0.739062 9.48557 0.835517 9.67692 1.0306L16.5737 8.06176C16.6762 8.1662 16.7604 8.2832 16.8119 8.41427C16.86 8.53704 16.882 8.66713 16.882 8.80106C16.882 8.93499 16.86 9.06508 16.8119 9.18785C16.7604 9.31892 16.6762 9.43592 16.5737 9.54036Z"
                    stroke="black"
                    strokeOpacity="0.6"
                    strokeWidth="0.6"
                  />
                </svg>
              </button>
            </div>
          </div>
          <Slider
            ref={(slider) => {
              // @ts-ignore
              promoCodeSliderRef = slider;
            }}
            {...PromoSlider}
          >
            {[1, 2, 3, 4].map((item, index) => (
              <div key={index} className="flex flex-row gap-3">
                <PromoCodeCard key={index} />
              </div>
            ))}
          </Slider>
        </div>
      </section>*/}

      <section className="py-16 px-4">
        <div className="container mx-auto">
          <div className="headbox flex justify-between items-center space-between mb-4">
            <h2>Recommended</h2>
            <div className="control-btn flex items-center">
              <button
                onClick={() => handleRecomandedPreviousNext("previous")}
                style={{
                  backgroundColor: "#eee",
                  padding: "13px",
                  borderRadius: "100px",
                  marginRight: "5px",
                }}
              >
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 18 18"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M8.51253 16.3362L1.64045 9.33029C1.55805 9.24628 1.50037 9.16228 1.46741 9.07827C1.43445 8.99427 1.41797 8.90186 1.41797 8.80106C1.41797 8.70025 1.43445 8.60785 1.46741 8.52384C1.50037 8.43984 1.55805 8.35584 1.64045 8.27183L8.53725 1.24067C8.66909 1.10627 8.83389 1.03906 9.03165 1.03906C9.2294 1.03906 9.40244 1.11467 9.55076 1.26587C9.69908 1.41708 9.77324 1.59349 9.77324 1.7951C9.77324 1.99671 9.69908 2.17312 9.55076 2.32433L3.93938 8.04502H16.2004C16.4146 8.04502 16.5918 8.11642 16.7318 8.25923C16.8719 8.40204 16.942 8.58265 16.942 8.80106C16.942 9.01947 16.8719 9.20008 16.7318 9.34289C16.5918 9.48569 16.4146 9.5571 16.2004 9.5571H3.93938L9.57548 15.303C9.70732 15.4374 9.77324 15.6054 9.77324 15.807C9.77324 16.0086 9.69908 16.185 9.55076 16.3362C9.40244 16.4875 9.2294 16.5631 9.03165 16.5631C8.83389 16.5631 8.66085 16.4875 8.51253 16.3362Z"
                    fill="black"
                    fillOpacity="0.6"
                  />
                  <path
                    d="M1.42628 9.54036L1.64 9.33072L1.42628 9.54036L8.29836 16.5463C8.49865 16.7505 8.74718 16.8631 9.03165 16.8631C9.31611 16.8631 9.56464 16.7505 9.76493 16.5463C9.96517 16.3422 10.0732 16.0915 10.0732 15.807C10.0732 15.533 9.98066 15.2876 9.78965 15.0929L4.65388 9.8571H16.2004C16.4888 9.8571 16.7452 9.75767 16.946 9.55296C17.1464 9.34866 17.242 9.09011 17.242 8.80106C17.242 8.512 17.1464 8.25346 16.946 8.04915C16.7452 7.84445 16.4888 7.74502 16.2004 7.74502H4.65388L9.76493 2.5344C9.96517 2.33026 10.0732 2.07957 10.0732 1.7951C10.0732 1.51063 9.96517 1.25994 9.76493 1.0558C9.56464 0.851609 9.31611 0.739062 9.03165 0.739062C8.75785 0.739062 8.51443 0.835517 8.32308 1.0306L1.42628 8.06176C1.32383 8.1662 1.23956 8.2832 1.18814 8.41427C1.13997 8.53704 1.11797 8.66713 1.11797 8.80106C1.11797 8.93499 1.13997 9.06508 1.18814 9.18785C1.23956 9.31892 1.32383 9.43592 1.42628 9.54036Z"
                    stroke="black"
                    strokeOpacity="0.6"
                    strokeWidth="0.6"
                  />
                </svg>
              </button>
              <button
                onClick={() => handleRecomandedPreviousNext("next")}
                style={{
                  backgroundColor: "#eee",
                  padding: "13px",
                  borderRadius: "100px",
                  marginRight: "5px",
                }}
              >
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 18 18"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M9.48747 16.3362L16.3596 9.33029C16.442 9.24628 16.4996 9.16228 16.5326 9.07827C16.5656 8.99427 16.582 8.90186 16.582 8.80106C16.582 8.70025 16.5656 8.60785 16.5326 8.52384C16.4996 8.43984 16.442 8.35584 16.3596 8.27183L9.46275 1.24067C9.33091 1.10627 9.16611 1.03906 8.96835 1.03906C8.7706 1.03906 8.59756 1.11467 8.44924 1.26587C8.30092 1.41708 8.22676 1.59349 8.22676 1.7951C8.22676 1.99671 8.30092 2.17312 8.44924 2.32433L14.0606 8.04502H1.79963C1.58539 8.04502 1.40824 8.11642 1.26816 8.25923C1.12808 8.40204 1.05804 8.58265 1.05804 8.80106C1.05804 9.01947 1.12808 9.20008 1.26816 9.34289C1.40824 9.48569 1.58539 9.5571 1.79963 9.5571H14.0606L8.42452 15.303C8.29268 15.4374 8.22676 15.6054 8.22676 15.807C8.22676 16.0086 8.30092 16.185 8.44924 16.3362C8.59756 16.4875 8.7706 16.5631 8.96835 16.5631C9.16611 16.5631 9.33915 16.4875 9.48747 16.3362Z"
                    fill="black"
                    fillOpacity="0.6"
                  />
                  <path
                    d="M16.5737 9.54036L16.36 9.33072L16.5737 9.54036L9.70164 16.5463C9.50135 16.7505 9.25282 16.8631 8.96835 16.8631C8.68389 16.8631 8.43536 16.7505 8.23507 16.5463C8.03483 16.3422 7.92676 16.0915 7.92676 15.807C7.92676 15.533 8.01934 15.2876 8.21035 15.0929L13.3461 9.8571H1.79963C1.51117 9.8571 1.25478 9.75767 1.05399 9.55296C0.853592 9.34866 0.758039 9.09011 0.758039 8.80106C0.758039 8.512 0.853592 8.25346 1.05399 8.04915C1.25478 7.84445 1.51118 7.74502 1.79963 7.74502H13.3461L8.23507 2.5344C8.03483 2.33026 7.92676 2.07957 7.92676 1.7951C7.92676 1.51063 8.03483 1.25994 8.23507 1.0558C8.43536 0.851609 8.68389 0.739062 8.96835 0.739062C9.24215 0.739062 9.48557 0.835517 9.67692 1.0306L16.5737 8.06176C16.6762 8.1662 16.7604 8.2832 16.8119 8.41427C16.86 8.53704 16.882 8.66713 16.882 8.80106C16.882 8.93499 16.86 9.06508 16.8119 9.18785C16.7604 9.31892 16.6762 9.43592 16.5737 9.54036Z"
                    stroke="black"
                    strokeOpacity="0.6"
                    strokeWidth="0.6"
                  />
                </svg>
              </button>
            </div>
          </div>
          <Slider
            ref={(slider) => {
              // @ts-ignore
              recomandedSliderRef = slider;
            }}
            {...recommandedSliderSettings}
          >
            {[1, 2, 3, 4].map((item, index) => (
              <div key={index} className="flex flex-row gap-3">
                <SalonCard key={index} />
              </div>
            ))}
          </Slider>
        </div>
      </section>

      <section className="partner-sec px-4">
        <div className="container mx-auto">
          <div className="grid lg:grid-cols-2 gap-6">
            <PartnerCard
              title="Would you like to become a partner with SalonX?"
              description="Cut the phone tag. Find your next appointment and book
                  instantly anytime, anywhere."
              btnText="Add Salon"
              image={Affiliate}
            />
            <PartnerCard
              title="I am currently affiliated as a partner with SalonX."
              description="Cut the phone tag. Find your next appointment and book
                  instantly anytime, anywhere."
              btnText="Go to Dashboard"
              image={Partner}
            />
          </div>
        </div>
      </section>

      <section className="faq-sec text-center px-4">
        <div className="container mx-auto">
          <h2 className="mb-2">Frequently asked questions</h2>
          <p className="max-w-screen-sm mx-auto mb-8">
            Ask everything you need to know about our products and services. We
            are ready to answer all your questions.
          </p>

          <div
            id="accordion-collapse"
            data-accordion="collapse"
            className="accordian-outer max-w-screen-lg mx-auto"
          >
            <Faq
              title="What is Flowbite?"
              description="Flowbite is an open-source library of interactive components
                  built on top of Tailwind CSS including buttons, dropdowns,
                  modals, navbars, and more."
              paragraph1="Check out this guide to learn how to"
              paragraph2="and start developing websites even faster with components on
                  top of Tailwind CSS."
              linkText="get started"
              link="/docs/getting-started/introduction/"
              id={1}
            />

            <Faq
              title="Is there a Figma file available?"
              description="Flowbite is first conceptualized and designed using the Figma
              software so everything you see in the library has a design
              equivalent in our Figma file."
              paragraph1="Check out the"
              paragraph2="based on the utility classes from Tailwind CSS and components
              from Flowbite."
              linkText="Figma design system"
              link="https://flowbite.com/figma/"
              id={2}
            />

            <Faq
              title="What are the differences between Flowbite and Tailwind UI?"
              description="The main difference is that the core components from Flowbite
              are open source under the MIT license, whereas Tailwind UI is
              a paid product. Another difference is that Flowbite relies on
              smaller and standalone components, whereas Tailwind UI offers
              sections of pages.However, we actually recommend using both Flowbite, Flowbite
              Pro, and even Tailwind UI as there is no technical reason
              stopping you from using the best of two worlds."
              paragraph1="Learn more about these technologies:"
              paragraph2="based on the utility classes from Tailwind CSS and components
              from Flowbite."
              linkText="Flowbite Pro"
              link="https://flowbite.com/pro/"
              id={3}
            />
          </div>

          <button
            type="button"
            className="py-4 px-6 rounded-xl mt-4 hover:bg-slate-950 hover:text-[#fff] text-[16px] text-[#3F422E] uppercase border border-slate-950 font-semibold"
          >
            View More
          </button>
        </div>
      </section>

      <section className="concern-sec px-4">
        <div className="container mx-auto">
          <div className="gradbox bg-gradient-to-br from-blue-500 to-violet-600 grid lg:grid-cols-3 gap-6">
            <div className="col-span-2 textbox">
              <div>
                <h2>Have a any Concern?</h2>
                <p className="max-w-[500px]">
                  Lorem Ipsum is simply dummy text of the printing and
                  typesetting industry. It has been in the industry's standard
                  dummy text.
                </p>
              </div>
              <div className="lg:flex gap-3 bottombox">
                <div className="innerbox flex gap-3">
                  <Image
                    src={Email} // Path to the image in the public directory
                    alt="Description of the image"
                    width={30} // Set width
                    height={30} // Set height
                    className="self-end"
                  />
                  <div>
                    <p>Email us</p>
                    <h4>contact@salonx.com</h4>
                  </div>
                </div>
                <div className="innerbox flex gap-3">
                  <Image
                    src={Phone} // Path to the image in the public directory
                    alt="Description of the image"
                    width={30} // Set width
                    height={30} // Set height
                    className="self-end"
                  />
                  <div>
                    <p>Call Us</p>
                    <h4>06 51 22 23 24</h4>
                  </div>
                </div>
              </div>
            </div>
            <div className="formbox">
              <form className="max-w-md mx-auto">
                <div className="relative z-0 w-full mb-5 group">
                  <label htmlFor="underline_select" className="sr-only">
                    Underline select
                  </label>
                  <select
                    id="underline_select"
                    className="block text-white py-2.5 px-0 w-full text-sm text-gray-500 bg-transparent border-0 border-b-2 border-gray-200 appearance-none dark:text-gray-400 dark:border-gray-700 focus:outline-none focus:ring-0 focus:border-gray-200 peer"
                  >
                    <option defaultChecked>Choose a country</option>
                    <option value="US">United States</option>
                    <option value="CA">Canada</option>
                    <option value="FR">France</option>
                    <option value="DE">Germany</option>
                  </select>
                </div>
                <div className="grid md:grid-cols-2 md:gap-6">
                  <div className="relative z-0 w-full mb-5 group">
                    <input
                      type="text"
                      name="floating_first_name"
                      id="floating_first_name"
                      className="text-white block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                      placeholder=" "
                      required
                    />
                    <label
                      htmlFor="floating_first_name"
                      className="text-white peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                    >
                      First name
                    </label>
                  </div>
                  <div className="relative z-0 w-full mb-5 group">
                    <input
                      type="text"
                      name="floating_last_name"
                      id="floating_last_name"
                      className="text-white block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                      placeholder=" "
                      required
                    />
                    <label
                      htmlFor="floating_last_name"
                      className="text-white peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                    >
                      Last name
                    </label>
                  </div>
                </div>
                <div className="relative z-0 w-full mb-5 group">
                  <input
                    type="email"
                    name="floating_email"
                    id="floating_email"
                    className="text-white block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                    placeholder=" "
                    required
                  />
                  <label
                    htmlFor="floating_email"
                    className="text-white peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                  >
                    Email address
                  </label>
                </div>
                <div className="relative z-0 w-full mb-5 group">
                  <textarea
                    rows={5}
                    name="floating_password"
                    id="floating_password"
                    className="text-white block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                    placeholder=" "
                    required
                  />
                  <label
                    htmlFor="floating_password"
                    className="text-white peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                  >
                    Password
                  </label>
                </div>

                <div className="inline-flex items-center termtext">
                  <label
                    className="flex items-center cursor-pointer relative"
                    htmlFor="check-with-link"
                  >
                    <input
                      type="checkbox"
                      defaultChecked
                      className="peer h-5 w-5 cursor-pointer transition-all appearance-none rounded shadow hover:shadow-md border border-slate-300 checked:bg-slate-800 checked:border-slate-800"
                      id="check-with-link"
                    />
                    <span className="absolute text-white opacity-0 peer-checked:opacity-100 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-3.5 w-3.5"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        stroke="currentColor"
                        strokeWidth="1"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        ></path>
                      </svg>
                    </span>
                  </label>
                  <label
                    className="cursor-pointer ml-2 text-slate-600 text-sm"
                    htmlFor="check-with-link"
                  >
                    <p>
                      By submitting this form, I agree that the information
                      entered will be used to contact me.
                    </p>
                  </label>
                </div>

                <button
                  type="submit"
                  className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  Submit
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      <section className="mapbox relative">
        <div className="container mx-auto">
          <div className="grid lg:grid-cols-2">
            <div className="py-20 text-center lg:px-24 px-5">
              <h5 className="uppercase font-light text-opacity-80">
                Social network
              </h5>
              <h2>Follow us on our network</h2>
              <div className="socialbox flex gap-8 mx-auto justify-center items-center my-4">
                <a href="#">
                  <Image
                    src={Facebook} // Path to the image in the public directory
                    alt="Description of the image"
                    width={25} // Set width
                    height={25} // Set height
                    className="align-end"
                  />
                </a>
                <a href="#">
                  <Image
                    src={Twitter} // Path to the image in the public directory
                    alt="Description of the image"
                    width={25} // Set width
                    height={25} // Set height
                    className="align-end"
                  />
                </a>
                <a href="#">
                  <Image
                    src={Insta} // Path to the image in the public directory
                    alt="Description of the image"
                    width={25} // Set width
                    height={25} // Set height
                    className="align-end"
                  />
                </a>
                <a href="#">
                  <Image
                    src={Arate} // Path to the image in the public directory
                    alt="Description of the image"
                    width={25} // Set width
                    height={25} // Set height
                    className="align-end"
                  />
                </a>
                <a href="#">
                  <Image
                    src={Youtube} // Path to the image in the public directory
                    alt="Description of the image"
                    width={25} // Set width
                    height={25} // Set height
                    className="align-end"
                  />
                </a>
              </div>
              <hr className="mb-10 mt-6" />
              <h5 className="uppercase font-light text-opacity-80">
                Newsletter
              </h5>
              <h2>Be the first to know</h2>
              <div className="newsletter mt-9 lg:flex gap-3">
                <div className="relative z-0 w-full group">
                  <input
                    type="email"
                    name="floating_email"
                    id="floating_email"
                    className="block py-3 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                    placeholder=" "
                    required
                  />
                  <label
                    htmlFor="floating_email"
                    className="peer-focus:font-medium absolute text-sm text-left text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                  >
                    Enter your email
                  </label>
                </div>
                <button
                  type="submit"
                  className="text-white uppercase  bg-slate-950 hover:bg-slate-800 focus:ring-4 focus:outline-none focus:ring-slate-300 font-medium lg:rounded-full text-sm w-full sm:w-auto px-5 mt-2 lg:mt-0 py-2.5 text-center dark:bg-slate-600 dark:hover:bg-slate-700 dark:focus:slate-blue-800"
                >
                  Subscribe
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="lg:w-6/12 w-full lg:absolute right-0 top-0 lg:h-full ">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d52918450.40025156!2d-161.85240697328845!3d35.949761324666035!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x54eab584e432360b%3A0x1c3bb99243deb742!2sUnited%20States!5e0!3m2!1sen!2sin!4v1728374367972!5m2!1sen!2sin"
            width="100%"
            height="100%"
            allowFullScreen={false}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </section>
    </>
  );
}
