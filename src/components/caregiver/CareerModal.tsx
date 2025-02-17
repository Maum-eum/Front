import { useState } from "react";

interface CareerModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (experience: { title: string; duration: number; description: string }) => void;
}

const CareerModal: React.FC<CareerModalProps> = ({ isOpen, onClose, onSave }) => {
  const [experience, setExperience] = useState({
    title: "",
    duration: "", // ✅ 기본값을 빈 문자열로 변경
    description: "",
  });

  if (!isOpen) return null;

  const handleSave = () => {
    if (!experience.title || !experience.duration || !experience.description) {
      alert("모든 필드를 입력해주세요!");
      return;
    }
    onSave({
      ...experience,
      duration: Number(experience.duration), // ✅ 숫자로 변환해서 전달
    });
    onClose(); // 모달 닫기
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg w-80">
        <h2 className="text-lg font-bold text-black mb-4">경력 추가</h2>

        <input
          type="text"
          placeholder="일한 곳"
          className="border p-2 w-full mb-2"
          value={experience.title}
          onChange={(e) => setExperience({ ...experience, title: e.target.value })}
        />
        <input
          type="text"
          placeholder="했던 일"
          className="border p-2 w-full mb-2"
          value={experience.description}
          onChange={(e) => setExperience({ ...experience, description: e.target.value })}
        />
        <input
          type="number"
          placeholder="일한 기간 (개월)" // ✅ 기본값이 없을 때 보이도록 설정
          className="border p-2 w-full"
          value={experience.duration}
          onChange={(e) => setExperience({ ...experience, duration: e.target.value })}
        />

        <div className="flex gap-2 mt-4">
          <button onClick={onClose} className="bg-gray-300 text-black px-4 py-2 w-1/2 rounded">이전으로</button>
          <button onClick={handleSave} className="bg-green-500 text-green px-4 py-2 w-1/2 rounded">완료</button>
        </div>
      </div>
    </div>
  );
};

export default CareerModal;
