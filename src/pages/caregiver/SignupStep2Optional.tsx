import { useState } from "react";
import Steps from "../../components/commons/steps";
import Btn from "../../components/commons/Btn";
import CareerModal from "../../components/CareerModal"; // ✅ 모달 컴포넌트 추가
import { useNavigate } from "react-router-dom";

const SignupStep2Optional = () => {
  const navigate = useNavigate();

  // 경력사항 리스트 상태 관리
  const [experiences, setExperiences] = useState([
    { place: "꿈나무 복지관", period: "2023.09 - 2024.01", details: "식사 보조, 이동 보조, 일상 생활 보조" },
    { place: "햄부기 노인보조", period: "2023.12 - 2025.02", details: "식사 보조, 이동 보조, 일상 생활 보조" },
  ]);

  // 모달 상태 관리
  const [isModalOpen, setIsModalOpen] = useState(false);

  // 새 경력 추가 함수
  const handleAddExperience = (newExperience: { place: string; period: string; details: string }) => {
    setExperiences([...experiences, newExperience]);
    setIsModalOpen(false); // ✅ 모달 닫기
  };

  return (
    <div className="flex flex-col items-center w-full min-h-screen bg-base-white px-4 sm:px-6 py-8">
      {/* 제목 */}
      <h1 className="text-title font-bold text-black mb-6">회원가입</h1>

      {/* 단계 표시 */}
      <Steps step={2} />

      {/* 선택 입력 사항 제목 */}
      <h2 className="text-item font-bold text-black my-4">선택 입력 사항</h2>

      {/* 한줄소개 */}
      <div className="w-full max-w-xs sm:max-w-sm">
        <label className="block text-item font-bold text-black mb-2">한줄소개</label>
        <textarea
          className="w-full h-24 p-3 border-2 rounded-lg bg-white text-content sm:text-lg focus:ring-2 focus:ring-green-400"
          placeholder="간단한 자기소개를 입력해주세요."
        ></textarea>
      </div>

      {/* 경력사항 */}
      <div className="w-full max-w-xs sm:max-w-sm mt-6 border-t border-gray-300 pt-4"> {/* ✅ 위에 선 추가됨 */}
        <div className="flex justify-between items-center pb-2 mb-4">
          <h3 className="text-item font-bold text-black">경력사항</h3>
          <button onClick={() => setIsModalOpen(true)} className="text-[15px] text-disabled-gray font-bold">
            + 추가하기
          </button>
        </div>

        {/* 경력 리스트 */}
        <div className="space-y-4">
          {experiences.map((exp, index) => (
            <div key={index}>
              <h4 className="text-item font-bold text-black">{exp.place || "근무지 입력"}</h4>
              <p className="text-content text-point-gray">{exp.period || "근무 기간 입력"}</p>
              <p className="text-content text-black">{exp.details || "업무 내용 입력"}</p>
            </div>
          ))}
        </div>
      </div>

      {/* 버튼 */}
      <div className="w-full max-w-xs sm:max-w-sm flex flex-col gap-2 mt-auto">
        <Btn text="이전으로" color="white" onClick={() => navigate("/signup/step2/required")} />
        <Btn text="다음" color="green" onClick={() => navigate("/signup/step3")} />
      </div>

      {/* 모달 추가 */}
      {isModalOpen && (
        <CareerModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onSave={handleAddExperience} // ✅ 모달에서 받은 데이터 추가
        />
      )}
    </div>
  );
};

export default SignupStep2Optional;
