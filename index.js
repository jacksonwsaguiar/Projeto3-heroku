const express = require("express");
const app = express();
const cors = require("cors");

const PORT = process.env.PORT || 3333;

app.use(express.json());
app.use(cors());

require("./routes/index")(app);

app.use("/", express.static("views"));
app.get("/dashboard", (req, res) => {
  res.json({ message: "teste ok" });
});
app.get("/profile", express.static("/Profile"));
app.get("/hurbcontrol", express.static("/HurbControl"));
app.get("/authentication", express.static("/Authentication"));

app.listen(PORT);
