import clsx from "clsx";

type BtnProps = {
  text?: string;
  color?: "green" | "red" | "white" | "blue" | "disabled";
  onClick?: () => void;
  className?: string;
};

const Btn: React.FC<BtnProps> = ({ text = "다음", color = "green", onClick, className }) => {
  return (
    <button
      className={clsx(
        "w-full sm:w-80 h-14 sm:h-16 rounded-lg font-gtr-B text-button",
        "mt-2 flex justify-center items-center mx-auto", 
        className,
        {
          "border-2 bg-blue text-white border-blue": color === "blue",
          "border-2 bg-disabled-gray text-white border-disabled-gray": color === "disabled",
          "border-2 bg-green text-white border-green": color === "green",
          "border-2 bg-red text-white border-red": color === "red",
          "border bg-white text-green border-gray-300": color === "white",
        }
      )}
      onClick={onClick}
    >
      <p className="text-inherit">{text}</p>
    </button>
  );
};

export default Btn;
