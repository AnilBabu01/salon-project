import { useState } from "react";
import { twMerge } from "tailwind-merge";

export const ImgView: React.FC<{ url: string; onDelete: () => void; className?: string; }> = ({ url, onDelete, className = "" }) => {
  const [showX, setShowX] = useState(false);
  return <div
    onMouseEnter={() => setShowX(true)}
    onMouseLeave={() => setShowX(false)}
    className={twMerge(` relative rounded-xl min-w-[6rem] min-h-[6rem] text-center`, className)}>
    {showX && <div onClick={onDelete} className=" shadow-lg cursor-pointer text-gray-400 absolute right-1 top-1 bg-white font-bold rounded-full p-1 h-[1.9rem] w-[1.9rem]">X</div>}
    <img src={url} className=" w-[6rem] h-[6rem] rounded-xl"
      // @ts-ignore
      alt={`Preview of ${url}`} />
  </div>;
};