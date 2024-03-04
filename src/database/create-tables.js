/**
 * Create the tables for the application
 * @param {*} db 
 */
function create(db) {
    db.exec(`
      CREATE TABLE transactions
      (
        ID INTEGER PRIMARY KEY AUTOINCREMENT,
        date          DATE,
        amount        REAL,
        import_category  VARCHAR(255),
        description   VARCHAR(255),
        transaction_type  VARCHAR(100),
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
        ID INTEGER PRIMARY KEY,
        category      VARCHAR(255),
        description   VARCHAR(255),
        color         VARCHAR(7),
        icon          VARCHAR(50),
        parent_category_id  INTEGER,
        FOREIGN KEY (parent_category_id) REFERENCES categories(ID)
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

module.exports = { create };