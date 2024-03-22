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

var canvas = document.getElementById('canvas');
var myChart = new Chart(canvas, {
  type: 'bar',
  data: {
    labels: ['2024-01-01', '2024-02-01', '2024-03-01'], // Dates for the x-axis
    datasets: [{
      label: 'Dataset 1',
      data: [10, 20, 80], // Example data for the bars
      backgroundColor: 'rgba(255, 99, 132, 0.5)', // Example color
      borderColor: 'rgba(255, 99, 132, 1)', // Example border color
      borderWidth: 1
    }, {
      label: 'Dataset 2',
      data: [15, 25, 35], // Example data for the second set of bars
      backgroundColor: 'rgba(54, 162, 235, 0.5)', // Example color
      borderColor: 'rgba(54, 162, 235, 1)', // Example border color
      borderWidth: 1
    }]
  },
  options: {
    scales: {
      x: {
        type: 'time',
        time: {
          unit: 'month', // Display by day
          parser: 'yyyy-MM-dd' // Format of the date labels
        },
        title: {
          display: true,
          text: 'Date'
        }
      },
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Value'
        }
      }
    }
  }
});