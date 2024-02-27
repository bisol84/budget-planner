// Menu loading
document.addEventListener('DOMContentLoaded', function () {
    fetch('../html/menu.html')
        .then(response => response.text())
        .then(menuContent => {
            document.getElementById('menu').innerHTML = menuContent
            menuSetCurrentPage()
        })
        .catch(error => console.error('Error fetching menu:', error))
});

// Menu selected element
function menuSetCurrentPage() {

  const currentPageURL = window.location.pathname;
  const menuLinks = document.querySelectorAll('#menu a')

  menuLinks.forEach(menuLink => {
    if(menuLink.href.indexOf(currentPageURL) > -1) {
      menuLink.classList.add('bg-gray-700', 'text-white')
    }
  });

}