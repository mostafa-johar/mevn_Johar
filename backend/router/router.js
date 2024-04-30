const express = require("express");
const router = express.Router();
const Books = require("../model/Books");
const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/"); // Destination folder for uploads
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname); // Use original file name
  },
});
const upload = multer({ storage: storage });

/* ------------------
-- get all books
--------------------*/
router.get("/api/books", async (req, res) => {
  try {
    const data = await Books.find({});
    res.json(data);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err });
  }
});

/* ------------------
-- get a book 
--------------------*/
router.get("/api/books/:slug", async (req, res) => {
  const slugParam = req.params.slug;
  try {
    const data = await Books.findOne({ slug: slugParam });

    res.json(data);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err });
  }
});

/* ------------------
-- Create a book 
--------------------*/

router.post("/api/books", upload.single("thumbnail"), async (req, res) => {
  try {
    const newbook = new Books({
      title: req.body.title,
      slug: req.body.slug,
      description: req.body.description,
      stars: req.body.stars,
      category: req.body.category,
      thumbnail: req.file.filename,
    });

    await Books.create(newbook);

    res.json({ file: req.file });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: `there are error during feching . ${err}` });
  }
});

/* ------------------
-- Update a book 
--------------------*/
router.put("/api/books", upload.single("thumbnail"), async (req, res) => {
  try {
    const bookId = req.body.bookId;
    console.log("id", bookId);

    const updateBook = {
      title: req.body.title,
      slug: req.body.slug,
      description: req.body.description,
      stars: req.body.stars,
      category: req.body.category,
    };

    if (req.file) {
      updateBook.thumbnail = req.file.filename;
    }

    await Books.findByIdAndUpdate(bookId, updateBook);

    res.send("updated");
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: `there are error during feching . ${err}` });
  }
});

/* ------------------
-- Update a book 
--------------------*/
router.delete("/api/books/:id", async (req, res) => {
  const bookId = req.params.id;
  try {
    await Books.deleteOne({ _id: bookId });
    res.json("From Server say :  Deleted");
  } catch (err) {
    res.json({ error: err });
  }
});

module.exports = router;
