const router = require("express").Router();
const db = require('./db');

// List all accounts
router.get("/", function (req, res) {
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

//Add account
router.post("/", function (req, res) {
  const jsonData = req.body.data

  // Parse JSON
  db.run("INSERT INTO accounts(name, description, amount, type) VALUES(?,?,?,?)", [
    jsonData.accountName,
    jsonData.accountDescription,
    jsonData.accountAmount,
    jsonData.accountType,
    ]);
    //db.close()

    res.json({ message: 'JSON received on server' });

  });

module.exports = router;