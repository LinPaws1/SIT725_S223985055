const mongoose = require("mongoose");

mongoose.connect("mongodb://127.0.0.1:27017/week4_booksDB");

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

const seedData = [
  {
    bookName: "Atomic Habits",
    author: "James Clear",
    genre: "Self Improvement",
    year: 2018,
    rating: 4.7,
    cover: "images/book1.jpg",
    summary: "Simple habit changes that build long term results."
  },
  {
    bookName: "Deep Work",
    author: "Cal Newport",
    genre: "Productivity",
    year: 2016,
    rating: 4.5,
    cover: "images/book2.jpg",
    summary: "Focus and work deeply without distraction."
  },
  {
    bookName: "The Pragmatic Programmer",
    author: "Andrew Hunt",
    genre: "Software",
    year: 1999,
    rating: 4.6,
    cover: "images/book3.jpg",
    summary: "Good practices and mindset for developers."
  }
];

async function runSeed() {
  try {
    await Book.deleteMany({});
    await Book.insertMany(seedData);
    console.log("✅ Seed completed!");
  } catch (err) {
    console.log("❌ Seed error:", err);
  } finally {
    mongoose.connection.close();
  }
}

runSeed();
