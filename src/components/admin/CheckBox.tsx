import React, { useState } from "react";
import clsx from "clsx";


type CheckListProps = {
  name: string;
  options: string[];
  selectedopt: string[];
  onChange?: (selected: string[]) => void;
};


const CheckBox: React.FC<CheckListProps> = ({ name, options, selectedopt, onChange }) => {
  const [selected, setSelected] = useState<string[]>(selectedopt)

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
      
      <div className="w-full p-2 border border-green rounded-lg flex items-center">
        <span className="text-gray text-content ml-1">{name}</span>
      </div>
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
    </div>
  );
};

export default CheckBox;
