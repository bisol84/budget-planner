const transactionsList = document.querySelector('#transactions-list tbody');

// Get the transactions
fetch('http://localhost:3000/transactions', {
    method: 'GET',
    headers: {
        'Content-Type': 'application/json'
    }
})
    .then(response => response.json())
    .then(data => {
        data.forEach(transaction => {
            const transactionId = transaction.ID;
            const transactionDate = new Date(transaction.date)
            const formattedDate = transactionDate.toLocaleDateString("fr-CH");
            const transactionAmount = transaction.amount;
            const transactionImportCategory = transaction.import_category;
            const transactionSelectedCategory = transaction.category;
            const transactionDescription = transaction.description;
            const transactionAccount = transaction.name;

            // Create a new row for each transaction
            const row = document.createElement('tr');

            // Create and append cells for each column in the row
            const checkboxCell = document.createElement('td');
            const checkboxLabel = document.createElement('label');
            const checkboxInput = document.createElement('input');
            checkboxInput.type = 'checkbox';
            checkboxInput.classList.add('shrink-0', 'border-gray-300', 'rounded', 'text-blue-600', 'focus:ring-blue-500', 'disabled:opacity-50', 'disabled:pointer-events-none', 'dark:bg-slate-900', 'dark:border-gray-600', 'dark:checked:bg-blue-500', 'dark:checked:border-blue-500', 'dark:focus:ring-offset-gray-800');
            checkboxLabel.appendChild(checkboxInput);
            checkboxLabel.classList.add('flex');
            checkboxCell.appendChild(checkboxLabel);
            checkboxCell.classList.add('h-px', 'w-px', 'whitespace-nowrap', 'ps-6', 'py-3');
            row.appendChild(checkboxCell);

            const dateCell = document.createElement('td');
            dateCell.textContent = formattedDate;
            dateCell.classList.add('h-px', 'w-px', 'whitespace-nowrap', 'ps-6', 'py-3', 'text-xs', 'font-semibold', 'uppercase', 'tracking-wide', 'text-gray-800', 'dark:text-gray-200');
            row.appendChild(dateCell);

            const amountCell = document.createElement('td');
            amountCell.textContent = transactionAmount;
            amountCell.classList.add('h-px', 'w-px', 'whitespace-nowrap', 'px-6', 'py-3', 'text-xs', 'font-semibold', 'uppercase', 'tracking-wide', 'text-gray-800', 'dark:text-gray-200');
            row.appendChild(amountCell);

            const importCategoryCell = document.createElement('td');
            importCategoryCell.textContent = transactionImportCategory;
            importCategoryCell.classList.add('h-px', 'w-px', 'whitespace-nowrap', 'px-6', 'py-3', 'text-xs', 'font-semibold', 'uppercase', 'tracking-wide', 'text-gray-800', 'dark:text-gray-200');
            row.appendChild(importCategoryCell);

            if (transactionSelectedCategory != 'A classer') {
                const selectedCategoryCell = document.createElement('td');
                selectedCategoryCell.textContent = transactionSelectedCategory;
                selectedCategoryCell.classList.add('h-px', 'w-px', 'whitespace-nowrap', 'px-6', 'py-3', 'text-xs', 'font-semibold', 'uppercase', 'tracking-wide', 'text-gray-800', 'dark:text-gray-200');
                row.appendChild(selectedCategoryCell);
            } else {
                const selectedCategoryCell = document.createElement('td');
                const selectElement = document.createElement('select');
                selectElement.classList.add('selected-category', 'block', 'w-full', 'rounded-md', 'border-0', 'py-1.5', 'text-gray-900', 
                'shadow-sm', 'ring-1', 'ring-inset', 'ring-gray-300', 'focus:ring-2', 
                'focus:ring-inset', 'focus:ring-indigo-600', 'sm:max-w-xs', 'sm:text-sm', 
                'sm:leading-6');
                
                fetch('http://localhost:3000/budgets/categories', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })
                    .then(response => response.json())
                    .then(data => {
                        data.forEach(category => {    
                            const optionElement = document.createElement('option');
                            optionElement.value = category.ID;
                            optionElement.textContent = category.category;
                            selectElement.appendChild(optionElement);
                        });
                        selectedCategoryCell.appendChild(selectElement);
                        
                });     
                row.appendChild(selectedCategoryCell);
              }

            const descriptionCell = document.createElement('td');
            descriptionCell.textContent = transactionDescription;
            descriptionCell.classList.add('h-px', 'w-px', 'whitespace-nowrap', 'px-6', 'py-3', 'text-xs', 'font-semibold', 'uppercase', 'tracking-wide', 'text-gray-800', 'dark:text-gray-200');
            row.appendChild(descriptionCell);
            
            // Accounts
            if (transactionAccount) {
              const accountCell = document.createElement('td');
              accountCell.textContent = transactionAccount;
              accountCell.classList.add('h-px', 'w-px', 'whitespace-nowrap', 'px-6', 'py-3', 'text-xs', 'font-semibold', 'uppercase', 'tracking-wide', 'text-gray-800', 'dark:text-gray-200');
              row.appendChild(accountCell);
            } else {
              const accountCell = document.createElement('td');
              const selectElement = document.createElement('select');
              selectElement.classList.add('account', 'block', 'w-full', 'rounded-md', 'border-0', 'py-1.5', 'text-gray-900', 
              'shadow-sm', 'ring-1', 'ring-inset', 'ring-gray-300', 'focus:ring-2', 
              'focus:ring-inset', 'focus:ring-indigo-600', 'sm:max-w-xs', 'sm:text-sm', 
              'sm:leading-6');
              
              fetch('http://localhost:3000/accounts', {
                  method: 'GET',
                  headers: {
                      'Content-Type': 'application/json'
                  }
              })
                  .then(response => response.json())
                  .then(data => {
                      data.forEach(account => {    
                          const optionElement = document.createElement('option');
                          optionElement.value = account.ID;
                          optionElement.textContent = account.name;
                          selectElement.appendChild(optionElement);
                      });
                      accountCell.appendChild(selectElement);
                      
              });     
              row.appendChild(accountCell);
            }

            const saveCell = document.createElement('td');
            const saveButton = document.createElement('button');
            saveButton.textContent = 'Sauvegarder';
            saveButton.href = '#'; 
            saveButton.id = transactionId;
            saveButton.classList.add('inline-flex', 'items-center', 'gap-x-1', 'text-sm', 'text-blue-600', 'decoration-2', 'hover:underline', 'font-medium', 'dark:focus:outline-none', 'dark:focus:ring-1', 'dark:focus:ring-gray-600');
            saveCell.appendChild(saveButton);
            saveCell.classList.add('h-px', 'w-px', 'whitespace-nowrap', 'px-6', 'py-1.5');
            saveButton.onclick = function(e) {
              saveTransaction(e)
            }
            row.appendChild(saveCell);

            const deleteCell = document.createElement('td');
            const deleteButton = document.createElement('button');
            deleteButton.textContent = 'Supprimer';
            deleteButton.href = '#'; 
            deleteButton.id = transactionId;
            deleteButton.classList.add('inline-flex', 'items-center', 'gap-x-1', 'text-sm', 'text-blue-600', 'decoration-2', 'hover:underline', 'font-medium', 'dark:focus:outline-none', 'dark:focus:ring-1', 'dark:focus:ring-gray-600');
            deleteButton.onclick = function(e) {
                const buttonId = e.target.id;
                fetch('http://localhost:3000/transactions/' + buttonId, {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })
            }
            deleteCell.appendChild(deleteButton);
            deleteCell.classList.add('h-px', 'w-px', 'whitespace-nowrap', 'px-6', 'py-1.5');
            row.appendChild(deleteCell);

            // Append the new row to the transactions list
            transactionsList.appendChild(row);
        });
    })
    .catch(error => {
        console.error('Erreur lors de la réception des transactions :', error);
    });

// Save transactions category 
function saveTransaction(e) {
  const row = e.target.closest('tr');
  const transactionId = e.target.id;
  const selectCategory = row.querySelector('.selected-category');
  const selectAccount = row.querySelector('.account');
  const jsonData = {}
  if (selectCategory.value || selectAccount.value) {
    if (selectAccount.value) {
      jsonData.id_account = selectAccount.value;
    }
    if (selectCategory.value) {
      jsonData.id_category = selectCategory.value
    }
    fetch('http://localhost:3000/transactions/' + transactionId, {
            method: 'POST',
            body: JSON.stringify({ data: jsonData }, null, 2),
            headers: {
              'Content-Type': 'application/json'
            }
        })
        .then(response => response.json())
        .then(data => {
            document.getElementById('message').classList.remove('invisible')
            document.getElementById('message').innerHTML = data.message
        })
        .catch(error => {
            console.error('Erreur lors de l\'envoi du JSON au serveur:', error);
        });
  }
}