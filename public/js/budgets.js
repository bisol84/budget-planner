// Get the budgets categories, budgets and transaction statuts
window.addEventListener('DOMContentLoaded', function() {
  fetch('http://localhost:3000/budgets/', {
    method: 'GET',
    headers: {
        'Content-Type': 'application/json'
    }
  })
    .then(response => response.json())
    .then(data => {
        data.forEach(budget => {
          const categoryId = budget.ID
          const budgetCategory = budget.category;
          const budgetAmount = budget.amount
          const budgetPeriod = budget.period
          const budgetTransactions = budget.transactions
            
          const budgetTable = document.getElementById('budget-table');
          
          // Créer un nouvel élément tr
          const tr = document.createElement('tr');

          // Créer un nouvel élément td
          const tdCategory = document.createElement('td');
          tdCategory.classList.add('h-px', 'w-px', 'whitespace-nowrap');

          // Créer un nouvel élément div
          const divCategory = document.createElement('div');
          divCategory.classList.add('px-6', 'py-2');

          // Créer un nouvel élément span
          const spanCategory = document.createElement('span');
          spanCategory.classList.add('text-sm', 'text-gray-600', 'dark:text-gray-400');
          spanCategory.textContent = budgetCategory;

          // Ajouter le span au div
          divCategory.appendChild(spanCategory);

          // Ajouter le div au td
          tdCategory.appendChild(divCategory);

          // Ajouter le td au tr
          tr.appendChild(tdCategory);

          // Ajouter le tr au conteneur
          budgetTable.appendChild(tr);

          // Créer un nouvel élément td
          const tdBudget = document.createElement('td');
          tdBudget.classList.add('h-px', 'w-px', 'whitespace-nowrap');

          // Créer un nouvel élément div
          const divBudget = document.createElement('div');
          divBudget.classList.add('px-6', 'py-2');

          // Créer un nouvel élément span
          const spanBudget = document.createElement('span');
          spanBudget.classList.add('text-sm', 'text-gray-600', 'dark:text-gray-400');
          spanBudget.textContent = budgetAmount;

          // Ajouter le span au div
          divBudget.appendChild(spanBudget);

          // Ajouter le div au td
          tdBudget.appendChild(divBudget);

          // Ajouter le td au tr
          tr.appendChild(tdBudget);

          // Ajouter le tr au conteneur
          budgetTable.appendChild(tr);

          // Créer un nouvel élément td
          const tdTransactions = document.createElement('td');
          tdTransactions.classList.add('h-px', 'w-px', 'whitespace-nowrap');

          // Créer un nouvel élément div
          const divTransactions = document.createElement('div');
          divTransactions.classList.add('px-6', 'py-2');

          // Créer un nouvel élément span
          const spanTransactions = document.createElement('span');
          spanTransactions.classList.add('text-sm', 'text-gray-600', 'dark:text-gray-400');
          spanTransactions.textContent = 'te';

          // Ajouter le span au div
          divTransactions.appendChild(spanTransactions);

          // Ajouter le div au td
          tdTransactions.appendChild(divTransactions);

          // Ajouter le td au tr
          tr.appendChild(tdTransactions);

          // Ajouter le tr au conteneur
          budgetTable.appendChild(tr);

          const editCell = document.createElement('td');
          const editButton = document.createElement('button');
          editButton.textContent = 'Modifier';
          editButton.href = '#'; 
          editButton.id = categoryId;
          editButton.classList.add('inline-flex', 'items-center', 'gap-x-1', 'text-sm', 'text-blue-600', 'decoration-2', 'hover:underline', 'font-medium', 'dark:focus:outline-none', 'dark:focus:ring-1', 'dark:focus:ring-gray-600');
          editCell.appendChild(editButton);
          editCell.classList.add('h-px', 'w-px', 'whitespace-nowrap', 'px-6', 'py-1.5');
          editButton.onclick = function(e) {
            editBudget(categoryId)
          }
          tr.appendChild(editCell);
        });
    })
    .catch(error => {
        console.error('Erreur lors de la réception des budgets :', error);
    })
})

// Add account
const addAccountBtn = document.getElementById('input-account-btn')

if (addAccountBtn) {
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
}

// Modal to modify budget
function editBudget(categoryId) {
  const editMmodal = document.getElementById('edit_modal');
  editMmodal.classList.remove('hidden');
  const btnCloseModal = document.getElementById('close-modal')
  btnCloseModal.addEventListener('click', function () {
    saveBudget(categoryId)
  })
}

function saveBudget(categoryId) {
  const amount = document.getElementById('input-account-amount').value
  console.log(amount)
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
        .then(data => {
  
        })
        .catch(error => {
            console.error('Erreur lors de l\'envoi du JSON au serveur:', error);
        });
}