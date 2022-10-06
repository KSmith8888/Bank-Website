'use strict';

const checkingAdTab = document.getElementById('checkingAdTab');
const savingsAdTab = document.getElementById('savingsAdTab');
const creditAdTab = document.getElementById('creditAdTab');
const mortgageAdTab = document.getElementById('mortgageAdTab');
const investmentAdTab = document.getElementById('investmentAdTab');

const tabSection = document.getElementById('productTabs');
const ads = document.getElementById('productMain');
const rotatingImage = document.getElementById('rotatingImage');
const productTitle = document.getElementById('productTitle');
const productSubtitle = document.getElementById('productSubtitle');
let rotatingItem = document.getElementById('rotatingItem');
let rotationIndex = 1;
checkingAdTab.style.backgroundColor = 'var(--lightGrey)';

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
}

function selectCheckingTab() {
    clearInterval(rotateProducts);
    resetTabSelect();
    checkingAdTab.style.backgroundColor = 'var(--lightGrey)';
    checkingAdTab.ariaSelected = 'true';
    checkingAdTab.focus();
    productTitle.textContent = 'Premium Cashback Checking Account';
    productSubtitle.textContent = 'Buy what calls to you';
    rotatingItem.style.display = 'list-item';
    rotatingImage.src = 'Images/checkingImage.jpg';
    rotatingImage.alt = 'A variety box of donuts';
}

checkingAdTab.addEventListener('click', selectCheckingTab);

function selectSavingsTab() {
    clearInterval(rotateProducts);
    resetTabSelect();
    savingsAdTab.style.backgroundColor = 'var(--lightGrey)';
    savingsAdTab.ariaSelected = 'true';
    savingsAdTab.focus();
    productTitle.textContent = 'Rewards Savings Account';
    productSubtitle.textContent = 'Plan for what matters';
    rotatingItem.style.display = 'none';
    rotatingImage.src = 'Images/savingsImage.jpg';
    rotatingImage.alt = 'A glass jar full of coins with a small plant growing out from it';
}

savingsAdTab.addEventListener('click', selectSavingsTab);

function selectCreditTab() {
    clearInterval(rotateProducts);
    resetTabSelect();
    creditAdTab.style.backgroundColor = 'var(--lightGrey)';
    creditAdTab.ariaSelected = 'true';
    creditAdTab.focus();
    productTitle.textContent = 'Silver Miles Credit Card';
    productSubtitle.textContent = 'Go further';
    rotatingItem.style.display = 'list-item';
    rotatingImage.src = 'Images/creditImage.jpg';
    rotatingImage.alt = 'A gold credit card and a smartphone being used for online shopping';
}

creditAdTab.addEventListener('click', selectCreditTab);

function selectMortgageTab() {
    clearInterval(rotateProducts);
    resetTabSelect();
    mortgageAdTab.style.backgroundColor = 'var(--lightGrey)';
    mortgageAdTab.ariaSelected = 'true';
    mortgageAdTab.focus();
    productTitle.textContent = 'Mortgage Loans';
    productSubtitle.textContent = 'Create your kingdom';
    rotatingItem.style.display = 'list-item';
    rotatingImage.src = 'Images/mortgageImage.jpg';
    rotatingImage.alt = 'A house and front yard with fallen leaves scattered across';
}

mortgageAdTab.addEventListener('click', selectMortgageTab);

function selectInvestmentTab() {
    clearInterval(rotateProducts);
    resetTabSelect();
    investmentAdTab.style.backgroundColor = 'var(--lightGrey)';
    investmentAdTab.ariaSelected = 'true';
    investmentAdTab.focus();
    productTitle.textContent = 'Managed Investment Accounts';
    productSubtitle.textContent = 'Build your possibilities';
    rotatingItem.style.display = 'none';
    rotatingImage.src = 'Images/investmentImage.jpg';
    rotatingImage.alt = 'A tablet displaying a line graph';
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
        productTitle.textContent = 'Rewards Savings Account';
        productSubtitle.textContent = 'Plan for what matters';
        rotatingItem.style.display = 'none';
        rotatingImage.src = 'Images/savingsImage.jpg';
        rotatingImage.alt = 'A glass jar full of coins with a small plant growing out from it';
    } else if(rotationIndex === 2) {
        rotationIndex = 3;
        creditAdTab.style.backgroundColor = 'var(--lightGrey)';
        productTitle.textContent = 'Silver Miles Credit Card';
        creditAdTab.ariaSelected = 'true';
        productSubtitle.textContent = 'Go further';
        rotatingItem.style.display = 'list-item';
        rotatingImage.src = 'Images/creditImage.jpg';
        rotatingImage.alt = 'A gold credit card and a smartphone being used for online shopping';
    } else if(rotationIndex === 3) {
        rotationIndex = 4;
        mortgageAdTab.style.backgroundColor = 'var(--lightGrey)';
        mortgageAdTab.ariaSelected = 'true';
        productTitle.textContent = 'Mortgage Loans';
        productSubtitle.textContent = 'Create your kingdom';
        rotatingItem.style.display = 'list-item';
        rotatingImage.src = 'Images/mortgageImage.jpg';
        rotatingImage.alt = 'A house and front yard with fallen leaves scattered across';
    } else if(rotationIndex === 4) {
        rotationIndex = 5;
        investmentAdTab.style.backgroundColor = 'var(--lightGrey)';
        investmentAdTab.ariaSelected = 'true';
        productTitle.textContent = 'Managed Investment Accounts';
        productSubtitle.textContent = 'Build your possibilities';
        rotatingItem.style.display = 'none';
        rotatingImage.src = 'Images/investmentImage.jpg';
        rotatingImage.alt = 'A tablet displaying a line graph';
    } else if(rotationIndex === 5) {
        rotationIndex = 1;
        checkingAdTab.style.backgroundColor = 'var(--lightGrey)';
        checkingAdTab.ariaSelected = 'true';
        productTitle.textContent = 'Premium Cashback Checking Account';
        productSubtitle.textContent = 'Buy what calls to you';
        rotatingItem.style.display = 'list-item';
        rotatingImage.src = 'Images/checkingImage.jpg';
        rotatingImage.alt = 'A variety box of donuts';
    }
}, 8000);

//Sends user to homepage after clicking log out button
document.querySelector('.logOutBtn').addEventListener('click', () => {
    localStorage.removeItem('loggedIn');
    location.href = './index.html';
});
