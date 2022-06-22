const express = require("express");
const app = express();
const cors = require("cors");
const path = require("path");
const PORT = process.env.PORT || 1234;
const localStorage = require("node-localstorage").LocalStorage;

app.use(express.json());
app.use(cors());

require("./routes/index")(app);

app.use(express.static("views"));

app.get("/", (req, res) => {
  res.redirect("/authentication");
});
app.use("/dashboard", (req, res) => {
  res.sendFile(path.join(__dirname, "/views/Dashboard/index.html"));
});
app.use("/profile", (req, res) => {
  res.sendFile(path.join(__dirname, "/views/Profile/index.html"));
});
app.use("/hurbcontrol", (req, res) =>
  res.sendFile(path.join(__dirname, "/views/HurbControl/index.html"))
);
app.use("/authentication", (req, res) =>
  res.sendFile(path.join(__dirname, "/views/Authentication/index.html"))
);

app.listen(PORT);
