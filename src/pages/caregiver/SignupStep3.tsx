import { useState } from "react";
import Steps from "../../components/commons/Steps";
import Btn from "../../components/commons/Btn";
import CategorySection from"../../components/caregiver/CategorySection"; // ✅ 카테고리 컴포넌트

const categories = [
  {
    title: "식사 보조",
    services: ["식사 차리기", "구토물 정리", "수급자를 위한 음식물 조리 및 설거지", "경관식 보조"],
  },
  {
    title: "배변 보조",
    services: ["화장실 이동 지원", "유치도뇨 / 방광루 / 장루 관리 및 처리 지원", "배뇨, 배변 도움 후 처리 지원", "기저귀 교환"],
  },
  {
    title: "이동 보조",
    services: ["침대 ↔ 휠체어 이동 보조", "보행 도움 (부축)", "보조 기구 이동 보조 (휠체어, 지팡이)", "신체 기능의 유지 및 증진 도움"],
  },
  {
    title: "일상 생활",
    services: ["컨디션 외 도움", "세면 도움", "구강 청결 도움", "몸 단장 도움"],
  },
];

const SignupStep3 = () => {
  const [currentCategory, setCurrentCategory] = useState(0); // 현재 보여지는 카테고리 인덱스
  const [selectedServices, setSelectedServices] = useState<{ [key: string]: boolean }>({}); // 선택된 서비스 관리

  const handleNext = () => {
    if (currentCategory < categories.length - 1) {
      setCurrentCategory(currentCategory + 1);
    } else {
      console.log("모든 선택 완료, 다음 스텝으로 이동");
    }
  };

  const handlePrev = () => {
    if (currentCategory > 0) {
      setCurrentCategory(currentCategory - 1);
    }
  };

  return (
    <div className="flex flex-col items-center w-full min-h-screen bg-base-white px-4 sm:px-6 py-8">
      {/* 타이틀 */}
      <h1 className="text-title font-bold text-black mb-6">근무 조건 등록</h1>

      {/* 단계 표시 */}
      <Steps step={3} />

      {/* 안내 문구 */}
      <p className="text-center text-[18px] font-bold text-black mt-6">
        제공 가능한 서비스를 <span className="text-red-500">모두 선택</span>해 주세요
      </p>

      {/* 카테고리별 섹션 */}
      <CategorySection
        title={categories[currentCategory].title}
        services={categories[currentCategory].services}
        selectedServices={selectedServices}
        setSelectedServices={setSelectedServices}
      />

      {/* 버튼 */}
      <div className="w-full max-w-xs sm:max-w-sm flex flex-col gap-4 mt-auto">
        {currentCategory > 0 && <Btn text="이전" color="white" onClick={handlePrev} />}
        <Btn text={currentCategory < categories.length - 1 ? "다음" : "다음에 등록하기"} color="green" onClick={handleNext} />
      </div>
    </div>
  );
};

export default SignupStep3;
