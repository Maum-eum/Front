import clsx from "clsx";
import React, { useEffect, useState } from "react";

type SelectOption = {
  value: null | string | number | string[];
  label: string;
}

type RadioInputProps = {
    name: string;
    options: SelectOption[];
    selectedValues? : (null | string | number | string[])[];
    onChange?: (selected: (null | string | number | string[])) => void;
}

const RadioInput: React.FC<RadioInputProps> = ( { name, options, selectedValues = [], onChange } ) => {
  const [selected, setSelected] = useState<(null | string | number | string[])[]>(selectedValues);
  const handleSelect = ( value: null | string | number | string[]) => {
    setSelected([value]);
    if (onChange) onChange(value);
  };

  useEffect(() => {
    if (selectedValues.length > 0){
      setSelected(selectedValues)
    }
  },[selectedValues])
  
  return (
    <div className={clsx("mb-2 gap-3 flex", {"grid grid-cols-3": name === "rate" }, {" flex-col ": name === "inmate" })}>
      {options.map(({ value, label }) => {
        const isSelected = selected.some((item) =>
          Array.isArray(item) && Array.isArray(value)
            ? JSON.stringify(item) === JSON.stringify(value)
            : item === value
        );
  
        return (
          <label key={JSON.stringify(value)} className="flex items-center gap-1 cursor-pointer text-xs">
            <input
              type="radio"
              name={name}
              value={JSON.stringify(value)}
              checked={isSelected}
              onChange={() => handleSelect(value)}
              className="hidden"
            />
            <div
              className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                isSelected ? "bg-green border-point-green" : "border-point-gray"
              }`}
            >
              {isSelected && <div className="w-2 h-2 bg-white rounded-full"></div>}
            </div>
            {label}
          </label>
        );
      })}
    </div>
  );
};

export default RadioInput;
