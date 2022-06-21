const express = require("express");
const app = express();
const cors = require("cors");

app.use(express.json());
app.use(cors());

require("./routes/index")(app);

app.use("/", express.static("views"));
app.get("/dashboard", express.static("/Dashboard"));
app.get("/profile", express.static("/Profile"));
app.get("/hurbcontrol", express.static("/HurbControl"));
app.get("/authentication", express.static("/Authentication"));


app.listen(3333);
