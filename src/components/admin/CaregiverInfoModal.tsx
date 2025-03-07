import React, { useEffect } from "react";
import Btn from "../commons/Btn";
import { RecommendedCareGiver } from "../../types/admin/service";
import { getPrevMatchInfo } from "../../api/admin/service";

interface CareGiverModalProps {
  recruitId: number;
  isOpen: boolean;
  onClose: () => void;
  caregiver: RecommendedCareGiver | null;
  onRequest: () => void;
}

const CaregiverInfoModal: React.FC<CareGiverModalProps> = ({ recruitId, isOpen, onClose, caregiver, onRequest }) => {
  
  const getPrevMatch = async () => {
    if (!caregiver) return; // caregiver가 null이면 실행 X

    await getPrevMatchInfo(
      {
        jobId: caregiver.jobConditionId,
        recruitId: recruitId
      },
      (res) => {
        console.log("이전 매칭 정보:", res);
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
  }, [caregiver, recruitId]); // caregiver가 변경될 때마다 실행

  if (!isOpen || !caregiver) return null;

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

        {/* 버튼 영역 */}
        <div className="flex justify-between gap-2">
          <Btn text="닫기" color="red" onClick={onClose} />
          <Btn text="요청 전송" color="green" onClick={onRequest} />
        </div>
      </div>
    </div>
  );
};

export default CaregiverInfoModal;
