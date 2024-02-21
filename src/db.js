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
  // Account
  const sqlAccount = 'INSERT INTO accounts (name, description, amount, type) VALUES (?, ?, ?, ?)';

  // Insert each row using a loop
  db.run(sqlAccount, ['Compte 01', '', '0', 'Compte bancaire'])

  // Transactions : catégories A classer
  const firstTransactionCategory = { category: 'A classer', description: '', color: '#4338ca', icon: 'fa-solid fa-question' }

  const sqlCategories = 'INSERT INTO categories (category, description, color, icon) VALUES (?, ?, ?, ?)';

  // Insert each row using a loop
  await db.run(sqlCategories, [firstTransactionCategory.category, firstTransactionCategory.description, firstTransactionCategory.color, firstTransactionCategory.icon], function() {
    console.log("this.lastID",this.lastID);
  })

  // Transactions : autres caétgories
  const categories = [
    { category: 'Assurance automobile', description: '', color: '#FF5733', icon: 'fa-solid fa-car-burst fa-lg' },
    { category: 'Assurance santé', description: '', color: '#33FF57', icon: 'fas fa-heartbeat fa-lg' },
    { category: 'Train', description: '', color: '#5733FF', icon: 'fas fa-train fa-lg' },
    { category: 'Courses', description: '', color: '#33FFBD', icon: 'fas fa-carrot fa-lg' },
    { category: 'Restaurants', description: '', color: '#FFC733', icon: 'fas fa-hamburger fa-lg' },
    { category: 'Parkings', description: '', color: '#33C7FF', icon: 'fas fa-map-marker-alt fa-lg' },
    { category: 'Impots', description: '', color: '#E933FF', icon: 'fas fa-coins fa-lg' },
    { category: 'Loyer', description: '', color: '#FF3385', icon: 'fas fa-paint-roller fa-lg' },
    { category: 'Eléctricité', description: '', color: '#A233FF', icon: 'fa-solid fa-bolt fa-lg' },
    { category: 'Eau', description: '', color: '#33FFED', icon: 'fa-solid fa-water fa-lg' },
    { category: 'Téléphone', description: '', color: '#FF33B4', icon: 'fa-solid fa-phone fa-lg' },
    { category: 'Internet', description: '', color: '#5D33FF', icon: 'fa-solid fa-globe fa-lg' },
    { category: 'Télévision', description: '', color: '#33FFF6', icon: 'fa-solid fa-tv fa-lg' },
    { category: 'Médicaments', description: '', color: '#FF336C', icon: 'fa-solid fa-notes-medical fa-lg' },
    { category: 'Loisirs', description: '', color: '#8DFF33', icon: 'fa-solid fa-gamepad fa-lg' },
    { category: 'Habits', description: '', color: '#FFA833', icon: 'fa-solid fa-shirt fa-lg' },
    { category: 'Epargne', description: '', color: '#3380FF', icon: 'fa-solid fa-money-check-dollar fa-lg' },
    { category: 'Livres', description: '', color: '#FF33E4', icon: 'fa-solid fa-book fa-lg' },
    { category: 'Cinéma', description: '', color: '#33FF72', icon: 'fa-solid fa-video fa-lg' },
    { category: 'Théâtre', description: '', color: '#FF5733', icon: 'fa-solid fa-chalkboard-user fa-lg' },
    { category: 'Ménage', description: '', color: '#33FF5F', icon: 'fa-solid fa-house fa-lg' },
    { category: 'Dons', description: '', color: '#F333FF', icon: 'fa-solid fa-hand-holding-dollar fa-lg' },
    { category: 'Cadeaux', description: '', color: '#33E7FF', icon: 'fa-solid fa-gift fa-lg' },
    { category: 'Vacances', description: '', color: '#FF333E', icon: 'fa-solid fa-umbrella-beach fa-lg' },
    { category: 'Voiture', description: '', color: '#33FF9C', icon: 'fa-solid fa-car fa-lg'}
  ];

  // Insert each row using a loop
  categories.forEach(row => {
    db.run(sqlCategories, [row.category, row.description, row.color, row.icon], function(err) {
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