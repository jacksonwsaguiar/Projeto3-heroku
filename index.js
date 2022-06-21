const express = require("express");
const app = express();
const cors = require("cors");
const path = require("path");
const PORT = process.env.PORT || 3333;

app.use(express.json());
app.use(cors());

require("./routes/index")(app);

// app.use(express.static("views"));
// app.get("/dashboard", (req, res)=>{res});
app.get("/dashboard", (res, res) => {
  app.use(express.static(path.join(__dirname, "/Dashboard")));
  res.sendFile(path.resolve("views", "Dashboard", "index.html"));
});
app.get("/profile", express.static("/Profile"));
app.get("/hurbcontrol", express.static("/HurbControl"));
app.get("/authentication", express.static("/Authentication"));

app.listen(PORT);
