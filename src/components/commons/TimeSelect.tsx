import { useState } from "react";
import type { Time } from "../../types/commons/timeData";


export function TimeSelect() {
	const [selectedDayOfWeek, setSelectedDayOfWeek ] = useState<string[]>([]);
	const [selectedStartTime, setSelectedStartTime ] = useState<number | undefined>(undefined);
	const [selectedEndTime, setSelectedEndTime ] = useState<number | undefined>(undefined);
	const [timeData, setTimeData ] = useState<Time[]>();

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

	return (
		<div className="p-4 w-full max-w-3xl mx-auto">
		<h3 className="text-lg font-gtr-B mb-3">시간 선택</h3>
		<div className="flex border p-3 rounded-md shadow-sm w-1/2 justify-between">
		  {["월", "화", "수", "목", "금", "토", "일"].map((day) => (
			<button
			  key={day}
			  onClick={() => handleDayOfWeekChange(dayMapping[day])}
			  className={`${
				selectedDayOfWeek.includes(dayMapping[day]) ? "bg-gray-100 font-gtr-B" : "font-gtr-R"
			  } p-2 rounded-md hover:bg-gray-100`}
			>
			  {day}
			</button>
		  ))}
		</div>


		<div>
		  <h4>Selected Days: {selectedDayOfWeek.join(", ")}</h4>
		  <h4>Selected Time: {selectedStartTime}시 - {selectedEndTime}시</h4>
		</div>
	  </div>
	);

}
