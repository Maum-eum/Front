import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getJobCondition, updateJobCondition } from "../../api/caregiver/jobcondition";
import { TimeSelect } from "../../components/commons/TimeSelect";
import { RegionSelect } from "../../components/commons/RegionSelect";
import type { JobConditionRequest } from "../../types/caregiver/jobcondition";
import CheckList from "../../components/commons/CheckList";
import Btn from "../../components/commons/Btn";



const JobConditionEdit = () => {
  const navigate = useNavigate();
  
  // ✅ 근무 조건 상태
  const [jobCondition, setJobCondition] = useState<any>(null);
  const [selectedOptions, setSelectedOptions] = useState<Record<string, "POSSIBLE" | "NEGOTIABLE" | "IMPOSSIBLE">>({});
  const [timeData, setTimeData] = useState<{ dayofweek: string; starttime: number; endtime: number }[]>([]);
  const [selectedLocations, setSelectedLocations] = useState<number[]>([]);
  const [hourlyWage, setHourlyWage] = useState<number>(15000);


    // ✅ 단계 상태 추가 (1: 가능 여부 선택, 2: 시간 & 장소 선택)
    const [step, setStep] = useState<number>(1);


  // ✅ 기존 근무 조건 불러오기
  useEffect(() => {
    const fetchJobCondition = async () => {
      try {
        const data = await getJobCondition();
        setJobCondition(data);

        // ✅ 기존 값들 상태에 저장
        setHourlyWage(data.desiredHourlyWage);
        setSelectedOptions({
          selfFeeding: data.selfFeeding,
          mealPreparation: data.mealPreparation,
          cookingAssistance: data.cookingAssistance,
          enteralNutritionSupport: data.enteralNutritionSupport,
          selfToileting: data.selfToileting,
          occasionalToiletingAssist: data.occasionalToiletingAssist,
          diaperCare: data.diaperCare,
          catheterOrStomaCare: data.catheterOrStomaCare,
          independentMobility: data.independentMobility,
          mobilityAssist: data.mobilityAssist,
          wheelchairAssist: data.wheelchairAssist,
          immobile: data.immobile,
          cleaningLaundryAssist: data.cleaningLaundryAssist,
          bathingAssist: data.bathingAssist,
          hospitalAccompaniment: data.hospitalAccompaniment,
          exerciseSupport: data.exerciseSupport,
          emotionalSupport: data.emotionalSupport,
          cognitiveStimulation: data.cognitiveStimulation,
        });

        setTimeData([{ dayofweek: data.dayOfWeek, starttime: data.startTime, endtime: data.endTime }]);
        setSelectedLocations(data.locationResponseDtoList.map((loc: any) => loc.workLocationId));
      } catch (error) {
        console.error("❌ 근무 조건 조회 실패:", error);
      }
    };

    fetchJobCondition();
  }, []);

  // ✅ 근무 조건 수정 요청
  const handleUpdate = async () => {
    const updatedData: JobConditionRequest = {
      ...selectedOptions, // ✅ 기존 선택된 지원 항목 상태 추가
      desiredHourlyWage: hourlyWage,
      dayOfWeek: timeData[0]?.dayofweek || "0000000",
      startTime: timeData[0]?.starttime || 0,
      endTime: timeData[0]?.endtime || 0,
      locationRequestDTOList: selectedLocations.map((id) => ({ locationId: id })),
  
      // ✅ 누락된 필수 속성 기본값 추가
      flexibleSchedule: selectedOptions.flexibleSchedule || "IMPOSSIBLE",
      selfFeeding: selectedOptions.selfFeeding || "IMPOSSIBLE",
      mealPreparation: selectedOptions.mealPreparation || "IMPOSSIBLE",
      cookingAssistance: selectedOptions.cookingAssistance || "IMPOSSIBLE",
      enteralNutritionSupport: selectedOptions.enteralNutritionSupport || "IMPOSSIBLE",
      selfToileting: selectedOptions.selfToileting || "IMPOSSIBLE",
      occasionalToiletingAssist: selectedOptions.occasionalToiletingAssist || "IMPOSSIBLE",
      diaperCare: selectedOptions.diaperCare || "IMPOSSIBLE",
      catheterOrStomaCare: selectedOptions.catheterOrStomaCare || "IMPOSSIBLE",
      independentMobility: selectedOptions.independentMobility || "IMPOSSIBLE",
      mobilityAssist: selectedOptions.mobilityAssist || "IMPOSSIBLE",
      wheelchairAssist: selectedOptions.wheelchairAssist || "IMPOSSIBLE",
      immobile: selectedOptions.immobile || "IMPOSSIBLE",
      cleaningLaundryAssist: selectedOptions.cleaningLaundryAssist || "IMPOSSIBLE",
      bathingAssist: selectedOptions.bathingAssist || "IMPOSSIBLE",
      hospitalAccompaniment: selectedOptions.hospitalAccompaniment || "IMPOSSIBLE",
      exerciseSupport: selectedOptions.exerciseSupport || "IMPOSSIBLE",
      emotionalSupport: selectedOptions.emotionalSupport || "IMPOSSIBLE",
      cognitiveStimulation: selectedOptions.cognitiveStimulation || "IMPOSSIBLE"
    };
  

    try {
      await updateJobCondition(updatedData);
      alert("근무 조건이 수정되었습니다!");
  
      // ✅ 최신 데이터 다시 불러오기
      const newData = await getJobCondition();
      setJobCondition(newData);
  
      navigate("/caregiver/main");
    } catch (error) {
      console.error("❌ 근무 조건 수정 실패:", error);
      alert("수정 실패! 다시 시도해주세요.");
    }
  };
  

  return (
    <div className="p-6 w-full max-w-3xl overflow-auto mx-auto">
      <h2 className="text-2xl font-bold text-center mb-6">근무 조건 수정</h2>
    

      {/* ✅ Step 1: 서비스 가능 여부 선택 */}
      {step === 1 && (
        <>
          <h3 className="font-bold text-lg mt-6">식사 보조</h3>
          <CheckList 
            options={["mealPreparation", "cookingAssistance", "enteralNutritionSupport", "selfFeeding"]}
            selectedValues={selectedOptions}
            onChange={setSelectedOptions} 
            name=""
          />

          <h3 className="font-bold text-lg mt-6">배변 보조</h3>
          <CheckList 
            options={["selfToileting", "occasionalToiletingAssist", "diaperCare", "catheterOrStomaCare"]}
            selectedValues={selectedOptions}
            onChange={setSelectedOptions} 
            name=""
          />

          <h3 className="font-bold text-lg mt-6">이동 보조</h3>
          <CheckList 
            options={["independentMobility", "mobilityAssist", "wheelchairAssist", "immobile"]}
            selectedValues={selectedOptions}
            onChange={setSelectedOptions} 
            name=""
          />

          <h3 className="font-bold text-lg mt-6">일상 생활</h3>
          <CheckList 
            options={["cleaningLaundryAssist", "bathingAssist", "hospitalAccompaniment", "exerciseSupport"]}
            selectedValues={selectedOptions}
            onChange={setSelectedOptions} 
            name=""
          />

        {/* ✅ 이전 버튼 - 직전 페이지로 이동 */}
        <div className="w-full flex justify-start mt-2 mb-2">
          <Btn text="이전" color="white" onClick={() => navigate(-1)} />
        </div>

        {/* ✅ 다음 버튼 - 자연스럽게 배치 */}
        <div className="w-full flex justify-center mt-2">
          <Btn text="다음" color="green" onClick={() => setStep(2)} />
        </div>


        </>
      )}

      {/* ✅ Step 2: 근무 시간 및 지역 선택 */}
      {step === 2 && (
        <>
          <TimeSelect setTimeData={setTimeData} />
          <RegionSelect selectedLocations={selectedLocations} setSelectedLocations={setSelectedLocations} />

          {/* ✅ 희망 시급 입력 */}
          <div className="mt-4">
            <label className="block font-bold">희망 시급 (원)</label>
            <input
              type="number"
              value={hourlyWage}
              onChange={(e) => setHourlyWage(Number(e.target.value))}
              className="w-full p-2 border rounded"
              min={10000}
            />
          </div>

          {/* ✅ 버튼 (이전 / 수정) */}

        <div className="flex flex-col mt-6 space-y-2">
          <Btn text="이전" color="white" onClick={() => setStep(1)} />
          <Btn text="수정하기" color="green" onClick={handleUpdate} />
        </div>

        </>
      )}
    </div>
  );
};

export default JobConditionEdit;
