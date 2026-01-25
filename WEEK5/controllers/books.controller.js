const booksService = require("../services/books.service");

exports.getAllBooks = (req, res) => {
  const items = booksService.getAllBooks();
  res.json({
    statusCode: 200,
    data: items,
    message: "Success"
  });
};

exports.getBookById = (req, res) => {
  const id = req.params.id;
  const book = booksService.getBookById(id);

  if (!book) {
    return res.status(404).json({
      statusCode: 404,
      data: null,
      message: "Book not found"
    });
  }

  res.json({
    statusCode: 200,
    data: book,
    message: "Success"
  });
};
