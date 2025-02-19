import React from "react";
import { MatchInfo } from "../../types/admin/elderType";
import { useNavigate } from "react-router-dom";

type MatchingListProps = {
  data: MatchInfo[];
};

const statusColors: { [key: string]: string } = {
  대기: "bg-gray-200 text-gray-700",
  수락: "bg-green-200 text-green-800",
  조율: "bg-yellow-200 text-yellow-800",
  거절: "bg-red-200 text-red-800",
};

const MatchingList: React.FC<MatchingListProps> = ({ data = [] }) => {
  const navigate = useNavigate();

  return (
    <div className="w-full flex flex-col p-2 rounded-lg font-gtr-B h-full bg-white shadow">
      <h2 className="text-lg font-bold mb-2 p-2 border-b">매칭 리스트</h2>

      {data.length > 0 ? (
        <div className="flex-1 overflow-auto">
          {data.map((match, index) => (
            <div
              key={index}
              className="p-3 border-b flex items-center gap-4 cursor-pointer hover:bg-gray-100 transition"
              onClick={() => navigate(`/admin/matching/${match.version}`)}
            >
              {/* 어르신 이미지 */}
              <div className="w-12 h-12 rounded-full overflow-hidden bg-gray-300 flex items-center justify-center">
                {match.elderInfoDto.imgUrl ? (
                  <img
                    src={match.elderInfoDto.imgUrl}
                    alt="어르신"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <span className="text-gray-600 text-xs">No Image</span>
                )}
              </div>

              {/* 요양보호사 이미지 */}
              <div className="w-12 h-12 rounded-full overflow-hidden bg-gray-300 flex items-center justify-center">
                {match.careGiverInfoDto.img ? (
                  <img
                    src={match.careGiverInfoDto.img}
                    alt="요양보호사"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <span className="text-gray-600 text-xs">No Image</span>
                )}
              </div>

              {/* 어르신 & 요양보호사 이름 + 매칭 상태 */}
              <div className="flex-1">
                <p className="text-md font-semibold text-gray-800">
                  어르신: {match.elderInfoDto.name}
                </p>
                <p className="text-md text-gray-700">
                  요양보호사: {match.careGiverInfoDto.useranme}
                </p>
              </div>

              {/* 매칭 상태 */}
              <span
                className={`px-3 py-1 rounded-full text-sm font-semibold ${
                  statusColors[match.status] || "bg-gray-300 text-gray-700"
                }`}
              >
                {match.status}
              </span>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500 p-4">매칭된 데이터가 없습니다.</p>
      )}
    </div>
  );
};

export default MatchingList;
