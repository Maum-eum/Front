import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getJobCondition } from "../../api/caregiver/jobcondition";
import Btn from "../../components/commons/Btn";

const dayOfWeekMapping = (dayOfWeekString: string) => {
  const days = ["월", "화", "수", "목", "금", "토", "일"];
  return dayOfWeekString
    .split("")
    .map((char, index) => (char === "1" ? days[index] : null))
    .filter(Boolean)
    .join(", ") || "없음";
};

const convertTime = (time?: number) => {
    if (typeof time !== "number" || isNaN(time) || time < 18 || time > 42) return "시간 없음"; // ✅ 유효 범위 검사 추가
    const mappedTime = timeMapping[time];
    return mappedTime ? `${Math.floor(mappedTime)}시${mappedTime % 1 === 0 ? "" : " 30분"}` : "시간 오류";
  };
  
const jobConditionLabels: { [key: string]: string } = {
    mealPreparation: "식사 차리기",
    cookingAssistance: "구토물 정리",
    enteralNutritionSupport: "경관식 보조",
    selfFeeding: "음식물 조리 및 설거지",
    selfToileting: "화장실 이동 지원",
    catheterOrStomaCare: "유치도뇨/방광루/장루 관리 지원",
    occasionalToiletingAssist: "배뇨, 배변 도움 후 처리 지원",
    diaperCare: "기저귀 교환",
    wheelchairAssist: "침대 ↔ 휠체어 이동 보조",
    mobilityAssist: "보행 도움 (부축)",
    independentMobility: "보조 기구 이동 보조",
    immobile: "신체 기능의 유지 및 증진 도움",
    cleaningLaundryAssist: "컨디션 외 도움",
    bathingAssist: "세면 도움",
    hospitalAccompaniment: "구강 청결 도움",
    exerciseSupport: "몸 단장 도움",
    flexibleSchedule: "유연한 일정",
    emotionalSupport: "감정적 지원",
    cognitiveStimulation: "인지 자극",
  };

  
const timeMapping: { [key: number]: number } = {
    18: 9,
    19: 9.5,
    20: 10,
    21: 10.5,
    22: 11,
    23: 11.5,
    24: 12,
    25: 12.5,
    26: 13,
    27: 13.5,
    28: 14,
    29: 14.5,
    30: 15,
    31: 15.5,
    32: 16,
    33: 16.5,
    34: 17,
    35: 17.5,
    36: 18,
    37: 18.5,
    38: 19,
    39: 19.5,
    40: 20,
    41: 20.5,
    42: 21,
  };


 
const JobConditionView = () => {
  const navigate = useNavigate();
  const [jobCondition, setJobCondition] = useState<any>(null);
  
  useEffect(() => {
    const fetchJobCondition = async () => {
        try {
          const data = await getJobCondition();
          setJobCondition(data);
        } catch (error) {
          console.error("❌ 근무 조건 조회 실패:", error);
        }
      };
      
    fetchJobCondition();
  }, []);
  
  if (!jobCondition) {
    return <p className="text-center mt-6">근무 조건을 불러오는 중...</p>;
  }

  return (
    <div className="p-6 w-full max-w-3xl mx-auto">
      <h2 className="text-2xl font-bold text-center mb-6">근무 조건 조회</h2>
      
      <div className="border p-4 rounded-lg bg-white shadow-sm">
        <h3 className="font-bold text-lg">📌 희망 시급</h3>
        <p className="mb-4">{jobCondition.desiredHourlyWage.toLocaleString()} 원</p>
        
        <h3 className="font-bold text-lg">📅 근무 요일 및 시간</h3>
        <p>요일: {dayOfWeekMapping(jobCondition.dayOfWeek)}</p>
        <p>시간: {convertTime(jobCondition.startTime)} ~ {convertTime(jobCondition.endTime)}</p>
        
        <h3 className="font-bold text-lg mt-4">📍 근무 지역</h3>
        <ul>
          {jobCondition.locationResponseDtoList.map((loc: any) => (
            <li key={loc.workLocationId}>{loc.locationName}</li>
          ))}
        </ul>
        
        <h3 className="font-bold text-lg mt-4">📝 지원 가능 항목</h3>
        <ul>
          {Object.entries(jobCondition).map(([key, value]) => (
            typeof value === "string" && value === "POSSIBLE" ? (
              <li key={key}>{jobConditionLabels[key] || key}</li> // ✅ "POSSIBLE" 글자 제거하고 한글 변환
            ) : null
          ))}
        </ul>

      </div>

      <div className="flex flex-col mt-6 space-y-2">
        <Btn text="이전" color="white" onClick={() => navigate(-1)} />
        <Btn text="수정하기" color="green" onClick={() => navigate("/caregiver/jobcondition/edit")} />
      </div>
    </div>
  );
};

export default JobConditionView;
