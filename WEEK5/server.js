const express = require("express");
const app = express();
const PORT = 3000;

// serve public folder (client)
app.use(express.static(__dirname + "/public"));

// routes
const bookRoutes = require("./routes/books.routes");
app.use("/api/books", bookRoutes);

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
