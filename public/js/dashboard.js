window.addEventListener('DOMContentLoaded', function() {
  displayBudgetInformation();
  displayTransactionsTotal()
});

/**
 * Create and return the budget card
 * @param {*} total 
 * @returns 
 */
function createBudgetCard(totalBudget, totalTransactions) {
  const budgetDiv = document.getElementById('budget-total')
  budgetDiv.innerHTML = `
  <div class="box-small">
    <div class="box-content">
      <p class="text-title">Total</p>
      <p class="text-content">${totalBudget - totalTransactions} CHF</p>
      <div class="flexdiv">
        <ul>
          <li class="text-subcontent">Budget</li>
          <li class="text-subcontent">${totalBudget} CHF</li>
        </ul>
        <ul>
          <li class="text-subcontent">Transactions</li>
          <li class="text-subcontent">${totalTransactions} CHF</li>
        </ul>
      </div>
    </div>
  </div>`
  // budgetDiv.appendChild(budgetDiv)
}

function createTransactionsTotalCard(totalBudget, totalTransactions) {
  const transactionDiv = document.getElementById('transactions-total')
  transactionDiv.innerHTML = `
  <div class="box-small">
    <div class="box-content">
      <p class="text-title">Transactions</p>
      <p class="text-content">${totalBudget - totalTransactions} CHF</p>
      <div class="flexdiv">
        <ul>
          <li class="text-subcontent">Budget</li>
          <li class="text-subcontent">${totalBudget} CHF</li>
        </ul>
        <ul>
          <li class="text-subcontent">Transactions</li>
          <li class="text-subcontent">${totalTransactions} CHF</li>
        </ul>
      </div>
    </div>
  </div>`
  // transactionDiv.appendChild(budgetDiv)
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

async function displayTransactionsTotal() {
  try {
    const totalBudget = await getBudgetTotal();
    const totalTransactions = await getTransactionsTotal();
    createTransactionsTotalCard(totalBudget, totalTransactions);
  } catch (error) {
    console.error('Error:', error);
  }
}

(async function() {
  const data = [
    { year: 2010, count: 10 },
    { year: 2011, count: 20 },
    { year: 2012, count: 15 },
    { year: 2013, count: 25 },
    { year: 2014, count: 22 },
    { year: 2015, count: 30 },
    { year: 2016, count: 28 },
  ];

  new Chart(
    document.getElementById('acquisitions'),
    {
      type: 'bar',
      data: {
        labels: data.map(row => row.year),
        datasets: [
          {
            label: 'Acquisitions by year',
            data: data.map(row => row.count)
          }
        ]
      }
    }
  );
})();