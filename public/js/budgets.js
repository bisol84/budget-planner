// Get the accounts
window.addEventListener('DOMContentLoaded', function() {
  fetch('http://localhost:3000/budgets/categories', {
    method: 'GET',
    headers: {
        'Content-Type': 'application/json'
    }
  })
    .then(response => response.json())
    .then(data => {
        data.forEach(category => {
          console.log(category)
          const categoryId = category.ID;
          const categoryName = category.category
          const categoryDescription = category.description
            
          const categoriesDiv = document.getElementById('budget-table');
          
          // Créer un nouvel élément tr
          const tr = document.createElement('tr');

          // Créer un nouvel élément td
          const td = document.createElement('td');
          td.classList.add('h-px', 'w-px', 'whitespace-nowrap');

          // Créer un nouvel élément div
          const div = document.createElement('div');
          div.classList.add('px-6', 'py-2');

          // Créer un nouvel élément span
          const span = document.createElement('span');
          span.classList.add('text-sm', 'text-gray-600', 'dark:text-gray-400');
          span.textContent = categoryName;

          // Ajouter le span au div
          div.appendChild(span);

          // Ajouter le div au td
          td.appendChild(div);

          // Ajouter le td au tr
          tr.appendChild(td);

          // Ajouter le tr au conteneur
          categoriesDiv.appendChild(tr);
        });
    })
    .catch(error => {
        console.error('Erreur lors de la réception des comptes :', error);
    })
})

// Add account
const addAccountBtn = document.getElementById('input-account-btn')

addAccountBtn.addEventListener('click', function() {  
  const accountName = document.getElementById('input-account-name').value
  const accountDescription = document.getElementById('input-account-description').value
  const accountAmount = document.getElementById('input-account-amount').value
  const accountType = document.getElementById('input-account-type').value

  const jsonData = {
    accountName: accountName,
    accountDescription: accountDescription,
    accountAmount: accountAmount,
    accountType: accountType
  }

  console.log(JSON.stringify({ data: jsonData }, null, 2));

  fetch('http://localhost:3000/accounts', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ data: jsonData })
  })
    .then(response => response.json())
    .then(data => {
      
    })
    .catch(error => {
      console.error('Une erreur s\'est produite:', error);
      })
})