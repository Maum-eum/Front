import React from "react";

type InputProps = {
  type?: string;
  placeholder: string;
  className?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const Input: React.FC<InputProps> = ({ type = "text", placeholder, className, value, onChange }) => {
  return (
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className={`w-full p-3 border-2 border-gray-300 rounded-lg bg-white ${className}`} // ✅ 테두리 회색으로 변경
    />
  );
};

export default Input;
