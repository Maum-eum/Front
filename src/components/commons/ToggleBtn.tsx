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
      className={`w-32 h-8 sm:w-56 sm:h-10 rounded-full flex items-center transition duration-300 ${isOn ? "bg-green px-1" : "bg-red px-1"}`}
    >
      <div
        className={`w-6 h-6 sm:w-8 sm:h-8 bg-white rounded-full transform transition duration-300 ${isOn ? "translate-x-0" : "translate-x-30 sm:translate-x-48"}`}
      ></div>
      <div className="w-[70px] sm:w-[150px] text-white">{isOn ? "구직 중" : "휴식 중"}</div>
    </button>
  );
};

export default ToggleBtn;
