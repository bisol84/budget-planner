const router = require("express").Router();
const db = require('../database/db');

// Return the total budget and transactions for given month
router.get("/totalAmounts/:date/", function (req, res) {
  const monthFilter = req.params.date
  let sql = `
  SELECT 
    -- SUM(CASE WHEN c.category = 'A classer' AND t.amount > 0 THEN -t.amount ELSE t.amount END) AS "transactions_amount",
    SUM(t.amount) AS "transactions_amount",
    SUM(b.amount) AS "budgets_amount"
  FROM categories c
  LEFT OUTER JOIN budgets b on b.id_category = c.ID and b.start_date <= ? and b.end_date > ?
  LEFT OUTER JOIN transactions t on t.id_category = c.ID and strftime('%m', t.date) = strftime('%m', ?) and strftime('%Y', t.date) = strftime('%Y', ?)
  `;
  const params = [monthFilter, monthFilter, monthFilter, monthFilter];
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

module.exports = router;