const router = require("express").Router();
const db = require('./db');

// List all transactions
router.get("/", function (req, res) {
  let sql = 'SELECT * FROM transactions';
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

router.post("/", function (req, res) {
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
    //console.log(transaction)
    //db.close()
  });
});

module.exports = router;