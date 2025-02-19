type ToggleBtnProps = {
  status?: boolean;
  onClick?: () => Promise<void>;
};

const ToggleBtn = ({ status, onClick }: ToggleBtnProps) => {
  return (
    <button
      onClick={onClick}
      className={`w-32 h-8 sm:w-56 sm:h-10 rounded-full flex items-center transition duration-300 px-1 ${status ? "bg-green" : "bg-disabled-gray"}`}
    >
      <div
        className={`w-6 h-6 sm:w-8 sm:h-8 bg-white rounded-full transform transition duration-300 ${status ? "translate-x-[95px] sm:translate-x-[183px]" : "translate-x-0"}`}
      ></div>
      <div className="w-[70px] sm:w-[150px] text-white text-item">
        {status ? "구직 중" : "휴직 중"}
      </div>
    </button>
  );
};

export default ToggleBtn;
