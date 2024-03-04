import { createTableLine, createTableCell, createTableSubHeaderLine, addTextContent, addTag, addIcon, addNumericContent, addNumericContentWithColor, addButton } from './utils/array.js';

const budgetMonth = document.getElementById('budget-month')

// Display the budgets categories, the amount and the transaction amount when page loads
window.addEventListener('DOMContentLoaded', function() {

  // Set actual month to budget date
  budgetMonth.valueAsDate = new Date();

  // Load budgets
  getBudgets(firstDayOfMonth())
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

// Refresh the budget when modifying tbe date
budgetMonth.addEventListener('change', function() {
  const selectedDate = new Date(budgetMonth.value)
  getBudgets(firstDayOfMonth(selectedDate))
})

// Display budget table
function displayBudgetTable(budgets) {
  document.getElementById('budget-table').innerHTML = ''
  const budgetTable = document.getElementById('budget-table');
  for (const parentCategory in budgets) {
    // Parent category
    const childCategories = budgets[parentCategory];
    const budgetLine = createTableSubHeaderLine(budgetTable)
    const divBudgetCategory = createTableCell(budgetLine)
    addTextContent(divBudgetCategory, parentCategory)
    // Add empty columns
    createTableCell(budgetLine)
    createTableCell(budgetLine)
    createTableCell(budgetLine)
    createTableCell(budgetLine)
    // Child category
    for (let i = 0; i < childCategories.length; i++) {
      const budgetLine = createTableLine(budgetTable)
      const divBudgetCategory = createTableCell(budgetLine)
      addTextContent(divBudgetCategory, childCategories[i].category)
      const divBudgetAmount = createTableCell(budgetLine)
      addNumericContent(divBudgetAmount, childCategories[i].amount)
      const divBudgetTransactionsAmount = createTableCell(budgetLine)
      addNumericContent(divBudgetTransactionsAmount, childCategories[i].transactions_amount)

      // Special because of calculation
      const amountLeft = Math.sign(childCategories[i].transactions_amount) === Math.sign(childCategories[i].amount) ? childCategories[i].transactions_amount - childCategories[i].amount : childCategories[i].transactions_amount + childCategories[i].amount;
      const divBudgetAmountLeft = createTableCell(budgetLine)
      addNumericContentWithColor(divBudgetAmountLeft, amountLeft)

      // Special because of button onClick event
      const divBudgetModifyButton = createTableCell(budgetLine)
      const modifyBudgetButton = addButton(divBudgetModifyButton, 'Modifier',childCategories[i].id)
      modifyBudgetButton.onclick = function(e) {
        editBudget(childCategories[i].id)
      }
    }
  }
}

/**
 * Get the information and load the modal to change the budget
 * @param {*} budgetId 
 */
function editBudget(budgetId) {
  const editMmodal = document.getElementById('edit-modal');
  const inputAmount = document.getElementById('input-account-amount')
  const btnCloseModal = document.getElementById('close-modal')
  const formEditBudget = document.getElementById('form-edit-budget')
  editMmodal.classList.remove('hidden');
  inputAmount.focus()
  // Buttons
  const saveBudgetHandler = function(event) {
    event.preventDefault();  
    formEditBudget.removeEventListener('submit', saveBudgetHandler);
    saveBudget(budgetId)
  };
  const closeModal = function(event) {
    event.preventDefault();  
    editMmodal.classList.add('hidden'); 
    formEditBudget.removeEventListener('submit', saveBudgetHandler);
  }
  formEditBudget.addEventListener('submit', saveBudgetHandler)
  btnCloseModal.addEventListener('click', closeModal)
}

/**
 * Save the budget
 * @param {*} budgetId 
 */
function saveBudget(budgetId) {
  const amount = document.getElementById('input-account-amount').value
  //const budgetMonthSelected = `${budgetMonth.value}-01`;
  const editMmodal = document.getElementById('edit-modal');
  editMmodal.classList.add('hidden');
  const jsonData = {}
  jsonData.amount = amount
  //jsonData.budgetmonth = budgetMonthSelected
  fetch('http://localhost:3000/api/budgets/' + budgetId, {
            method: 'POST',
            body: JSON.stringify({ data: jsonData }, null, 2),
            headers: {
              'Content-Type': 'application/json'
            }
        })
        .then(response => {
            if (!response.ok) {
              throw new Error('Network response was not ok');
            }
            return response.json()
            }
          )
        .catch(error => {
            console.error('Erreur lors de l\'envoi du JSON au serveur:', error);
        });
        const selectedDate = new Date(budgetMonth.value)
        const month = (selectedDate.getMonth() + 1).toString().padStart(2, '0');
        const fullYear = selectedDate.getFullYear();
        const formattedDate = `${fullYear}-${month}-01`;
        getBudgets(formattedDate)
}
  
/**
 * Get the budgets for a given date (month)
 * @param {*} dateFilter 
 */
function getBudgets(dateFilter) {
  const jsonCategories = {};

  // Get parent categories
  fetch('http://localhost:3000/api/budgets/categories/parents/', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  })
  .then(response => response.json())
  .then(parentCategories => {
    // Process each parent category
    const fetchPromises = parentCategories.map(parentCategory => {
      // Initialize the array for children categories
      jsonCategories[parentCategory.category] = [];

      // Get budget for each parent category
      return fetch(`http://localhost:3000/api/budgets/${dateFilter}/${parentCategory.ID}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      })
      .then(response => response.json())
      .then(data => {
        // Process each child category
        data.forEach(childCategory => {
          // Add the child category to the parent category in the JSON
          jsonCategories[parentCategory.category].push({
            'id': childCategory.ID, 
            'category': childCategory.category, 
            'transactions_amount': childCategory.transactions_amount, 
            'amount': childCategory.amount})
        });
      })
      .catch(error => {
        console.error('Erreur lors de la réception des budgets pour la catégorie parente:', error);
      });
    });

    // Wait for all promises to resolve
    Promise.all(fetchPromises)
      .then(() => {
        // Display the JSON containing all parent and child categories
        // Call displayBudgetTable with the JSON
        displayBudgetTable(jsonCategories);
      })
      .catch(error => {
        console.error('Erreur lors de la réception des catégories parentes :', error);
      });
  })
  .catch(error => {
    console.error('Erreur lors de la réception des catégories parentes :', error);
  });
}