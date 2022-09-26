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

function resetTabColor() {
    checkingAdTab.style.backgroundColor = 'var(--lighterGrey)';
    savingsAdTab.style.backgroundColor = 'var(--lighterGrey)';
    creditAdTab.style.backgroundColor = 'var(--lighterGrey)';
    mortgageAdTab.style.backgroundColor = 'var(--lighterGrey)';
    investmentAdTab.style.backgroundColor = 'var(--lighterGrey)';
}

checkingAdTab.addEventListener('click', () => {
    clearInterval(rotateProducts);
    resetTabColor();
    checkingAdTab.style.backgroundColor = 'var(--lightGrey)';
    productTitle.textContent = 'Premium Cashback Checking Account';
    productSubtitle.textContent = 'Buy what calls to you';
    rotatingItem.style.display = 'list-item';
    rotatingImage.src = 'Images/checkingImage.jpg';
    rotatingImage.alt = 'A variety box of donuts';
});

savingsAdTab.addEventListener('click', () => {
    clearInterval(rotateProducts);
    resetTabColor();
    savingsAdTab.style.backgroundColor = 'var(--lightGrey)';
    productTitle.textContent = 'Rewards Savings Account';
    productSubtitle.textContent = 'Plan for what matters';
    rotatingItem.style.display = 'none';
    rotatingImage.src = 'Images/savingsImage.jpg';
    rotatingImage.alt = 'A glass jar full of coins with a small plant growing out from it';
});

creditAdTab.addEventListener('click', () => {
    clearInterval(rotateProducts);
    resetTabColor();
    creditAdTab.style.backgroundColor = 'var(--lightGrey)';
    productTitle.textContent = 'Silver Miles Credit Card';
    productSubtitle.textContent = 'Go further';
    rotatingItem.style.display = 'list-item';
    rotatingImage.src = 'Images/creditImage.jpg';
    rotatingImage.alt = 'A gold credit card and a smartphone being used for online shopping';
});

mortgageAdTab.addEventListener('click', () => {
    clearInterval(rotateProducts);
    resetTabColor();
    mortgageAdTab.style.backgroundColor = 'var(--lightGrey)';
    productTitle.textContent = 'Mortgage Loans';
    productSubtitle.textContent = 'Create your kingdom';
    rotatingItem.style.display = 'list-item';
    rotatingImage.src = 'Images/mortgageImage.jpg';
    rotatingImage.alt = 'A house and front yard with fallen leaves scattered across';
});

investmentAdTab.addEventListener('click', () => {
    clearInterval(rotateProducts);
    resetTabColor();
    investmentAdTab.style.backgroundColor = 'var(--lightGrey)';
    productTitle.textContent = 'Managed Investment Accounts';
    productSubtitle.textContent = 'Build your possibilities';
    rotatingItem.style.display = 'none';
    rotatingImage.src = 'Images/investmentImage.jpg';
    rotatingImage.alt = 'A tablet displaying a line graph';
});

const rotateProducts = setInterval(() => {
    resetTabColor();
    if(rotationIndex === 1) {
        rotationIndex = 2;
        savingsAdTab.style.backgroundColor = 'var(--lightGrey)';
        productTitle.textContent = 'Rewards Savings Account';
        productSubtitle.textContent = 'Plan for what matters';
        rotatingItem.style.display = 'none';
        rotatingImage.src = 'Images/savingsImage.jpg';
        rotatingImage.alt = 'A glass jar full of coins with a small plant growing out from it';
    } else if(rotationIndex === 2) {
        rotationIndex = 3;
        creditAdTab.style.backgroundColor = 'var(--lightGrey)';
        productTitle.textContent = 'Silver Miles Credit Card';
        productSubtitle.textContent = 'Go further';
        rotatingItem.style.display = 'list-item';
        rotatingImage.src = 'Images/creditImage.jpg';
        rotatingImage.alt = 'A gold credit card and a smartphone being used for online shopping';
    } else if(rotationIndex === 3) {
        rotationIndex = 4;
        mortgageAdTab.style.backgroundColor = 'var(--lightGrey)';
        productTitle.textContent = 'Mortgage Loans';
        productSubtitle.textContent = 'Create your kingdom';
        rotatingItem.style.display = 'list-item';
        rotatingImage.src = 'Images/mortgageImage.jpg';
        rotatingImage.alt = 'A house and front yard with fallen leaves scattered across';
    } else if(rotationIndex === 4) {
        rotationIndex = 5;
        investmentAdTab.style.backgroundColor = 'var(--lightGrey)';
        productTitle.textContent = 'Managed Investment Accounts';
        productSubtitle.textContent = 'Build your possibilities';
        rotatingItem.style.display = 'none';
        rotatingImage.src = 'Images/investmentImage.jpg';
        rotatingImage.alt = 'A tablet displaying a line graph';
    } else if(rotationIndex === 5) {
        rotationIndex = 1;
        checkingAdTab.style.backgroundColor = 'var(--lightGrey)';
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
