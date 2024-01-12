import mongoose, { Schema } from "mongoose";

const bookSchema = new mongoose.Schema(
  {
    title: {
      typffffe: String,
      required: true,
    },
    author: {
      type: String,
      required: true,
    },
    publishYear: {
      type: Number,
      required: true,
    },
  },
  {
    timeStamps: true,
  }
);

export const Books = mongoose.model("books", bookSchema);
