const db = require("../index");

db.queryMany(`SELECT * FROM owner;`).then((data) => {
  console.log("owners:");
  console.table(data);
});

db.queryMany(`SELECT * FROM orders;`).then((data) => {
  console.log("orders:");
  console.table(data);
});

db.queryMany(`SELECT * FROM hotel;`).then((data) => {
  console.log("hotels:");
  console.table(data);
});
