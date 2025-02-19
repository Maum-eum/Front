import React, { useState } from "react";
import { searchCenter } from "../../api/admin/auth";
import Input from "../commons/Input";
import { SearchCenterData } from "../../types/admin/searchCenterData";

type CenterSearchProps = {
  onSelect: (center: string) => void; // 부모 컴포넌트로 선택한 센터 전달
};

const CenterSearch: React.FC<CenterSearchProps> = ({ onSelect }) => {
  const [keyWord, setKeyWord] = useState("");

  const [centerInfo, setCenterInfo] = useState<Record<string, string | boolean | null>>({
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
        console.log(res.data.data);
        setResults(res.data.data);
        setIsOpen(true);
      },
      (err) => {
        console.log(err.response?.data);
      }
    );
  };

  const handleSelectCenter = (data: SearchCenterData) => {
    setCenterInfo({
      centerName: data.centerName,
      hasBathCar: data.hasBathCar,
      rate: data.rate,
      intro: data.intro,
      startTime: data.startTime,
      endTime: data.endTime,
      address: data.address,
    });
  };

  return (
    <div className="w-full max-w-xs sm:max-w-sm flex flex-col gap-2 mt-4">
      {/* 🔍 검색 입력 */}
      <div className="w-full flex items-center gap-2">
        <Input
          type="text"
          value={keyWord}
          onChange={(e) => setKeyWord(e.target.value)}
          placeholder="센터 검색"
        />
        <button 
          className="px-1 py-1 min-w-16 border border-green rounded-lg bg-pale-green text-black font-bold" 
          onClick={handleSearch}>
          검색
        </button>
      </div>

      {/* 🏢 선택한 센터 정보 */}
      <div className="w-full grid grid-cols-2 border-2 border-green rounded-lg text-sm">
        <div className="rounded-tl-lg p-2 bg-pale-green font-bold">센터명</div>
        <div className="p-2">{centerInfo.centerName || "선택 안됨"}</div>
        <div className="p-2 bg-pale-green font-bold">목욕 차량</div>
        <div className="p-2">{centerInfo.hasBathCar ? "보유" : "미보유"}</div>
        <div className="p-2 bg-pale-green font-bold">등급</div>
        <div className="p-2">{centerInfo.rate}</div>
        <div className="p-2 bg-pale-green font-bold">주소</div>
        <div className="p-2">{centerInfo.address}</div>
        <div className="p-2 bg-pale-green font-bold">운영 시작 시간</div>
        <div className="p-2">{centerInfo.startTime}</div>
        <div className="p-2 bg-pale-green font-bold">운영 종료 시간</div>
        <div className="p-2">{centerInfo.endTime}</div>
        {centerInfo.intro && (
          <>
            <div className="p-2 col-span-2 text-center bg-pale-green font-bold">한줄소개</div>
            <div className="p-2 col-span-2 min-h-8">{centerInfo.intro}</div>
          </>
        )}
      </div>

      {/* 📌 검색 결과 모달 */}
      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center p-4">
          <div className="bg-white p-4 rounded-lg w-full max-w-sm md:max-w-lg shadow-lg">
            <h2 className="text-lg font-bold mb-4">센터 선택</h2>
            <div className="flex flex-col gap-2 max-h-60 overflow-auto">
              {results.length > 0 ? (
                results.map((center, index) => (
                  <div 
                    key={index} 
                    className="p-3 border border-pale-green rounded-md hover:bg-gray-100 cursor-pointer transition"
                    onClick={() => {
                      onSelect(center.centerName);
                      handleSelectCenter(center);
                      setIsOpen(false);
                    }}>
                    {center.centerName}
                  </div>
                ))
              ) : (
                <p className="p-3 text-center text-gray-500">검색 결과가 없습니다.</p>
              )}
            </div>
            <button 
              className="mt-4 p-3 w-full border rounded-lg bg-pale-red text-white font-bold hover:bg-red-500 transition"
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
