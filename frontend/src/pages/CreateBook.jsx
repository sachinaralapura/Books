import React, { useEffect, useState } from "react";
import BackButton from "../Components/BackButton";
import axios from "axios";
import Spinner from "../Components/Spinner";
import { useNavigate } from "react-router-dom";

const CreateBook = () => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [publishYear, setPublishYear] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const handleSubmit = () => {
    setLoading(true);
    const newBook = {
      title,
      author,
      publishYear,
    };
    axios
      .post("http://localhost:5000/books/", newBook)
      .then((response) => {
        console.log(response.data);
        setLoading(false);
        navigate("/");
      })
      .catch((err) => {
        alert("error occured");
        console.log(err);
        setLoading(false);
      });
  };

  return (
    <div className="p4 ">
      <BackButton />
      <h1 className="text-3xl my-6">Create Book</h1>
      {loading ? (
        <Spinner />
      ) : (
        <div className="pt-20  flex justify-center items-center ">
          <div className="flex p-10 flex-col items-center border-2 border-sky-800 rounded-xl w-[600px]">
            <div className="m-4  ">
              <label className="text-xl text-gray-500"> Title</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="border bg-inherit border-gray-500 focus:border-gray-400 focus:outline-none p-1 w-full"
              />
            </div>
            <div className="m-4 ">
              <label className="text-xl text-gray-500"> Author : </label>
              <input
                type="text"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                className="border bg-inherit border-gray-500 focus:border-gray-400 focus:outline-none p-1 w-full"
              />
            </div>
            <div className="m-4 ">
              <label className="text-xl text-gray-500"> Publish year : </label>
              <input
                type="text"
                value={publishYear}
                onChange={(e) => setPublishYear(e.target.value)}
                className="border bg-inherit border-gray-500 focus:border-gray-400 focus:outline-none p-1 w-full"
              />
            </div>

            <button
              className="m-4 p-3 px-5 bg-sky-800 hover:bg-sky-600 hover:text-black rounded-xl "
              onClick={handleSubmit}
            >
              Create
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CreateBook;
