const router = require("express").Router();
const db = require('./db');

// List all budget categories
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

// List all budgets and categories informations
router.get("/budgets", function (req, res) {
  let sql = `
  SELECT 
    c.ID,
    c.category,
    b.amount,
    b.period
  FROM categories c
  LEFT OUTER JOIN budgets b on b.id_category = c.ID
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

// Update budget amount for this category
router.post("/budgets/:id", function (req, res) {
  const jsonData = req.body.data
  const categoryId = req.params.id
  console.log(jsonData)
  console.log(categoryId)
  res.json({ message: 'JSON received on server' });
  // Parse JSON
  db.run("INSERT INTO budgets(id_category, amount) VALUES(?, ?)", [
    categoryId, // id_category
    jsonData.amount  // amount
  ]);
    //db.close()
});

module.exports = router;