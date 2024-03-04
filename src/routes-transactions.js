const router = require("express").Router();
const db = require('./db');
const multer = require('multer')
const storage = multer.memoryStorage()
const upload = multer({ storage: storage })
const parser = require('csv-parse')

// List all transactions with category and amount
router.get("/", function (req, res) {
  let sql = `SELECT 
    t.ID,
    t.date,
    t.amount,
    t.import_category,
    t.description,
    t.transaction_type,
    c.category,
    c.color,
    a.name
  FROM transactions t
  left outer JOIN categories c on t.id_category = c.ID
  left outer JOIN accounts a on t.id_account = a.ID
  order by t.date desc
  `;
  const response = [];
  db.all(sql, [], (err, rows) => {
    if (err) {
      throw err;
    }
    rows.forEach((row) => {
      response.push(row);
    });
    res.send(response)
  });
});

// List top 5 transactions
router.get("/top5", function (req, res) {
  let sql = `SELECT 
    t.ID,
    SUM(CASE WHEN c.category = 'A classer' AND t.amount > 0 THEN -t.amount ELSE t.amount END) AS "total_transactions",
    c.category,
    c.icon,
    c.color
  FROM transactions t
  left outer JOIN categories c on t.id_category = c.ID
  group by c.category
  order by SUM(CASE WHEN c.category = 'A classer' AND t.amount > 0 THEN -t.amount ELSE t.amount END)
  limit 5
  `;
  const response = [];
  db.all(sql, [], (err, rows) => {
    if (err) {
      throw err;
    }
    rows.forEach((row) => {
      response.push(row);
    });
    res.send(response)
  });
});

// Add transactions in bulk
router.post("/upload", upload.single("file"), (req, res) => {

  // File uploaded successfully, parse CSV data
  const csvData = req.file.buffer.toString();

  // Parse the CSV data
  parser.parse(csvData, {
    delimiter: ';',
    columns: true, // Header on first line
    trim: true 
  }, function (err, transactions) {
    if (err) {
      console.error('Error parsing CSV:', err.message);
      return res.status(500).send('Error parsing CSV.');
    }
    
    // Send parsed records as response
    db.get("SELECT ID FROM categories WHERE category = 'A classer'", (err, row) => {
      if (err) {
        console.error("Error fetching category:", err);
        return;
      }
        
      if (row) {
        transactions.forEach(transaction => {
          db.run("INSERT INTO transactions(date, amount, import_category, description, id_category) VALUES(?,?,?,?,?)", [
            transaction.Date,
            transaction.Amount,
            transaction.Category,
            transaction.Description,
            row.ID
          ]);
        });
      }
      res.json({ message: 'JSON received on server' });
    });
  });
});

// Update transaction category and account
router.post("/:id", function (req, res) {
  const jsonData = req.body.data
  res.json({ message: 'JSON received on server' });
  db.run("UPDATE transactions SET id_category = ?, id_account = ?, transaction_type = ? WHERE ID = ?", [
    jsonData.id_category, // id_category
    jsonData.id_account,  // id_account
    jsonData.transaction_type,
    req.params.id // id_transaction
  ]);
});

// Delete a transaction
router.delete("/:id", function (req, res) {
  db.run('DELETE FROM transactions WHERE ID = ?', req.params.id, function(err) {
    if (err) {
      console.log(err)
    } else {
      res.send('');
    }
  })
});

module.exports = router;