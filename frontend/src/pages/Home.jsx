import * as Three from "three";
import React, { useEffect, useState } from "react";
import Spinner from "../Components/Spinner";
import axios from "axios";
import { AiOutlineEdit } from "react-icons/ai";
import { BsInfoSquareFill } from "react-icons/bs";
import { MdDelete, MdOutlineAddBox } from "react-icons/md";
import { Link } from "react-router-dom";

const Home = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
    axios
      .get("http://localhost:5000/books")
      .then((response) => {
        console.log(response.data.data);
        setBooks(response.data.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setTimeout(() => {
          alert("Error loading");
        }, 5000);
      });
  }, []);
  return (
    <div className="p-4">
      <div className="flex justify-between items-center">
        <h1 className="text-5xl text-sky-800 my-8">Book List</h1>
        <Link to={"/books/create"}>
          <MdOutlineAddBox className="text-sky-800 text-4xl" />{" "}
        </Link>
      </div>
      {loading ? (
        <Spinner />
      ) : (
        <table className="w-full border-separate rounded-xl border-sky-950 border-spacing-2 ">
          <thead>
            <tr>
              <th className="py-3 border border-slate-400 rounded-md">No.</th>
              <th className="py-3 border border-slate-400 rounded-md">Title</th>
              <th className="py-3 border border-slate-400 rounded-md max-md:hidden">
                Author
              </th>
              <th className="py-2 border border-slate-400 rounded-md max-md:hidden ">
                Publish Year
              </th>
              <th className="py-3 border border-slate-400 rounded-md">
                Operations
              </th>
            </tr>
          </thead>

          <tbody>
            {books.map((book, index) => (
              <tr key={book._id} className="h-8">
                <td className="py-2 border border-slate-700 rounded-md text-center">
                  {index + 1}
                </td>
                <td className="py-2 border border-slate-700 rounded-md text-center">
                  {book.title}
                </td>
                <td className="py-2 border border-slate-700 rounded-md text-center max-md:hidden">
                  {book.author}
                </td>
                <td className="py-2 border border-slate-700 rounded-md text-center max-md:hidden">
                  {book.publishYear}
                </td>

                <td className="py-2 border border-slate-700 rounded-md text-center ">
                  <div className="flex justify-center gap-x-4">
                    {/* ---------------------------- DETAILS ICON -------------------- */}
                    <Link to={`/books/details/${book._id}`}>
                      <BsInfoSquareFill className="text-2xl text-green-800" />
                    </Link>
                    {/* -------------------------- EDIT BUTTON----------------------- */}
                    <Link to={`/books/edit/${book._id}`}>
                      <AiOutlineEdit className="text-2xl text-orange-500" />
                    </Link>
                    {/* ----------------------------DELETE BUTTON --------------------- */}
                    <Link to={`/books/delete/${book._id}`}>
                      <MdDelete className="text-2xl text-red-800" />
                    </Link>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Home;
