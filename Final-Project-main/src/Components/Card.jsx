import React from "react";

import { download } from "../assets";
import { downloadImage } from "../utilities";

const cutStringBiggerThan = (str, max) => {
  if (str.length > max) {
    return `${str.slice(0, max)}...`;
  }
  return str;
};

export const Card = ({ _id, name, prompt, photo }) => {
  return (
    <div className="rounded-xl group reletive shadow-card hover:shadow-cardhover card">
      <img
        className="w-full h-auto object-cover rounded-t-xl"
        src={photo}
        alt={prompt}
      />
      <div className="groupe-hover:flex flex-col p-2">
        <p className="text-white text-md overflow-y-auto">
          {cutStringBiggerThan(prompt, 70)}
        </p>
        <div className="mt-5 flex justify-between items-center gap-2">
          <div className=" flex items-center gap-2">
            <div className="w-7 h-7 rounded-full object-cover bg-green-700 flex justify-center items-center text-white text-xs font-bold">
              {name[0]}
            </div>
            <p className="text-white text-sm">{name}</p>
          </div>
          <button
            className=" outline-none bg-transparent border-none"
            type="button"
            onClick={() => downloadImage(_id, photo)}
          >
            <img
              src={download}
              alt="download"
              className="w-6 h-6 object-contain invert"
            />
          </button>
        </div>
      </div>
    </div>
  );
};
