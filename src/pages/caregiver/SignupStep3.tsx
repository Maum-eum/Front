import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Steps from "../../components/commons/Steps";
import Btn from "../../components/commons/Btn";
import CheckList from "../../components/commons/CheckList";
import Input from "../../components/commons/Input";

const categories = [
  { title: "식사 보조", services: ["식사 차리기", "구토물 정리", "수급자를 위한 음식물 조리 및 설거지", "경관식 보조"] },
  { title: "배변 보조", services: ["화장실 이동 지원", "유치도뇨 / 방광루 / 장루 관리 및 처리 지원", "배뇨, 배변 도움 후 처리 지원", "기저귀 교환"] },
  { title: "이동 보조", services: ["침대 ↔ 휠체어 이동 보조", "보행 도움 (부축)", "보조 기구 이동 보조 (휠체어, 지팡이)", "신체 기능의 유지 및 증진 도움"] },
  { title: "일상 생활", services: ["컨디션 외 도움", "세면 도움", "구강 청결 도움", "몸 단장 도움"] },
];

const SignupStep3 = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1); // ✅ step 1: 서비스 선택, step 2: 근무 조건 입력
  const [selectedServices, setSelectedServices] = useState<Record<string, "불가능" | "가능" | "조율">>({});
  const [wage, setWage] = useState("13,000");
  const [schedule, setSchedule] = useState<{ [key: string]: { 오전: string; 오후: string } }>({
    월: { 오전: "", 오후: "" },
  });

  const handleServiceChange = (updated: Record<string, "불가능" | "가능" | "조율">) => {
    setSelectedServices((prev) => ({ ...prev, ...updated }));
  };

  const handleNext = () => {
    if (step === 1) {
      setStep(2); // ✅ 다음 단계(근무 조건 입력)로 이동
    } else {
      console.log("근무 조건 등록 완료!", { selectedServices, schedule, wage });
    }
  };

  const handlePrev = () => {
    if (step === 2) {
      setStep(1); // ✅ 서비스 선택으로 돌아가기
    } else {
      navigate("/signup/step1"); // ✅ 이전 페이지로 이동
    }
  };

  return (
    <div className="flex flex-col items-center w-full min-h-screen bg-base-white px-4 sm:px-6 py-8">
      <h1 className="text-title font-bold text-black mb-6">근무 조건 등록</h1>
      <Steps step={3} />

      {/* 🔥 Step 1: 서비스 선택 */}
      {step === 1 && (
        <>
          <p className="text-center text-[18px] font-bold text-black mt-6">
            제공 가능한 서비스를 <span className="text-red-500">모두 선택</span>해 주세요
          </p>

          <div className="w-full max-w-xs sm:max-w-sm mt-6 space-y-6">
            {categories.map((category) => (
              <CheckList
                key={category.title}
                name={category.title}
                options={category.services}
                selectedValues={selectedServices}
                onChange={handleServiceChange}
              />
            ))}
          </div>
        </>
      )}

      {/* 🔥 Step 2: 근무 조건 입력 */}
      {step === 2 && (
        <>
          <p className="text-center text-[18px] font-bold text-black mt-6">
            근무 조건을 <span className="text-red-500">입력</span>해 주세요
          </p>

          <div className="w-full max-w-xs sm:max-w-sm mt-8">
            {/* 근무 지역 */}
            <div className="w-full mb-6">
              <h3 className="text-item font-bold text-black mb-2">근무 지역</h3>
              <div className="border p-4 rounded-lg text-center">
                <p className="text-content text-black">시·도 / 시·구·군 / 동·읍·면</p>
                <img src="/path-to-location-image.png" alt="근무 지역 선택" className="w-full mt-2" />
              </div>
            </div>

            {/* 근무 시간 */}
            <div className="w-full mb-6">
              <h3 className="text-item font-bold text-black mb-2">근무 시간</h3>
              {Object.entries(schedule).map(([day, times]) => (
                <div key={day} className="flex items-center justify-between mb-2">
                  <span className="text-item font-bold text-black">{day}</span>
                  <Input
                    type="text"
                    placeholder="오전"
                    value={times.오전}
                    onChange={(e) => setSchedule((prev) => ({ ...prev, [day]: { ...prev[day], 오전: e.target.value } }))}
                  />
                  <Input
                    type="text"
                    placeholder="오후"
                    value={times.오후}
                    onChange={(e) => setSchedule((prev) => ({ ...prev, [day]: { ...prev[day], 오후: e.target.value } }))}
                  />
                </div>
              ))}
            </div>

            {/* 급여 입력 */}
            <div className="w-full">
              <h3 className="text-item font-bold text-black mb-2">급여(시급)</h3>
              <Input
                type="text"
                placeholder="13,000 원"
                value={wage}
                onChange={(e) => setWage(e.target.value)}
              />
            </div>
          </div>
        </>
      )}

      {/* 버튼 */}
      <div className="w-full max-w-xs sm:max-w-sm flex flex-col gap-4 mt-auto">
        <Btn text="이전" color="white" onClick={handlePrev} />
        <Btn text={step === 1 ? "다음" : "근무 조건 등록 완료"} color="green" onClick={handleNext} />
      </div>
    </div>
  );
};

export default SignupStep3;
