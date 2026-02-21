import React from "react";

export interface ISelectList {
  label: string;
  value: string;
  checked: boolean;
}
type Props = {
  list: ISelectList[];
  id?: string;
  setSelect?: (value: any) => void; 
};
function Select(props: Props) {
  return (
    <select
      id={props.id}
      onChange={(e) => props.setSelect && props.setSelect(e.target.value)}
      className="border border-gray-300 text-gray-900 text-sm dark:border-s-gray-700 focus:ring-blue-100 focus:border-blue-0 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 rounded-full"
    >
      {props.list.map((item: ISelectList) => (
        <option key={item.value} defaultChecked value={item.value}>
          {item.label}
        </option>
      ))}
    </select>
  );
}

export default Select;
