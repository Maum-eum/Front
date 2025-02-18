type BasicBtnProps = {
  label: string;
  color: string;
  onClick?: () => void;
};

const BasicBtn = ({ label, color, onClick }: BasicBtnProps) => {
  return (
    <button
      className={`w-[135px] h-10 sm:w-[290px] sm:h-12 border rounded-lg active:bg-point-pink bg-${color} text-${color == "white" ? "black" : "white"}`}
      onClick={onClick}
    >
      <div className="font-bold">{label}</div>
    </button>
  );
};

export default BasicBtn;
