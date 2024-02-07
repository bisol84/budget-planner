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
            const transactionDate = transaction.date;
            const transactionAmount = transaction.amount;
            const transactionCategory = transaction.category;
            const transactionDescription = transaction.description;
            const transactionCompte = transaction.compte;

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
            dateCell.textContent = transactionDate;
            dateCell.classList.add('h-px', 'w-px', 'whitespace-nowrap', 'ps-6', 'py-3', 'text-xs', 'font-semibold', 'uppercase', 'tracking-wide', 'text-gray-800', 'dark:text-gray-200');
            row.appendChild(dateCell);

            const amountCell = document.createElement('td');
            amountCell.textContent = transactionAmount;
            amountCell.classList.add('h-px', 'w-px', 'whitespace-nowrap', 'px-6', 'py-3', 'text-xs', 'font-semibold', 'uppercase', 'tracking-wide', 'text-gray-800', 'dark:text-gray-200');
            row.appendChild(amountCell);

            const categoryCell = document.createElement('td');
            categoryCell.textContent = transactionCategory;
            categoryCell.classList.add('h-px', 'w-px', 'whitespace-nowrap', 'px-6', 'py-3', 'text-xs', 'font-semibold', 'uppercase', 'tracking-wide', 'text-gray-800', 'dark:text-gray-200');
            row.appendChild(categoryCell);

            const descriptionCell = document.createElement('td');
            descriptionCell.textContent = transactionDescription;
            descriptionCell.classList.add('h-px', 'w-px', 'whitespace-nowrap', 'px-6', 'py-3', 'text-xs', 'font-semibold', 'uppercase', 'tracking-wide', 'text-gray-800', 'dark:text-gray-200');
            row.appendChild(descriptionCell);

            const compteCell = document.createElement('td');
            compteCell.textContent = transactionCompte;
            compteCell.classList.add('h-px', 'w-px', 'whitespace-nowrap', 'px-6', 'py-3', 'text-xs', 'font-semibold', 'uppercase', 'tracking-wide', 'text-gray-800', 'dark:text-gray-200');
            row.appendChild(compteCell);

            const editCell = document.createElement('td');
            const editLink = document.createElement('a');
            editLink.textContent = 'Edit';
            editLink.href = '#'; // Placeholder link
            editLink.classList.add('inline-flex', 'items-center', 'gap-x-1', 'text-sm', 'text-blue-600', 'decoration-2', 'hover:underline', 'font-medium', 'dark:focus:outline-none', 'dark:focus:ring-1', 'dark:focus:ring-gray-600');
            editCell.appendChild(editLink);
            editCell.classList.add('h-px', 'w-px', 'whitespace-nowrap', 'px-6', 'py-1.5');
            row.appendChild(editCell);

            const deleteCell = document.createElement('td');
            const deleteLink = document.createElement('a');
            deleteLink.textContent = 'Delete';
            deleteLink.href = '#'; // Placeholder link
            deleteLink.classList.add('inline-flex', 'items-center', 'gap-x-1', 'text-sm', 'text-blue-600', 'decoration-2', 'hover:underline', 'font-medium', 'dark:focus:outline-none', 'dark:focus:ring-1', 'dark:focus:ring-gray-600');
            deleteCell.appendChild(deleteLink);
            deleteCell.classList.add('h-px', 'w-px', 'whitespace-nowrap', 'px-6', 'py-1.5');
            row.appendChild(deleteCell);

            // Append the new row to the transactions list
            transactionsList.appendChild(row);
        });
    })
    .catch(error => {
        console.error('Erreur lors de la réception des transactions :', error);
    });
