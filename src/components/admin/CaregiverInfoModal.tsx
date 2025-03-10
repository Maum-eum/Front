import React, { useEffect, useState } from "react";
import Btn from "../commons/Btn";
import { RecommendedCareGiver } from "../../types/admin/service";
import { getPrevMatchInfo } from "../../api/admin/service";
import { MatchInfo } from '../../types/admin/service';
interface CareGiverModalProps {
  recruitId: number;
  isOpen: boolean;
  onClose: () => void;
  caregiver: RecommendedCareGiver | null;
  onRequest: () => void;
}

const CaregiverInfoModal: React.FC<CareGiverModalProps> = ({ recruitId, isOpen, onClose, caregiver, onRequest }) => {
  const [prevMatchData, setPrevMatchData] = useState<MatchInfo>();

  // 🔹 이전 매칭 정보 불러오기
  const getPrevMatch = async () => {
    if (!caregiver) return;

    await getPrevMatchInfo(
      {
        jobId: caregiver.jobConditionId,
        recruitId: recruitId
      },
      (res) => {
        console.log("구직", res.data.data.jobCondRes);
        console.log("구인", res.data.data.recruitCondRes);
        setPrevMatchData(res.data.data);
      },
      (err) => {
        console.error("이전 매칭 정보 가져오기 실패:", err);
      }
    );
  };

  useEffect(() => {
    if (caregiver) {
      getPrevMatch();
    }
  }, [caregiver, recruitId]);

  if (!isOpen || !caregiver) return null;

  // 🔹 ENUM 값을 한국어로 변환하는 객체
  const conditionMap: { [key: string]: string } = {
    bathingAssist: "목욕 지원",
    catheterOrStomaCare: "카테터 및 스토마 관리",
    cleaningLaundryAssist: "청소 및 세탁 지원",
    cognitiveStimulation: "인지 자극 활동",
    cookingAssistance: "요리 지원",
    diaperCare: "기저귀 케어",
    emotionalSupport: "정서적 지원",
    enteralNutritionSupport: "경장 영양 지원",
    exerciseSupport: "운동 지원",
    flexibleSchedule: "유연한 일정",
    hospitalAccompaniment: "병원 동행",
    immobile: "거동 불가",
    independentMobility: "독립적 이동 가능",
    mealPreparation: "식사 준비",
    mobilityAssist: "이동 지원",
    occasionalToiletingAssist: "간헐적 화장실 보조",
    selfFeeding: "스스로 식사 가능",
    selfToileting: "스스로 화장실 이용 가능",
    wheelchairAssist: "휠체어 보조",
  };

  // 🔹 상태 스타일링 (POSSIBLE / IMPOSSIBLE)
  const getStatusIcon = (jobValue: string, recruitValue: boolean) => {
    if (jobValue === "POSSIBLE" && recruitValue) {
      return <span className="text-green-600 font-bold">🟢 가능</span>;
    } else if (jobValue === "IMPOSSIBLE" && !recruitValue) {
      return <span className="text-gray-500">⚪ 불필요</span>;
    } else {
      return <span className="text-red-600 font-bold">🔴 불일치</span>;
    }
  };

  return (
    <div className="fixed inset-0 flex justify-center items-center bg-gray-500 bg-opacity-50">
      <div className="bg-white p-6 rounded-lg w-full max-w-xs sm:max-w-sm">
        <h2 className="text-lg font-bold text-black text-center mb-6">요양보호사 정보</h2>

        {/* 보호사 이미지 */}
        <div className="flex justify-center mb-4">
          <img
            src={caregiver.imgUrl}
            alt={caregiver.caregiverName}
            className="w-24 h-24 rounded-full object-cover border-2 border-gray-300"
          />
        </div>

        {/* 보호사 정보 */}
        <div className="text-center mb-4">
          <h3 className="text-xl font-bold text-black">{caregiver.caregiverName}</h3>
          <p className="text-gray-600">매칭 상태: {caregiver.matchStatus}</p>
          <p className="text-gray-600">점수: {caregiver.score.toFixed(1)}</p>
        </div>

        {/* 🔹 조건 비교 테이블 */}
        {prevMatchData && (
          <div className="border-t pt-4">
            <h3 className="text-lg font-semibold text-black text-center mb-3">매칭 조건 비교</h3>
            <table className="w-full border-collapse border border-gray-300">
              <thead>
                <tr className="bg-gray-200">
                  <th className="border p-2 text-xs">서비스 항목</th>
                  <th className="border p-2 text-xs">보호사</th>
                  <th className="border p-2 text-xs">요청 조건</th>
                </tr>
              </thead>
              <tbody>
                {Object.keys(conditionMap).map((key) => (
                  
                  <tr key={key} className="border-b">
                    <td className="border p-2 text-xs">{conditionMap[key]}</td>
                    {/* <td className="border p-2 text-xs text-center">
                      {getStatusIcon(prevMatchData.jobCondRes[key], prevMatchData.recruitCondRes[key])}
                    </td>
                    <td className="border p-2 text-xs text-center">
                      {prevMatchData.recruitCondRes[key] ? "요청함" : "요청 안 함"}
                    </td> */}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* 버튼 영역 */}
        <div className="flex justify-between gap-2 mt-4">
          <Btn text="닫기" color="red" onClick={onClose} />
          <Btn text="요청 전송" color="green" onClick={onRequest} />
        </div>
      </div>
    </div>
  );
};

export default CaregiverInfoModal;
