import { createTableLine, createTableCell, createElementWithClasses, addTextContent, addTag, addNumericContent, addNumericContentWithColor, addButton } from './utils/array.js';

const transactionsList = document.querySelector('#transactions-list tbody');
const uploadChooseFile = document.getElementById('file-input')

  // Display transaction table
  function displayTransactionTable(transactions) {
    const transactionTable = document.getElementById('transaction-table');
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
        deleteTransaction(e)
      }
    })
  }

// Get the transactions
fetch('http://localhost:3000/transactions', {
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

// Edit transaction
function editTransaction(e) {
  const editMmodal = document.getElementById('edit-modal');
  const btnSaveModal = document.getElementById('save-modal')
  const btnCloseModal = document.getElementById('close-modal')
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
  btnSaveModal.addEventListener('click', function (e) {
    e.preventDefault()
    saveTransaction(transactionId)
  })
  btnCloseModal.addEventListener('click', function (e) {
    e.preventDefault()
    editMmodal.classList.add('hidden');
  })
}


// Save transactions category 
function saveTransaction(transactionId) {
  //const selectAccount = document.getElementById('')
  const selectCategoryList = document.getElementById('select-category-list')
  const selectedCategory = selectCategoryList.value
  const selectAccountList = document.getElementById('select-account-list')
  const selectedAccount = selectAccountList.value

  const jsonData = {}
  if (selectedCategory || selectedAccount) {
    if (selectedCategory) {
      jsonData.id_category = selectedCategory;
    }
    if (selectedAccount) {
      jsonData.id_account = selectedAccount
    }
    fetch('http://localhost:3000/transactions/' + transactionId, {
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
}

// Delete a transaction
function deleteTransaction(e) {
  const buttonId = e.target.id;
  fetch('http://localhost:3000/transactions/' + buttonId, {
      method: 'DELETE',
      headers: {
          'Content-Type': 'application/json'
      }
  })
}

// Get all the categories
function getCategories() {
  return fetch('http://localhost:3000/budgets/categories', {
      method: 'GET',
      headers: {
          'Content-Type': 'application/json'
      }
  })
      .then(response => response.json())
}

// Get all the accounts
function getAccounts() {
  return fetch('http://localhost:3000/accounts', {
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