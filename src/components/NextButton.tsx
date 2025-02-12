type NextButtonProps = {
    label: string;
    onClick: () => void;
    variant?: "primary" | "secondary";
  };
  
  const NextButton = ({ label, onClick, variant = "primary" }: NextButtonProps) => {
    const baseStyle = "w-full py-3 rounded-lg font-bold text-button"; // 폰트 크기 변경
    const primaryStyle = "bg-green text-white"; // bg-primary → bg-green (설정에 맞게 변경)
    const secondaryStyle = "bg-white text-green border border-green"; // text-primary → text-green
  
    return (
      <button className={`${baseStyle} ${variant === "primary" ? primaryStyle : secondaryStyle}`} onClick={onClick}>
        {label}
      </button>
    );
  };
  
  export default NextButton;
  