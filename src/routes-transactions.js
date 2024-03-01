const router = require("express").Router();
const { json } = require("body-parser");
const multer = require('multer')
const storage = multer.memoryStorage()
const upload = multer({ storage: storage })
const parser = require('csv-parse')
const db = require('./db');

// List all transactions with category and amount
router.get("/", function (req, res) {
  let sql = `SELECT 
    t.ID,
    t.date,
    t.amount,
    t.import_category,
    t.description,
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
    c.icon
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
  const csvData = req.file.buffer.toString(); // Get the CSV data from the buffer

  // Parse the CSV data
  parser.parse(csvData, {
    delimiter: ';', // specify the delimiter used in the file
    columns: true, // treat the first row as headers
    trim: true // trim whitespace from values
  }, function (err, records) {
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
        records.forEach(record => {
          db.run("INSERT INTO transactions(date, amount, import_category, description, id_category) VALUES(?,?,?,?,?)", [
            record.Date,
            record.Amount,
            record.Category,
            record.Description,
            row.ID // Hardocded - equal to "A classer" category ID
          ]);
        });
      }
      res.json({ message: 'JSON received on server' });
    });
  });
});

// Update transaction category and account
router.post("/:id", function (req, res) {
  const jsonData = req.body
  res.json({ message: 'JSON received on server' });
  // Parse JSON
  db.run("UPDATE transactions SET id_category = ?, id_account = ? WHERE ID = ?", [
    jsonData.id_category, // id_category
    jsonData.id_account,  // id_account
    req.params.id // id_transaction
  ]);
    //db.close()
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