import Btn from "./commons/Btn";

type CaregiverInfoModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onSave: () => void;
};

const CaregiverInfoModal: React.FC<CaregiverInfoModalProps> = ({ isOpen, onClose, onSave }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg w-[335px] sm:w-[400px] shadow-lg">
        팝업
        {/* 버튼 영역 */}
        <div className="flex flex-col gap-3 mt-6">
          <Btn
            text="이전으로"
            color="white"
            className="w-full h-14 text-lg"
            onClick={onClose} // ✅ 클릭 시 모달 닫기
          />
          <Btn
            text="완료"
            color="green"
            className="w-full h-14 text-lg"
            onClick={() => {
              onSave();
              onClose();
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default CaregiverInfoModal;
