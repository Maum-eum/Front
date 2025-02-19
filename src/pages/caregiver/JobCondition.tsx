import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getJobCondition } from "../../api/caregiver/jobcondition";
import BasicBtn from "../../components/caregiver/BasicBtn";
import clsx from "clsx"; // ✅ 스타일 적용을 위한 clsx 추가

// ✅ 요일 변환 함수 (ex: "1111111" → "월 화 수 목 금 토 일")
const convertDayOfWeek = (binaryString: string) => {
  const days = ["월", "화", "수", "목", "금", "토", "일"];
  return binaryString
    .split("")
    .map((bit, index) => (bit === "1" ? days[index] : null))
    .filter(Boolean)
    .join(" ");
};

// ✅ 근무 지원 항목 변환
const SUPPORT_ITEMS: Record<string, string> = {
  // ✅ 식사 보조
  mealPreparation: "식사 차리기",
  cookingAssistance: "구토물 정리",
  enteralNutritionSupport: "수급자를 위한 음식물 조리 및 설거지",
  selfFeeding: "경관식 보조",

  // ✅ 배변 보조
  selfToileting: "화장실 이동 지원",
  catheterOrStomaCare: "유치도뇨/방광루/장루 관리 및 처리 지원",
  occasionalToiletingAssist: "배뇨, 배변 도움 후 처리 지원",
  diaperCare: "기저귀 교환",

  // ✅ 이동 보조
  wheelchairAssist: "침대 ↔ 휠체어 이동 보조",
  mobilityAssist: "보행 도움 (부축)",
  independentMobility: "보조 기구 이동 보조 (휠체어, 지팡이)",
  immobile: "신체 기능의 유지 및 증진 도움",

  // ✅ 일상 생활 보조
  cleaningLaundryAssist: "컨디션 외 도움",
  bathingAssist: "세면 도움",
  hospitalAccompaniment: "구강 청결 도움",
  exerciseSupport: "물 단장 도움",

};

// ✅ 상태 변환
const STATUS_LABELS: Record<string, string> = {
  POSSIBLE: "가능",
  NEGOTIABLE: "조율",
  IMPOSSIBLE: "불가능",
};

// ✅ 상태별 스타일 지정
const STATUS_STYLES: Record<string, string> = {
  POSSIBLE: "bg-green-200 text-green-800",
  NEGOTIABLE: "bg-yellow-200 text-yellow-800",
  IMPOSSIBLE: "bg-red-200 text-red-800",
};

const JobCondition = () => {
  const navigate = useNavigate();
  const [jobCondition, setJobCondition] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchJobCondition = async () => {
      try {
        const data = await getJobCondition();
        setJobCondition(data);
      } catch (error) {
        console.error("❌ 근무 조건 조회 실패:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchJobCondition();
  }, []);

  return (
    <div className="flex flex-col items-center min-h-screen bg-base-white sm:px-6 py-8">
      <div className="w-72 sm:w-[600px]">
        <h1 className="text-center text-[20px] sm:text-3xl font-bold mb-6">
          📌 나의 근무 조건
        </h1>

        {loading ? (
          <p className="text-gray-500">근무 조건을 불러오는 중...</p>
        ) : jobCondition ? (
          <div className="p-4 border rounded-lg shadow bg-white">
            <p><strong>💰 시급:</strong> {jobCondition.desiredHourlyWage}원</p>
            <p><strong>📅 근무 가능 요일:</strong> {convertDayOfWeek(jobCondition.dayOfWeek)}</p>
            
            {/* ✅ 시간 변환 없이 그대로 표시 */}
            <p>
              <strong>⏰ 근무 시간:</strong> {jobCondition.startTime}시 ~ {jobCondition.endTime}시
            </p>

            {/* ✅ 근무 가능 지역 */}
            <p><strong>📍 근무 가능 지역:</strong></p>
            {jobCondition.locationResponseDtoList?.length > 0 ? (
              <ul className="list-disc pl-6">
                {jobCondition.locationResponseDtoList.map((loc: any, index: number) => (
                  <li key={index}>{loc.locationName}</li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-500">근무 가능 지역이 등록되지 않았습니다.</p>
            )}

            {/* ✅ 근무 지원 항목 변환 + 상태 표시 */}
            <p className="mt-4"><strong>⚡ 근무 지원 항목</strong></p>
            <ul className="list-disc pl-6">
              {Object.entries(SUPPORT_ITEMS).map(([key, label]) => (
                <li key={key} className="flex items-center justify-between">
                  <span>{label}</span>
                  <span className={`px-2 py-1 text-sm font-bold rounded ${STATUS_STYLES[jobCondition[key]] || "bg-gray-200 text-gray-800"}`}>
                    {STATUS_LABELS[jobCondition[key]] || "미등록"}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        ) : (
          <p className="text-gray-500">등록된 근무 조건이 없습니다.</p>
        )}

        <div className="mt-6">
          <BasicBtn label="돌아가기" color="white" onClick={() => navigate(-1)} />
        </div>
      </div>
    </div>
  );
};

export default JobCondition;
