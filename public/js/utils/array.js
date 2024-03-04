/**
 * Create table line
 * @param {*} table 
 * @returns 
 */
export function createTableLine(table) {
    const tr = createElementWithClasses('tr', ['odd:bg-white', 'even:bg-gray-50', 'border-b']);
    table.appendChild(tr);
    return tr
  }

/**
 * Create sub header table line
 * @param {*} table 
 * @returns 
 */
export function createTableSubHeaderLine(table) {
  const tr = createElementWithClasses('tr', ['bg-gray-200', 'rounded-md', 'px-3', 'py-2', 'font-bold']);
  table.appendChild(tr);
  return tr
}

/**
 * Create an element with classes
 * @param {*} tagName 
 * @param {*} classNames 
 * @returns 
 */
export function createElementWithClasses(tagName, classNames) {
    const element = document.createElement(tagName);
    classNames.forEach(className => element.classList.add(className));
    return element;
}
  
/**
 * Create a new cell in budget table
 * @param {*} budgetLine 
 * @returns 
 */
export function createTableCell(budgetLine) {
  const td = createElementWithClasses('td', ['px-3', 'py-2']);
  budgetLine.appendChild(td);
  return td;
}

/**
 * Add text content to cell
 * @param {*} div 
 * @param {*} value 
 * @returns 
 */
export function addTextContent(div, value) {
  const span = createElementWithClasses('span', ['text-sm', 'text-gray-600', 'dark:text-gray-400']);
  span.textContent = value;
  div.appendChild(span);
  return span
}
  
/**
 * Add numeric content to cell
 * @param {*} div 
 * @param {*} value 
 */
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
  
/**
 * Add numeric content with color balance to cell
 * @param {*} div 
 * @param {*} value 
 */
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

/**
 * Add Tag to cell
 * @param {*} div 
 * @param {*} color 
 * @param {*} value 
 * @returns 
 */
export function addTag(div, color, value) {
  const bgcolor = color
  const txtcolor = getTextColor(color)
  const span = createElementWithClasses('span', [`bg-[${bgcolor}]`, `text-[${txtcolor}]`, 'text-xs', 'font-medium', 'me-2', 'px-2.5', 'py-0.5', 'rounded']);
  span.textContent = value;
  div.appendChild(span);
  return span
}

/**
 * Add icon to cell
 * @param {*} div 
 * @param {*} icons 
 */
export function addIcon(div, icons) {
  const i = document.createElement('i');
  if (icons) {
    const iconSplit = icons.split(' ')
    iconSplit.forEach(icon => {
      i.classList.add(''+ icon + '')
    })
  }
  div.appendChild(i);
}

/**
 * Add button to cell
 * @param {*} div 
 * @param {*} textContent 
 * @param {*} categoryId 
 * @returns 
 */
export function addButton(div, textContent,categoryId) {
  const button = createElementWithClasses('button', ['inline-flex', 'items-center', 'gap-x-1', 'text-sm', 'text-gray-600', 'decoration-2', 'hover:underline', 'font-medium', 'dark:focus:outline-none', 'dark:focus:ring-1', 'dark:focus:ring-gray-600']);
  button.textContent = textContent;
  button.id = categoryId;
  div.appendChild(button);
  return button
}

/**
 * If color is dark, text color must be white
 * @param {*} hexColor 
 * @returns 
 */
function getTextColor(hexColor) {
  if (hexColor) {
    const decimalColor = parseInt(hexColor.replace(/^#/, ''), 16);

    const r = (decimalColor >> 16) & 255;
    const g = (decimalColor >> 8) & 255;
    const b = decimalColor & 255;

    const brightness = Math.sqrt(
        0.299 * (r ** 2) + 0.587 * (g ** 2) + 0.114 * (b ** 2)
    );

    //if (brightness < 127.5) {
    if (brightness < 190.5) {
      return '#ffffff'
    } else {
      return '#000000'
    }
  } else {
    return '#000000'
  }
}