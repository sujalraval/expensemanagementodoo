require("dotenv").config();
const express = require("express");
const app = express();

// Middleware
app.use(express.json());

// Use PORT from .env (fallback to 3000)
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
  console.log(`DB URI: ${process.env.DB_URI}`); // just to check env working
});
