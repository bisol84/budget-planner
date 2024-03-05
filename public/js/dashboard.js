const dashboardMonth = document.getElementById('dashboard-month')

// Display the expenses / income for the current month by default
window.addEventListener('DOMContentLoaded', function() {

  // Set actual month 
  dashboardMonth.valueAsDate = new Date();
})

// Refresh the dashboard
dashboardMonth.addEventListener('change', function() {
  const selectedDate = new Date(dashboardMonth.value)
  getBudget(firstDayOfMonth(selectedDate))
})

/**
 * Return the first day of month
 * @param {*} date 
 * @returns string
 */
function firstDayOfMonth(date = new Date()) {
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const fullYear = date.getFullYear();
  const formattedDate = `${fullYear}-${month}-01`;
  return formattedDate
}

/**
 * Return percentage
 * @param {*} partialValue 
 * @param {*} totalValue 
 * @returns 
 */
function percentage(partialValue, totalValue) {
  return Math.round((100 * partialValue) / totalValue);
} 

/**
 * Create and return an total transactions / budgets
 * @param {*} total 
 * @returns 
 */
function createTotalCard(data) {
  const totalDiv = document.getElementById('total')
  const totalCard = document.createElement('div');
  const budgetsAmount = data[0].budgets_amount
  const transactionsAmount = data[0].transactions_amount
  const percentageUsed = percentage(transactionsAmount, budgetsAmount)
  totalCard.innerHTML = `
  <div class="flex items-center relative p-4 w-full bg-white rounded-lg overflow-hidden shadow">
    <div class="w-12 h-12 rounded-full bg-gray-100"></div>
    <div class="ml-3">
      <p class="font-medium text-gray-800">Total</p>
      <p class="text-sm text-gray-600">Budgets : ${budgetsAmount}</p>
      <p class="text-sm text-gray-600">Transactions : ${transactionsAmount}</p>
      <div class="percentage">${percentageUsed}%</div>
    </div>
  </div>
    `
    totalDiv.appendChild(totalCard)
}

/**
 * Get amount of budget / transaction for selected month
 */
function getBudget(dateFilter) {
  fetch(`http://localhost:3000/api/dashboard/totalAmounts/${dateFilter}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  })
    .then(response => response.json())
    .then(data => {
      createTotalCard(data)
    })
}
