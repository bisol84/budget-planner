const router = require("express").Router();
const { json } = require("body-parser");
const db = require('./db');

// List all transactions
router.get("/transactions/", function (req, res) {
  let sql = `SELECT 
    t.ID,
    t.date,
    t.amount,
    t.import_category,
    t.description,
    c.category
  FROM transactions t
  left outer JOIN categories c on t.id_category = c.ID
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
  //db.close()
});

//Add transactions in bulk
router.post("/transactions/", function (req, res) {
  const jsonData = req.body.data
  res.json({ message: 'JSON received on server' });

  // Parse JSON
  jsonData.forEach(transaction => {
    db.run("INSERT INTO transactions(date, amount, import_category, description) VALUES(?,?,?,?)", [
      transaction.Date,
      transaction.Amount,
      transaction.Category,
      transaction.Description
    ]);
    //db.close()
  });
});

// Update transaction
router.post("/transactions/:id", function (req, res) {
  const jsonData = req.body.data
  res.json({ message: 'JSON received on server' });
  // Parse JSON
  db.run("UPDATE transactions SET id_category = ? WHERE ID = ?", [
    jsonData,
    req.params.id
  ]);
    //db.close()
});

// Delete a transaction
router.delete("/transactions/:id", function (req, res) {
  db.run('DELETE FROM transactions WHERE ID = ?', req.params.id)
});

module.exports = router;