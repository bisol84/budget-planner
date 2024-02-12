// Create a budget line
function createBudgetTableLine(budgetTable) {
  const tr = document.createElement('tr');
  budgetTable.appendChild(tr);
  return tr
}

// Create an element with classes
function createElementWithClasses(tagName, classNames) {
  const element = document.createElement(tagName);
  classNames.forEach(className => element.classList.add(className));
  return element;
}

// Create a new cell in budget table
function createTableCell(budgetLine) {
  const td = createElementWithClasses('td', ['h-px', 'w-px', 'whitespace-nowrap']);
  const div = createElementWithClasses('div', ['px-6', 'py-2'])
  td.appendChild(div);
  budgetLine.appendChild(td);
  return div;
}

// Add text content to cell
function addTextContent(div, value) {
  const span = createElementWithClasses('span', ['text-sm', 'text-gray-600', 'dark:text-gray-400']);
  span.textContent = value;
  div.appendChild(span);
}

// Add numeric content to cell
function addNumericContent(div, value) {
  const span = createElementWithClasses('span', ['text-sm', 'text-gray-600', 'dark:text-gray-400']);
  if (value == null) {
    span.textContent = '0.00'
  } else {
    const numericValue = parseFloat(value);
    span.textContent = numericValue.toFixed(2);
  }
  div.appendChild(span);
}

// Add numeric content with color balance to cell
function addNumericContentWithColor(div, value) {
  const span = createElementWithClasses('span', ['text-sm', 'text-gray-600', 'dark:text-gray-400']);
  if (value == null) {
    span.textContent = '0.00'
  } else {
    const numericValue = parseFloat(value);
    span.textContent = numericValue.toFixed(2);
  }

  if (value == 0) {
    span.classList.add('text-gray-600')
  } else if (value < 0) {
    span.classList.add('text-red-600')
    span.classList.remove('text-gray-600', 'dark:text-gray-400')
  } else {
    span.classList.add('text-green-600')
    span.classList.remove('text-gray-600', 'dark:text-gray-400')
  }
  div.appendChild(span);
}

// Add button to cell
function addModifyButton(div, categoryId) {
  const button = createElementWithClasses('button', ['inline-flex', 'items-center', 'gap-x-1', 'text-sm', 'text-blue-600', 'decoration-2', 'hover:underline', 'font-medium', 'dark:focus:outline-none', 'dark:focus:ring-1', 'dark:focus:ring-gray-600']);
  button.textContent = 'Modifier';
  button.id = categoryId;
  button.onclick = function(e) {
    editBudget(categoryId)
  }
  div.appendChild(button);
}

// Display budget table
function displayBudgetTable(budgets) {
  const budgetTable = document.getElementById('budget-table');
  budgets.forEach(budget => {
    const budgetLine = createBudgetTableLine(budgetTable)
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
    const divBudgetSaveButton = createTableCell(budgetLine)
    addModifyButton(divBudgetSaveButton, budget.ID)
  })
}

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

// Modal to modify budget
function editBudget(categoryId) {
  const editMmodal = document.getElementById('edit_modal');
  editMmodal.classList.remove('hidden');
  const btnCloseModal = document.getElementById('close-modal')
  btnCloseModal.addEventListener('click', function (e) {
    e.preventDefault()
    saveBudget(categoryId)
  })
}

function saveBudget(categoryId) {
  const amount = document.getElementById('input-account-amount').value
  const editMmodal = document.getElementById('edit_modal');
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