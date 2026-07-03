// Toggle logic for mobile hamburger menu
const menuButton = document.getElementById('menuButton');
const navMenu = document.getElementById('navMenu');

menuButton.addEventListener('click', () => {
    navMenu.classList.toggle('open');
    // Switch between hamburger icon (☰) and close icon (✕)
    if (navMenu.classList.contains('open')) {
        menuButton.innerHTML = '&#10006;';
    } else {
        menuButton.innerHTML = '&#9776;';
    }
});