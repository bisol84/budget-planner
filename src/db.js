const fs = require("fs");
const sqlite3 = require("sqlite3").verbose();
const filepath = "../budget-planner.db";

function createDbConnection() {
    if (fs.existsSync(filepath)) {
      return new sqlite3.Database(filepath);
    } else {
      const db = new sqlite3.Database(filepath, (error) => {
        if (error) {
          return console.error(error.message);
        }
        createTable(db);
      });
      console.log("Connection with SQLite has been established");
      return db;
    }
  }

function createTable(db) {
    db.exec(`
      CREATE TABLE transactions
      (
        ID INTEGER PRIMARY KEY AUTOINCREMENT,
        date          DATE,
        amount        INTEGER,
        category      VARCHAR(255),
        description   VARCHAR(255),
        account       INTEGER
      );`)
    db.exec(`
      CREATE TABLE categories
      (
        ID INTEGER PRIMARY KEY AUTOINCREMENT,
        category      VARCHAR(255),
        description   VARCHAR(255)
      );`)
    db.exec(`
      CREATE TABLE accounts
      (
        ID INTEGER PRIMARY KEY AUTOINCREMENT,
        name      VARCHAR(255),
        description   VARCHAR(255),
        amount   VARCHAR(255),
        type   VARCHAR(255)
      );`)
}

module.exports = createDbConnection();