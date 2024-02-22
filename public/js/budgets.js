import { createTableLine, createTableCell, addTextContent, addTag, addIcon, addNumericContent, addNumericContentWithColor, addButton } from './utils/array.js';

const budgetMonth = document.getElementById('budget-month')

// Display the budgets categories, the amount and the transaction amount when page loads
window.addEventListener('DOMContentLoaded', function() {

  // Date for input month
  const currentDate = new Date()

  // Set actuel month to budget date (day 1)
  budgetMonth.valueAsDate = currentDate;

  // Load budgets
  const month = (currentDate.getMonth() + 1).toString().padStart(2, '0');
  const fullYear = currentDate.getFullYear();
  const formattedDate = `${fullYear}-${month}-01`;
  getBudgets(formattedDate)
})

// Change tbe date
budgetMonth.addEventListener('change', function(e) {
  const selectedDate = new Date(budgetMonth.value)
  const month = (selectedDate.getMonth() + 1).toString().padStart(2, '0');
  const fullYear = selectedDate.getFullYear();
  const formattedDate = `${fullYear}-${month}-01`;
  getBudgets(formattedDate)
})

// Display budget table
function displayBudgetTable(budgets, type) {
  console.log(budgets.category)
  //document.getElementById('budget-table').innerHTML = ''
  const budgetTable = document.getElementById('budget-table');
  if (type == 'parent') {
    const budgetLine = createTableLine(budgetTable)
    const divBudgetCategory = createTableCell(budgetLine)
    addTextContent(divBudgetCategory, budgets.category)
  } else {
    budgets.forEach(budget => {
      const budgetLine = createTableLine(budgetTable)
      const divBudgetCategory = createTableCell(budgetLine)
      addTextContent(divBudgetCategory, budget.category)
      const divBudgetAmount = createTableCell(budgetLine)
      addNumericContent(divBudgetAmount, budget.amount)
      const divBudgetTransactionsAmount = createTableCell(budgetLine)
      addNumericContent(divBudgetTransactionsAmount, budget.transactions_amount)

      // Special because of calculation
      const amountLeft = Math.sign(budget.transactions_amount) === Math.sign(budget.amount) ? budget.transactions_amount - budget.amount : budget.transactions_amount + budget.amount;
      const divBudgetAmountLeft = createTableCell(budgetLine)
      addNumericContentWithColor(divBudgetAmountLeft, amountLeft)

      // Special because of button onClick event
      const divBudgetModifyButton = createTableCell(budgetLine)
      const modifyBudgetButton = addButton(divBudgetModifyButton, 'Modifier',budget.ID)
      modifyBudgetButton.onclick = function(e) {
        editBudget(budget.ID)
      }
    })
  }
}

// Modal to modify budget
function editBudget(budgetId) {
  const editMmodal = document.getElementById('edit-modal');
  const inputAmount = document.getElementById('input-account-amount')
  const btnSaveModal = document.getElementById('save-modal')
  const btnCloseModal = document.getElementById('close-modal')
  editMmodal.classList.remove('hidden');
  inputAmount.focus()
  btnSaveModal.addEventListener('click', function (e) {
    e.preventDefault()
    saveBudget(budgetId)
  })
  btnCloseModal.addEventListener('click', function (e) {
    e.preventDefault()
    editMmodal.classList.add('hidden');
  })
}

// Save the budget
function saveBudget(budgetId) {
  const amount = document.getElementById('input-account-amount').value
  //const budgetMonthSelected = `${budgetMonth.value}-01`;
  const editMmodal = document.getElementById('edit-modal');
  editMmodal.classList.add('hidden');
  const jsonData = {}
  jsonData.amount = amount
  //jsonData.budgetmonth = budgetMonthSelected
  fetch('http://localhost:3000/budgets/' + budgetId, {
            method: 'POST',
            body: JSON.stringify({ data: jsonData }, null, 2),
            headers: {
              'Content-Type': 'application/json'
            }
        })
        .then(response => response.json())
        .catch(error => {
            console.error('Erreur lors de l\'envoi du JSON au serveur:', error);
        });
}
  
// Get budgets
function getBudgets(dateFilter) {
  // Get parent categories
  fetch('http://localhost:3000/budgets/categories/parents/', {
    method: 'GET',
    headers: {
        'Content-Type': 'application/json'
    }
  })
    .then(response => response.json())
    .then(parentCategories => {
      // Process each parent category
      parentCategories.forEach(parentCategory => {
        displayBudgetTable(parentCategory, 'parent')
        console.log(`parent : ${parentCategory.category}`)
        // Get budget for each parent category
        fetch(`http://localhost:3000/budgets/${dateFilter}/${parentCategory.ID}`, {
          method: 'GET',
          headers: {
              'Content-Type': 'application/json'
          }
        })
          .then(response => response.json())
          .then(data => displayBudgetTable(data, 'child'))
          .catch(error => {
              console.error('Erreur lors de la réception des budgets :', error);
          });
      });
    })
    .catch(error => {
        console.error('Erreur lors de la réception des catégories parentes :', error);
    });
}