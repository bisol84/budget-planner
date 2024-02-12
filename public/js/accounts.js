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
  accountCard.innerHTML = `<div class="w-full h-full bg-white shadow-lg rounded-lg p-5 dark:bg-slate-900">
    <div class="flex items-center gap-x-4 mb-3">
      <div class="inline-flex justify-center items-center w-[62px] h-[62px] rounded-full border-4 border-blue-50 bg-blue-100 dark:border-blue-900 dark:bg-blue-800">
        <svg class="flex-shrink-0 w-6 h-6 text-blue-600 dark:text-blue-400" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="13.5" cy="6.5" r=".5"/><circle cx="17.5" cy="10.5" r=".5"/><circle cx="8.5" cy="7.5" r=".5"/><circle cx="6.5" cy="12.5" r=".5"/><path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 0 1 1.668-1.668h1.996c3.051 0 5.555-2.503 5.555-5.554C21.965 6.012 17.461 2 12 2z"/></svg>
      </div>
      <div class="flex-shrink-0">
        <h3 class="block text-lg font-semibold text-gray-800 dark:text-white" id="account-name">${account.name}</h3>
      </div>
    </div>
    <p class="text-gray-600 dark:text-gray-400">Montant : <span class="text-green-600" id="account-amount">${account.amount}</span></p>
    <p class="text-gray-600 dark:text-gray-400" id="account-description">${account.description}</p>
    <p class="text-gray-600 dark:text-gray-400" id="account-type">${account.type}</p>
    </div>`
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