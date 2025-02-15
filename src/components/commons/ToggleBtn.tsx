import { useState } from "react";

type ToggleBtnProps = {
  status?: boolean;
  onClick?: () => void;
};

const ToggleBtn = ({ status, onClick }: ToggleBtnProps) => {
  const [isOn, setIsOn] = useState(status ? true : false);

  const onToggle = () => {
    setIsOn(!isOn);
    onClick?.();
  };

  return (
    <button
      onClick={onToggle}
      className={`w-40 h-8 rounded-full flex items-center transition duration-300 px-1 relative ${isOn ? "bg-green" : "bg-red"}`}
    >
      <div
        className={`w-6 h-6 bg-white rounded-full transform transition duration-300 ${isOn ? "translate-x-0" : "translate-x-32"}`}
      ></div>
      <div className="absolute inset-0 flex items-center justify-center text-white">
        {isOn ? "구직 중" : "비구직 중"}
      </div>
    </button>
  );
};

export default ToggleBtn;
