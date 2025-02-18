import { useState } from "react";

type ToggleBtnProps = {
  status?: boolean | null;
  onClick?: () => Promise<boolean>;
};

const ToggleBtn = ({ status, onClick }: ToggleBtnProps) => {
  const [isOn, setIsOn] = useState(status);

  const onToggle = async () => {
    if (onClick) {
      const result = await onClick();
      if (result === true) {
        setIsOn(!isOn);
      }
    }
  };

  return (
    <button
      onClick={onToggle}
      className={`w-32 h-8 sm:w-56 sm:h-10 rounded-full flex items-center transition duration-300 px-1 ${isOn ? "bg-green" : "bg-disabled-gray"}`}
    >
      <div
        className={`w-6 h-6 sm:w-8 sm:h-8 bg-white rounded-full transform transition duration-300 ${isOn ? "translate-x-[95px] sm:translate-x-[183px]" : "translate-x-0"}`}
      ></div>
      <div className="w-[70px] sm:w-[150px] text-white">{isOn ? "구직 중" : "휴직 중"}</div>
    </button>
  );
};

export default ToggleBtn;
