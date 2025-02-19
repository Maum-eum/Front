type BasicBtnProps = {
  label: string;
  color: string;
  onClick?: () => void;
};

const BasicBtn = ({ label, color, onClick }: BasicBtnProps) => {
  return (
    <button
      className={`w-full h-12 sm:h-12 border rounded-lg active:bg-point-pink bg-${color} text-${color == "white" ? "black" : "white"}`}
      onClick={onClick}
    >
      <div className="font-bold text-button">{label}</div>
    </button>
  );
};

export default BasicBtn;
