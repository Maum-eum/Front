import clsx from "clsx";
import React, { useState } from "react";

type SelectOption = {
  value: number;
  label: string;
}

type RadioInputProps = {
    name: string;
    options: SelectOption[];
    selectedValues? : (number | string)[];
    onChange?: (selected: (number)) => void;
}

const RadioInput: React.FC<RadioInputProps> = ( { name, options, selectedValues = [], onChange } ) => {
  const [selected, setSelected] = useState<(number | string)[]>(selectedValues);

  const handleSelect = (value: number) => {
    console.log(value)
    setSelected([value]);
    if (onChange) onChange(value);
  };

  return (
    <div className={clsx("flex gap-3 text-sm", {"flex-col" : name === "inmate"})}>
      {options.map(({ value, label }) => (
      <label className="flex items-center gap-1 cursor-pointer">
      <input
        type="radio"
        name={name}
        value={value}
        checked={selected.includes(value)}
        onChange={() => handleSelect(value)}
        className="hidden"
      />
      <div
        className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
          selected.includes(value) ? "bg-green border-point-green" : "border-point-gray"
        }`}
      >
        { selected.includes(value) && <div className="w-2 h-2 bg-white rounded-full"></div> }
      </div>
      {label}
    </label>
      ))}
    </div>
  );
};

export default RadioInput;
