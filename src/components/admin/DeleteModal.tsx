import Btn from "../commons/Btn";
type modalProps = {
  onConfirm: () => void;
  onCancel: () => void
}

const DeleteAdminModal:React.FC<modalProps> = ({ onConfirm, onCancel }) => {

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-5 rounded-lg shadow-lg">
        <p className="mb-4">정말로 삭제하시겠습니까?</p>
        <div className="flex justify-end gap-2">
          <Btn text="삭제" color="red"   onClick={onConfirm}/>
          <Btn text="취소" color="white" onClick={onCancel}/>
        </div>
      </div>
    </div>
  );
};

export default DeleteAdminModal;