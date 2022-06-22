const express = require("express");
const app = express();
const cors = require("cors");
const path = require("path");
const PORT = process.env.PORT || 1234;

app.use(express.json());
app.use(cors());

require("./routes/index")(app);

app.use(express.static("views"));

app.use("/dashboard", (req, res) => {
  res.sendFile(path.join(__dirname, "/views/Dashboard/index.html"));
});
app.use("/profile", (req, res) => {
  res.sendFile(path.join(__dirname, "/views/Profile/index.html"));
});
app.use("/hurbcontrol", (req, res) =>
  res.sendFile(path.join(__dirname, "/views/HurbControl/index.html"))
);
app.use("/", (req, res) =>
  res.sendFile(path.join(__dirname, "/views/Authetication/index.html"))
);

app.listen(PORT);
