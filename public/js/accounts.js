const accountsURL = 'http://localhost:3000/accounts'
const addAccountBtn = document.getElementById('input-account-btn')

// Display the accounts cards when page loads
window.addEventListener('DOMContentLoaded', function() {
  fetch(accountsURL, {
    method: 'GET',
    headers: {
        'Content-Type': 'application/json'
    }
  })
    .then(response => response.json())
    .then(data => renderAccountsCards(data))
    .catch(error => {
        console.error('Error when rendering accounts cards :', error);
    })
})

// Create the account card
function createAccountCard(account) {
  const accountCard = document.createElement('div');
  accountCard.innerHTML = `
  <div class="flex items-center relative p-4 w-full bg-white rounded-lg overflow-hidden shadow">
    <div class="w-12 h-12 rounded-full bg-gray-100"></div>
    <div class="ml-3">
      <p class="font-medium text-gray-800">${account.name}</p>
      <p class="text-sm text-gray-600">${account.description}</p>
      <p class="text-sm text-gray-600">${account.type}</p>
    </div>
    </div>
    `
    return accountCard
}

// Render all accounts cards
function renderAccountsCards(accounts) {
  const accountsDiv = document.getElementById('accounts')
  accounts.forEach(account => {
    const accountCard = createAccountCard(account)
    accountsDiv.appendChild(accountCard)
  })
}

// Add account
addAccountBtn.addEventListener('click', function() {  
  const jsonData = {
    accountName: document.getElementById('input-account-name').value,
    accountDescription: document.getElementById('input-account-description').value,
    accountAmount: document.getElementById('input-account-amount').value,
    accountType: document.getElementById('input-account-type').value
  }

  fetch(accountsURL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ data: jsonData })
  })
    .then(response => response.json())
    .then(data => {
      // Check the data
    })
    .catch(error => {
      console.error('Error when saving account:', error);
      })
})