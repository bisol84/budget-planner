import { createTableLine, createTableCell, addTextContent, addTag, addNumericContent, addNumericContentWithColor, addButton } from './utils/array.js';

// Display the budgets categories, the amount and the transaction amount when page loads
window.addEventListener('DOMContentLoaded', function() {
  fetch('http://localhost:3000/budgets/', {
    method: 'GET',
    headers: {
        'Content-Type': 'application/json'
    }
  })
    .then(response => response.json())
    .then(data => displayBudgetTable(data))
    .catch(error => {
        console.error('Erreur lors de la réception des budgets :', error);
    })
})

// Display budget table
function displayBudgetTable(budgets) {
  const budgetTable = document.getElementById('budget-table');
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

// Modal to modify budget
function editBudget(categoryId) {
  const editMmodal = document.getElementById('edit-modal');
  const inputAmount = document.getElementById('input-account-amount')
  const btnSaveModal = document.getElementById('save-modal')
  const btnCloseModal = document.getElementById('close-modal')
  editMmodal.classList.remove('hidden');
  inputAmount.focus()
  btnSaveModal.addEventListener('click', function (e) {
    e.preventDefault()
    saveBudget(categoryId)
  })
  btnCloseModal.addEventListener('click', function (e) {
    e.preventDefault()
    editMmodal.classList.add('hidden');
  })
}

function saveBudget(categoryId) {
  const amount = document.getElementById('input-account-amount').value
  const editMmodal = document.getElementById('edit-modal');
  editMmodal.classList.add('hidden');
  const jsonData = {}
  jsonData.amount = amount
  fetch('http://localhost:3000/budgets/' + categoryId, {
            method: 'POST',
            body: JSON.stringify({ data: jsonData }, null, 2),
            headers: {
              'Content-Type': 'application/json'
            }
        })
        .then(response => response.json())
        /*.then(data => {
  
        })*/
        .catch(error => {
            console.error('Erreur lors de l\'envoi du JSON au serveur:', error);
        });
}