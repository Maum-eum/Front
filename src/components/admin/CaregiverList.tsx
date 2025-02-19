import React, { useState } from "react";
import { RecommendedCareGiver } from "../../types/admin/elderType";
import CaregiverInfoModal from "./CaregiverInfoModal"; // 모달 임포트

type CaregiverListProps = {
  data: RecommendedCareGiver[];
  recruitId: number; // 🔹 recruitId 추가
};

const CaregiverList: React.FC<CaregiverListProps> = ({ data = [], recruitId }) => {
  // 🔹 모달 상태 관리
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCaregiver, setSelectedCaregiver] = useState<RecommendedCareGiver | null>(null);

  // 🔹 리스트 클릭 시 모달 열기 & 데이터 설정
  const handleItemClick = (caregiver: RecommendedCareGiver) => {
    setSelectedCaregiver(caregiver);
    setIsModalOpen(true);
  };

  // 🔹 요청 전송 핸들러 (추후 API 연동 가능)
  const handleRequest = () => {
    console.log("요청 전송:", selectedCaregiver, "Recruit ID:", recruitId);
    setIsModalOpen(false); // 요청 후 모달 닫기
  };

  return (
    <div className="w-full flex flex-col p-1 rounded-lg font-gtr-B h-full">
      {/* 🔹 리스트 아이템 (스크롤 가능) */}
      <div className="flex-1 overflow-y-auto min-h-0 border border-pale-green rounded-lg">
        {data.length > 0 ? (
          data.map((caregiver) => (
            <div
              key={caregiver.jobConditionId}
              className="p-3 border-b flex flex-col gap-1 cursor-pointer hover:bg-gray-50 transition"
              onClick={() => handleItemClick(caregiver)} // 클릭 시 모달 열기
            >
              {/* 요양보호사 이름 */}
              <p className="text-base font-bold text-gray-800">
                요양보호사: <span className="text-green">{caregiver.caregiverName}</span>
              </p>

              {/* 매칭 점수 */}
              <p className="text-sm text-gray-600">매칭 점수: {caregiver.score.toFixed(1)}</p>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500 p-4">검색 결과가 없습니다.</p>
        )}
      </div>

      <CaregiverInfoModal
        recruitId={recruitId}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        caregiver={selectedCaregiver}
        onRequest={handleRequest}
      />
    </div>
  );
};

export default CaregiverList;
