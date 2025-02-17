import { useState, useEffect } from "react";

interface CertificationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (certificate: { certNum: string; certType: string; certRate: string }) => void;
  existingCertificate?: { certNum: string; certType: string; certRate: string } | null;
}

// ✅ 자격증 종류 ENUM
const CERT_TYPES = ["요양보호사", "간호조무사", "사회복지사"];

// ✅ 자격증 급수 변환 ENUM
const CERT_RATES = {
  "1급": "LEVEL1",
  "2급": "LEVEL2",
} as const;

const CertificationModal: React.FC<CertificationModalProps> = ({ isOpen, onClose, onSave, existingCertificate }) => {
  const [certificate, setCertificate] = useState({
    certNum: "",
    certType: CERT_TYPES[0], // 기본값: 요양보호사
    certRate: "1급", // 기본값: 1급
  });

  // ✅ 모달이 열릴 때 기존 데이터 불러오기
  useEffect(() => {
    if (isOpen) {
      if (existingCertificate) {
        setCertificate({
          certNum: existingCertificate.certNum || "",
          certType: existingCertificate.certType || CERT_TYPES[0],
          certRate: existingCertificate.certRate === "LEVEL1" ? "1급" : "2급",
        });
      } else {
        setCertificate({
          certNum: "",
          certType: CERT_TYPES[0],
          certRate: "1급",
        });
      }
    }
  }, [isOpen, existingCertificate]); // ✅ 기존 데이터 유지
  

  if (!isOpen) return null;

  const handleSave = () => {
    if (!certificate.certNum || !certificate.certType || !certificate.certRate) {
      alert("모든 필드를 입력해주세요!");
      return;
    }

    // ✅ API 전송 시 자격증 급수를 LEVEL1, LEVEL2로 변환
    onSave({
      certNum: certificate.certNum,
      certType: certificate.certType,
      certRate: CERT_RATES[certificate.certRate as keyof typeof CERT_RATES], // 변환
    });

    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg w-80">
        <h2 className="text-lg font-bold text-black mb-4">자격증 추가 / 수정</h2>

        {/* ✅ 자격증 번호 입력 */}
        <input
          type="text"
          placeholder="자격증 번호 (ex. CERT-12345)"
          className="border p-2 w-full mb-2"
          value={certificate.certNum}
          onChange={(e) => setCertificate({ ...certificate, certNum: e.target.value })}
        />

        {/* ✅ 자격증 이름 (드롭다운) */}
        <select
          className="border p-2 w-full mb-2"
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
        <select
          className="border p-2 w-full"
          value={certificate.certRate}
          onChange={(e) => setCertificate({ ...certificate, certRate: e.target.value })}
        >
          {Object.keys(CERT_RATES).map((rate) => (
            <option key={rate} value={rate}>
              {rate}
            </option>
          ))}
        </select>

        <div className="flex gap-2 mt-4">
          <button onClick={onClose} className="bg-gray-300 text-black px-4 py-2 w-1/2 rounded">
            이전으로
          </button>
          <button onClick={handleSave} className="bg-green-500 text-green px-4 py-2 w-1/2 rounded">
            완료
          </button>
        </div>
      </div>
    </div>
  );
};

export default CertificationModal;
