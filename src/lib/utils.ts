import axios from "axios";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function showDuration(hours: string, minutes: string) {
  return `${hours} hr ${minutes} min`;
}

export const removeImgFromCloud = async (type: ImgTypes, key: string) => {
  try {
    const r = await axios.delete(`/api/upload/salon?imgId=${key}&imgType=${type}`);
    console.log({ r });
    return true;
  } catch (error) {
    return false;
  }
};
