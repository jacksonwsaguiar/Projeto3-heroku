const sqlite3 = require("sqlite3").verbose();

function getDatabase() {
  console.log("connecting database...");
  const DBPATH = "./database/database.db";
  console.log("database connected.");
  return new sqlite3.Database(DBPATH);
}

const db = getDatabase();

function query(sql, params) {

  console.log("executing query...");
  return new Promise((resolve, reject) => {
    db.get(sql, params, (err, rows) => {
      if (err) {
        console.log("Error running sql: " + sql);
        throw err;
      } else {
        resolve(rows);
      }
    });
  });
}

function queryMany(sql, params) {

  console.log("executing query...");
  return new Promise((resolve, reject) => {
    db.all(sql, params, (err, rows) => {
      if (err) {
        console.log("Error running sql: " + sql);
        throw err;
      } else {
        resolve(rows);
      }
    });
  });
}

function run(sql, params) {
  return db.prepare(sql).run(params);
}

module.exports = {
  query,
  queryMany,
  run
};
