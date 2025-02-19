import React, { useState, useEffect } from "react";
import clsx from "clsx";
import dropdown from "../../assets/image/dropdown.png";
import dropdown_open from "../../assets/image/dropdown-red.png";

// ✅ 백엔드 ENUM 타입을 직접 사용하도록 변경
type SelectedOpts = "POSSIBLE" | "NEGOTIABLE" | "IMPOSSIBLE";

type CheckListProps = {
  name: string;
  options: string[];
  selectedValues?: Record<string, SelectedOpts>; // ✅ 백엔드 ENUM 타입으로 변경
  onChange?: (selected: Record<string, SelectedOpts>) => void; // ✅ selectedValues와 타입 일치
};


const SERVICE_MAP: Record<string, string> = {
  // ✅ 식사 보조
  mealPreparation: "식사 차리기",
  cookingAssistance: "구토물 정리",
  enteralNutritionSupport: "음식물 조리 및 설거지",
  selfFeeding: "경관식 보조",

  // ✅ 배변 보조
  selfToileting: "화장실 이동 지원",
  catheterOrStomaCare: "유치도뇨/방광루/장루 관리 지원",
  occasionalToiletingAssist: "배뇨, 배변 도움 후 처리 지원",
  diaperCare: "기저귀 교환",

  // ✅ 이동 보조
  wheelchairAssist: "침대 ↔ 휠체어 이동 보조",
  mobilityAssist: "보행 도움 (부축)",
  independentMobility: "보조 기구 이동 보조",
  immobile: "신체 기능의 유지 및 증진 도움",

  // ✅ 일상 생활 보조
  cleaningLaundryAssist: "컨디션 외 도움",
  bathingAssist: "세면 도움",
  hospitalAccompaniment: "구강 청결 도움",
  exerciseSupport: "물 단장 도움",

  // ✅ 기타
  flexibleSchedule: "유연한 일정",
  emotionalSupport: "감정적 지원",
  cognitiveStimulation: "인지 자극",
};

const STATUS_MAP: Record<"POSSIBLE" | "NEGOTIABLE" | "IMPOSSIBLE", string> = {
  POSSIBLE: "가능",
  NEGOTIABLE: "조율",
  IMPOSSIBLE: "불가능",
};



// ✅ 한글이 아닌 백엔드 ENUM 값으로 상태 변경 (이전: "불가능" | "가능" | "조율")
const OPT_CYCLE: SelectedOpts[] = ["IMPOSSIBLE", "POSSIBLE", "NEGOTIABLE"];

const CheckList: React.FC<CheckListProps> = ({ name, options, selectedValues = {}, onChange = () => {} }) => {
  // ✅ selectedValues가 변경될 때 내부 상태도 반영
  const [selected, setSelected] = useState<Record<string, SelectedOpts>>(selectedValues);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    setSelected(selectedValues); // ✅ 부모에서 변경된 값 반영
  }, [selectedValues]);

  // ✅ 선택 항목 토글 (ENUM 값으로 직접 처리)
  const toggleSelect = (value: string) => {
    const currentIndex = OPT_CYCLE.indexOf(selected[value] || "IMPOSSIBLE"); // 초기값: "IMPOSSIBLE"
    const nextIndex = (currentIndex + 1) % OPT_CYCLE.length;
    const newStatus = OPT_CYCLE[nextIndex];
    const newSelected = { ...selected, [value]: newStatus };

    setSelected(newSelected);
    console.log("✅ 선택된 항목 변경됨:", newSelected); // ✅ 상태 확인용 로그

    // ✅ 백엔드 ENUM 값으로 전달하므로 변환 필요 없음
    if (onChange) {
      onChange(newSelected);
    }
  };

  return (
    <div className="w-full font-pre-SB">
      {/* ✅ 드롭다운 버튼 */}
      <div className="w-full p-2 border border-green rounded-lg flex items-center" onClick={() => setIsOpen(!isOpen)}>
        <img src={isOpen ? dropdown_open : dropdown} className="w-4 h-2 mx-2 text-green"/>
        <span className="text-gray text-content ml-1">{name}</span>
      </div>

      {/* ✅ 드롭다운 내용 */}
      {isOpen && (
        <div className="flex flex-col w-full items-center mt-1">
          {options.map((item) => {
            const status = selected[item] || "IMPOSSIBLE"; // 기본값: 불가능
            return (
              <div
                key={item}
                className={clsx(
                  "w-full flex gap p-1 m-1 rounded-lg items-center border",
                  {
                    "border-green bg-pale-green"   : status === "POSSIBLE",
                    "border-yellow bg-pale-yellow" : status === "NEGOTIABLE",
                    "border-red bg-pale-red"       : status === "IMPOSSIBLE",
                  }
                )}
                onClick={() => toggleSelect(item)}>
                <span className="ml-1 flex-1">{SERVICE_MAP[item] || item}</span> {/* ✅ 한글 변환 적용 */}
                <span
                  className={clsx(
                    "p-2 text-xs rounded-md w-12 text-center",
                    {
                      "bg-green"  : status === "POSSIBLE",
                      "bg-yellow" : status === "NEGOTIABLE",
                      "bg-red"    : status === "IMPOSSIBLE",
                    }
                  )}
                >
                  {STATUS_MAP[status]} {/* ✅ 상태값도 한글 변환 적용 */}
                </span>
              </div>
            );
          })}

        </div>
      )}
    </div>
  );
};

export default CheckList;
