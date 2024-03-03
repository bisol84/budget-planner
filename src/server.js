// Server file for budget-planner apop
const express = require('express')
const cors = require('cors');
const helmet = require('helmet');
const bodyParser = require('body-parser');
const path = require('path');
const PORT = 3000

// App express
const app = express ()

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
const cspOptions = {
  directives: {
    defaultSrc: ["'self'"],
    scriptSrc: ["'self'", "https://cdn.tailwindcss.com/"], // Add the CDN here
    // Add other directives as needed
  },
};
app.use(helmet.contentSecurityPolicy(cspOptions));

// Start the API
app.listen(PORT, () => {
  console.log("Server Listening on PORT:", PORT)
})

// Public files
app.use(express.static(path.join(__dirname, '../public')));

// Routes required
const routesTransactions = require("./routes-transactions.js")
const routesAccounts = require("./routes-accounts.js")
const routesBudgets = require("./routes-budgets.js")
const routesCategories = require("./routes-categories.js")

// Decalaration of routes
app.use("/api/transactions", routesTransactions);
app.use("/api/accounts", routesAccounts);
app.use("/api/budgets", routesBudgets);
app.use("/api/categories", routesCategories);