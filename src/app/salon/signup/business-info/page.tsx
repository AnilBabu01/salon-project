"use client";

import React, { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import {
  Logo,
} from "../../../assets";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useBusinessImages } from "@/hooks/useApi";
import { useSalonServiceData } from "@/atoms/salonRegisterAtom";
import { twMerge } from 'tailwind-merge';
import { ImgView } from "@/component/Card/ImgVies";
import { removeImgFromCloud } from "@/lib/utils";


const page = () => {
  const { data, error } = useBusinessImages();
  // console.log({ data, error });
  const [serviceData, setServiceData] = useSalonServiceData();

  const [businessFiles, setBusinessFiles] = useState<any[]>([]);
  const [menuFiles, setMenuFiles] = useState<any[]>([]);
  const [certFiles, setCertFiles] = useState<any[]>([]);
  const [heroFile, setHeroFile] = useState<any>(null);

  const [cloudBusinessFiles, setCloudBusinessFiles] = useState<any[]>([]);
  const [cloudMenuFiles, setCloudMenuFiles] = useState<any[]>([]);
  const [cloudCertFiles, setCloudCertFiles] = useState<any[]>([]);
  const [cloudHeroFile, setCloudHeroFile] = useState<any>(null);


  useEffect(() => {
    setCloudBusinessFiles(data?.data.business?.map(f => ({ url: f.url, id: f.key })) ?? []);
    setCloudMenuFiles(data?.data.menu?.map(f => ({ url: f.url, id: f.key })) ?? []);
    setCloudCertFiles(data?.data.cert?.map(f => ({ url: f.url, id: f.key })) ?? []);
    setCloudHeroFile({ url: data?.data.hero?.url ?? "", id: data?.data?.hero?.key ?? "" });

    setAbout(data?.data.description ?? "");
    setServiceFor(data?.data.whomToProvide ?? null);
  }, [data?.data]);


  const viewBusinessFiles = useMemo(() => [...businessFiles?.map((o, i) => ({ url: URL.createObjectURL(o), id: i })), ...cloudBusinessFiles], [businessFiles, cloudBusinessFiles]);

  const viewMenuFiles = useMemo(() => [...menuFiles?.map((o, i) => ({ url: URL.createObjectURL(o), id: i })), ...cloudMenuFiles], [menuFiles, cloudMenuFiles]);

  const viewCertFiles = useMemo(() => [...certFiles?.map((o, i) => ({ url: URL.createObjectURL(o), id: i })), ...cloudCertFiles], [certFiles, cloudCertFiles]);

  const viewHeroFile = useMemo(() =>
    heroFile
      ? ({ url: URL.createObjectURL(heroFile), id: 1 })
      : cloudHeroFile
        ? ({ url: cloudHeroFile?.url, id: cloudHeroFile?.key })
        : null,
    [heroFile, cloudHeroFile]);

  const [serviceFor, setServiceFor] = useState<"male" | "female" | "unisex" | null>(null);
  const [about, setAbout] = useState("");
  const router = useRouter();
  useEffect(() => {
    setServiceData({
      for: serviceFor ?? "",
      about,
      where: ""
    });
  }, [about, serviceFor]);

  // console.log({ businessFiles, menuFiles, certFiles, heroFile, about, serviceFor });

  const uploadAllFileToS3 = async () => {
    // if (!heroFile || !businessFiles.length || !menuFiles.length || !certFiles.length) return;

    const uploadeFiles = {
      hero: [],
      business: [],
      menu: [],
      cert: [],
    };
    const files = [
      { name: "hero", data: [heroFile ?? ""] },
      { name: "business", data: businessFiles },
      { name: "menu", data: menuFiles },
      { name: "cert", data: certFiles },
    ];
    for (const f of files) {
      if (f.data.length) {
        const formData = new FormData();
        for (let i = 0; i < f.data.length; i++) {
          formData.append(`file-${i}`, f.data[i]);
        }

        try {
          formData.append("type", f.name);
          await axios.post('/api/upload/salon', formData, {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          });
        } catch (error) {
          console.error('Error uploading file:', error);
        }

      }
    }
    return uploadeFiles;
  };

  const handleUpload = (e: any) => {
    e.preventDefault();
    if (!about || !serviceFor) {
      return;
    }
    uploadAllFileToS3().then(r => {
      console.log({ r });
      router.push("/salon/signup/service-provide");
    });
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
            <div onClick={() => router.back()} className="block cursor-pointer rounded-full lg:absolute left-3 lg:left-0 p-2 bg-[#F1F1F1] bg-opacity w-10 h-10 lg:mb-0 mb-5">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M9.57 5.93018L3.5 12.0002L9.57 18.0702" stroke="#292D32" strokeWidth="2" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M20.4999 12H3.66992" stroke="#292D32" strokeWidth="2" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <div className="lg:flex flex-col justify-center items-center">
              <div className="text-[28px] leading-10 font-bold text-center mb-3 satoshi-bold">
                Add business info
              </div>
              <p className="satoshi-regular text-[16px] mx-auto text-black text-opacity-70 tracking-tight max-w-80 text-center">Please enter business details, Images and your expert certificates.</p>
              <form className="w-full lg:mt-12 mt-5" onSubmit={handleUpload}>
                <div className="flex flex-wrap w-full mb-6">
                  <div className="w-full">
                    <label className="satoshi-bold text-[16px]">Upload Business Images<span className="text-[#F55139]">*</span></label>
                    <div className="flex items-center justify-center w-full mt-2">
                      <label htmlFor="dropzone-file" className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-gray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-50">
                        {viewHeroFile && viewHeroFile.url
                          ? <img src={viewHeroFile.url} alt="hero-img"
                            className="max-h-64 w-auto max-w-full object-contain" />
                          : <div className="flex flex-col items-center justify-center pt-5 pb-6 w-full">
                            <svg className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2" />
                            </svg>
                            <p className="mb-2 text-sm text-gray-500 dark:text-gray-400"><span className="font-semibold">Click to upload</span> or drag and drop</p>
                            <p className="text-xs text-gray-500 dark:text-gray-400">SVG, PNG, JPG or GIF (MAX. 800x400px)</p>
                          </div>}
                        <input
                          // @ts-ignore
                          onChange={(e) => setHeroFile(e.target.files[0])}
                          id="dropzone-file" accept="image/png, image/jpeg, image/jpg" type="file" className="hidden" />
                      </label>
                    </div>

                    <div className="flex w-full overflow-x-auto overflow-y-hidden gap-3 mt-4">
                      <label htmlFor="dropzone-file-extra" className="cursor-pointer border-dashed p-4 rounded-xl min-w-[6rem] min-h-[6rem] text-center border-[#D5CFCF] border">
                        <svg className="mx-auto" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M6 12H18" stroke="#999" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                          <path d="M12 18V6" stroke="#999" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                        </svg>
                        <p>Add</p>
                        <input
                          // @ts-ignore
                          onChange={(e) => setBusinessFiles(p => [...e.target.files, ...p])}
                          id="dropzone-file-extra" type="file" accept="image/png, image/jpeg, image/jpg" multiple={true} className="hidden" />
                      </label>
                      {Array.from(viewBusinessFiles).map((img, index) => (
                        <ImgView onDelete={() => {
                          // if id is not number means file is from cloud
                          if (isNaN(Number(img.id))) {
                            // delete from cloud
                            removeImgFromCloud("business", img.id).then(r => {
                              setCloudBusinessFiles(p => p.filter(o => o.id != img.id));
                            });
                          } else {
                            setBusinessFiles(p => p.filter((o, i) => i != img.id));
                          }
                        }} key={index} url={img.url} />
                      ))}
                    </div>

                    <hr className="border-[#eee] w-full my-5" />
                    <div className="flex flex-col gap-3 mt-4">
                      <label className="satoshi-bold text-[16px]">Upload Menu Images<span className="text-[#F55139]">*</span></label>
                      <div className="flex w-full overflow-x-auto overflow-y-hidden gap-3 mt-4">
                        <label htmlFor="dropzone-file-menu" className="cursor-pointer border-dashed p-4 rounded-xl min-w-[6rem] h-[6rem] text-center border-[#D5CFCF] border">
                          <svg className="mx-auto" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M6 12H18" stroke="#999" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                            <path d="M12 18V6" stroke="#999" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                          </svg>
                          <p>Add</p>
                          <input
                            // @ts-ignore
                            onChange={(e) => setMenuFiles(p => [...e.target.files, ...p])}
                            id="dropzone-file-menu" type="file" accept="image/png, image/jpeg, image/jpg" multiple={true} className="hidden" />
                        </label>
                        {Array.from(viewMenuFiles).map((img, index) => (
                          <ImgView onDelete={() => {
                            // if id is not number means file is from cloud
                            if (isNaN(Number(img.id))) {
                              // delete from cloud
                              removeImgFromCloud("menu", img.id).then(r => {
                                console.log({ cloudMenuFiles });
                                setCloudMenuFiles(p => p.filter(o => o.id != img.id));
                              });

                            } else {
                              setMenuFiles(p => p.filter((o, i) => i != img.id));
                            }
                          }} key={index} url={img.url} />
                        ))}
                      </div>
                    </div>

                    <hr className="border-[#eee] w-full my-5" />
                    <div className="flex flex-col gap-3 mt-4">
                      <label className="satoshi-bold text-[16px]">Upload Certificates<span className="text-[#F55139]">*</span></label>
                      <div className="flex w-full overflow-x-auto overflow-y-hidden gap-3 mt-4">
                        <label htmlFor="dropzone-file-certificates" className="cursor-pointer border-dashed p-4 rounded-xl min-w-[10rem] min-h-[6rem] text-center border-[#D5CFCF] border">
                          <svg className="mx-auto" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M6 12H18" stroke="#999" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                            <path d="M12 18V6" stroke="#999" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                          </svg>
                          <p>Add</p>
                          <input
                            // @ts-ignore
                            onChange={(e) => setCertFiles(p => [...e.target.files, ...p])}
                            id="dropzone-file-certificates" accept="image/png, image/jpeg, image/jpg" type="file" multiple={true} className="hidden" />
                        </label>
                        {Array.from(viewCertFiles).map((img, index) => (
                          <ImgView onDelete={() => {
                            // if id is not number means file is from cloud
                            if (isNaN(Number(img.id))) {
                              // delete from cloud
                              removeImgFromCloud("cert", img.id).then(r => {
                                setCloudCertFiles(p => p.filter(o => o.id != img.id));
                              });
                            } else {
                              console.log({ certFiles, img, index });
                              setCertFiles(p => p.filter((o, i) => i != img.id));
                            }
                          }} key={index} url={img.url} />
                        ))}
                      </div>
                    </div>

                    <hr className="border-[#eee] w-full my-5" />
                    <div className="flex flex-col gap-3 mt-4">
                      <label className="satoshi-bold text-[16px]">Service providing for<span className="text-[#F55139]">*</span></label>
                      <div className="md:flex gap-6">
                        <div className="flex items-center lg:mb-0 mb-2 space-x-3">
                          <input type="checkbox"
                            onClick={() => setServiceFor("male")}
                            checked={serviceFor === "male"} className="border-gray-300 outline-none cursor-pointer rounded-md h-7 w-7" />
                          <div className="flex flex-col">
                            <h3 className="text-black text-[16px] mb-0 text-opacity-60 font-medium leading-none satoshi-medium">Male </h3>
                          </div>
                        </div>
                        <div className="flex items-center lg:mb-0 mb-2 space-x-3  ">
                          <input type="checkbox"
                            onClick={() => setServiceFor("female")}
                            checked={serviceFor === "female"} className="border-gray-300 outline-none cursor-pointer rounded-md h-7 w-7" />
                          <div className="flex flex-col">
                            <h3 className="text-black text-[16px] mb-0 text-opacity-60 font-medium leading-none satoshi-medium">Female </h3>
                          </div>
                        </div>
                        <div className="flex items-center lg:mb-0 mb-2 space-x-3 ">
                          <input type="checkbox"
                            onClick={() => setServiceFor("unisex")}
                            checked={serviceFor === "unisex"} className="border-gray-300 outline-none cursor-pointer rounded-md h-7 w-7" />
                          <div className="flex flex-col">
                            <h3 className="text-black text-[16px] mb-0 text-opacity-60 font-medium leading-none satoshi-medium">Unisex </h3>
                          </div>
                        </div>
                      </div>
                    </div>

                    <hr className="border-[#eee] w-full my-5" />
                    <div className="flex flex-col gap-3 mt-4">
                      <label className="satoshi-bold text-[16px]">About the business<span className="text-[#F55139]">*</span></label>
                      <textarea value={about} onChange={(e) => setAbout(e.target.value)} className="resize rounded-xl max-w-full border-[#9C9C9C] p-4"></textarea>
                    </div>

                    <div className="flex justify-end items-center w-full mt-9">
                      <button
                        type="submit" className="bg-[#D78B30] rounded-xl py-3 px-6 text-white uppercase satoshi-bold">CONTINUE</button>
                    </div>
                  </div>
                </div>
              </form>

            </div>
          </div>
        </div >
      </div >
    </>
  );
};


export default page;
