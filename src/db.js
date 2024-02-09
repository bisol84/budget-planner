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
      CREATE TABLE budgets
      (
        ID INTEGER PRIMARY KEY AUTOINCREMENT,
        category      VARCHAR(255),
        amount   VARCHAR(255),
        period    VARCHAR(255)
      );`)

    db.exec(`
      CREATE TABLE categories
      (
        ID INTEGER PRIMARY KEY AUTOINCREMENT,
        category      VARCHAR(255),
        description   VARCHAR(255)
      );`)

      // Catégories
      const categories = [
        { category: 'Voiture', description: '' },
        { category: 'Train', description: '' },
        { category: 'Assurance automobile', description: '' },
        { category: 'Assurance santé', description: '' },
        { category: 'Courses', description: '' },
        { category: 'Restaurants', description: '' },
        { category: 'Habits', description: '' },
        { category: 'Vacances', description: '' }
      ];

      // Define the SQL query
      const sql = 'INSERT INTO categories (category, description) VALUES (?, ?)';

      // Insert each row using a loop
      categories.forEach(row => {
        db.run(sql, [row.category, row.description], function(err) {
            if (err) {
                console.error(err.message);
            } else {
                console.log(`Row ${row.category} inserted with ID: ${this.lastID}`);
            }
        });
      });

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