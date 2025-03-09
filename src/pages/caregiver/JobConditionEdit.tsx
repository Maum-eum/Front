import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getJobCondition, updateJobCondition } from "../../api/caregiver/jobCondition";
import { TimeSelect } from "../../components/commons/TimeSelect";
import { RegionSelect } from "../../components/commons/RegionSelect";
import type { JobConditionRequest } from "../../types/caregiver/jobCondition";
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


    useEffect(() => {
      const fetchJobCondition = async () => {
        try {
          const data = await getJobCondition();
          setJobCondition(data);
    
          console.log("🟢 기존 근무 조건 데이터:", data); // 디버깅 로그
    
          // ✅ 기존 옵션 데이터 설정 (수정 전 데이터 유지)
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
    
          // ✅ 기존 시간 데이터 유지
          const formattedDayOfWeek =
            typeof data.dayOfWeek === "string"
              ? data.dayOfWeek.padStart(7, "0") // 앞에 0이 사라지는 걸 방지
              : "0000000"; // 기본값
    
          setTimeData([
            {
              dayofweek: formattedDayOfWeek,
              starttime: data.startTime ?? -1, // 기본값 유지
              endtime: data.endTime ?? -1,
            },
          ]);
    
        // ✅ 기존 지역 데이터 유지하도록 수정
      setSelectedLocations((prev) =>
        data.locationResponseDtoList?.length > 0
          ? data.locationResponseDtoList.map((loc: any) => loc.workLocationId)
          : prev ?? [] // 🔥 기존 데이터 유지
      );
          // ✅ 기존 시급 유지
          setHourlyWage(data.desiredHourlyWage ?? 15000);
        } catch (error) {
          console.error("❌ 근무 조건 조회 실패:", error);
        }
      };
    
      fetchJobCondition();
    }, []);
    

// ✅ 근무 조건 수정 요청
const handleUpdate = async () => {
  if (!jobCondition) {
    alert("근무 조건을 불러오는 중입니다. 잠시 후 다시 시도해주세요.");
    return;
  }

  // ✅ 선택된 값이 없으면 기존 값 유지
  const updatedData: JobConditionRequest = {
    ...jobCondition, // 기존 데이터 유지
    ...selectedOptions, // 선택된 옵션 반영

    // ✅ 시급이 변경되지 않았으면 기존 값 유지
    desiredHourlyWage: hourlyWage ?? jobCondition.desiredHourlyWage,

    // ✅ `dayOfWeek`가 7자리 이진 문자열인지 확인하고, 아니라면 기존 값 유지
    dayOfWeek:
      timeData.length > 0 &&
      typeof timeData[0]?.dayofweek === "string" &&
      /^[01]{7}$/.test(timeData[0]?.dayofweek)
        ? timeData[0].dayofweek
        : jobCondition.dayOfWeek, // 기존 값 유지

    startTime:
      timeData.length > 0 && timeData[0]?.starttime !== undefined
        ? timeData[0].starttime
        : jobCondition.startTime,
    endTime:
      timeData.length > 0 && timeData[0]?.endtime !== undefined
        ? timeData[0].endtime
        : jobCondition.endTime,

// ✅ 기존 값 유지 로직 적용
locationRequestDTOList:
  selectedLocations.length > 0
    ? selectedLocations.map((id) => ({ locationId: id }))
    : jobCondition.locationResponseDtoList && jobCondition.locationResponseDtoList.length > 0
      ? jobCondition.locationResponseDtoList.map((loc: any) => ({ locationId: loc.workLocationId }))
      : null, // 🔥 빈 배열이 아닌 `null`을 보내서 서버가 기본값을 할당하지 않도록 함.

  };

  console.log("🟢 [전송 데이터]:", updatedData); // 디버깅 로그

  try {
    await updateJobCondition(updatedData);
    alert("근무 조건이 수정되었습니다!");

    const newData = await getJobCondition();
    setJobCondition(newData);
    navigate("/caregiver/main");
  } catch (error) {
    console.error("❌ 근무 조건 수정 실패:", error);
    alert("수정 실패! 다시 시도해주세요.");
  }
};


  return (
    <div className="p-6 w-full max-w-3xl overflow-auto mx-auto font-gtr-B">
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
