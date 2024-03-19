// Menu loading
document.addEventListener('DOMContentLoaded', function () {
    fetch('/menu.html')
        .then(response => response.text())
        .then(menuContent => {
            document.getElementById('menu').innerHTML = menuContent
            menuSetCurrentPage()
            const paramButton = document.querySelector('.menu button')
            paramButton.addEventListener('click', manageParamsMenu)
        })
        .catch(error => console.error('Error fetching menu:', error))
});

/**
 * Set the classes for the current page
 */
function menuSetCurrentPage() {

  const currentPageURL = window.location.pathname;
  const menuLinks = document.querySelectorAll('.menu a')

  menuLinks.forEach(menuLink => {
    if(menuLink.href.indexOf(currentPageURL) > -1) {
      menuLink.classList.add('menu-selected')
    }
  });

}

/**
 * Display parameters sub-menu
 */
function manageParamsMenu() {
  const paramsSubMenu = document.querySelector('#submenu')
  if (paramsSubMenu.style.display == 'none') {
    paramsSubMenu.style.display = 'block'
  } else {
    paramsSubMenu.style.display = 'none'
  }
}