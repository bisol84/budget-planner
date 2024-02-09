const router = require("express").Router();
const db = require('./db');

// List all accounts
router.get("/budgets/categories", function (req, res) {
  let sql = 'SELECT * FROM categories';
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
/*router.post("/accounts/", function (req, res) {
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


// Delete a transaction
/*router.delete("/transactions/:id", function (req, res) {
  db.run('DELETE FROM transactions WHERE ID = ?', req.params.id)
});*/

module.exports = router;