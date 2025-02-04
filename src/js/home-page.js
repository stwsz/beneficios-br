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

console.log(errorText);

for (let i = 0; i < consultInputs.length; i++) {
    consultInputs[i].addEventListener('change', () => {
        if (i === 0) {
            consultInputBenefit.setAttribute('placeholder', 'Digite seu CPF');

            console.log(errorText);
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

            firstDigit = cpfSum % 11;

            if (firstDigit < 2) {
                firstDigit = 0;
            } else {
                firstDigit = 11 - firstDigit;
            }

            cpfSum = 0;

            for (let i = 0; i < 10; i++) {
                cpfSum += Number(inputValue[i]) * (11 - i);
            }

            secondDigit = cpfSum % 11;

            if (secondDigit < 2) {
                secondDigit = 0;
            } else {
                secondDigit = 11 - secondDigit;
            }
            
            console.log(firstDigit, secondDigit);
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
                nisSum += Number(inputValue) * nisWeight[i];
            }
        
            const remainder = nisSum % 11;
            const checkDigit = remainder === 0 || remainder === 1 ? 0 : 11 - remainder;
        
            if (checkDigit !== Number(inputValue[10])) {
                e.preventDefault();
                errorText.textContent = "NIS inválido";
                errorText.style.display = "block";
            } else {
                errorText.style.display = "none";
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
