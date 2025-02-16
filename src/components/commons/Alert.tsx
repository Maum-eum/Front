import Btn from "./Btn";

type AlertProps = {
  isOpen: boolean;
  onClose: () => void;
  children?: React.ReactNode;
};

const Alert: React.FC<AlertProps> = ({ isOpen = false, onClose, children }) => {
  const handleClose = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (event.target === event.currentTarget) {
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed left-0 top-0 z-40 flex h-full w-full items-center justify-center bg-black bg-opacity-50"
      onClick={handleClose}
    >
      <div className="rounded-lg bg-white p-5 shadow">
        <div className="p-5">{children}</div>
        <Btn color="green" text="닫기" onClick={onClose} />
      </div>
    </div>
  );
};

export default Alert;
