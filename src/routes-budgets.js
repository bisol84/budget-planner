const router = require("express").Router();
const db = require('./db');

// List all budgets categories
router.get("/budgets/categories", function (req, res) {
  let sql = 'SELECT * FROM categories order by 2';
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

// List all budgets by categories with transactions amount by category
router.get("/budgets", function (req, res) {
  let sql = `
  SELECT 
    c.ID,
    c.category,
    b.amount,
    b.period,
    sum(t.amount) as "transactions_amount"
  FROM categories c
  LEFT OUTER JOIN budgets b on b.id_category = c.ID
  LEFT OUTER JOIN transactions t on t.id_category = c.ID
  GROUP BY
	  c.category
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

// Update budget amount for a category
router.post("/budgets/:id", function (req, res) {
  const jsonData = req.body.data
  const categoryId = req.params.id
  res.json({ message: 'JSON received on server' });
  db.run("UPDATE budgets SET amount = ? WHERE id_category = ?", [
    jsonData.amount,  // amount
    categoryId // id_category
  ]);
    //db.close()
});

module.exports = router;