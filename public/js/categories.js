import { createTableLine, createTableCell, addTextContent, addTag, addIcon, addNumericContent, addNumericContentWithColor, addButton } from './utils/array.js';

// Display the categories, the amount and the transaction amount when page loads
window.addEventListener('DOMContentLoaded', function() {
  fetch('http://localhost:3000/categories', {
    method: 'GET',
    headers: {
        'Content-Type': 'application/json'
    }
  })
    .then(response => response.json())
    .then(data => displayCategoriesTable(data))
    .catch(error => {
        console.error('Erreur lors de la réception des catégories :', error);
    })
})

// Display budget table
function displayCategoriesTable(categories) {
  const categoriesTable = document.getElementById('categories-table');
  categories.forEach(category => {
    const categoryLine = createTableLine(categoriesTable)
    const divCategoryName = createTableCell(categoryLine)
    addTextContent(divCategoryName, category.category)

    const divCategoryColor = createTableCell(categoryLine)
    addTag(divCategoryColor, category.color, '')

    const divCategoryIcon = createTableCell(categoryLine)
    console.log(category.icon)
    addIcon(divCategoryIcon, category.icon)

    const divCategoryModifyButton = createTableCell(categoryLine)
    const modifyCategoryButton = addButton(divCategoryModifyButton, 'Modifier',category.ID)
    modifyCategoryButton.onclick = function(e) {
      editCategory(category.ID,  category.category, category.color)
    }
  })
}

// Modal to modify budget
function editCategory(categoryId, categoryName, categoryColor) {
  const editMmodal = document.getElementById('edit-modal');
  const btnSaveModal = document.getElementById('save-modal')
  const btnCloseModal = document.getElementById('close-modal')

  editMmodal.classList.remove('hidden');

  // Fill the fields with existing value
  document.getElementById('input-category-name').value = categoryName
  document.getElementById('input-category-color').value = categoryColor

  btnSaveModal.addEventListener('click', function (e) {
    e.preventDefault()
    saveCategory(categoryId)
  })
  btnCloseModal.addEventListener('click', function (e) {
    e.preventDefault()
    editMmodal.classList.add('hidden');
  })
}

// Save the budget
function saveCategory(categoryId) {
  const categoryName = document.getElementById('input-category-name').value
  const categoryColor = document.getElementById('input-category-color').value
  const editMmodal = document.getElementById('edit-modal');
  editMmodal.classList.add('hidden');
  const jsonData = {}
  jsonData.category = categoryName
  jsonData.color = categoryColor
  fetch('http://localhost:3000/categories/' + categoryId, {
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