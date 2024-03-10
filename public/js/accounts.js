const accountsURL = '/api/accounts'
const addAccountForm = document.getElementById('add-account-form')

// Display the accounts cards when page loads
window.addEventListener('DOMContentLoaded', function() {
  getAccountsCards()
})

/**
 * Create and return an account card
 * @param {*} account 
 * @returns 
 */
function createAccountCard(account) {
  const accountCard = document.createElement('div');
  accountCard.innerHTML = `
  <div class="box-small">
    <div class="box-content">
      <p class="text-title">${account.name}</p>
      <p>${account.description}</p>
      <p>${account.type}</p>
    </div>
  </div>
    `
    return accountCard
}

/**
 * Render all accounts cards
 * @param {*} accounts 
 */
function renderAccountsCards(accounts) {
  const accountsDiv = document.getElementById('accounts')
  accounts.forEach(account => {
    const accountCard = createAccountCard(account)
    accountsDiv.appendChild(accountCard)
  })
}

/**
 * Empty the table get the accounts cards
 */
function getAccountsCards() {
  const accountsDiv = document.getElementById('accounts')
  accountsDiv.innerHTML = ''
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
}

// Add a new account
addAccountForm.addEventListener('submit', function(e) {  
  e.preventDefault()
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
      getAccountsCards()
    })
    .catch(error => {
      console.error('Error when saving account:', error);
      })
})