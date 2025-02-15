import React, { useState } from "react";
import clsx from "clsx";
import dropdown from "../../assets/image/dropdown.png";
import dropdown_open from "../../assets/image/dropdown-red.png";

type SelectedOpts = "불필요" | "필요";

type CheckListProps = {
  name: string;
  options: string[];
  selectedValues?: Record<string, SelectedOpts>;
  onChange?: (selected: Record<string, SelectedOpts>) => void;
};

const OPT_CYCLE: SelectedOpts[] = ["불필요", "필요"];

const CheckList: React.FC<CheckListProps> = ({ name, options, selectedValues = {}, onChange }) => {
  const [selected, setSelected] = useState<Record<string, SelectedOpts>>(selectedValues);
  const [isOpen, setIsOpen] = useState(false);

  const toggleSelect = (value: string) => {
    const currentIndex = OPT_CYCLE.indexOf(selected[value] || "불필요");
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
            const status = selected[item] || "불필요";
            return (
              <div
                key={item}
                className={clsx(
                  "w-full flex gap p-1 m-1 rounded-lg items-center border",
                  {
                    "border-green bg-pale-green"   : status === "필요" ,
                    "border-red bg-pale-red"       : status === "불필요",
                  }
                )}
                onClick={() => toggleSelect(item)}>
                <span className="ml-1  flex-1">{item}</span>
                <span
                  className={clsx(
                    "p-2 text-xs rounded-md w-12 text-center",
                    {
                      "bg-green"  : status === "필요",
                      "bg-red"    : status === "불필요",
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
