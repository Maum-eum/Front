import React, { useState } from "react";
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
  const [searchName, setSearchName] = useState("");
  const [sortType, setSortType] = useState<string>("");

  // 검색 및 정렬 적용
  const filteredData = data.filter((match) =>
    match.elderInfoDto.name.includes(searchName)
  );

  const sortedData = [...filteredData];

  if (sortType === "eldername") {
    sortedData.sort((a, b) => a.elderInfoDto.name.localeCompare(b.elderInfoDto.name));
  } else if(sortType === "carename") {
    sortedData.sort((a, b) => a.careGiverInfoDto.useranme.localeCompare(b.careGiverInfoDto.useranme));
  }


  return (
    <div className="w-full flex flex-col p-1 rounded-lg font-gtr-B h-full">
      {/* 검색창 & 정렬 옵션 */}
      <div className="w-full flex flex-col p-2 sticky top-0 z-10">
        <div className="flex items-center justify-between">
          <span className="text-content text-black text-lg">센터 매칭 리스트</span>
        </div>
        <div className="flex gap-2 mt-2">
          <input
            type="text"
            placeholder="이름 검색"
            value={searchName}
            onChange={(e) => setSearchName(e.target.value)}
            className="border p-1 rounded w-full"
          />
          <select onChange={(e) => setSortType(e.target.value)} className="border p-1 rounded">
            <option value="">정렬 선택</option>
            <option value="eldername">어르신 이름순</option>
            <option value="carename">요양보호사 이름순</option>
          </select>
        </div>
      </div>

      {/* 리스트 아이템 */}
      <div className="flex-1 overflow-y-auto min-h-0 border border-pale-green rounded-lg">
        {sortedData.length > 0 ? (
          sortedData.map((match, index) => (
            <div
              key={index}
              className="p-1 pl-2 border rounded-md flex min-h-16 items-center cursor-pointer"
              onClick={() => navigate(`/admin/matching/${match.version}`)}
            >
              {/* 어르신 이미지 */}
              <div className="w-12 h-12 rounded-full flex items-center justify-center overflow-hidden bg-gray-600 mr-4">
                {match.elderInfoDto.imgUrl ? (
                  <img src={match.elderInfoDto.imgUrl} alt="" className="w-full h-full object-cover" />
                ) : null}
              </div>

              {/* 요양보호사 이미지 */}
              <div className="w-12 h-12 rounded-full flex items-center justify-center overflow-hidden bg-gray-600 mr-4">
                {match.careGiverInfoDto.img ? (
                  <img src={match.careGiverInfoDto.img} alt="" className="w-full h-full object-cover" />
                ) : null}
              </div>

              {/* 매칭 정보 */}
              <div className="flex flex-col h-full flex-1">
                <p className="text-item font-bold">
                  어르신: {match.elderInfoDto.name}
                </p>
                <p className="text-item">요양보호사: {match.careGiverInfoDto.useranme}</p>
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
          ))
        ) : (
          <p className="text-center text-gray-500">검색 결과가 없습니다.</p>
        )}
      </div>
    </div>
  );
};

export default MatchingList;
