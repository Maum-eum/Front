import React, { useState } from "react";
import Btn from "../commons/Btn";
import Input from "../commons/Input";

type CertificationModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onSave: (certification: { number: string; name: string; level: string }) => void;
};

const CertificationModal: React.FC<CertificationModalProps> = ({ isOpen, onClose, onSave }) => {
  const [certNumber, setCertNumber] = useState("");
  const [certName, setCertName] = useState("");
  const [certLevel, setCertLevel] = useState("");

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg w-[335px] sm:w-[400px] shadow-lg">
        <h2 className="text-title font-bold text-black mb-6 text-center">자격증 추가</h2>

        {/* 자격증 번호 */}
        <label className="block text-item font-bold text-black mb-2">자격증 번호</label>
        <Input
          type="text"
          placeholder="ex) CERT-12345"
          value={certNumber}
          onChange={(e) => setCertNumber(e.target.value)}
        />

        {/* 자격증 이름 */}
        <label className="block text-item font-bold text-black mt-4 mb-2">자격증 이름</label>
        <Input
          type="text"
          placeholder="예) 요양보호사"
          value={certName}
          onChange={(e) => setCertName(e.target.value)}
        />

        {/* 자격증 급수 */}
        <label className="block text-item font-bold text-black mt-4 mb-2">자격증 급수</label>
        <Input
          type="text"
          placeholder="예) 1급"
          value={certLevel}
          onChange={(e) => setCertLevel(e.target.value)}
        />

        {/* 버튼 영역 */}
        <div className="flex flex-col gap-3 mt-6">
          <Btn text="이전으로" color="white" onClick={onClose} />
          <Btn
            text="완료"
            color="green"
            onClick={() => {
              onSave({ number: certNumber, name: certName, level: certLevel });
              onClose();
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default CertificationModal;
