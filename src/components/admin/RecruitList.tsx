import React from "react";
import { elderService } from "../../types/admin/service";
import { useNavigate } from "react-router-dom";

type RecruitListProps = {
  data: elderService[];
  onClick: (id: number) => void;
};

const reverseDayMapping: { [key: string]: string } = {
  "MON": "월",
  "TUE": "화",
  "WED": "수",
  "THU": "목",
  "FRI": "금",
  "SAT": "토",
  "SUN": "일",
};

const timeMapping: { [key: number]: string } = {
  18 : "09:00",
  19 : "09:30",
  20 : "10:00",
  21 : "10:30",
  22 : "11:00",
  23 : "11:30",
  24 : "12:00",
  25 : "12:30",
  26 : "13:00",
  27 : "13:30",
  28 : "14:00",
  29 : "14:30",
  30 : "15:00",
  31 : "15:30",
  32 : "16:00",
  33 : "16:30",
  34 : "17:00",
  35 : "17:30",
  36 : "18:00",
  37 : "18:30",
  38 : "19:00",
  39 : "19:30",
  40 : "20:00",
  41 : "20:30",
  42 : "21:00",
};

const RecruitList: React.FC<RecruitListProps> = ({ data = [], onClick }) => {

  const navigate = useNavigate();
  const formatRecruitTimes = (recruitTimes: elderService["recruitTimes"]) => {
    if (!recruitTimes.length) return "없음";
    
    return recruitTimes
      .map((time) => `${reverseDayMapping[time.dayOfWeek]} ${timeMapping[time.startTime]}~${timeMapping[time.endTime]}`)
      .join(", ");
  };

  const clickEvent = (data:number) => {
    onClick(data)
  }

  return (
    <div className="w-full flex flex-col p-1 rounded-lg font-gtr-B h-full">
      {/* 🔹 리스트 아이템 (스크롤 가능) */}
      <div className="flex-1 overflow-y-auto min-h-0 border border-pale-green rounded-lg">
        {data.length > 0 ? (
          data.map((elder) => (
            <div
              key={elder.recruitConditionId}
              className="p-3 border-b flex flex-col gap-1 cursor-pointer hover:bg-gray-50 transition"
              onClick={() => clickEvent(elder.recruitConditionId)}
            >
              {/* 돌봄 유형 */}
              <p className="text-base font-bold text-gray-800">
                돌봄 유형: <span className="text-green">{elder.careTypes.join(", ")}</span>
              </p>

              {/* 모집 요일 및 시간 */}
              <p className="text-sm text-gray-600">
                요일 & 시간: {formatRecruitTimes(elder.recruitTimes)}
              </p>
              <button
                className="ml-auto border border-green bg-pale-yellow px-3 rounded-lg font-gtr-B"
                onClick={() => navigate(`/admin/elder/required/${elder.recruitConditionId}`)}
                >
                  조건 수정
              </button>
              <button
                className="ml-auto border border-green bg-pale-red px-3 rounded-lg font-gtr-B"
                onClick={() => navigate(`/admin/elder/required/${elder.recruitConditionId}`)}
                >
                  조건 삭제
              </button>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500 p-4">검색 결과가 없습니다.</p>
        )}
      </div>
    </div>
  );
};

export default RecruitList;
