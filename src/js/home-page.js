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

// Validate the CPF/NIS query feature
const consultInputs = document.getElementsByClassName('consult-inputs');
const consultButton = document.getElementById('consult-button');
const consultInputBenefit = document.getElementById('consult-input-benefit');
const errorText = document.getElementById('consult-input-error');

for (let i = 0; i < consultInputs.length; i++) {
    consultInputs[i].addEventListener('change', () => {
        if (i === 0) {
            consultInputBenefit.setAttribute('placeholder', 'Digite seu CPF');
        }

        if (i === 1) {
            consultInputBenefit.setAttribute('placeholder', 'Digite seu NIS');
        }
    });
}

consultButton.addEventListener("click", (e) => {
    const cpfPattern = /^\d{11}$/;
    const nisPattern = /^\d{11}$/;

    const cpfInput = consultInputs[0].checked;
    const nisInput = consultInputs[1].checked;
    const inputValue = consultInputBenefit.value.replace(/\D/g, "");

    if (cpfInput) {
        if (cpfPattern.test(inputValue)) {
            let cpfSum = 0;
            let firstDigit;
            let secondDigit;

            for (let i = 0; i < 9; i++) {
                cpfSum += Number(inputValue[i]) * (10 - i);
            }

            firstDigit = cpfSum % 11 < 2 ? 0 : 11 - (cpfSum % 11);

            cpfSum = 0;

            for (let i = 0; i < 10; i++) {
                cpfSum += Number(inputValue[i]) * (11 - i);
            }

            secondDigit = cpfSum % 11 < 2 ? 0 : 11 - (cpfSum % 11);

            if (firstDigit === Number(inputValue[9]) && secondDigit === Number(inputValue[10])) {
                errorText.style.display = "none";
            } else {
                e.preventDefault();
                errorText.textContent = "CPF inválido";
                errorText.style.display = "block";
            }
        } else {
            e.preventDefault();
            errorText.textContent = "CPF inválido";
            errorText.style.display = "block";
        }
    } else if (nisInput) {
        if (nisPattern.test(inputValue)) {
            const nisWeight = [3, 2, 9, 8, 7, 6, 5, 4, 3, 2];
            let nisSum = 0;

            for (let i = 0; i < 10; i++) {
                nisSum += Number(inputValue[i]) * nisWeight[i];
            }

            const remainder = nisSum % 11;
            const checkDigit = remainder < 2 ? 0 : 11 - remainder;

            if (checkDigit === Number(inputValue[10])) {
                errorText.style.display = "none";
            } else {
                e.preventDefault();
                errorText.textContent = "NIS inválido";
                errorText.style.display = "block";
            }
        } else {
            e.preventDefault();
            errorText.textContent = "NIS inválido";
            errorText.style.display = "block";
        }
    } else {
        e.preventDefault();
    }
});

//Get the current year
const date = document.getElementById('date');

date.textContent = new Date().getFullYear();

//Logic of carousel
const carousel = document.getElementById("carousel");
const prevButton = document.querySelector("#carousel-benefits-div button:first-child");
const nextButton = document.querySelector("#carousel-benefits-div button:last-child");

let scrollPosition = 0;

function getItemWidth() {
    return document.querySelector("#carousel img").offsetWidth; 
};

nextButton.addEventListener("click", () => {
    const itemWidth = getItemWidth();
    if (scrollPosition + itemWidth < carousel.scrollWidth - carousel.clientWidth) {
        scrollPosition += itemWidth;
    } else {
        scrollPosition = carousel.scrollWidth - carousel.clientWidth;
    }
    carousel.scrollTo({ left: scrollPosition, behavior: "smooth" });
});

prevButton.addEventListener("click", () => {
    const itemWidth = getItemWidth();
    if (scrollPosition - itemWidth > 0) {
        scrollPosition -= itemWidth;
    } else {
        scrollPosition = 0;
    }
    carousel.scrollTo({ left: scrollPosition, behavior: "smooth" });
});

window.addEventListener("resize", () => {
    scrollPosition = 0;
    carousel.scrollTo({ left: 0, behavior: "smooth" });
});
