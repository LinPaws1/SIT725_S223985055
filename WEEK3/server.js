var express = require("express");
var app = express();

app.use(express.static(__dirname + "/public"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const books = [
  { title:"Atomic Habits", image:"images/book1.jpg", link:"View details", description:"Small habits can create big changes." },
  { title:"Deep Work", image:"images/book2.jpg", link:"Why focus matters", description:"About concentration and avoiding distraction." },
  { title:"Pragmatic Programmer", image:"images/book3.jpg", link:"Software tips", description:"Useful for coding mindset and practices." }
];

app.get("/api/books", (req, res) => {
  res.json({ statusCode: 200, data: books, message: "Success" });
});

var port = process.env.port || 3000;
app.listen(port, () => {
  console.log("App listening to: " + port);
});
