import React from "react";

export const Field = ({
  LabelName,
  type,
  name,
  placeholder,
  value,
  handleChangeField,
  isSurpriseMe,
  handleSurpriseMe,
}) => {
  return (
    <div>
      <div className="flex items-center gap-2 mb-2">
        <label
          htmlFor={name}
          className="block text-xl font-medium  text-[#d6dadd]"
        >
          {LabelName}
        </label>
        {isSurpriseMe && (
          <button
            type="button"
            onClick={handleSurpriseMe}
            className="font-semibold text-base bg-[#ECECF1] py-1 px-2 rounded-[5px] text-black"
          >
            Surprise me
          </button>
        )}
      </div>
      <input
        type={type}
        id={name}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={handleChangeField}
        required
        className="bg-gray-50 border border-gray-300 text-gray-900
      text-sm rounded-lg focus:ring-[#6469ff] focus:border[#4649ff]
      outline-none block w-full p-3"
      />
    </div>
  );
};
