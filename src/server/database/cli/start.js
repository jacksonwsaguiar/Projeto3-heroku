const db = require("../index.js");

db.run(`
CREATE TABLE owner (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    access_code INTEGER NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP NOT NULL
    );   
`);
console.log("created owner table...");

db.run(`
          CREATE TABLE hotel (
              id INTEGER PRIMARY KEY AUTOINCREMENT,
              name TEXT NOT NULL,
              capacity INTEGER NOT NULL,
              budget DOUBLE NOT NULL,
              city TEXT NOT NULL,
              state TEXT NOT NULL,
              address TEXT NOT NULL,
              owner_id INTEGER NOT NULL,
              created_at DATETIME DEFAULT CURRENT_TIMESTAMP NOT NULL,

              FOREIGN KEY (owner_id) REFERENCES owner (owner_id) 
            );   
        `);
console.log("created hotel tabel...");

db.run(`
CREATE TABLE book (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    started DATETIME NOT NULL,
    ended DATETIME NOT NULL,
    value DOUBLE NOT NULL,
    customer_name TEXT NOT NULL,
    hotel_id INTEGER NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP NOT NULL,

    FOREIGN KEY (hotel_id) REFERENCES hotel (hotel_id) 
    );
            `);
console.log("created hotel books table...");

db.run(`
CREATE TABLE orders (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    request_code TEXT NOT NULL,
    category TEXT NOT NULL,
    requested_amount DOUBLE NOT NULL,
    status TEXT NOT NULL,
    hotel_id INTEGER NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP NOT NULL,
    
    FOREIGN KEY (hotel_id) REFERENCES hotel (hotel_id) 
    );
    `);
console.log("created order table...");