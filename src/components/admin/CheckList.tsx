import React, { useState } from "react";
// import clsx from "clsx";
import dropdown from "../../assets/image/dropdown.png";
import dropdown_open from "../../assets/image/dropdown-red.png";

type CheckListProps = {
  name: string;
  options: string[]; // 최소 4개 이상의 옵션
  selectedValues?: Record<string, boolean>; // boolean 값으로 저장됨
  onChange?: (selected: Record<string, boolean>) => void;
};

const CheckList: React.FC<CheckListProps> = ({ name, options, selectedValues = {}, onChange }) => {
  const [selected, setSelected] = useState<Record<string, boolean>>(selectedValues);
  const [isOpen, setIsOpen] = useState(false);

  // 선택 항목 토글
  const toggleSelect = (value: string) => {
    const newSelected = { ...selected, [value]: !selected[value] };
    setSelected(newSelected);
    if (onChange) onChange(newSelected);
  };

  return (
    <div className="w-full font-pre-SB">
      {/* 드롭다운 버튼 */}
      <div className="w-full p-2 border border-green rounded-lg flex items-center" onClick={() => setIsOpen(!isOpen)}>
        <img src={isOpen ? dropdown_open : dropdown} className="w-4 h-2 mx-2 text-green"/>
        <span className="text-gray text-content ml-1">{name}</span>
      </div>

      {/* 드롭다운 메뉴 */}
      {isOpen && (
        <div className="flex flex-col w-full items-center mt-1">
          {options.map((item) => (
            <div key={item} className="w-full flex items-center gap-2 p-2 m-1 border border-disabled-gray rounded-lg"onClick={() => toggleSelect(item)}>
              <span className="ml-1">{item}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CheckList;
