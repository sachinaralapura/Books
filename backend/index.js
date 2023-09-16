console.clear()
import express from "express";
import { PORT } from "./config.js";
import { mongoDBURL } from "./config.js";
import mongoose from "mongoose";
import { books } from "./model/bookmodel.js";

const app = express();

//------------------------------------------------------
mongoose
.connect(mongoDBURL)
.then((res) => {
  console.log(`connected to database`);
  // listen only if the database is connected
  app.listen(PORT, () => {
    console.log(`open http://localhost:${PORT}`);
  });
})
.catch((err) => {
  console.log(err);
});
