import { createTableLine, createTableCell, addTextContent, addTag, addIcon, addNumericContent, addNumericContentWithColor, addButton } from './utils/array.js';

// Display the categories, the amount and the transaction amount when page loads
window.addEventListener('DOMContentLoaded', function() {
  getCategories()
})

/**
 * Display budget table
 * @param {*} categories 
 */
function displayCategoriesTable(categories) {
  const categoriesTable = document.getElementById('categories-table-content');
  categoriesTable.innerHTML = ''
  categories.forEach(category => {
    const categoryLine = createTableLine(categoriesTable)
    const divCategoryName = createTableCell(categoryLine)
    addTextContent(divCategoryName, category.category)

    const divCategoryColor = createTableCell(categoryLine)
    addTag(divCategoryColor, category.color, '')

    const divCategoryIcon = createTableCell(categoryLine)
    addIcon(divCategoryIcon, category.icon)

    const divCategoryModifyButton = createTableCell(categoryLine)
    const modifyCategoryButton = addButton(divCategoryModifyButton, 'Modifier',category.ID)
    modifyCategoryButton.onclick = function() {
      editCategory(category.ID,  category.category, category.color)
    }
  })
}

/**
 * Get the categories and display table
 */
function getCategories() {
  fetch('http://localhost:3000/api/categories', {
    method: 'GET',
    headers: {
        'Content-Type': 'application/json'
    }
  })
    .then(response => response.json())
    .then(data => {
        displayCategoriesTable(data)
    })
    .catch(error => {
        console.error('Erreur lors de la réception des catégories :', error);
    })
  }


/**
 * Modal to modify budget
 * @param {*} categoryId 
 * @param {*} categoryName 
 * @param {*} categoryColor 
 */
function editCategory(categoryId, categoryName, categoryColor) {
  console.log(`edit : ${categoryId}`)
  const editMmodal = document.getElementById('edit-modal');
  const btnSaveModal = document.getElementById('save-modal')
  const btnCloseModal = document.getElementById('close-modal')
  const formEditCategory = document.getElementById('form-edit-category')

  editMmodal.classList.remove('hidden');

  // Fill the fields with existing value
  document.getElementById('input-category-name').value = categoryName
  document.getElementById('input-category-color').value = categoryColor

  const saveCategoryHandler = function(event) {
    event.preventDefault();  
    saveCategory(categoryId);
    formEditCategory.removeEventListener('submit', saveCategoryHandler);
  };
  const closeModal = function(event) {
    event.preventDefault();  
    editMmodal.classList.add('hidden'); 
    formEditCategory.removeEventListener('submit', saveCategoryHandler);
  }
  formEditCategory.addEventListener('submit', saveCategoryHandler); //TODO : mettre hors de fonction qui se répète pour éviter les modifications en boucle
  btnCloseModal.addEventListener('click', closeModal)
}

/**
 * Save the category
 * @param {*} categoryId 
 */
 function saveCategory(categoryId) {
  const categoryName = document.getElementById('input-category-name').value
  const categoryColor = document.getElementById('input-category-color').value
  const editMmodal = document.getElementById('edit-modal');
  editMmodal.classList.add('hidden');
  const jsonData = {}
  jsonData.category = categoryName
  jsonData.color = categoryColor
  fetch('http://localhost:3000/api/categories/' + categoryId, {
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
    getCategories()
}