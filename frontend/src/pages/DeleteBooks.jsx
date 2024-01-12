import axios from "axios";
import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import BackButton from "../Components/BackButton";
import Spinner from "../Components/Spinner";

const DeleteBooks = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleResponse = () => {
    setLoading(true);
    axios
      .delete(`http://localhost:5000/books/${id}`)
      .then((response) => {
        console.log("book deleted");
        setLoading(false);
        navigate("/");
      })
      .catch((err) => {
        console.log(err.message);
        alert("error deleting book");
        setLoading(false);
      });
  };
  return (
    <div className="p-4">
      <BackButton />
      {loading ? (
        <Spinner />
      ) : (
        <div className=" m-20  flex justify-center items-center h-[600px]">
          <div className="bg-sky-900 rounded-sm text-gray-300 p-10">
            <h1 className="mb-5">Are you sure you want to delete the book</h1>
            <div className=" mt-5 flex justify-around">
              <span
                className="rounded-sm bg-red-900 px-2 py-1 hover:bg-red-700 "
                onClick={handleResponse}
              >
                yes
              </span>
              <span
                className="rounded-sm bg-green-900 px-2 py-1 hover:bg-green-600"
                onClick={() => {
                  navigate("/");
                }}
              >
                No
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DeleteBooks;
