var express = require("express");
var app = express();
const mongoose = require("mongoose");

app.use(express.static(__dirname + "/public"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Connect MongoDB 
mongoose.connect("mongodb://127.0.0.1:27017/week4_booksDB");
mongoose.connection.on("connected", () => {
  console.log("Connected to MongoDB");
});
mongoose.connection.on("error", (err) => {
  console.log("MongoDB connection error:", err);
});

// Schema
const BookSchema = new mongoose.Schema({
  bookName: String,
  author: String,
  genre: String,
  year: Number,
  rating: Number,
  cover: String,
  summary: String
});

const Book = mongoose.model("Book", BookSchema);

// server reads from DB
app.get("/api/books", async (req, res) => {
  const books = await Book.find({});
  res.json({ statusCode: 200, data: books, message: "Success" });
});

// server writes to DB
app.post("/api/books", async (req, res) => {
  try {
    const newBook = new Book(req.body);
    await newBook.save();
    res.json({ statusCode: 200, message: "Book saved!" });
  } catch (err) {
    res.json({ statusCode: 500, message: "Save failed", error: err });
  }
});

var port = process.env.port || 3000;
app.listen(port, () => console.log("App listening to: " + port));
