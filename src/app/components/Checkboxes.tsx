import React from "react";
import { Aspect, useAspects } from "../context/aspectsContext";

export const Checkboxes: React.FC = () => {
  const { aspects, AllAspects, addAspect, removeAspect } = useAspects();

  // Handle checkbox toggle
  const handleCheckboxChange = (aspect: string) => {
    const aspectObj: Aspect = { id: aspect, title: aspect };
    if (aspects.some((a) => a.id === aspect)) {
      // If aspect is already selected, remove it
      removeAspect(aspect);
    } else {
      // If aspect is not selected, add it
      addAspect(aspectObj);
    }
    console.log(aspects);
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
      {AllAspects.map((aspect) => (
        <div key={aspect} className="flex items-center">
          <input
            type="checkbox"
            id={`aspect-${aspect}`}
            className="h-5 w-5 text-blue-600 rounded focus:ring-blue-500"
            checked={aspects.some((a) => a.id === aspect)}
            onChange={() => handleCheckboxChange(aspect)}
          />
          <label
            htmlFor={`aspect-${aspect}`}
            className="ml-2 text-gray-700 cursor-pointer select-none"
          >
            {aspect}
          </label>
        </div>
      ))}
    </div>
  );
};
