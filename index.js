const express = require("express");
const app = express();
const cors = require("cors");
const path = require("path");
const PORT = process.env.PORT || 1234;
// const localStorage = require('node-localstorage');
const localStorage = require('localStorage');

app.use(express.json());
app.use(cors());

const session = localStorage.getItem("session");
const authMiddleware = (req, res, next) => {
//   if (!session) res.redirect("/authentication");
//   else next();
};

console.log(session);

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
