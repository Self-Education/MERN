const express = require("express");
const PORT = process.env.PORT || 5000;
const connectDB = require("./config/db");

const app = express();

// connect db
connectDB();

app.get("/", (req, res) => res.send("web is up"));

// define routes
app.use("/api/users", require("./routes/api/users"));
app.use("/api/auth", require("./routes/api/auth"));
app.use("/api/profile", require("./routes/api/profile"));
app.use("/api/posts", require("./routes/api/posts"));

// listen to the port
app.listen(PORT, () => console.log(`listening to the port ${PORT}`));
