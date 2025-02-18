import React, { useState } from "react";
import Btn from "../commons/Btn"; // ✅ Btn.tsx 가져오기

interface CareerModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (experience: { title: string; duration: number; description: string }) => void;
}

const CareerModal: React.FC<CareerModalProps> = ({ isOpen, onClose, onSave }) => {
  const [experience, setExperience] = useState({
    title: "",
    description: "",
    duration: "",
  });

  if (!isOpen) return null;

  const handleSave = () => {
    if (!experience.title || !experience.description || !experience.duration) {
      alert("모든 필드를 입력해주세요!");
      return;
    }
    onSave({ 
      title: experience.title, 
      description: experience.description, 
      duration: Number(experience.duration) 
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 flex justify-center items-center bg-gray-500 bg-opacity-50">
      <div className="bg-white p-6 rounded-lg w-full max-w-xs sm:max-w-sm">
        <h2 className="text-lg font-bold text-black text-center mb-6">경력추가</h2>

        {/* ✅ 일한 곳 입력 */}
        <label className="block text-item font-bold text-black mb-2">일한 곳</label>
        <input
          type="text"
          placeholder="예) 김딩딩 노인보조"
          className="border-2 border-gray-300 rounded-lg p-2 w-full focus:outline-none focus:border-green mb-4"
          value={experience.title}
          onChange={(e) => setExperience({ ...experience, title: e.target.value })}
        />

        {/* ✅ 했던 일 입력 */}
        <label className="block text-item font-bold text-black mb-2">했던 일</label>
        <input
          type="text"
          placeholder="예) 식사보조, 이동보조"
          className="border-2 border-gray-300 rounded-lg p-2 w-full focus:outline-none focus:border-green mb-4"
          value={experience.description}
          onChange={(e) => setExperience({ ...experience, description: e.target.value })}
        />

        {/* ✅ 일한 기간 입력 */}
        <label className="block text-item font-bold text-black mb-2">일한 기간</label>
        <input
          type="text"
          placeholder="예) 12개월"
          className="border-2 border-gray-300 rounded-lg p-2 w-full focus:outline-none focus:border-green mb-6"
          value={experience.duration}
          onChange={(e) => setExperience({ ...experience, duration: e.target.value })}
        />

        {/* ✅ 버튼 - Btn.tsx 스타일 적용 */}
        <div className="flex flex-col gap-2">
          <Btn text="이전으로" color="white" onClick={onClose} />
          <Btn text="완료" color="green" onClick={handleSave} />
        </div>
      </div>
    </div>
  );
};

export default CareerModal;
