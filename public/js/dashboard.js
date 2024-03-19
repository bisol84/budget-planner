/**
 * Create and return the budget card
 * @param {*} total 
 * @returns 
 */
function createBudgetCard(totalBudget, totalTransactions) {
  const budgetDiv = document.getElementById('budget')
  const budgetCard = document.createElement('div');
  // const percentageUsed = percentage(transactionsAmount, budgetsAmount)
  budgetCard.innerHTML = `
  <div class="box-small">
    <div class="box-content">
      <p class="text-title">Total</p>
      <p class="text-content">Total : ${totalBudget - totalTransactions} CHF</p>
      <span class="text-subcontent">Total budget : ${totalBudget} CHF</span> - 
      <span class="text-subcontent">Total transactions : ${totalTransactions} CHF</span>
    </div>
  </div>
    `
  budgetDiv.appendChild(budgetCard)
}

async function displayBudgetInformation() {
  try {
    const totalBudget = await getBudgetTotal();
    const totalTransactions = await getTransactionsTotal();
    createBudgetCard(totalBudget, totalTransactions);
  } catch (error) {
    console.error('Error:', error);
  }
}

window.addEventListener('DOMContentLoaded', function() {
  displayBudgetInformation();
});

async function getBudgetTotal() {
  try {
    const response = await fetch(`/api/dashboard/totalBudget`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    });
    const data = await response.json();
    return data[0].total_budget;
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
}

async function getTransactionsTotal() {
  try {
    const response = await fetch(`/api/dashboard/totalTransactions`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    });
    const data = await response.json();
    return data[0].total_transactions;
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
}