type BasicBtnProps = {
  label: string;
  color: string;
  attribute: string;
  onClick?: () => void;
};

const BasicBtn = ({ label, color, attribute, onClick }: BasicBtnProps) => {
  return (
    <button
      className={`w-full h-10 sm:h-12 border rounded-lg active:bg-point-pink bg-${color} text-${color == "white" ? "black" : "white"}`}
      onClick={onClick}
    >
      <div className={`font-bold text-${attribute}`}>{label}</div>
    </button>
  );
};

export default BasicBtn;
