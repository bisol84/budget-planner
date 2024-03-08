const dashboardMonth = document.getElementById('dashboard-month')

// Display the expenses / income for the current month by default
window.addEventListener('DOMContentLoaded', function() {

  // Load Total income / outcome
  const savedMonth = localStorage.getItem('selectedMonth')
  if (savedMonth) {
    dashboardMonth.value = savedMonth;
    getBudget(firstDayOfMonth(new Date(dashboardMonth.value)))
  } else {
    dashboardMonth.valueAsDate = new Date();
    getBudget(firstDayOfMonth())
  }
})

// Refresh the dashboard
dashboardMonth.addEventListener('change', function() {
  const selectedDate = new Date(dashboardMonth.value)
  localStorage.setItem('selectedMonth', dashboardMonth.value);
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
  <div class="box-small">
    <div class="">
      <p class="text-title">Total</p>
      <p class="text-content">Budgets : ${budgetsAmount}</p>
      <p class="text-content">Transactions : ${transactionsAmount}</p>
      <div class="text-subcontent">${percentageUsed}%</div>
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
