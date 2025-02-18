import React, { useEffect } from "react";
import { MatchedStatus, WorkTimes } from "../../types/caregiver/caregiverRequestType";
import AttributeCard from "./AttributeCard";

type ScheduleListProps = {
  matches: MatchedStatus[];
};

const ScheduleList: React.FC<ScheduleListProps> = ({ matches }) => {
  const week = ["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"];
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
    <div className="w-72 sm:w-[600px] text-content h-full flex flex-wrap gap-3 shadow bg-white rounded-lg mb-10 p-5">
      <div className="flex flex-col gap-2">
        {week.map((day) => (
          <div className="flex gap-2">
            <div
              key={day}
              className=" w-14 h-9 flex justify-center items-center py-2 px-4 gap-2 bg-base-white rounded-lg"
            >
              <span className="font-bold">{day}</span>
            </div>
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
