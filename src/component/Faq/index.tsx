import React from "react";

type Props = {
  title: string;
  description: string;
  paragraph1?: string;
  paragraph2?: string;
  linkText?: string;
  link?: string;
  id: number;
};

function Faq(props: Props) {
  return (
    <>
      <h2 id={`accordion-collapse-heading-${props.id}`}>
        <button
          type="button"
          className="flex items-center justify-between w-full p-5 font-medium rtl:text-right text-gray-500 border border-b-0 border-gray-200 rounded-t-xl focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-800 dark:border-gray-700 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 gap-3"
          data-accordion-target={`#accordion-collapse-body-${props.id}`}
          aria-expanded="true"
          aria-controls={`accordion-collapse-body-${props.id}`}
        >
          <span>{props.title}</span>
          <svg
            data-accordion-icon
            className="w-3 h-3 rotate-180 shrink-0"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 10 6"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M9 5 5 1 1 5"
            />
          </svg>
        </button>
      </h2>
      <div
        id={`accordion-collapse-body-${props.id}`}
        className="hidden"
        aria-labelledby={`accordion-collapse-heading-${props.id}`}
      >
        <div className="p-5 border border-b-0 border-gray-200 dark:border-gray-700 dark:bg-gray-900">
          <p className="mb-2 text-gray-500 dark:text-gray-400">
            {props.description}
          </p>
          <p className="text-gray-500 dark:text-gray-400">
            {props.paragraph1}
            <a
              href={props.link}
              className="text-blue-600 dark:text-blue-500 hover:underline"
            >
              {props.linkText}
            </a>{" "}
            {props.paragraph2}
          </p>
        </div>
      </div>
    </>
  );
}

export default Faq;
