import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { TimeSelect } from "../../components/commons/TimeSelect";
import { RegionSelect } from "../../components/commons/RegionSelect";
import { registerJobCondition } from "../../api/caregiver/jobcondition";
import type { JobConditionRequest } from "../../types/caregiver/jobCondition";

import CheckList from "../../components/commons/CheckList";
import Steps from "../../components/commons/Steps";
import Btn from "../../components/commons/Btn";


  // ✅ 카테고리 그룹을 위한 컴포넌트
  const CategorySection = ({ title, children }: { title: string; children: React.ReactNode }) => (
    <div className="mb-6">
      <h3 className="font-bold text-lg mb-2">{title}</h3>
      {children}
    </div>
  );

export default function SignupStep3() {
  const navigate = useNavigate();


  // ✅ 단계 상태 추가 (1: 가능 여부 선택, 2: 시간 & 장소 선택)
  const [step, setStep] = useState<number>(1);

  // ✅ 선택된 데이터 저장
  const [selectedOptions, setSelectedOptions] = useState<Record<string, "POSSIBLE" | "NEGOTIABLE" | "IMPOSSIBLE">>({});
  const [timeData, setTimeData] = useState<{ dayofweek: string; starttime: number; endtime: number }[]>([]);
  const [selectedLocations, setSelectedLocations] = useState<number[]>([]);
  const [hourlyWage, setHourlyWage] = useState<number>(15000); // 기본값

  const handleSubmit = async () => {
    console.log("🟢 selectedOptions 값 확인:", selectedOptions); 
    console.log("🟢 시간 데이터 확인:", timeData);
    console.log("🟢 선택된 지역 ID:", selectedLocations);

    if (!timeData.length || !selectedLocations.length) {
      alert("근무 시간과 지역을 선택해주세요!");
      return;
    }

    const requestData: JobConditionRequest = {
      ...selectedOptions, // ✅ 기존 옵션 추가
      desiredHourlyWage: hourlyWage,
      dayOfWeek: ["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"]
        .map((day) => (timeData.some((t) => t.dayofweek === day) ? "1" : "0"))
        .join(""), // ✅ 요일을 "1001010" 형식으로 변환
      startTime: timeData[0]?.starttime || 0, 
      endTime: timeData[0]?.endtime || 0, 
      locationRequestDTOList: selectedLocations.map((id) => ({ locationId: id })),

      // ✅ 사용자가 선택한 상태 반영!
      flexibleSchedule: selectedOptions["flexibleSchedule"] || "IMPOSSIBLE",
      selfFeeding: selectedOptions["selfFeeding"] || "IMPOSSIBLE",
      mealPreparation: selectedOptions["mealPreparation"] || "IMPOSSIBLE",
      cookingAssistance: selectedOptions["cookingAssistance"] || "IMPOSSIBLE",
      enteralNutritionSupport: selectedOptions["enteralNutritionSupport"] || "IMPOSSIBLE",
      selfToileting: selectedOptions["selfToileting"] || "IMPOSSIBLE",
      occasionalToiletingAssist: selectedOptions["occasionalToiletingAssist"] || "IMPOSSIBLE",
      diaperCare: selectedOptions["diaperCare"] || "IMPOSSIBLE",
      catheterOrStomaCare: selectedOptions["catheterOrStomaCare"] || "IMPOSSIBLE",
      independentMobility: selectedOptions["independentMobility"] || "IMPOSSIBLE",
      mobilityAssist: selectedOptions["mobilityAssist"] || "IMPOSSIBLE",
      wheelchairAssist: selectedOptions["wheelchairAssist"] || "IMPOSSIBLE",
      immobile: selectedOptions["immobile"] || "IMPOSSIBLE",
      cleaningLaundryAssist: selectedOptions["cleaningLaundryAssist"] || "IMPOSSIBLE",
      bathingAssist: selectedOptions["bathingAssist"] || "IMPOSSIBLE",
      hospitalAccompaniment: selectedOptions["hospitalAccompaniment"] || "IMPOSSIBLE",
      exerciseSupport: selectedOptions["exerciseSupport"] || "IMPOSSIBLE",
      emotionalSupport: selectedOptions["emotionalSupport"] || "IMPOSSIBLE",
      cognitiveStimulation: selectedOptions["cognitiveStimulation"] || "IMPOSSIBLE"
    };
    
    console.log("🟢 최종 requestData:", requestData);

    try {
      const response = await registerJobCondition(requestData);
      console.log("🟢 서버 응답 데이터:", response?.data);
      if (response?.status === "success") {
        alert("구직 조건이 등록되었습니다!");
        navigate("/");
      } else {
        alert(response?.message || "등록 실패!");
      }
    } catch (error) {
      console.error("❌ 구직 조건 등록 실패:", error);
    }
  };

  return (
    <div className="p-6 w-full max-w-3xl mx-auto">

      {/* ✅ 타이틀 */}
      <h2 className="text-2xl font-bold text-center mb-6">근무 조건 등록</h2>

      {/* ✅ Steps를 감싸는 div에 여백 추가 */}
      <div className="mb-6">
        <Steps step={3} />
      </div>

      {/* ✅ 1단계: 가능/불가능/조율 체크리스트 */}
      {step === 1 && (
        <>
          <CategorySection title="식사 보조">
            <CheckList 
              options={["mealPreparation", "cookingAssistance", "enteralNutritionSupport", "selfFeeding"]}
              selectedValues={selectedOptions}
              onChange={setSelectedOptions} name={""}            />
          </CategorySection>

          <CategorySection title="배변 보조">
            <CheckList 
              options={["selfToileting", "occasionalToiletingAssist", "diaperCare", "catheterOrStomaCare"]}
              selectedValues={selectedOptions}
              onChange={setSelectedOptions} name={""}            />
          </CategorySection>

          <CategorySection title="이동 보조">
            <CheckList 
              options={["independentMobility", "mobilityAssist", "wheelchairAssist", "immobile"]}
              selectedValues={selectedOptions}
              onChange={setSelectedOptions} name={""}            />
          </CategorySection>

          <CategorySection title="일상 생활">
            <CheckList 
              options={["cleaningLaundryAssist", "bathingAssist", "hospitalAccompaniment", "exerciseSupport"]}
              selectedValues={selectedOptions}
              onChange={setSelectedOptions} name={""}            />
          </CategorySection>

          {/* ✅ "다음" 버튼 */}
          <Btn 
            text="다음"
            color="green"
            onClick={() => setStep(3)}
          />
        </>
      )}

      {/* ✅ 3단계: 시간 및 지역 선택 */}
      {step === 3 && (
        <>
          {/* ✅ 근무 가능 요일 및 시간 선택 */}
          <TimeSelect setTimeData={setTimeData} />

          {/* ✅ 지역 선택 */}
          <RegionSelect selectedLocations={selectedLocations} setSelectedLocations={setSelectedLocations} />
          
          {/* ✅ 희망 시급 입력 */}
          <div className="mt-4 mb-4">
            <label className="block font-bold">희망 시급 (원)</label>
            <input
              type="number"
              value={hourlyWage}
              onChange={(e) => setHourlyWage(Number(e.target.value))}
              className="w-full p-2 border rounded"
              min={10000}
            />
          </div>

{/* ✅ "이전" 버튼을 위쪽으로 배치 */}
<Btn 
  text="이전"
  color="white"
  onClick={() => setStep(1)}
  
/>

{/* ✅ "구직 조건 등록하기" 버튼 */}
<Btn 
  text="구직 조건 등록하기"
  color="green"
  onClick={handleSubmit}
/>


        </>
      )}
    </div>
  );
}