import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getJobCondition } from "../../api/caregiver/jobCondition";
import Btn from "../../components/commons/Btn";

// ✅ 요일 이진 문자열 → 요일 리스트 변환 함수
const dayOfWeekMapping = (dayOfWeekString: string) => {
  const days = ["월", "화", "수", "목", "금", "토", "일"];
  
  if (!dayOfWeekString) return "없음";

  // ✅ 7자리 유지: 앞쪽에 0 채우기
  const paddedDayOfWeek = dayOfWeekString.padStart(7, "0");

  return paddedDayOfWeek
    .split("")
    .map((char, index) => (char === "1" ? days[index] : null))
    .filter(Boolean)
    .join(", ") || "없음";
};


// ✅ 숫자 시간을 9시, 9시 30분 형식으로 변환
const convertTime = (time?: number) => {
  if (typeof time !== "number" || isNaN(time) || time < 18 || time > 42) return "시간 없음"; // ✅ 유효 범위 검사 추가
  const mappedTime = timeMapping[time];
  return mappedTime ? `${Math.floor(mappedTime)}시${mappedTime % 1 === 0 ? "" : " 30분"}` : "시간 오류";
};

// ✅ 시간 변환 매핑 테이블
const timeMapping: { [key: number]: number } = {
  18: 9, 19: 9.5, 20: 10, 21: 10.5, 22: 11, 23: 11.5,
  24: 12, 25: 12.5, 26: 13, 27: 13.5, 28: 14, 29: 14.5,
  30: 15, 31: 15.5, 32: 16, 33: 16.5, 34: 17, 35: 17.5,
  36: 18, 37: 18.5, 38: 19, 39: 19.5, 40: 20, 41: 20.5, 42: 21,
};

// ✅ 지원 가능 항목 한글 변환 매핑
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

const JobConditionView = () => {
  const navigate = useNavigate();
  const [jobCondition, setJobCondition] = useState<any>(null);

  useEffect(() => {
    const fetchJobCondition = async () => {
      try {
        const data = await getJobCondition();
        console.log("🟢 [조회한 데이터]:", data);
  
  
        setJobCondition(data);
      } catch (error) {
        console.error("❌ 근무 조건 조회 실패:", error);
      }
    };
    fetchJobCondition();

    // ✅ 페이지가 포커스될 때 최신 데이터 가져오기
    window.addEventListener("focus", fetchJobCondition);
    return () => window.removeEventListener("focus", fetchJobCondition);
  }, []);

  if (!jobCondition) {
    return <p className="text-center mt-6">근무 조건을 불러오는 중...</p>;
  }

  return (
    <div className="p-6 w-full max-w-3xl mx-auto font-gtr-B">
      <h2 className="text-2xl font-bold text-center mb-6">근무 조건 조회</h2>

      <div className="border p-4 rounded-lg bg-white shadow-sm">
        <h3 className="font-bold text-lg">📌 희망 시급</h3>
        <p className="mb-4">{jobCondition.desiredHourlyWage.toLocaleString()} 원</p>

        <h3 className="font-bold text-lg">📅 근무 요일 및 시간</h3>
        <p>요일: {dayOfWeekMapping(jobCondition.dayOfWeek)}</p>
        <p>시간: {convertTime(jobCondition.startTime)} ~ {convertTime(jobCondition.endTime)}</p>
        <h3 className="font-bold text-lg mt-4">📍 근무 지역</h3>
        {jobCondition.locationResponseDtoList.length > 0 ? (
          <ul>
            {jobCondition.locationResponseDtoList.map((loc: any) => (
              <li key={loc.workLocationId}>{loc.locationName}</li>
            ))}
          </ul>
        ) : (
          <p>근무 지역을 선택해주세요!</p>
        )}
                <h3 className="font-bold text-lg mt-4">📝 지원 가능 항목</h3>
        <ul>
          {Object.entries(jobCondition).map(([key, value]) => (
            typeof value === "string" && value === "POSSIBLE" ? (
              <li key={key}>{jobConditionLabels[key] || key}</li>
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
