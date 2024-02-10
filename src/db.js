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
        amount        REAL,
        import_category  VARCHAR(255),
        id_category   INTEGER NULL,
        description   VARCHAR(255),
        account       INTEGER,
        FOREIGN KEY (id_category) REFERENCES categories(ID)
      );`)
    db.exec(`
      CREATE TABLE budgets
      (
        ID INTEGER PRIMARY KEY AUTOINCREMENT,
        id_category       INTEGER,
        amount            REAL,
        period            VARCHAR(255),
        FOREIGN KEY (id_category) REFERENCES categories(ID)
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
        name          VARCHAR(255),
        description   VARCHAR(255),
        amount        REAL,
        type          VARCHAR(255)
      );`)

      // Catégories
      const categories = [
        { category: 'A classer', description: 'Sans catégorie' },
        { category: 'Assurance automobile', description: '' },
        { category: 'Assurance santé', description: '' },
        { category: 'Train', description: '' },
        { category: 'Courses', description: '' },
        { category: 'Restaurants', description: '' },
        { category: 'Parkings', description: '' },
        { category: 'Impots', description: '' },
        { category: 'Loyer', description: '' },
        { category: 'Eléctricité', description: '' },
        { category: 'Eau', description: '' },
        { category: 'Téléphone', description: '' },
        { category: 'Internet', description: '' },
        { category: 'Télévision', description: '' },
        { category: 'Médicaments', description: '' },
        { category: 'Loisirs', description: '' },
        { category: 'Habits', description: '' },
        { category: 'Epargne', description: '' },
        { category: 'Livres', description: '' },
        { category: 'Cinéma', description: '' },
        { category: 'Théâtre', description: '' },
        { category: 'Ménage', description: '' },
        { category: 'Dons', description: '' },
        { category: 'Cadeaux', description: '' },
        { category: 'Vacances', description: '' },
        { category: 'Voiture', description: '' }
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
}

module.exports = createDbConnection();