"use client";
import React from "react";

interface Props {
  label: string;
  type: "text" | "number";
  name: string;
  max?: number;
  min?: number;
  placeHolder: string;
  handleChange: any;
}

const TextInput = ({
  name,
  label,
  placeHolder,
  handleChange,
  type,
  max,
  min,
}: Props) => {
  return (
    <div className="mb-2">
      <label className="block text-sm font-medium text-gray-700">{label}</label>

      <input
        type={type}
        name={name}
        max={max}
        min={min}
        placeholder={placeHolder}
        className="mt-1 w-full rounded-md border-gray-200 shadow-sm sm:text-sm"
        onChange={handleChange}
      />
    </div>
  );
};

export default TextInput;
