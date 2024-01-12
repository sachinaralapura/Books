import React, { useEffect, useState } from "react";
import Spinner from "../Components/Spinner";
import BackButton from "../Components/BackButton";
import axios from "axios";
import { useParams } from "react-router-dom";

const ShowBook = () => {
  const [book, setBook] = useState({});
  const [loading, setLoading] = useState(false);
  const { id } = useParams();
  useEffect(() => {
    setLoading(true);
    axios
      .get(`http://localhost:5000/books/${id}`)
      .then((response) => {
        setBook(response.data.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err.message);
        setLoading(false);
      });
  }, []);
  return (
    <div className="p-4">
      <BackButton />
      <h1 className="text-3xl  my-4 ">Book Details</h1>
      {loading ? (
        <Spinner />
      ) : (
        <div className="h-screen flex justify-center items-center">
          <div className="flex flex-col  justify-center items-center  border-2 border-sky-800 rounded-xl w-fit p-4">
            <div className="my-4 ">
              <span className="text-xl mr-4 text-gray-500 ">Id : </span>
              <span>{book._id}</span>
            </div>
            <div className="my-4 ">
              <span className="text-xl mr-4 text-gray-500 ">Title : </span>
              <span>{book.title}</span>
            </div>
            <div className="my-4 ">
              <span className="text-xl mr-4 text-gray-500 ">Author : </span>
              <span>{book.author}</span>
            </div>
            <div className="my-4 ">
              <span className="text-xl mr-4 text-gray-500 ">Publish year : </span>
              <span>{book.publishYear}</span>
            </div>
            <div className="my-4 ">
              <span className="text-xl mr-4 text-gray-500 ">Created : </span> 
              <span>{book.createdAt}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ShowBook;
