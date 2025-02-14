import React, { useState } from "react";
import clsx from "clsx";
import dropdown from "../../assets/image/dropdown.png";
import dropdown_open from "../../assets/image/dropdown-red.png";

type SelectedOpts = "불가능" | "가능" | "조율 가능";

type CheckListProps = {
  name: string;
  options: string[];
  selectedValues?: Record<string, SelectedOpts>;
  onChange?: (selected: Record<string, SelectedOpts>) => void;
};

const OPT_CYCLE: SelectedOpts[] = ["불가능", "가능", "조율 가능"];

const CheckList: React.FC<CheckListProps> = ({ name, options, selectedValues = {}, onChange }) => {
  const [selected, setSelected] = useState<Record<string, SelectedOpts>>(selectedValues);
  const [isOpen, setIsOpen] = useState(false);

  // 선택 항목 토글
  const toggleSelect = (value: string) => {
    const currentIndex = OPT_CYCLE.indexOf(selected[value] || "불가능");
    const nextIndex = (currentIndex + 1) % OPT_CYCLE.length;
    const newStatus = OPT_CYCLE[nextIndex];
    const newSelected = { ...selected, [value]: newStatus };

    setSelected(newSelected);
    if (onChange) onChange(newSelected);
  };

  return (
    <div className="w-full font-pre-SB">
      
      <div className="w-full p-2 border border-green rounded-lg flex items-center" onClick={() => setIsOpen(!isOpen)}>
        <img src={isOpen ? dropdown_open : dropdown} className="w-4 h-2 mx-2 text-green"/>
        <span className="text-gray text-content ml-1">{name}</span>
      </div>

      {isOpen && (
        <div className="flex flex-col w-full items-center mt-1">
          {options.map((item) => {
            const status = selected[item] || "불가능";
            return (
              <div
                key={item}
                className={clsx(
                  "w-full flex flex-col gap p-1 m-1 border border-disabled-gray rounded-lg",
                  {
                    "bg-blue": status === "가능" ,
                    "bg-yellow-200": status === "조율 가능",
                    "bg-point-gray": status === "불가능",
                  }
                )}
                onClick={() => toggleSelect(item)}>
                <span className="ml-1 text-sm">{item}</span>
                <span
                  className={clsx(
                    "px-2 text-xs rounded-md",
                    {
                      "bg-blue": status === "가능",
                      "bg-yellow-200": status === "조율 가능",
                      "bg-point-gray": status === "불가능",
                    }
                  )}
                >
                  {status}
                </span>
              </div>
            )
          })}
        </div>
      )}
    </div>
  );
};

export default CheckList;
