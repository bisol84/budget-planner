const router = require("express").Router();
const db = require('./db');

// List all transactions
router.get("/", function (req, res) {
  res.send("List all transactions");
});

router.post("/", function (req, res) {
  const jsonData = req.body.data
  res.json({ message: 'JSON received on server' });

  // Parse JSON
  jsonData.forEach(transaction => {
    console.log(transaction.Amount)
    console.log(transaction.Description)
  });
});

module.exports = router;