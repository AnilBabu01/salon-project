import useSWR from 'swr';
import axios from "axios";

const fetcher = (url: string) => axios.get(url).then((res) => res.data);

export const useBusinessTypes = () => {
  return useSWR<{ data: [{ _id: string, name: string; }]; selected: [string]; }, any, any>("/api/salon/add-info", fetcher);
};

type ImgFile = {
  url: string;
  key: string;
  _id: string;
};
export const useBusinessImages = () => {
  return useSWR<{
    data: {
      hero: ImgFile,
      menu: ImgFile[],
      cert: ImgFile[],
      business: ImgFile[];
      _id: string;
      registrationStage: number;
      whereToProvide: "home" | "my";
      whomToProvide: "male" | "female" | "unisex";
      description: string;
    };
  }, any, any>("/api/salon/business-img", fetcher);
};


export const useBusinessHours = () => {
  return useSWR<{
    data: { _id: string, day: string; startTime: string, endTime: string; }[];
    selected: string[];
  }, any, any>("/api/salon/business-hr", fetcher);
};


export const useBusinessAddress = () => {
  return useSWR<{
    message: string;
    data: {
      _id: string, salonId: string, address: string, street: string,
      city: string, state: string, zip: string, country: string;
    };
  }, any, any>("/api/salon/address", fetcher);
};

export const useServiceList = () => {
  const { data, error } = useSWR<{}, any, any>("/api/salon/add-service-list", fetcher);
  return {
    // @ts-ignore
    data: data?.data as {
      _id: string, serviceName: string, serviceHours: number,
      serviceMinutes: number, serviceType: number, servicePrice: number,
      mobile: boolean; img: { url: string; key: string; _id: string; };
    }[], error
  };
};