const eAccountName = document.getElementById('account-name');
const eAccountSold = document.getElementById('account-sold');
const eAccountDescription = document.getElementById('account-description');
const eAccountType = document.getElementById('account-type');

// Get the accounts
fetch('http://localhost:3000/accounts', {
    method: 'GET',
    headers: {
        'Content-Type': 'application/json'
    }
})
    .then(response => response.json())
    .then(data => {
        data.forEach(account => {
            const accountId = account.ID;
            const accountName = account.name
            const accountDescription = account.description
            const accountAmount = account.amount
            const accountType = account.type
            
            eAccountName.innerHTML = accountName
            eAccountSold.innerHTML = accountDescription
            eAccountDescription.innerHTML = accountAmount
            eAccountType.innerHTML = accountType
        });
    })
    .catch(error => {
        console.error('Erreur lors de la réception des comptes :', error);
    });


    // Display modal to add account
    function displayModal() {
      const modal = document.getElementById('modal')
      modal.style.display = "block";
    }