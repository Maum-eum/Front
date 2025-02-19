import React, { useState } from "react";
import clsx from "clsx";
import dropdown from "../../assets/image/dropdown.png";
import dropdown_open from "../../assets/image/dropdown-red.png";

type option = {
  label: string;
  name: string;
  value: boolean;
}

type CheckListProps = {
  type: string;
  name: string;
  options: option[];
  onChange?: (selected: option) => void;
  isPreOpen? :boolean;
};


const CheckList: React.FC<CheckListProps> = ({ name, options, onChange, isPreOpen = false }) => {
  
  const [selected, setSelected] = useState<option[]>(options)
  const [isOpen, setIsOpen] = useState(isPreOpen || false);

  const toggleSelect = (opt: option) => {
    const newSelected = selected.map((item) => {

      if(item.name === opt.name) {
        item.value = !item.value;
      }
      return item
    });
    
    setSelected(newSelected)

    if (onChange) {
      onChange(opt);
    }
  };


  return (
    <div className="w-full font-pre-SB">

      <div className="w-full p-2 border border-green rounded-lg flex items-center" onClick={() => setIsOpen(!isOpen)}>
        <img src={isOpen ? dropdown_open : dropdown} className="w-4 h-2 mx-2 text-green"/>
        <span className="text-gray text-content ml-1">{name}</span>
      </div>

      {isOpen && (
        <div className="flex flex-col w-full items-center mt-1">
          {selected.map((item) => {
            const status = item.value;
            return (
              <div
                key={item.name}
                className={clsx(
                  "w-full flex gap p-1 m-1 rounded-lg items-center border",
                  {
                    "border-green bg-pale-green"   :  status ,
                    "border-red bg-pale-red"       :  !status,
                  }
                )}
                onClick={() => toggleSelect(item)}>
                <span className="ml-1  flex-1">{item.label}</span>
                <span
                  className={clsx(
                    "p-1 text-xs rounded-md w-12 text-center",
                    {
                      "bg-green"  : status ,
                      "bg-red"    : !status,
                    }
                  )}
                >
                  {status ? "필요": "불필요"}
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
