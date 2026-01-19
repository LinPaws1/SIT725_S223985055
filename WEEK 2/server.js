const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Serve static files from the "public" folder
app.use(express.static(path.join(__dirname, 'public')));

// Task 2.2P: Add two numbers using query parameters
// Example: http://localhost:3000/add?a=5&b=3
app.get('/add', (req, res) => {
  const a = parseFloat(req.query.a);
  const b = parseFloat(req.query.b);

  if (isNaN(a) || isNaN(b)) {
    return res.send("Error: Please provide valid numbers using query parameters 'a' and 'b'.");
  }

  const sum = a + b;
  res.send(`The sum of ${a} and ${b} is: ${sum}`);
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
