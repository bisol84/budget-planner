// Create table line
export function createTableLine(table) {
    const tr = document.createElement('tr');
    table.appendChild(tr);
    return tr
  }
  
// Create an element with classes
function createElementWithClasses(tagName, classNames) {
    const element = document.createElement(tagName);
    classNames.forEach(className => element.classList.add(className));
    return element;
}
  
  // Create a new cell in budget table
  export function createTableCell(budgetLine) {
    const td = createElementWithClasses('td', ['h-px', 'w-px', 'whitespace-nowrap']);
    const div = createElementWithClasses('div', ['px-6', 'py-2'])
    td.appendChild(div);
    budgetLine.appendChild(td);
    return div;
  }
  
  // Add text content to cell
  export function addTextContent(div, value) {
    const span = createElementWithClasses('span', ['text-sm', 'text-gray-600', 'dark:text-gray-400']);
    span.textContent = value;
    div.appendChild(span);
  }
  
  // Add numeric content to cell
  export function addNumericContent(div, value) {
    const span = createElementWithClasses('span', ['text-sm', 'text-gray-600', 'dark:text-gray-400']);
    if (value == null) {
      span.textContent = '0.00'
    } else {
      const numericValue = parseFloat(value);
      span.textContent = numericValue.toFixed(2);
    }
    div.appendChild(span);
  }
  
  // Add numeric content with color balance to cell
  export function addNumericContentWithColor(div, value) {
    const span = createElementWithClasses('span', ['text-sm', 'text-gray-600', 'dark:text-gray-400']);
    if (value == null) {
      span.textContent = '0.00'
    } else {
      const numericValue = parseFloat(value);
      span.textContent = numericValue.toFixed(2);
    }
  
    if (value == 0) {
      span.classList.add('text-gray-600')
    } else if (value < 0) {
      span.classList.add('text-red-600')
      span.classList.remove('text-gray-600', 'dark:text-gray-400')
    } else {
      span.classList.add('text-green-600')
      span.classList.remove('text-gray-600', 'dark:text-gray-400')
    }
    div.appendChild(span);
  }
  
  // Add button to cell
  export function addButton(div, categoryId) {
    const button = createElementWithClasses('button', ['inline-flex', 'items-center', 'gap-x-1', 'text-sm', 'text-gray-600', 'decoration-2', 'hover:underline', 'font-medium', 'dark:focus:outline-none', 'dark:focus:ring-1', 'dark:focus:ring-gray-600']);
    button.textContent = 'Modifier';
    button.id = categoryId;
    button.onclick = function(e) {
      editBudget(categoryId)
    }
    div.appendChild(button);
    return button
  }