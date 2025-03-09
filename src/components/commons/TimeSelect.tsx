import { useState, useEffect } from "react";
import type { Time } from "../../types/commons/timeData";

interface TimeSelectProps {
  setTimeData: React.Dispatch<React.SetStateAction<Time[]>>; // 부모에서 전달받은 함수
  initialTimeData?: Time; // 기존 데이터 (수정 시 기존 데이터 유지)
}



export function TimeSelect({ setTimeData, initialTimeData }: TimeSelectProps) {
  const [selectedDayOfWeek, setSelectedDayOfWeek] = useState<string[]>([]);
  const [selectedStartTime, setSelectedStartTime] = useState<number | undefined>(undefined);
  const [selectedEndTime, setSelectedEndTime] = useState<number | undefined>(undefined);
  

  useEffect(() => {
    if (initialTimeData?.dayofweek) {
      const daysArray = convertBinaryToDayArray(initialTimeData.dayofweek);
      console.log("🟢 변환된 요일 배열:", daysArray);
  
      setSelectedDayOfWeek(daysArray);
      setSelectedStartTime(reverseTimeMapping(initialTimeData.starttime));
      setSelectedEndTime(reverseTimeMapping(initialTimeData.endtime));
    } else {
      console.warn("⚠️ initialTimeData가 비어 있음:", initialTimeData);
    }
  }, [initialTimeData]);
  
  
  // ✅ 요일을 한글로 변환
  const convertBinaryToDayArray = (binaryString: string): string[] => {
    if (!binaryString || binaryString.length !== 7) {
      console.warn("⚠️ 잘못된 요일 데이터 감지:", binaryString);
      return [];
    }
  
    const days = ["월", "화", "수", "목", "금", "토", "일"];
    return binaryString.split("").reduce<string[]>((acc, char, index) => {
      if (char === "1") acc.push(days[index]); // "1"인 경우에만 추가
      return acc;
    }, []);
  };
  
  // ✅ 요일 선택 핸들러
  const handleDayOfWeekChange = (day: string) => {
    setSelectedDayOfWeek((prev) => {
      if (prev.includes(day)) {
        return prev.filter((d) => d !== day);
      } else {
        return [...prev, day];
      }
    });
  };

  const convertDayOfWeekToBinary = (selectedDays: string[]): string => {
    const days = ["월", "화", "수", "목", "금", "토", "일"];
    return days.map(day => (selectedDays.includes(day) ? "1" : "0")).join("");
};

  
  // ✅ 서버에서 받은 시간을 다시 UI에서 사용할 수 있도록 변환
  const reverseTimeMapping = (serverTime: number) => {
    const reverseMap: { [key: number]: number } = {
      18: 9, 19: 9.5, 20: 10, 21: 10.5, 22: 11, 23: 11.5,
      24: 12, 25: 12.5, 26: 13, 27: 13.5, 28: 14, 29: 14.5,
      30: 15, 31: 15.5, 32: 16, 33: 16.5, 34: 17, 35: 17.5,
      36: 18, 37: 18.5, 38: 19, 39: 19.5, 40: 20, 41: 20.5, 42: 21,
    };
    return reverseMap[serverTime] || serverTime;
  };

  const timeOptions = Array.from({ length: (21 - 9) * 2 + 1 }, (_, i) => 9 + i * 0.5);
  const timeMapping: { [key: number]: number } = {
    9: 18, 9.5: 19, 10: 20, 10.5: 21, 11: 22, 11.5: 23,
    12: 24, 12.5: 25, 13: 26, 13.5: 27, 14: 28, 14.5: 29,
    15: 30, 15.5: 31, 16: 32, 16.5: 33, 17: 34, 17.5: 35,
    18: 36, 18.5: 37, 19: 38, 19.5: 39, 20: 40, 20.5: 41, 21: 42,
  };

  

  useEffect(() => {
    if (selectedStartTime !== undefined && selectedEndTime !== undefined) {
        const binaryDayOfWeek = convertDayOfWeekToBinary(selectedDayOfWeek);
        
        console.log("✅ 변환된 요일 (문자열):", `"${binaryDayOfWeek}"`); // 디버깅 로그 추가
    
        setTimeData([
            {
                dayofweek: binaryDayOfWeek, // ✅ 따옴표 없이 전달 (JSON 변환 시 문자열 유지됨)
                starttime: timeMapping[selectedStartTime] || selectedStartTime,
                endtime: timeMapping[selectedEndTime] || selectedEndTime,
            },
        ]);
    }
}, [selectedDayOfWeek, selectedStartTime, selectedEndTime]);

  
  return (
    <div className="p-4 w-full max-w-3xl mx-auto">
      <h3 className="text-lg font-gtr-B mb-3 text-center">요일 - 시간 선택</h3>

      {/* 요일 선택 */}
      <div className="flex border rounded-md shadow-sm justify-between">
        {["월", "화", "수", "목", "금", "토", "일"].map((day) => (
          <button
            key={day}
            onClick={() => handleDayOfWeekChange(day)}
            className={`p-3 rounded-md hover:bg-gray-100 ${
              selectedDayOfWeek.includes(day) ? "bg-gray-200 font-gtr-B" : "font-gtr-R"
            }`}
          >
            {day}
          </button>
        ))}
      </div>

      {/* 시간 선택 */}
      <div className="flex items-center justify-evenly gap-4 mt-4">
        {/* 시작 시간 */}
        <div className="flex flex-col">
          <label className="text-sm font-gtr-B mb-1 text-center">시작 시간</label>
          <select
            className="w-32 border rounded-md p-2 text-sm overflow-y-scroll max-h-40"
            value={selectedStartTime ?? ""}
            onChange={(e) => setSelectedStartTime(Number(e.target.value))}
          >
            <option value="" disabled>선택</option>
            {timeOptions.map((time) => (
              <option key={time} value={time}>
                {time % 1 === 0 ? `${time}시` : `${Math.floor(time)}시 30분`}
              </option>
            ))}
          </select>
        </div>

        {/* 종료 시간 */}
        <div className="flex flex-col">
          <label className="text-sm font-gtr-B mb-1 text-center">종료 시간</label>
          <select
            className="w-32 border rounded-md p-2 text-sm overflow-y-scroll max-h-40"
            value={selectedEndTime ?? ""}
            onChange={(e) => setSelectedEndTime(Number(e.target.value))}
          >
            <option value="" disabled>선택</option>
            {timeOptions.map((time) => (
              <option key={time} value={time}>
                {time % 1 === 0 ? `${time}시` : `${Math.floor(time)}시 30분`}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
}
