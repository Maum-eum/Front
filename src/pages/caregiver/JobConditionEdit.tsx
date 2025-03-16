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

  // 근무 조건 상태
  const [jobCondition, setJobCondition] = useState<any>(null);
  const [selectedOptions, setSelectedOptions] = useState<Record<string, "POSSIBLE" | "NEGOTIABLE" | "IMPOSSIBLE">>({});
  const [timeData, setTimeData] = useState<{ dayofweek: string; starttime: number; endtime: number }[]>([]);
  const [selectedLocations, setSelectedLocations] = useState<number[]>([]);
  const [hourlyWage, setHourlyWage] = useState<number>(15000);
  const [step, setStep] = useState<number>(1); // 단계 상태 (1: 가능 여부 선택, 2: 시간 & 장소 선택)

  useEffect(() => {
    const fetchJobCondition = async () => {
      try {
        const data = await getJobCondition();
        setJobCondition(data);

        // 기존 옵션 데이터 설정
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

        // 기존 시간 데이터 유지
        setTimeData([
          {
            dayofweek: typeof data.dayOfWeek === "string" ? data.dayOfWeek.padStart(7, "0") : "0000000",
            starttime: data.startTime ?? -1,
            endtime: data.endTime ?? -1,
          },
        ]);

        // 기존 지역 데이터 유지
        setSelectedLocations(data.locationResponseDtoList?.map((loc: any) => loc.locationId) || []);

        // 기존 시급 유지
        setHourlyWage(data.desiredHourlyWage ?? 15000);
      } catch (error) {
        console.error("❌ 근무 조건 조회 실패:", error);
      }
    };

    fetchJobCondition();
  }, []);

  const handleUpdate = async () => {
    if (!jobCondition) {
      alert("근무 조건을 불러오는 중입니다. 잠시 후 다시 시도해주세요.");
      return;
    }

    if (!selectedLocations.length) {
      alert("근무 지역을 선택해주세요!");
      return;
    }

    // 시/도만 선택하고 세부 지역을 선택하지 않은 경우 확인
    const isOnlySidoSelected = selectedLocations.every((id) => String(id).endsWith("000"));
    if (isOnlySidoSelected) {
      alert("세부 근무 지역을 선택해주세요!");
      return;
    }

    // 변경 사항 확인
    const isTimeChanged =
      timeData.length > 0 &&
      (timeData[0]?.dayofweek !== jobCondition.dayOfWeek ||
        timeData[0]?.starttime !== jobCondition.startTime ||
        timeData[0]?.endtime !== jobCondition.endTime);

    const isWageChanged = hourlyWage !== jobCondition.desiredHourlyWage;

    const isOptionsChanged = Object.keys(selectedOptions).some(
      (key) => selectedOptions[key] !== jobCondition[key]
    );

    const isLocationChanged =
      selectedLocations.length > 0 &&
      JSON.stringify(selectedLocations.sort()) !==
        JSON.stringify(jobCondition.locationResponseDtoList?.map((loc: any) => loc.locationId).sort());

    if (!isTimeChanged && !isWageChanged && !isOptionsChanged && !isLocationChanged) {
      alert("수정 사항을 선택해주세요!");
      return;
    }

    const locationRequestDTOList = selectedLocations
      .filter((id) => id !== undefined && id !== null)
      .map((id) => ({ locationId: id }));

    const updatedData: JobConditionRequest = {
      ...jobCondition,
      ...selectedOptions,
      desiredHourlyWage: isWageChanged ? hourlyWage : jobCondition.desiredHourlyWage,
      dayOfWeek: isTimeChanged ? timeData[0]?.dayofweek : jobCondition.dayOfWeek,
      startTime: isTimeChanged ? timeData[0]?.starttime : jobCondition.startTime,
      endTime: isTimeChanged ? timeData[0]?.endtime : jobCondition.endTime,
      locationRequestDTOList,
    };

    try {
      await updateJobCondition(updatedData);
      alert("근무 조건이 수정되었습니다!");
      const newData = await getJobCondition();
      setJobCondition(newData);
      navigate("/caregiver/main");
    } catch (error) {
      console.error("❌ 근무 조건 수정 실패:", error);
    }
  };

  return (
    <div className="p-6 w-full max-w-3xl overflow-auto mx-auto font-gtr-B">
      <h2 className="text-2xl font-bold text-center mb-6">근무 조건 수정</h2>

      {/* Step 1: 서비스 가능 여부 선택 */}
      {step === 1 && (
        <>
          <h3 className="font-bold text-lg mt-6">식사 보조</h3>
          <CheckList options={["mealPreparation", "cookingAssistance", "enteralNutritionSupport", "selfFeeding"]} selectedValues={selectedOptions} onChange={setSelectedOptions} name="" />

          <h3 className="font-bold text-lg mt-6">배변 보조</h3>
          <CheckList options={["selfToileting", "occasionalToiletingAssist", "diaperCare", "catheterOrStomaCare"]} selectedValues={selectedOptions} onChange={setSelectedOptions} name="" />

          <h3 className="font-bold text-lg mt-6">이동 보조</h3>
          <CheckList options={["independentMobility", "mobilityAssist", "wheelchairAssist", "immobile"]} selectedValues={selectedOptions} onChange={setSelectedOptions} name="" />

          <h3 className="font-bold text-lg mt-6">일상 생활</h3>
          <CheckList options={["cleaningLaundryAssist", "bathingAssist", "hospitalAccompaniment", "exerciseSupport"]} selectedValues={selectedOptions} onChange={setSelectedOptions} name="" />

          <div className="w-full flex justify-start mt-2 mb-2">
            <Btn text="이전" color="white" onClick={() => navigate(-1)} />
          </div>

          <div className="w-full flex justify-center mt-2">
            <Btn text="다음" color="green" onClick={() => setStep(2)} />
          </div>
        </>
      )}

      {/* Step 2: 근무 시간 및 지역 선택 */}
      {step === 2 && (
        <>
          <TimeSelect setTimeData={setTimeData} />
          <RegionSelect selectedLocations={selectedLocations} setSelectedLocations={setSelectedLocations} initialLocations={jobCondition?.locationResponseDtoList?.map((loc: any) => loc.locationId) || []} />

          <div className="mt-4">
            <label className="block font-bold">희망 시급 (원)</label>
            <input type="number" value={hourlyWage} onChange={(e) => setHourlyWage(Number(e.target.value))} className="w-full p-2 border rounded" min={10000} />
          </div>

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