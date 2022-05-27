const express = require("express");
const app = express();

app.use(express.json());

require("./routes/index")(app);
// app.set("view engine", "ejs");

// app.get("/app", (req, res) => {
//   res.render(express.static("../Frontend/Dashboard").toString());
// // res.render
// });
app.use(express.static("../Frontend/Dashboard"));
app.listen(3333);
