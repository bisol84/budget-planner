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

    db.exec(`
      CREATE TABLE budgets
      (
        ID INTEGER PRIMARY KEY AUTOINCREMENT,
        id_category       INTEGER,
        amount            REAL,
        start_date        DATE,
        end_date          DATE,
        FOREIGN KEY (id_category) REFERENCES categories(ID)
      );`)

    db.exec(`
      CREATE TABLE categories
      (
        ID INTEGER PRIMARY KEY AUTOINCREMENT,
        category      VARCHAR(255),
        description   VARCHAR(255),
        color         VARCHAR(7),
        icon          VARCHAR(50)
      );`)

    db.exec(`
      CREATE TABLE accounts
      (
        ID INTEGER PRIMARY KEY AUTOINCREMENT,
        name          VARCHAR(255),
        description   VARCHAR(255),
        color         VARCHAR(7),
        amount        REAL,
        type          VARCHAR(255)
      );`)
}

async function createData(db) {
  // Transactions : catégories A classer
  const firstTransactionCategory = { category: 'A classer', description: '', color: '#4338ca' }

  const sqlCategories = 'INSERT INTO categories (category, description, color) VALUES (?, ?, ?)';

  // Insert each row using a loop
  await db.run(sqlCategories, [firstTransactionCategory.category, firstTransactionCategory.description, firstTransactionCategory.color], function() {
    console.log("this.lastID",this.lastID);
  })

  // Transactions : autres caétgories
  const categories = [
    { category: 'Assurance automobile', description: '', color: '#FF5733' },
    { category: 'Assurance santé', description: '', color: '#33FF57' },
    { category: 'Train', description: '', color: '#5733FF' },
    { category: 'Courses', description: '', color: '#33FFBD' },
    { category: 'Restaurants', description: '', color: '#FFC733' },
    { category: 'Parkings', description: '', color: '#33C7FF' },
    { category: 'Impots', description: '', color: '#E933FF' },
    { category: 'Loyer', description: '', color: '#FF3385' },
    { category: 'Eléctricité', description: '', color: '#A233FF' },
    { category: 'Eau', description: '', color: '#33FFED' },
    { category: 'Téléphone', description: '', color: '#FF33B4' },
    { category: 'Internet', description: '', color: '#5D33FF' },
    { category: 'Télévision', description: '', color: '#33FFF6' },
    { category: 'Médicaments', description: '', color: '#FF336C' },
    { category: 'Loisirs', description: '', color: '#8DFF33' },
    { category: 'Habits', description: '', color: '#FFA833' },
    { category: 'Epargne', description: '', color: '#3380FF' },
    { category: 'Livres', description: '', color: '#FF33E4' },
    { category: 'Cinéma', description: '', color: '#33FF72' },
    { category: 'Théâtre', description: '', color: '#FF5733' },
    { category: 'Ménage', description: '', color: '#33FF5F' },
    { category: 'Dons', description: '', color: '#F333FF' },
    { category: 'Cadeaux', description: '', color: '#33E7FF' },
    { category: 'Vacances', description: '', color: '#FF333E' },
    { category: 'Voiture', description: '', color: '#33FF9C' }
  ];

  // Insert each row using a loop
  categories.forEach(row => {
    db.run(sqlCategories, [row.category, row.description, row.color], function(err) {
        if (err) {
            console.error(err.message);
        } else {
          // Budgets : insertion des catégories
          const firstBudgetCategory = [
            { amount: 0, start_date: '1970-01-01', end_date: '9999-12-31' }
          ]

          const sqlBudget = 'INSERT INTO budgets (id_category, amount, start_date, end_date) VALUES (?, ?, ?, ?)';

          // Insert each row using a loop
          firstBudgetCategory.forEach(row => {
            db.run(sqlBudget, [this.lastID, row.amount, row.start_date, row.end_date], function(err) {
                if (err) {
                    console.error(err.message);
                }
            });
          });
        }
    });
  });
}

module.exports = createDbConnection();