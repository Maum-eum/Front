import React, { useState } from "react";
import clsx from "clsx";
import dropdown from "../../assets/image/dropdown.png";
import dropdown_open from "../../assets/image/dropdown-red.png";

type CheckListProps = {
  name: string;
  options: string[];
  selectedopt: string[];
  onChange?: (selected: string[]) => void;
  isPreOpen? :boolean;
};


const CheckBox: React.FC<CheckListProps> = ({ name, options, selectedopt, onChange, isPreOpen = false }) => {
  const [selected, setSelected] = useState<string[]>(selectedopt)
  const [isOpen, setIsOpen] = useState(isPreOpen || false);
  const toggleSelect = (opt: string) => {
    const isSelected = selected.some((item) => item === opt);

    let newSelected;
    if (isSelected) {
      newSelected = selected.filter((item) => item !== opt);
    } else {
      newSelected = [...selected, opt];
    }
    
    setSelected(newSelected)

    if (onChange) onChange(newSelected);
  };


  return (
    <div className="w-full font-pre-SB">
      
      <div className="w-full p-2 border border-green rounded-lg flex items-center" onClick={() => setIsOpen(!isOpen)}>
        <img src={isOpen ? dropdown_open : dropdown} className="w-4 h-2 mx-2 text-green"/>
        <span className="text-gray text-content ml-1">{name}</span>
      </div>
      {isOpen && (
        <div className="grid grid-cols-2 items-center mt-1">
          {options.map((item) => {
            const status = selected.includes(item);
            return (
              <div
                key={item}
                className={clsx(
                  "p-1 m-1 rounded-lg items-center border text-center",
                  {
                    "border-green bg-pale-green"   :  status ,
                    "border-red bg-pale-red"       :  !status,
                  }
                )}
                onClick={() => toggleSelect(item)}>
                <span className="font-bold">{item}</span>
              </div>              
            )
          })}
        </div>
      )}
    </div>
  );
};

export default CheckBox;
