const express = require('express')
const cors = require('cors');
const helmet = require('helmet');
const bodyParser = require('body-parser');
const PORT = 3000

const app = express ()

// Middleware
const corsOptions = {
  credentials: true,
  // To delete
  origin: ['http://localhost:3000', 'http://localhost:5500', 'http://127.0.0.1:5500'] // Whitelist the domains you want to allow
};
app.use(cors(corsOptions)); 
app.use(bodyParser.json({
  limit: '50mb'
}));
app.use(helmet());

app.listen(PORT, () => {
  console.log("Server Listening on PORT:", PORT)
})

// Routes transactions
const routesTransactions = require("./routes-transactions.js")
app.use("/", routesTransactions);

// Routes accounts
const routesAccounts = require("./routes-accounts.js")
app.use("/", routesAccounts);

// Routes budgets
const routesBudgets = require("./routes-budgets.js")
app.use("/", routesBudgets);