// Create table line
export function createTableLine(table) {
    const tr = createElementWithClasses('tr', ['odd:bg-white', 'even:bg-gray-50', 'border-b']);
    table.appendChild(tr);
    return tr
  }
  
// Create an element with classes
export function createElementWithClasses(tagName, classNames) {
    const element = document.createElement(tagName);
    classNames.forEach(className => element.classList.add(className));
    return element;
}
  
// Create a new cell in budget table
export function createTableCell(budgetLine) {
  const td = createElementWithClasses('td', ['px-6', 'py-4']);
  //const div = createElementWithClasses('div', ['px-6', 'py-3'])
  //td.appendChild(div);
  budgetLine.appendChild(td);
  return td;
}

// Add text content to cell
export function addTextContent(div, value) {
  const span = createElementWithClasses('span', ['text-sm', 'text-gray-600', 'dark:text-gray-400']);
  span.textContent = value;
  div.appendChild(span);
  return span
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

// Add Tag to cell
export function addTag(div, color, value) {
  const span = createElementWithClasses('span', [`bg-${color}-100`, `text-${color}-800`, 'text-xs', 'font-medium', 'me-2', 'px-2.5', 'py-0.5', 'rounded']);
  span.textContent = value;
  div.appendChild(span);
  return span
}

// Add button to cell
export function addButton(div, textContent,categoryId) {
  const button = createElementWithClasses('button', ['inline-flex', 'items-center', 'gap-x-1', 'text-sm', 'text-gray-600', 'decoration-2', 'hover:underline', 'font-medium', 'dark:focus:outline-none', 'dark:focus:ring-1', 'dark:focus:ring-gray-600']);
  button.textContent = textContent;
  button.id = categoryId;
  div.appendChild(button);
  return button
}