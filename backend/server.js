require("dotenv").config();

const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const connectDB = require("./config/db");
const adminRoutes = require("./routes/adminRoutes");
const authRoutes = require("./routes/authRoutes");
const notesRoutes = require("./routes/notesRoutes");
const errorHandler = require("./middleware/errorHandler");
const { generateCsrfToken } = require("./middleware/csrfMiddleware");

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(cors({ origin: process.env.CLIENT_ORIGIN, credentials: true }));

app.get("/", (req, res) => {
  res.send("hello");
});
app.get("/api/csrf-token", generateCsrfToken);
app.use("/api/admin", adminRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/notes", notesRoutes);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

connectDB()
  .then(() => {
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch((err) => {
    console.error("Failed to connect DB", err);
  });
