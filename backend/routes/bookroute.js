import { Router } from "express";
const router = Router();
import { Books } from "../model/bookmodel.js";

//------ Route to save new book -----------------------

router.post("/", async (req, res) => {
  try {
    // --------- if all fields are not returned -----------
    if (!req.body.title || !req.body.author || !req.body.publishYear) {
      return res.status(400).send({
        message: "send all fields : TITLE , AUTHOR  and PUBLISHYEAR",
      });
    }
    //------else creating newBook and sending to client------
    const newBook = {
      title: req.body.title,
      author: req.body.author,
      publishYear: req.body.publishYear,
    };

    const book = await Books.create(newBook);
    return res.status(201).send(book);

    //-------------------------------------
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
});

// ---------------- To get one books using id -------------------

router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const book = await Books.findById(id);
    return res.status(200).json({
      data: book,
    });
  } catch (error) {
    return res.status(500).json({ message: "book not found" });
  }
});

//------------------- To get all books from database---------------

router.get("/", async (req, res) => {
  try {
    const books = await Books.find({});
    return res.status(200).json({
      count: books.length,
      data: books,
    });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});

//------------------- To update a book using id -----------------------

router.put("/:id", async (req, res) => {
  try {
    // --------- if all fields are not returned -----------
    if (!req.body.title || !req.body.author || !req.body.publishYear) {
      return res.status(400).send({
        message: "send all fields : TITLE , AUTHOR  and PUBLISHYEAR",
      });
    }
    //------else creating updated Book and sending to client------
    const { id } = req.params;
    const updatedBook = {
      title: req.body.title,
      author: req.body.author,
      publishYear: req.body.publishYear,
    };

    const result = await Books.findByIdAndUpdate(id, updatedBook);
    if (result)
      return res.status(201).send({ message: "book updated sucessfully" });
    //-------------------------------------
  } catch (error) {
    console.log(error.message);
    res
      .status(500)
      .send({ message1: error.message, message2: "Book not found to update" });
  }
});

//------------------ To delete one book ------------------

router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  Books.findByIdAndDelete(id)
    .then((value) => {
      if (value) {
        return res.status(200).json({
          message: "book  deleted sucessfully",
          deleteDocument: value,
        });
      } else {
        return res.status(500).json({
          message: "failed to delete",
        });
      }
    })
    .catch((err) =>
      res
        .status(500)
        .json({ message1: err.message, message2: "failed to delete" })
    );
});

export default router;
