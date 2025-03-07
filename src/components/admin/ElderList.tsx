import React, { useState } from "react";
import { elderInfo } from "../../types/admin/elderType";
import { useNavigate } from "react-router-dom";

type ElderListProps = {
  data: elderInfo[];
};

const ElderList: React.FC<ElderListProps> = ({ data = [] }) => {
  const navigate = useNavigate();
  const [searchName, setSearchName] = useState("");
  const [sortType, setSortType] = useState<string>("");

  const calAge = (date: string) => {
    const birthDate = new Date(date);
    const today = new Date();

    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    const dayDiff = today.getDate() - birthDate.getDate();

    if (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)) {
      age--;
    }

    return age;
  };

  const onClickEvent = (isTemp: boolean, id: number) => {
    if (!isTemp) {
      navigate(`/admin/elder/detail/${id}`);
    } else {
      navigate(`/admin/elder/modify/${id}/${"temp"}`);
    }
  };

  // 필터링 및 정렬 적용
  const filteredData = data.filter((elder) => elder.name.includes(searchName));

  let sortedData = [...filteredData];

  if (sortType === "name") {
    sortedData.sort((a, b) => a.name.localeCompare(b.name));
  } else if (sortType === "age-asc") {
    sortedData.sort((a, b) => calAge(a.birth) - calAge(b.birth));
  } else if (sortType === "age-desc") {
    sortedData.sort((a, b) => calAge(b.birth) - calAge(a.birth));
  }

  // 임시 저장된 데이터 후순위로 배치
  sortedData = sortedData.sort((a, b) => Number(a.temporarySave) - Number(b.temporarySave));

  return (
    <div className="w-full flex flex-col p-1 rounded-lg font-gtr-B h-full">
      {/* 검색창 & 정렬 옵션 (고정됨) */}
      <div className="w-full flex flex-col p-2 sticky top-0 z-10">
        <div className="flex items-center justify-between">
          <span className="text-content text-black text-lg">센터 어르신 리스트</span>
          <button 
            className="text-sm border p-1 px-3 rounded-lg bg-pale-green hover:bg-green transition"
            onClick={() => navigate("/admin/elder/add")}
          >
            + 등록
          </button>
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
            <option value="name">이름순</option>
            <option value="age-asc">나이순 (오름차순)</option>
            <option value="age-desc">나이순 (내림차순)</option>
          </select>
        </div>
      </div>

      {/* 리스트 아이템 (스크롤 가능) */}
      <div className="flex-1 overflow-y-auto min-h-0 border border-pale-green rounded-lg">
        {sortedData.length > 0 ? (
          sortedData.map((elder) => (
            <div
              key={elder.elderId}
              className="p-1 pl-2 border rounded-md flex min-h-16 items-center"
              onClick={() => onClickEvent(elder.temporarySave, elder.elderId)}
            >
              <div className="w-12 h-12 rounded-full flex items-center justify-center overflow-hidden bg-gray-600 mr-4">
                {elder.img ? <img src={elder.img} alt="" className="w-full h-full object-cover" /> : null}
              </div>
              <div className="flex flex-col h-full">
                <p className="text-item font-bold">
                  {elder.name} <span className="text-sm ml-2 font-pre-SB">만 {calAge(elder.birth)}세</span>
                </p>
                <span className="text-sm">{elder.temporarySave ? "- 임시 저장됨" : ""}</span>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500">검색 결과가 없습니다.</p>
        )}
      </div>
    </div>
  );
};

export default ElderList;
