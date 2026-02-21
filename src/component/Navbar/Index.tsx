import React from "react";
import Image from "next/image";
import { Logo, Cart, User, LocationUp, Search } from "../../app/assets";

import Select, { ISelectList } from "@/component/Select";
import Link from "next/link";
import { signOut, useSession } from "next-auth/react";

type Props = {
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  setSelect?: (value: any) => void; 
};

function Navbar({onChange,setSelect}: Props) {
  const session = useSession();
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

  return (
    <header>
      <nav className="bg-white border-gray-200 dark:bg-gray-900 pt-5 pb-7 px-2">
        <div className="lg:flex justify-between container mx-auto items-center ">
          <a
            href="#"
            className="lg:flex items-center space-x-3 rtl:space-x-reverse lg:justify-start justify-center  mb-2 lg:mb-0 "
          >
            <Image
              src={Logo} // Path to the image in the public directory
              alt="Description of the image"
              width={206} // Set width
              height={60} // Set height
            />
          </a>

          <div className="cartbox flex gap-4 lg:justify-start justify-center order-3">
            <div className="carticon cart flex gap-2 items-center">
              <div className="relative">
                <Image
                  src={Cart} // Path to the image in the public directory
                  alt="Description of the image"
                  width={16} // Set width
                  height={21} // Set height
                />
                <div className="absolute inline-flex items-center justify-center w-5 h-5 text-xs font-bold text-white bg-red-500 border-0 border-white rounded-full -bottom-2 -end-0 dark:border-gray-900">
                  20
                </div>
              </div>
              <a href="#" className="" aria-current="page">
                Cart
              </a>
            </div>
            <div className="carticon flex gap-2 items-center">
              <Image
                src={User} // Path to the image in the public directory
                alt="Description of the image"
                width={16} // Set width
                height={21} // Set height
              />
              {session?.data ? (
                <a className=" cursor-pointer" onClick={() => signOut()}>
                  Sign Out
                </a>
              ) : (
                <Link href="/signin" className="" aria-current="page">
                  Sign In
                </Link>
              )}
            </div>
          </div>

          <div className="flex gap-4 items-center w-3/6">
            <div className="locationbox">
              <div className="max-w-sm mx-auto">
                <Image
                  src={LocationUp} // Path to the image in the public directory
                  alt="Description of the image"
                  width={16} // Set width
                  height={21} // Set height
                />
                <label htmlFor="states" className="sr-only">
                  Choose a state
                </label>
                <Select list={stateList} id="states"  setSelect={setSelect}/>
              </div>
            </div>
            <div className="searchbox">
              <label
                htmlFor="default-search"
                className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
              >
                Search
              </label>
              <div className="relative">
                <div className="search-icon absolute my-auto top-0 bottom-0 inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                  <Image
                    src={Search} // Path to the image in the public directory
                    alt="Description of the image"
                    width={16} // Set width
                    height={21} // Set height
                  />
                </div>
                <input
                  type="search"
                  id="default-search"
                  className="block pl-6 w-full lg:min-w-80 p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Search for salon, services..."
                  required
                  onChange={onChange}
                />
              </div>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}

export default Navbar;
