const express = require("express");
const connectDB = require("./config/db");

const app = express();
const PORT = 5000;

app.listen(PORT, () => console.log(`i am listening to the port ${PORT}`));
// add middleware
app.use(express.json({ extended: true }));
// connect db
connectDB();

app.get("/", (req, res) => res.send("web is up"));

// define routes
app.use("/api/users", require("./routes/api/users"));
app.use("/api/auth", require("./routes/api/auth"));
app.use("/api/profile", require("./routes/api/profile"));
app.use("/api/posts", require("./routes/api/posts"));

// listen to the port

console.log("PID: ", process.pid);

process.on("SIGUSR2", function () {
    console.log("SIGUSR2");
    process.exit(1);
});
process.on("SIGUSR1", function () {
    console.log("SIGUSR1");
    process.exit(1);
});

process.on("SIGTERM", function () {
    console.log("SIGTERM");
    process.exit(1);
});
process.on("SIGINT", function () {
    console.log("SIGINT");
    process.exit(1);
});
