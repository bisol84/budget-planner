const router = require("express").Router();
const db = require('./db');

// List all accounts
router.get("/accounts/", function (req, res) {
  let sql = 'SELECT * FROM accounts';
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
/*router.post("/transactions/", function (req, res) {
  const jsonData = req.body.data
  res.json({ message: 'JSON received on server' });

  // Parse JSON
  jsonData.forEach(transaction => {
    db.run("INSERT INTO transactions(date, amount, category, description, compte) VALUES(?,?,?,?,?)", [
      transaction.Date,
      transaction.Amount,
      transaction.Category,
      transaction.Description,
      0
    ]);
    //db.close()
  });
});

// Delete a transaction
router.delete("/transactions/:id", function (req, res) {
  db.run('DELETE FROM transactions WHERE ID = ?', req.params.id)
});*/

module.exports = router;