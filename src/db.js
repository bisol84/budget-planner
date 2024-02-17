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
        createData(db);
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
        description   VARCHAR(255),
        id_category   INTEGER NULL,
        id_account    INTEGER NULL,
        FOREIGN KEY (id_category) REFERENCES categories(ID)
        FOREIGN KEY (id_account) REFERENCES accounts(ID)
      );`)
      console.log('Table Transactions : OK')
    db.exec(`
      CREATE TABLE budgets
      (
        ID INTEGER PRIMARY KEY AUTOINCREMENT,
        id_category       INTEGER,
        amount            REAL,
        period            VARCHAR(255),
        FOREIGN KEY (id_category) REFERENCES categories(ID)
      );`)
      console.log('Table Budgets : OK')
    db.exec(`
      CREATE TABLE categories
      (
        ID INTEGER PRIMARY KEY AUTOINCREMENT,
        category      VARCHAR(255),
        description   VARCHAR(255),
        color         VARCHAR(50)
      );`)
      console.log('Table Categories : OK')
    db.exec(`
      CREATE TABLE accounts
      (
        ID INTEGER PRIMARY KEY AUTOINCREMENT,
        name          VARCHAR(255),
        description   VARCHAR(255),
        color         VARCHAR(50),
        amount        REAL,
        type          VARCHAR(255)
      );`)
      console.log('Table Accounts : OK')
}

function createData(db) {
  // Transactions : catégories A classer
  const firstTransactionCategory = { category: 'A classer', description: 'Sans catégorie', color: 'indigo' }
      
  console.log(firstTransactionCategory)

  const sqlCategories = 'INSERT INTO categories (category, description, color) VALUES (?, ?, ?)';

  // Insert each row using a loop
  db.run(sqlCategories, [firstTransactionCategory.category, firstTransactionCategory.description, firstTransactionCategory.color])
  console.log('Catégorie A classer : OK')

  // Transactions : autres caétgories
  const categories = [
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

  // Insert each row using a loop
  categories.forEach(row => {
    db.run(sqlCategories, [row.category, row.description], function(err) {
        if (err) {
            console.error(err.message);
        } else {
          // Budgets : insertion des catégories
          const firstBudgetCategory = [
            { amount: 0 }
          ]

          const sqlBudget = 'INSERT INTO budgets (id_category, amount) VALUES (?, ?)';

          // Insert each row using a loop
          firstBudgetCategory.forEach(row => {
            db.run(sqlBudget, [this.lastID, row.amount], function(err) {
                if (err) {
                    console.error(err.message);
                }
            });
          });
          console.log('Catégorie Budget : OK')
        }
    });
  });
  console.log('Autres catégories : OK')
}

module.exports = createDbConnection();