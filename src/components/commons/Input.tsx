import clsx from "clsx";
import React from "react";

type InputProps = {
  type?: string;
  name? : string;
  placeholder: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const Input: React.FC<InputProps> = ({ type = "text", name, placeholder, value, onChange }) => {
  return (
    <input
      type={type}
      name={name}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className={clsx(`w-full p-3 border-2 bg-white border-gray-300 focus:border-green focus:outline-none rounded-lg text-content sm:text-lg focus:ring-0`)} // ✅ 테두리 회색으로 변경
    />
  );
};

export default Input;
