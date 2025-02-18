import { useState, useEffect } from "react";
import type { Time } from "../../types/commons/timeData";

interface TimeSelectProps {
	setTimeData: React.Dispatch<React.SetStateAction<Time[]>>; // 부모에서 전달받은 함수
  }

export function TimeSelect({ setTimeData }: TimeSelectProps) {
	const [selectedDayOfWeek, setSelectedDayOfWeek ] = useState<string[]>([]);
	const [selectedStartTime, setSelectedStartTime ] = useState<number | undefined>(undefined);
	const [selectedEndTime, setSelectedEndTime ] = useState<number | undefined>(undefined);

	const handleDayOfWeekChange = (day : string) => {
		setSelectedDayOfWeek((prev) => {
			if (prev.includes(day)) {
				return prev.filter((d) => d !== day);
			} else {
				return [...prev, day];
			}
		})
	};

	const dayMapping: { [key: string]: string } = {
		"월": "MON",
		"화": "TUE",
		"수": "WED",
		"목": "THU",
		"금": "FRI",
		"토": "SAT",
		"일": "SUN",
	};

	const timeOptions = Array.from({ length: (21 - 9) * 2 + 1 }, (_, i) => 9 + i * 0.5);

	const timeMapping: { [key: number]: number } = {
		9: 18,
		9.5: 19,
		10: 20,
		10.5: 21,
		11: 22,
		11.5: 23,
		12: 24,
		12.5: 25,
		13: 26,
		13.5: 27,
		14: 28,
		14.5: 29,
		15: 30,
		15.5: 31,
		16: 32,
		16.5: 33,
		17: 34,
		17.5: 35,
		18: 36,
		18.5: 37,
		19: 38,
		19.5: 39,
		20: 40,
		20.5: 41,
		21: 42,
	};


	useEffect(() => {
		const handleTimeDataChange = (startTime: number, endTime: number) => {
			if (selectedStartTime && selectedEndTime && (selectedStartTime > selectedEndTime)){
				window.alert(`잘못된 시간 형식입니다`);
				setSelectedStartTime(undefined);
				setSelectedEndTime(undefined);
				return ;
			}
			if (selectedDayOfWeek !== undefined && startTime !== undefined && endTime !== undefined) {
				setTimeData(() => {
				const newData: Time[] = selectedDayOfWeek.map((day) => ({
					dayofweek: day,
					starttime: timeMapping[startTime],
					endtime: timeMapping[endTime],
				}));
				return newData;
			});
			}
		};
		if (selectedDayOfWeek !== undefined && selectedStartTime !== undefined && selectedEndTime !== undefined) {
			handleTimeDataChange(selectedStartTime, selectedEndTime);
		}
	}, [selectedStartTime, selectedEndTime, selectedDayOfWeek]);

	return (
		<div className="p-4 w-full max-w-3xl mx-auto">
		<h3 className="text-lg font-gtr-B mb-3 text-center">요일 - 시간 선택</h3>
		{/* 요일선택 */}
		<div className="flex border rounded-md shadow-sm justify-between">
			{["월", "화", "수", "목", "금", "토", "일"].map((day) => (
			<button
				key={day}
				onClick={() => handleDayOfWeekChange(dayMapping[day])}
				className={`p-3 rounded-md hover:bg-gray-100 ${
				selectedDayOfWeek.includes(dayMapping[day]) ? "bg-gray-200 font-gtr-B" : "font-gtr-R"
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
				<option key={time} value={time}>{time % 1 === 0 ? `${time}시` : `${Math.floor(time)}시 30분`}</option>
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
				<option key={time} value={time}>{time % 1 === 0 ? `${time}시` : `${Math.floor(time)}시 30분`}</option>
			))}
			</select>
		</div>
	</div>
</div>
);
}
