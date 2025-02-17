import { useState } from "react";

interface CertificationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (certificate: { certNum: string; certType: string; certRate: string }) => void;
}

const CertificationModal: React.FC<CertificationModalProps> = ({ isOpen, onClose, onSave }) => {
  const [certificate, setCertificate] = useState({
    certNum: "",
    certType: "",
    certRate: "",
  });

  if (!isOpen) return null;

  const handleSave = () => {
    if (!certificate.certNum || !certificate.certType || !certificate.certRate) {
      alert("모든 필드를 입력해주세요!");
      return;
    }
    onSave(certificate);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg w-80">
        <h2 className="text-lg font-bold text-black mb-4">자격증 추가</h2>

        <input
          type="text"
          placeholder="자격증 번호 (ex. CERT-12345)"
          className="border p-2 w-full mb-2"
          value={certificate.certNum}
          onChange={(e) => setCertificate({ ...certificate, certNum: e.target.value })}
        />
        <input
          type="text"
          placeholder="자격증 이름 (ex. 요양보호사)"
          className="border p-2 w-full mb-2"
          value={certificate.certType}
          onChange={(e) => setCertificate({ ...certificate, certType: e.target.value })}
        />
        <input
          type="text"
          placeholder="자격증 급수 (ex. 1급)"
          className="border p-2 w-full"
          value={certificate.certRate}
          onChange={(e) => setCertificate({ ...certificate, certRate: e.target.value })}
        />

        <div className="flex gap-2 mt-4">
          <button onClick={onClose} className="bg-gray-300 text-black px-4 py-2 w-1/2 rounded">이전으로</button>
          <button onClick={handleSave} className="bg-green-500 text-green px-4 py-2 w-1/2 rounded">완료</button>
        </div>
      </div>
    </div>
  );
};

export default CertificationModal;
