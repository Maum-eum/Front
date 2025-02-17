import clsx from "clsx";
import React, { useState } from "react";

type SelectOption = {
  value: number | string[];
  label: string;
}

type RadioInputProps = {
    name: string;
    options: SelectOption[];
    selectedValues? : (number | string[])[];
    onChange?: (selected: (number | string[])) => void;
}

const RadioInput: React.FC<RadioInputProps> = ( { name, options, selectedValues = [], onChange } ) => {
  const [selected, setSelected] = useState<(number | string[])[]>(selectedValues);

  const handleSelect = (value: number | string[]) => {
    setSelected([value]);
    if (onChange) onChange(value);
  };

  return (
    <div className={clsx("flex gap-3 text-sm", { "flex-col": name === "inmate" })}>
      {options.map(({ value, label }) => {
        const isSelected = selected.some((item) =>
          Array.isArray(item) && Array.isArray(value)
            ? JSON.stringify(item) === JSON.stringify(value)
            : item === value
        );
  
        return (
          <label key={JSON.stringify(value)} className="flex items-center gap-1 cursor-pointer">
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
