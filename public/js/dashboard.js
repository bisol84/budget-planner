const dashboardMonth = document.getElementById('dashboard-month')

// Display the expenses / income for the current month by default
window.addEventListener('DOMContentLoaded', function() {

})

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
    <div class="box-content">
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
function getBudget() {
  fetch(`/api/dashboard/totalAmounts/`, {
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
