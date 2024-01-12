import React from "react";
const Spinner = () => {
  return (
    <div className="flex justify-center items-center h-[600px]">
      <div className="animate-ping w-16 h-16 m-8 rounded-full bg-blue-700 "></div>
    </div>
  );
};

export default Spinner;
