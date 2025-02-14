import React, { useState } from "react";
import Btn from "../commons/Btn";
import Input from "../commons/Input";

type CareerModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onSave: (career: { place: string; period: string; details: string }) => void;
};

const CareerModal: React.FC<CareerModalProps> = ({ isOpen, onClose, onSave }) => {
  const [place, setPlace] = useState("");
  const [period, setPeriod] = useState("");
  const [details, setDetails] = useState("");

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg w-[335px] sm:w-[400px] shadow-lg">
        <h2 className="text-title font-bold text-black mb-6 text-center">경력추가</h2>

        {/* 일한 곳 */}
        <label className="block text-item font-bold text-black mb-2">일한 곳</label>
        <Input
          type="text"
          placeholder="예) 김딩딩 노인보조"
          value={place}
          onChange={(e) => setPlace(e.target.value)}
        />

        {/* 했던 일 */}
        <label className="block text-item font-bold text-black mt-4 mb-2">했던 일</label>
        <Input
          type="text"
          placeholder="예) 식사보조, 이동보조"
          value={details}
          onChange={(e) => setDetails(e.target.value)}
        />

        {/* 일한 기간 */}
        <label className="block text-item font-bold text-black mt-4 mb-2">일한 기간</label>
        <Input
          type="text"
          placeholder="예) 2023.09 - 2024.01"
          onChange={(e) => setPeriod(e.target.value)}
        />

        {/* 버튼 영역 */}
        <div className="flex flex-col gap-3 mt-6">
          <Btn
            text="이전으로"
            color="white"
            onClick={onClose} // ✅ 클릭 시 모달 닫기
          />
          <Btn
            text="완료"
            color="green"
            onClick={() => {
              onSave({ place, period, details });
              onClose();
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default CareerModal;
