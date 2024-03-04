import { createTableLine, createTableCell, addTextContent, addTag, addIcon, addNumericContent, addNumericContentWithColor, addButton } from './utils/array.js';

  const uploadChooseFile = document.getElementById('file-input')

  // Display the budgets categories, the amount and the transaction amount when page loads
window.addEventListener('DOMContentLoaded', function() {
  getTop5()
  getTransactions()
})

  // Display transaction table
  function displayTransactionTable(transactions) {
    const transactionTable = document.getElementById('transaction-table-content');
    transactionTable.innerHTML = ''
    transactions.forEach(transaction => {
      const transactionLine = createTableLine(transactionTable)
      const divTransactionDate = createTableCell(transactionLine)
      const transactionDate = new Date(transaction.date)
      const formattedDate = transactionDate.toLocaleDateString("fr-CH");
      addTextContent(divTransactionDate, formattedDate)
      const divTransactionAmount = createTableCell(transactionLine)
      addNumericContent(divTransactionAmount, transaction.amount)
      const divTransactionImportCategory = createTableCell(transactionLine)
      addTextContent(divTransactionImportCategory, transaction.import_category)
      const divTransactionSelectedCategory = createTableCell(transactionLine)
      const cellTransactionSelectedCategory = addTag(divTransactionSelectedCategory, transaction.color, transaction.category)
      cellTransactionSelectedCategory.classList.add('selected-category')
      //addTextContent(divTransactionSelectedCategory, transaction.category)
      const divTransactionDescription = createTableCell(transactionLine)
      addTextContent(divTransactionDescription, transaction.description)
      const divTransactionAccount = createTableCell(transactionLine)
      const cellTransactionAccount = addTextContent(divTransactionAccount, transaction.name)
      cellTransactionAccount.classList.add('account')

      // Special because of button onClick event
      const divtransactionModifyButton = createTableCell(transactionLine)
      const modifyTransactionButton = addButton(divtransactionModifyButton, 'Modifier',transaction.ID)
      modifyTransactionButton.onclick = function(e) {
        editTransaction(e)
      }
      // Special because of button onClick event
      const divtransactionDeleteButton = createTableCell(transactionLine)
      const deleteTransactionButton = addButton(divtransactionDeleteButton, 'Supprimer',transaction.ID)
      deleteTransactionButton.onclick = function(e) {
        e.preventDefault()
        deleteTransaction(e.target.id)
        hideTransaction(transactionLine)
      }
    })
  }

// Hide transaction in table
function hideTransaction(targetLine) {
  targetLine.remove()
}

// Display top 5 transactions
function displayTop5(data) {
  //const numericValue = parseFloat(value);
  //span.textContent = numericValue.toFixed(2);
  const top5div = document.getElementById('top-transactions')
  top5div.innerHTML = ''
  data.forEach(topCategory => {
    top5div.innerHTML += `
    <div class="flex items-center relative p-4 w-full bg-white rounded-lg overflow-hidden shadow">
      <div class="w-12 h-12 rounded-full bg-[${topCategory.color}] flex items-center justify-center"><i class="${topCategory.icon} fa-lg"></i></div>
      <div class="ml-3">
        <p class="font-medium text-gray-800">${topCategory.category}</p>
        <p class="text-sm text-gray-600">${(topCategory.total_transactions.toFixed(2))} CHF</p>
      </div>
      </div>
      `
  })
}

function getTop5() {
// Get the top5
fetch('http://localhost:3000/api/transactions/top5', {
  method: 'GET',
  headers: {
      'Content-Type': 'application/json'
  }
})
  .then(response => response.json())
  .then(data => displayTop5(data))
  .catch(error => {
      console.error('Erreur lors de la réception des transactions :', error);
  });
}

// Get the transactions
function getTransactions() {
  fetch('http://localhost:3000/api/transactions', {
      method: 'GET',
      headers: {
          'Content-Type': 'application/json'
      }
  })
      .then(response => response.json())
      .then(data => displayTransactionTable(data))
      .catch(error => {
          console.error('Erreur lors de la réception des transactions :', error);
      });
  }

// Edit transaction
function editTransaction(e) {
  const editMmodal = document.getElementById('edit-modal');
  const btnCloseModal = document.getElementById('close-modal')
  const formEditTransaction = document.getElementById('form-edit-transaction')
  const divSelectCategory = document.getElementById('input-transaction-category')
  const divSelectAccount = document.getElementById('input-transaction-account')
  const row = e.target.closest('tr');
  const transactionId = e.target.id;
  const selectedCategory = row.querySelector('.selected-category').innerHTML;
  const selectedAccount = row.querySelector('.account').innerHTML;
  const selectCategoryList = document.getElementById('select-category-list')
  const selectAccountList = document.getElementById('select-account-list')

  // Display modal
  editMmodal.classList.remove('hidden');

  // Fills the categories select list
  if (selectCategoryList != null) {
    selectCategoryList.remove()
    selectAccountList.remove()
  }
  const selectCategory = document.createElement('select');
  selectCategory.classList.add('bg-gray-50', 'border', 'border-gray-300', 'text-gray-900', 'text-sm', 'rounded-lg', 'focus:ring-blue-500', 'focus:border-blue-500', 'block', 'p-1.5');
  selectCategory.id = 'select-category-list'
  divSelectCategory.appendChild(selectCategory);

  getCategories().then(categories => {
    categories.forEach(category => {
      const optionElement = document.createElement('option');
      optionElement.value = category.ID;
      optionElement.textContent = category.category;
      if (category.category == selectedCategory) {
        optionElement.setAttribute('selected', 'selected')
      }
      selectCategory.appendChild(optionElement);
    })
  })

  // Fills the accounts select list
  const selectAccount = document.createElement('select');
  selectAccount.classList.add('bg-gray-50', 'border', 'border-gray-300', 'text-gray-900', 'text-sm', 'rounded-lg', 'focus:ring-blue-500', 'focus:border-blue-500', 'block', 'p-1.5');
  selectAccount.id = 'select-account-list'
  divSelectAccount.appendChild(selectAccount);
  getAccounts().then(accounts => {
    accounts.forEach(account => {
      const optionElement = document.createElement('option');
      optionElement.value = account.ID;
      optionElement.textContent = account.name;
      if (account.name == selectedAccount) {
        optionElement.setAttribute('selected', 'selected')
      }
      selectAccount.appendChild(optionElement);
    })
  })

  // Buttons
  const saveTransactionHandler = function(event) {
    event.preventDefault();  
    formEditTransaction.removeEventListener('submit', saveTransactionHandler);
    saveTransaction(transactionId)
  };
  const closeModal = function(event) {
    event.preventDefault();  
    editMmodal.classList.add('hidden'); 
    formEditTransaction.removeEventListener('submit', saveTransactionHandler);
  }
  formEditTransaction.addEventListener('submit', saveTransactionHandler)
  btnCloseModal.addEventListener('click', closeModal)
}

// Save transactions category 
function saveTransaction(transactionId) {
  //const selectAccount = document.getElementById('')
  const editMmodal = document.getElementById('edit-modal');
  editMmodal.classList.add('hidden');
  const selectCategoryList = document.getElementById('select-category-list')
  const selectedCategory = selectCategoryList.value
  const selectAccountList = document.getElementById('select-account-list')
  const selectedAccount = selectAccountList.value
  const transactionTypeArray = document.querySelectorAll('input[name="transaction-type"]:checked');
  const transactionType = transactionTypeArray[0].nextElementSibling.innerText

  const jsonData = {}
  if (selectedCategory || selectedAccount) {
    if (selectedCategory) {
      jsonData.id_category = selectedCategory;
    }
    if (selectedAccount) {
      jsonData.id_account = selectedAccount
    }
    jsonData.transaction_type = transactionType
    fetch('http://localhost:3000/api/transactions/' + transactionId, {
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

  // Update the transactions table + top 5
  getTransactions()
  getTop5()
}

// Delete a transaction
function deleteTransaction(buttonId) {
  fetch('http://localhost:3000/api/transactions/' + buttonId, {
      method: 'DELETE',
      headers: {
          'Content-Type': 'application/json'
      }
  })

  // Update the transactions table
  //getTransactions()
  getTop5()
}

// Get all the categories
function getCategories() {
  return fetch('http://localhost:3000/api/categories', {
      method: 'GET',
      headers: {
          'Content-Type': 'application/json'
      }
  })
      .then(response => response.json())
}

// Get all the accounts
function getAccounts() {
  return fetch('http://localhost:3000/api/accounts', {
      method: 'GET',
      headers: {
          'Content-Type': 'application/json'
      }
  })
      .then(response => response.json())
}

// Write filename when changing upload file
uploadChooseFile.addEventListener('change', function(e) {
  const fileName = e.target.files[0].name
  document.getElementById('file-input-name').textContent = fileName
})