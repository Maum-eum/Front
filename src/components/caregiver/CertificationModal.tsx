import React, { useState } from "react";
import Btn from "../commons/Btn"; // ✅ Btn.tsx 가져오기

interface CertificationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (certificate: { certNum: string; certType: string; certRate: string }) => void;
}

// ✅ 자격증 ENUM 설정
const CERT_TYPES = ["요양보호사", "간호조무사", "사회복지사"];
const CERT_RATES = { "1급": "LEVEL1", "2급": "LEVEL2" } as const;

const CertificationModal: React.FC<CertificationModalProps> = ({ isOpen, onClose, onSave }) => {
  const [certificate, setCertificate] = useState({
    certNum: "",
    certType: CERT_TYPES[0],
    certRate: "1급",
  });

  if (!isOpen) return null;

  const handleSave = () => {
    if (!certificate.certNum || !certificate.certType || !certificate.certRate) {
      alert("모든 필드를 입력해주세요!");
      return;
    }

    onSave({
      certNum: certificate.certNum,
      certType: certificate.certType,
      certRate: CERT_RATES[certificate.certRate as keyof typeof CERT_RATES], // 변환
    });

    onClose();
  };

  return (
    <div className="fixed inset-0 flex justify-center items-center bg-gray-500 bg-opacity-50">
      <div className="bg-white p-6 rounded-lg w-full max-w-xs sm:max-w-sm">
        <h2 className="text-lg font-bold text-black text-center mb-6">자격증 추가</h2>

        {/* ✅ 자격증 번호 입력 */}
        <label className="block text-item font-bold text-black mb-2">자격증 번호</label>
        <input
          type="text"
          placeholder="ex) CERT-12345"
          className="border-2 border-gray-300 rounded-lg p-2 w-full focus:outline-none focus:border-green mb-4"
          value={certificate.certNum}
          onChange={(e) => setCertificate({ ...certificate, certNum: e.target.value })}
        />

        {/* ✅ 자격증 이름 (드롭다운) */}
        <label className="block text-item font-bold text-black mb-2">자격증 이름</label>
        <select
          className="border-2 border-gray-300 rounded-lg p-2 w-full focus:outline-none focus:border-green mb-4"
          value={certificate.certType}
          onChange={(e) => setCertificate({ ...certificate, certType: e.target.value })}
        >
          {CERT_TYPES.map((type) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </select>

        {/* ✅ 자격증 급수 (드롭다운) */}
        <label className="block text-item font-bold text-black mb-2">자격증 급수</label>
        <select
          className="border-2 border-gray-300 rounded-lg p-2 w-full focus:outline-none focus:border-green mb-6"
          value={certificate.certRate}
          onChange={(e) => setCertificate({ ...certificate, certRate: e.target.value })}
        >
          {Object.keys(CERT_RATES).map((rate) => (
            <option key={rate} value={rate}>
              {rate}
            </option>
          ))}
        </select>

        {/* ✅ 버튼 - Btn.tsx 스타일 적용 */}
        <div className="flex flex-col gap-2">
          <Btn text="이전으로" color="white" onClick={onClose} />
          <Btn text="완료" color="green" onClick={handleSave} />
        </div>
      </div>
    </div>
  );
};

export default CertificationModal;
