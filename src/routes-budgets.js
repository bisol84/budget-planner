const router      = require("express").Router();
const db          = require('./db');

// List all budgets categories
router.get("/categories/parents", function (req, res) {
  let sql = 'SELECT ID, category FROM categories WHERE ID >= 1000 order by 2';
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

// List all budgets by date, categories with transactions amount by category
router.get("/:date/:id", function (req, res) {
  const monthFilter = req.params.date
  const parentCategoryId = req.params.id
  let sql = `
    SELECT 
    c.ID,
    c.category,
    c.parent_category_id,
    b.amount,
    b.start_date,
    b.end_date,
    SUM(CASE WHEN c.category = 'A classer' AND t.amount > 0 THEN -t.amount ELSE t.amount END) AS "transactions_amount"
  FROM categories c
  LEFT OUTER JOIN budgets b on b.id_category = c.ID and b.start_date <= ? and b.end_date > ?
  LEFT OUTER JOIN transactions t on t.id_category = c.ID and strftime('%m', t.date) = strftime('%m', ?) and strftime('%Y', t.date) = strftime('%Y', ?)
  WHERE c.parent_category_id = ?
  GROUP BY
    c.category
  `;
  const params = [monthFilter, monthFilter, monthFilter, monthFilter, parentCategoryId];
  const response = [];
  db.all(sql, params, (err, rows) => {
    if (err) {
      throw err;
    }
    rows.forEach((row) => {
      response.push(row);
    });
    res.send(response)
  });
});

// Update budget for a category (amount)
router.post("/:id", function (req, res) {
  const jsonData = req.body.data
  const categoryId = req.params.id

     // Update end date of current budget
    db.run("UPDATE budgets SET amount = ? WHERE id_category = ?", [
      jsonData.amount, // month of end date
      categoryId // id_category
    ]);

  res.json({ message: 'JSON received on server' });
});


module.exports = router;