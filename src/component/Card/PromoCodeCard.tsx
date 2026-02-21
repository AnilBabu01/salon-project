import React from "react";

function PromoCodeCard() {
  return (
    <div className="promobox mx-2 bg-gradient-to-br from-blue-500 to-violet-600">
      <div className="innerbox">
        <h3>Get 30% OFF</h3>
        <p>Get discount on all the Skin care service</p>
        <button
          type="button"
          className="text-gray-900 code-btn bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
        >
          Code : SKIN30OFF
        </button>
      </div>
      <div className="dotted-line">
        <div className="flex justify-between items-center innerbox">
          <p>Expires on : 20 Aug, 2022</p>
          <button
            type="button"
            className="text-gray-900  bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
          >
            Know More
          </button>
        </div>
      </div>
    </div>
  );
}

export default PromoCodeCard;
