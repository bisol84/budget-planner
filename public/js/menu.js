document.addEventListener('DOMContentLoaded', function () {
    fetch('../html/menu.html')
        .then(response => response.text())
        .then(menuContent => {
            document.getElementById('menu').innerHTML = menuContent
        })
        .catch(error => console.error('Error fetching menu:', error))
});