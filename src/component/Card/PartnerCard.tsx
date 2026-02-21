import React from "react";
import Image, { StaticImageData } from "next/image";

type Props = {
  title: string;
  description: string;
  btnText: string;
  image: string | StaticImageData;
};
function PartnerCard(props: Props) {
  return (
    <div className="partnerbox">
      <div className="max-width">
        <h3>{props.title}</h3>
        <p>{props.description}</p>
        <button
          type="button"
          className="text-gray-900 bg-dark border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
        >
          {props.btnText}
        </button>
      </div>
      <Image
        src={props.image} // Path to the image in the public directory
        alt="Description of the image"
      />
    </div>
  );
}

export default PartnerCard;
