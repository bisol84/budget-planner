const router = require("express").Router();
const db = require('../database/db');

// Return the total budget for the current month
router.get("/totalBudget/", function (req, res) {
  let sql = `
  SELECT 
    COALESCE(SUM(b.amount), 0) AS total_budget
  FROM budgets b
  WHERE 
    b.start_date <= strftime('%Y-%m', 'now') AND b.end_date >= strftime('%Y-%m', 'now')
  `;
  const response = [];
  db.all(sql, (err, rows) => {
    if (err) {
      throw err;
    }
    rows.forEach((row) => {
      response.push(row);
    });
    res.send(response)
  });
});

// Return the total budget for the current month
router.get("/totalTransactions/", function (req, res) {
  let sql = `
  SELECT 
    COALESCE(SUM(t.amount), 0) AS total_transactions
  FROM transactions t
  WHERE 
  strftime('%Y-%m', t.date) = strftime('%Y-%m', 'now')
  `;
  const response = [];
  db.all(sql, (err, rows) => {
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