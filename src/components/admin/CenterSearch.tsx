import React, { useState } from "react";
import { searchCenter } from "../../api/admin/signup";
import Input from "../commons/Input";
import { SearchCenterData } from "../../types/admin/searchCenterData";

type CenterSearchProps = {
  onSelect: (center: string) => void; // 부모 컴포넌트로 선택한 센터 전달
};

const CenterSearch: React.FC<CenterSearchProps> = ({ onSelect }) => {
  const [keyWord, setKeyWord] = useState("");

  const [centerInfo, setCenterInfo] = useState<Record<string, string | boolean>>({
    centerName: "",
    hasBathCar: false,
    rate: "",
    intro: "",
    startTime: "",
    endTime: "",
    address: "",
  });

  const [results, setResults] = useState<SearchCenterData[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  const handleSearch = async () => {
    await searchCenter(
      keyWord,
      (res) => {
        const data = [];
        data.push(res.data.data)
        setResults(data);
        setIsOpen(true);
      },
      (err) => {
        console.log(err.response?.data)
      }
    )
  };

  const handleSelectCenter = (data:SearchCenterData) =>{
    setCenterInfo({
      centerName : data.centerName,
      hasBathCar : data.hasBathCar,
      rate : data.rate,
      intro : data.intro,
      startTime : data.startTime,
      endTime : data.endTime,
      address : data.address,
    })
  }

  return (
    <div className="w-full max-w-xs sm:max-w-sm flex flex-col gap-2 mt-4">
      <div className="w-full flex items-center gap-2 p-1">
        <Input
          type="text"
          value={keyWord}
          onChange={(e) => setKeyWord(e.target.value)}
          placeholder="센터 검색"
        />
        <div 
          className="p-1 border border-green rounded-md bg-pale-green" 
          onClick={handleSearch}>
          🔍
        </div>
      </div>
      <div className="w-full grid grid-cols-2 border-2 border-green rounded-lg ">
        <div className="rounded-tl-lg p-1 pl-3 bg-pale-green">센터명</div>
        <div className="p-1 pl-3">{centerInfo.centerName}</div>
        <div className="p-1 pl-3 bg-pale-green">목욕 차량</div>
        <div className="p-1 pl-3">{centerInfo.hasBathCar}</div>
        <div className="p-1 pl-3 bg-pale-green">등급</div>
        <div className="p-1 pl-3">{centerInfo.rate}</div>
        <div className="p-1 pl-3 bg-pale-green">주소</div>
        <div className="p-1 pl-3">{centerInfo.address}</div>
        <div className="p-1 pl-3 bg-pale-green">운영 시작 시간</div>
        <div className="p-1 pl-3">{centerInfo.startTime}</div>
        <div className="p-1 pl-3 bg-pale-green">운영 종료 시간</div>
        <div className="p-1 pl-3">{centerInfo.endTime}</div>
        <div className="p-1 pl-3 col-span-2 text-center bg-pale-green">한줄소개</div>
        <div className="p-1 pl-3 col-span-2">{centerInfo.intro}</div>
      </div>

      {/* 검색 결과 모달 */}
      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center w-full p-4">
          <div className="bg-white p-3 rounded-lg w-full">
            <h2 className="text-lg font-bold mb-2">센터 선택</h2>
            <div className="flex flex-col gap-1">
              {results.length > 0 ? results.map((center, index) => (
                <div 
                  key={index} 
                  className="p-2 border border-pale-green rounded-md"
                  onClick={() => {
                    onSelect(center.centerName);
                    handleSelectCenter(center);
                    setIsOpen(false);
                  }}>
                  {center.centerName}
                </div>
              )) : (
                <p className="p-2">검색 결과가 없습니다.</p>
              )}
            </div>
            <button 
              className="mt-3 p-2 w-full border rounded-md bg-pale-red"
              onClick={() => setIsOpen(false)}>
              닫기
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CenterSearch;
