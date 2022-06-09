const express = require("express");
const app = express();
const cors = require("cors");

app.use(express.json());
app.use(cors());

require("./routes/index")(app);
// app.set("view engine", "ejs");

// app.get("/app", (req, res) => {
//   res.render(express.static("../Frontend/Dashboard").toString());
// // res.render
// });

app.use(express.static("views/global.styles.css"));

app.use("/", express.static("views/Dashboard"));
app.use("/profile", express.static("views/Profile"));
app.use("/hurb", express.static("views/HurbDashboard"));

app.listen(3333);
