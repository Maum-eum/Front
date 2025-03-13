import React, { useEffect, useState } from "react";
import Btn from "../commons/Btn";
import { RecommendedCareGiver, MatchInfo } from "../../types/admin/service";
import { getPrevMatchInfo, controlService } from "../../api/admin/service";

interface CareGiverModalProps {
  recruitId: number;
  isOpen: boolean;
  onClose: () => void;
  caregiver: RecommendedCareGiver | null;
  onRequest: () => void;
}

const CaregiverInfoModal: React.FC<CareGiverModalProps> = ({ recruitId, isOpen, onClose, caregiver, onRequest }) => {
  const [prevMatchData, setPrevMatchData] = useState<MatchInfo>();
  console.log(caregiver)
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

  const triggerMatch = async (status: boolean) => {
    if (!caregiver) return;

    await controlService(
      {
        status: status,
        jobId: caregiver.jobConditionId,
        recruitId: recruitId
      },
      (res) => {
        console.log(res)
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
  const conditionMap = {
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

  type JobCondKeys = keyof typeof conditionMap;

  // 🔹 상태 스타일링 (POSSIBLE / NEGOTIABLE / IMPOSSIBLE)
  const getStatusIcon = (jobValue: "POSSIBLE" | "NEGOTIABLE" | "IMPOSSIBLE") => {
    if (jobValue === "POSSIBLE") {
      return <span className="text-green-600 font-bold">🟢 가능</span>;
    } else if (jobValue === "NEGOTIABLE") {
      return <span className="text-yellow-600 font-bold">🟡 조율 필요</span>;
    } else {
      return <span className="text-red-600 font-bold">🔴 불가능</span>;
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
            <h3 className="text-lg font-semibold text-black text-center mb-3">필요한 서비스 조건</h3>
            <table className="w-full border-collapse border border-gray-300">
              <thead>
                <tr className="bg-gray-200">
                  <th className="border p-2 text-xs">서비스 항목</th>
                  <th className="border p-2 text-xs">보호사 상태</th>
                </tr>
              </thead>
              <tbody>
                {Object.keys(conditionMap).map((key) => {
                  const typedKey = key as JobCondKeys; // 👈 keyof 활용하여 안전하게 타입 변환
                  
                  // 어르신이 해당 조건을 요청한 경우만 표시
                  if (!prevMatchData.recruitCondRes[typedKey]) return null;

                  return (
                    <tr key={typedKey} className="border-b">
                      <td className="border p-2 text-xs">{conditionMap[typedKey]}</td>
                      <td className="border p-2 text-xs text-center">
                        {getStatusIcon(prevMatchData.jobCondRes[typedKey])}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}

        {/* 버튼 영역 */}
        <div className="flex justify-between gap-2 mt-4">
          <Btn text="닫기" color="red" onClick={onClose} />
          
          {/* 요청 전송 버튼 (NONE 상태일 때만 활성화) */}
          <Btn 
            text="요청 전송" 
            color={caregiver.matchStatus === "NONE" ? "green" : "disabled"} 
            onClick={onRequest} 
            disabled={caregiver.matchStatus !== "NONE"}
          />

          {/* 서비스 시작 버튼 (PENDING 상태일 때만 활성화) */}
          <Btn 
            text="서비스 시작"
            color={caregiver.matchStatus === "WAITING" ? "green" : "disabled"} 
            onClick={() => triggerMatch(true)} 
            disabled={caregiver.matchStatus !== "WAITING"}
          />

          {/* 서비스 거절/종료 버튼 (PENDING 상태일 때만 활성화) */}
          <Btn 
            text="서비스 거절/종료" 
            color={caregiver.matchStatus === "WAITING" ? "green" : "disabled"}  
            onClick={() => triggerMatch(false)} 
            disabled={caregiver.matchStatus !== "WAITING"}
          />
        </div>

      </div>
    </div>
  );
};

export default CaregiverInfoModal;
