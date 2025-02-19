import React, { useEffect } from "react";
import { MatchedStatus, WorkTimes } from "../../types/caregiver/caregiverRequestType";
import AttributeCard from "./AttributeCard";

type ScheduleListProps = {
  matches: MatchedStatus[];
};

const ScheduleList: React.FC<ScheduleListProps> = ({ matches }) => {
  const weekMap = new Map<string, string>([
    ["SUN", "일"],
    ["MON", "월"],
    ["TUE", "화"],
    ["WED", "수"],
    ["THU", "목"],
    ["FRI", "금"],
    ["SAT", "토"],
  ]);
  const scheduleMap: { [key: string]: string[] } = {};

  matches.forEach((m: MatchedStatus) => {
    m.times.forEach((t: WorkTimes) => {
      const [day, time] = [
        t.dayOfWeek,
        `${String(t.startTime).padStart(2, "0")}-${String(t.endTime).padStart(2, "0")} (${t.endTime - t.startTime}시간) [${m.elderName}]`,
      ];
      if (!scheduleMap[day]) scheduleMap[day] = [];
      scheduleMap[day].push(time);
    });
  });

  Object.keys(scheduleMap).forEach((day) => {
    scheduleMap[day].sort((a, b) => {
      const startA = parseInt(a.split("-")[0]);
      const startB = parseInt(b.split("-")[0]);
      return startA - startB;
    });
  });

  return (
    <div className="w-full text-content h-full flex flex-wrap gap-3 shadow bg-white rounded-lg mb-10 p-5">
      <div className="flex flex-col gap-2">
        {[...weekMap.keys()].map((day, key) => (
          <div className="flex gap-2" key={key}>
            {[...weekMap.keys()][new Date().getDay()] == day ? (
              <div
                key={day}
                className=" w-[34px] h-[34px] flex justify-center items-center py-2 px-4 gap-2 bg-empty-green rounded-lg"
              >
                <span className="text-item">{weekMap.get(day)}</span>
              </div>
            ) : (
              <div
                key={day}
                className=" w-[34px] h-[34px] flex justify-center items-center py-2 px-4 gap-2 bg-base-white rounded-lg"
              >
                <span className="text-item">{weekMap.get(day)}</span>
              </div>
            )}
            <div className="flex flex-col">
              {scheduleMap[day] ? (
                <AttributeCard content={scheduleMap[day]} />
              ) : (
                <AttributeCard content={["휴무"]} />
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ScheduleList;
