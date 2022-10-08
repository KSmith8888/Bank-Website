'use strict';

const checkingAdTab = document.getElementById('checkingAdTab');
const savingsAdTab = document.getElementById('savingsAdTab');
const creditAdTab = document.getElementById('creditAdTab');
const mortgageAdTab = document.getElementById('mortgageAdTab');
const investmentAdTab = document.getElementById('investmentAdTab');
checkingAdTab.style.backgroundColor = 'var(--lightGrey)';
const tabSection = document.getElementById('productTabs');
const ads = document.getElementById('productMain');
let rotationIndex = 1;

const checkingText = document.getElementById('checkingText');
const checkingImage = document.getElementById('checkingImage');
const savingsText = document.getElementById('savingsText');
const savingsImage = document.getElementById('savingsImage');
const creditText = document.getElementById('creditText');
const creditImage = document.getElementById('creditImage');
const mortgageText = document.getElementById('mortgageText');
const mortgageImage = document.getElementById('mortgageImage');
const investmentText = document.getElementById('investmentText');
const investmentImage = document.getElementById('investmentImage');

function resetTabSelect() {
    checkingAdTab.style.backgroundColor = 'var(--lighterGrey)';
    savingsAdTab.style.backgroundColor = 'var(--lighterGrey)';
    creditAdTab.style.backgroundColor = 'var(--lighterGrey)';
    mortgageAdTab.style.backgroundColor = 'var(--lighterGrey)';
    investmentAdTab.style.backgroundColor = 'var(--lighterGrey)';
    checkingAdTab.ariaSelected = 'false';
    savingsAdTab.ariaSelected = 'false';
    creditAdTab.ariaSelected = 'false';
    mortgageAdTab.ariaSelected = 'false';
    investmentAdTab.ariaSelected = 'false';
    checkingText.hidden = true;
    checkingImage.hidden = true;
    savingsText.hidden = true;
    savingsImage.hidden = true;
    creditText.hidden = true;
    creditImage.hidden = true;
    mortgageText.hidden = true;
    mortgageImage.hidden = true;
    investmentText.hidden = true;
    investmentImage.hidden = true;
}

function selectCheckingTab() {
    clearInterval(rotateProducts);
    resetTabSelect();
    checkingAdTab.style.backgroundColor = 'var(--lightGrey)';
    checkingAdTab.ariaSelected = 'true';
    checkingAdTab.focus();
    checkingText.hidden = false;
    checkingImage.hidden = false;
}

checkingAdTab.addEventListener('click', selectCheckingTab);

function selectSavingsTab() {
    clearInterval(rotateProducts);
    resetTabSelect();
    savingsAdTab.style.backgroundColor = 'var(--lightGrey)';
    savingsAdTab.ariaSelected = 'true';
    savingsAdTab.focus();
    savingsText.hidden = false;
    savingsImage.hidden = false;
}

savingsAdTab.addEventListener('click', selectSavingsTab);

function selectCreditTab() {
    clearInterval(rotateProducts);
    resetTabSelect();
    creditAdTab.style.backgroundColor = 'var(--lightGrey)';
    creditAdTab.ariaSelected = 'true';
    creditAdTab.focus();
    creditText.hidden = false;
    creditImage.hidden = false;
}

creditAdTab.addEventListener('click', selectCreditTab);

function selectMortgageTab() {
    clearInterval(rotateProducts);
    resetTabSelect();
    mortgageAdTab.style.backgroundColor = 'var(--lightGrey)';
    mortgageAdTab.ariaSelected = 'true';
    mortgageAdTab.focus();
    mortgageText.hidden = false;
    mortgageImage.hidden = false;
}

mortgageAdTab.addEventListener('click', selectMortgageTab);

function selectInvestmentTab() {
    clearInterval(rotateProducts);
    resetTabSelect();
    investmentAdTab.style.backgroundColor = 'var(--lightGrey)';
    investmentAdTab.ariaSelected = 'true';
    investmentAdTab.focus();
    investmentText.hidden = false;
    investmentImage.hidden = false;
}

investmentAdTab.addEventListener('click', selectInvestmentTab);

checkingAdTab.addEventListener('keydown', (event) => {
    if(event.code === 'ArrowLeft') {
        selectInvestmentTab();
    } else if(event.code === 'ArrowRight') {
        selectSavingsTab();
    }
});

savingsAdTab.addEventListener('keydown', (event) => {
    if(event.code === 'ArrowLeft') {
        selectCheckingTab();
    } else if(event.code === 'ArrowRight') {
        selectCreditTab();
    }
});

creditAdTab.addEventListener('keydown', (event) => {
    if(event.code === 'ArrowLeft') {
        selectSavingsTab();
    } else if(event.code === 'ArrowRight') {
        selectMortgageTab();
    }
});

mortgageAdTab.addEventListener('keydown', (event) => {
    if(event.code === 'ArrowLeft') {
        selectCreditTab();
    } else if(event.code === 'ArrowRight') {
        selectInvestmentTab();
    }
});

investmentAdTab.addEventListener('keydown', (event) => {
    if(event.code === 'ArrowLeft') {
        selectMortgageTab();
    } else if(event.code === 'ArrowRight') {
        selectCheckingTab();
    }
});

const rotateProducts = setInterval(() => {
    resetTabSelect();
    if(rotationIndex === 1) {
        rotationIndex = 2;
        savingsAdTab.style.backgroundColor = 'var(--lightGrey)';
        savingsAdTab.ariaSelected = 'true';
        savingsText.hidden = false;
        savingsImage.hidden = false;
    } else if(rotationIndex === 2) {
        rotationIndex = 3;
        creditAdTab.style.backgroundColor = 'var(--lightGrey)';
        creditAdTab.ariaSelected = 'true';
        creditText.hidden = false;
        creditImage.hidden = false;
    } else if(rotationIndex === 3) {
        rotationIndex = 4;
        mortgageAdTab.style.backgroundColor = 'var(--lightGrey)';
        mortgageAdTab.ariaSelected = 'true';
        mortgageText.hidden = false;
        mortgageImage.hidden = false;
    } else if(rotationIndex === 4) {
        rotationIndex = 5;
        investmentAdTab.style.backgroundColor = 'var(--lightGrey)';
        investmentAdTab.ariaSelected = 'true';
        investmentText.hidden = false;
        investmentImage.hidden = false;
    } else if(rotationIndex === 5) {
        rotationIndex = 1;
        checkingAdTab.style.backgroundColor = 'var(--lightGrey)';
        checkingAdTab.ariaSelected = 'true';
        checkingText.hidden = false;
        checkingImage.hidden = false;
    }
}, 8000);

//Sends user to homepage after clicking log out button
document.querySelector('.logOutBtn').addEventListener('click', () => {
    localStorage.removeItem('loggedIn');
    location.href = './index.html';
});
