import React from "react";
import Image from "next/image";
import { Product1, Clock, Location, Starwhite } from "../../app/assets";
import { Salon } from "@/utils/constants";
type Props = {
  item?: Salon;
};

export default function SalonCard({ item }: Props) {


  console.log("ss",item?.image)
  
  return (
    <div className="product-box basis-1/4">
      <div className="imgbox relative">
        <span className="img-badge bg-blue-100 text-blue-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded dark:bg-blue-900 dark:text-blue-300">
          {item?.name ?? "Unisex"}
        </span>
    
        <Image
          src={item?.image ?? Product1} // Path to the image in the public directory
          alt="Description of the image"
          width={300}
          height={300}
        />
        <div className="ratingbox">
          <Image
            src={Starwhite} // Path to the image in the public directory
            alt="Description of the image"
          />
          <p> {item?.rating ?? "4.25"} </p>
        </div>
      </div>
      <div className="protext">
        <div className="flex justify-between items-center pt-4 pb-3">
          <h4> {item?.description ?? "LuxeLocks Salon & Spa"}</h4>
          <span className="distance">6.5KM</span>
        </div>
        <p className="flex gap-2 mb-1">
          <Image
            src={Location} // Path to the image in the public directory
            alt="Description of the image"
            width={16} // Set width
            height={21} // Set height
          />

          {item?.location ?? "6391 Elgin St, Delaware 10299"}
        </p>
        <p className="flex gap-2 mb-1">
          <Image
            src={Clock} // Path to the image in the public directory
            alt="Description of the image"
            width={16} // Set width
            height={21} // Set height
          />

          {item?.openCloseTime ?? " 9:00 am - 7:00 pm"}
        </p>
      </div>
    </div>
  );
}
