// Server file for budget-planner apop
const express = require('express')
const cors = require('cors');
const helmet = require('helmet');
const bodyParser = require('body-parser');
const PORT = 3000

// App express
const app = express ()

// Routes required
const routesTransactions = require("./routes-transactions.js")
const routesAccounts = require("./routes-accounts.js")
const routesBudgets = require("./routes-budgets.js")
const routesCategories = require("./routes-categories.js")

// Middleware
const corsOptions = {
  credentials: true,
  // To delete
  origin: ['http://localhost:3000', 'http://localhost:5500', 'http://127.0.0.1:5500'] // Whitelist the domains you want to allow
};
app.use(cors(corsOptions)); 

// Upload big csv file
app.use(bodyParser.json({
  limit: '50mb'
}));

// Security
app.use(helmet());
app.listen(PORT, () => {
  console.log("Server Listening on PORT:", PORT)
})

// Decalaration of routes
app.use("/", routesTransactions);
app.use("/", routesAccounts);
app.use("/", routesBudgets);
app.use("/", routesCategories);