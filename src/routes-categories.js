const router = require("express").Router();
const { json } = require("body-parser");
const db = require('./db');

// List all budgets categories
router.get("/categories", function (req, res) {
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

// Update category with color and text
router.post("/categories/:id", function (req, res) {
  const jsonData = req.body.data
  const categoryId = req.params.id
  res.json({ message: 'JSON received on server' });
  db.run("UPDATE categories SET category = ?, color = ? WHERE ID = ?", [
    jsonData.category,  // category name
    jsonData.color,  // category color
    categoryId // id_category
  ]);
    //db.close()
});

module.exports = router;