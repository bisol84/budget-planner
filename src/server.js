// Server file for budget-planner app
const express = require('express')
const cors = require('cors');
const rateLimiter = require('express-rate-limit')
const helmet = require('helmet');
const bodyParser = require('body-parser');
const path = require('path');
const PORT = 3000

// App express
const app = express ()

// Security - Limiter
const limiter = rateLimiter.rateLimit({
	windowMs: 15 * 60 * 1000, // 15 minutes
	limit: 1000, // Limit each IP to 100 requests per `window` (here, per 15 minutes).
	standardHeaders: 'draft-7', // draft-6: `RateLimit-*` headers; draft-7: combined `RateLimit` header
	legacyHeaders: false, // Disable the `X-RateLimit-*` headers.
})
app.use(limiter)

// Middleware
const corsOptions = {
  credentials: true,
  origin: [''] 
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
    scriptSrc: ["'self'", "https://cdn.tailwindcss.com", "https://kit.fontawesome.com", "https://ka-f.fontawesome.com", "https://cdn.datatables.net/", "https://cdnjs.cloudflare.com", "https://cdn.jsdelivr.net"],
    styleSrc: ["'self'", "https://ka-f.fontawesome.com",  "'unsafe-inline'", "https://cdn.datatables.net/", "https://fonts.googleapis.com/"],
    connectSrc: ["'self'", "https://ka-f.fontawesome.com"],
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
const routesTransactions = require("./routes/routes-transactions.js")
const routesAccounts = require("./routes/routes-accounts.js")
const routesBudgets = require("./routes/routes-budgets.js")
const routesCategories = require("./routes/routes-categories.js")
const routesDashboard = require("./routes/routes-dashboard.js")

// Decalaration of routes
app.use("/api/transactions", routesTransactions);
app.use("/api/accounts", routesAccounts);
app.use("/api/budgets", routesBudgets);
app.use("/api/categories", routesCategories);
app.use("/api/dashboard", routesDashboard);