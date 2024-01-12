import React from "react";
import { BiLeftArrowAlt } from "react-icons/bi";
import { Link } from "react-router-dom";
const BackButton = ({ destination = "/" }) => {
  return (
    <div className="flex ">
      <Link
        to={destination}
        className="bg-sky-800 text-white px-4 py-1 rounded-lg w-fit hover:bg-sky-950"
      >
        <BiLeftArrowAlt className="text-2xl" />
      </Link>
    </div>
  );
};

export default BackButton;
