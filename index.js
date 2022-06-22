const express = require("express");
const app = express();
const cors = require("cors");
const path = require("path");
const PORT = process.env.PORT || 1234;

app.use(express.json());
app.use(cors());

require("./routes/index")(app);

app.use(express.static("views"));
// app.get("/dashboard", (req, res)=>{res});
app.use("/dashboard", (req, res) => {
  res.sendFile(path.join(__dirname, "Dashboard", "index.html"));
});
app.use("/profile", express.static(__dirname + "/Profile"));
app.use("/hurbcontrol", express.static(__dirname + "/HurbControl"));
app.use("/authentication", express.static(__dirname + "/Authentication"));

app.listen(PORT);
