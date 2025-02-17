type ImageBtnProps = {
  label: string;
  icon: string;
  color: string;
  onClick: () => void;
};

const ImageBtn: React.FC<ImageBtnProps> = ({ label, icon, color = "green", onClick }) => {
  return (
    <button
      onClick={onClick}
      className={`w-full h-32 flex flex-col bg-${color} items-center justify-center text-button border rounded-lg p-5`}
    >
      <img className="w-12 h-12 mb-2" src={icon} />
      <div className={`text-button font-bold text-${color === "green" ? "white" : "black"}`}>
        {label}
      </div>
    </button>
  );
};

export default ImageBtn;
