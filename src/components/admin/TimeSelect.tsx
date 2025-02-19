import { useState } from "react";
import type { ServiceTime } from "../../types/admin/elderType";

interface TimeSelectProps {
  setTimeData: (newTimeData: ServiceTime[]) => void;
}

const TimeSelect: React.FC<TimeSelectProps> = ({ setTimeData }) => {
  const [selectedDayOfWeek, setSelectedDayOfWeek] = useState<string | null>(null);
  const [selectedStartTime, setSelectedStartTime] = useState<number | undefined>(undefined);
  const [selectedEndTime, setSelectedEndTime] = useState<number | undefined>(undefined);
  const [timeList, setTimeList] = useState<ServiceTime[]>([]); // 선택된 시간 목록

  const dayMapping: { [key: string]: string } = {
    "월": "MON",
    "화": "TUE",
    "수": "WED",
    "목": "THU",
    "금": "FRI",
    "토": "SAT",
    "일": "SUN",
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

  const timeOptions = Array.from({ length: 42 - 18 + 1 }, (_, i) => i + 18);

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

  const handleAddTime = () => {
    if (!selectedDayOfWeek || selectedStartTime === undefined || selectedEndTime === undefined) {
      alert("요일과 시간을 모두 선택하세요.");
      return;
    }

    if (selectedStartTime >= selectedEndTime) {
      alert("종료 시간은 시작 시간보다 커야 합니다.");
      return;
    }

    const newEntry: ServiceTime = {
      dayOfWeek: selectedDayOfWeek,
      startTime: selectedStartTime,
      endTime: selectedEndTime,
    };

    const updatedTimeList = [...timeList, newEntry];
    setTimeList(updatedTimeList);
    setTimeData(updatedTimeList); // serviceData.recruitTimes 업데이트

    setSelectedDayOfWeek(null);
    setSelectedStartTime(undefined);
    setSelectedEndTime(undefined);
  };

  const handleRemoveTime = (index: number) => {
    const updatedTimeList = timeList.filter((_, i) => i !== index);
    setTimeList(updatedTimeList);
    setTimeData(updatedTimeList); // serviceData.recruitTimes 업데이트
  };

  return (
    <div className="p-4 w-full max-w-3xl mx-auto">
      <h3 className="text-lg font-gtr-B mb-3 text-center">요일 - 시간 선택</h3>

      <div className="flex border rounded-md shadow-sm justify-between">
        {Object.keys(dayMapping).map((day) => (
          <button
            key={day}
            onClick={() => setSelectedDayOfWeek(dayMapping[day])}
            className={`p-3 rounded-md hover:bg-gray-100 ${
              selectedDayOfWeek === dayMapping[day] ? "bg-gray-200 font-gtr-B" : "font-gtr-R"
            }`}
          >
            {day}
          </button>
        ))}
      </div>

      <div className="flex flex-col items-center gap-4 mt-4">
				{/* 시작 시간 선택 & 종료 시간 선택 */}
				<div className="flex items-center justify-evenly gap-2">
					<select
					value={selectedStartTime ?? ""}
					onChange={(e) => setSelectedStartTime(Number(e.target.value))}
					className="w-36 p-2 border rounded-md text-sm bg-white shadow-sm focus:border-blue-400 focus:ring-1 focus:ring-blue-300"
					>
					<option value="" disabled>시작 시간 선택</option>
					{timeOptions.map((time) => (
							<option key={time} value={time}>{timeMapping[time]}</option>
					))}
					</select>

					<select
					value={selectedEndTime ?? ""}
					onChange={(e) => setSelectedEndTime(Number(e.target.value))}
					className="w-36 p-2 border rounded-md text-sm bg-white shadow-sm focus:border-blue-400 focus:ring-1 focus:ring-blue-300"
					>
					<option value="" disabled>종료 시간 선택</option>
					{timeOptions.map((time) => (
							<option key={time} value={time}>{timeMapping[time]}</option>
					))}
					</select>
				</div>

				{/* 추가 버튼 */}
				<button
						onClick={handleAddTime}
						className="px-6 py-2 bg-pale-green  rounded-md text-sm font-semibold shadow-md hover:bg-blue-600 transition"
				>
						추가
				</button>

				{/* 선택된 시간 리스트 */}
				<div className="w-full max-w-sm">
					{timeList.map((time, index) => (
					<div key={index} className="flex justify-between items-center p-3 border rounded-md mb-2 bg-gray-50 shadow">
						<span className="text-sm font-medium">
						{reverseDayMapping[time.dayOfWeek]} {timeMapping[time.startTime]} - {timeMapping[time.endTime]}
						</span>
						<button
						onClick={() => handleRemoveTime(index)}
						className="bg-red text-white text-xs px-3 py-1 rounded-md hover:bg-red-600 transition"
						>
						삭제
						</button>
					</div>
					))}
				</div>
			</div>

    </div>
  );
};

export default TimeSelect;
