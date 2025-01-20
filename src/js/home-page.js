// Functionality open/close of menu mobile
const buttonMenuMobile = document.getElementById('menu-mobile');
const divHeader = document.getElementById('header-principal-div');

let menuOpen = false;

function adjustMenu() {
    if (window.innerWidth > 860) {
        divHeader.style.display = 'flex';

        menuOpen = false;
    } else if (!menuOpen) {
        divHeader.style.display = 'none';
    }
}

adjustMenu();

buttonMenuMobile.addEventListener('click', () => {
    if (window.innerWidth <= 860) { 
        menuOpen = !menuOpen;
        divHeader.style.display = menuOpen ? 'flex' : 'none';
    }
});

window.addEventListener('resize', () => {
    adjustMenu();
});




