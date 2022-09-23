'use strict';

const checkingAdTab = document.getElementById('checkingAdTab');
const savingsAdTab = document.getElementById('savingsAdTab');
const creditAdTab = document.getElementById('creditAdTab');
const mortgageAdTab = document.getElementById('mortgageAdTab');
const investmentAdTab = document.getElementById('investmentAdTab');

const tabSection = document.getElementById('productTabs');
const ads = document.getElementById('productMain');
const productTitle = document.getElementById('productTitle');
const productSubtitle = document.getElementById('productSubtitle');
let rotatingItem = document.getElementById('rotatingItem');
let rotationIndex = 1;

tabSection.addEventListener('click', (event) => {
    clearInterval(rotateProducts);
    checkingAdTab.style.backgroundColor = 'var(--lighterGrey)';
    savingsAdTab.style.backgroundColor = 'var(--lighterGrey)';
    creditAdTab.style.backgroundColor = 'var(--lighterGrey)';
    mortgageAdTab.style.backgroundColor = 'var(--lighterGrey)';
    investmentAdTab.style.backgroundColor = 'var(--lighterGrey)';
    if(event.target === checkingAdTab) {
        checkingAdTab.style.backgroundColor = 'var(--lightGrey)';
        productTitle.textContent = 'Premium Cashback Checking Account';
        productSubtitle.textContent = 'Buy what calls to you';
        rotatingItem.style.display = 'list-item';
        ads.style.backgroundImage = 'url(Images/checkingImage.jpg)';
    } else if(event.target === savingsAdTab) {
        savingsAdTab.style.backgroundColor = 'var(--lightGrey)';
        productTitle.textContent = 'Rewards Savings Account';
        productSubtitle.textContent = 'Plan for what matters';
        rotatingItem.style.display = 'none';
        ads.style.backgroundImage = 'url(Images/savingsImage.jpg)';
    } else if(event.target === creditAdTab) {
        creditAdTab.style.backgroundColor = 'var(--lightGrey)';
        productTitle.textContent = 'Silver Miles Credit Card';
        productSubtitle.textContent = 'Go further';
        rotatingItem.style.display = 'list-item';
        ads.style.backgroundImage = 'url(Images/creditImage.jpg)';
    } else if(event.target === mortgageAdTab) {
        mortgageAdTab.style.backgroundColor = 'var(--lightGrey)';
        productTitle.textContent = 'Mortgage Loans';
        productSubtitle.textContent = 'Create your kingdom';
        rotatingItem.style.display = 'list-item';
        ads.style.backgroundImage = 'url(Images/mortgageImage.jpg)';
    } else if(event.target === investmentAdTab) {
        investmentAdTab.style.backgroundColor = 'var(--lightGrey)';
        productTitle.textContent = 'Managed Investment Accounts';
        productSubtitle.textContent = 'Build your possibilities';
        rotatingItem.style.display = 'none';
        ads.style.backgroundImage = 'url(Images/investmentImage.jpg)';
    }
});

checkingAdTab.style.backgroundColor = 'var(--lightGrey)';
const rotateProducts = setInterval(() => {
    checkingAdTab.style.backgroundColor = 'var(--lighterGrey)';
    savingsAdTab.style.backgroundColor = 'var(--lighterGrey)';
    creditAdTab.style.backgroundColor = 'var(--lighterGrey)';
    mortgageAdTab.style.backgroundColor = 'var(--lighterGrey)';
    investmentAdTab.style.backgroundColor = 'var(--lighterGrey)';
    if(rotationIndex === 1) {
        rotationIndex = 2;
        savingsAdTab.style.backgroundColor = 'var(--lightGrey)';
        productTitle.textContent = 'Rewards Savings Account';
        productSubtitle.textContent = 'Plan for what matters';
        rotatingItem.style.display = 'none';
        ads.style.backgroundImage = 'url(Images/savingsImage.jpg)';
    } else if(rotationIndex === 2) {
        rotationIndex = 3;
        creditAdTab.style.backgroundColor = 'var(--lightGrey)';
        productTitle.textContent = 'Silver Miles Credit Card';
        productSubtitle.textContent = 'Go further';
        rotatingItem.style.display = 'list-item';
        ads.style.backgroundImage = 'url(Images/creditImage.jpg)';
    } else if(rotationIndex === 3) {
        rotationIndex = 4;
        mortgageAdTab.style.backgroundColor = 'var(--lightGrey)';
        productTitle.textContent = 'Mortgage Loans';
        productSubtitle.textContent = 'Create your kingdom';
        rotatingItem.style.display = 'list-item';
        ads.style.backgroundImage = 'url(Images/mortgageImage.jpg)';
    } else if(rotationIndex === 4) {
        rotationIndex = 5;
        investmentAdTab.style.backgroundColor = 'var(--lightGrey)';
        productTitle.textContent = 'Managed Investment Accounts';
        productSubtitle.textContent = 'Build your possibilities';
        rotatingItem.style.display = 'none';
        ads.style.backgroundImage = 'url(Images/investmentImage.jpg)';
    } else if(rotationIndex === 5) {
        rotationIndex = 1;
        checkingAdTab.style.backgroundColor = 'var(--lightGrey)';
        productTitle.textContent = 'Premium Cashback Checking Account';
        productSubtitle.textContent = 'Buy what calls to you';
        rotatingItem.style.display = 'list-item';
        ads.style.backgroundImage = 'url(Images/checkingImage.jpg)';
    }
}, 8000);

//Sends user to homepage after clicking log out button
document.querySelector('.logOutBtn').addEventListener('click', () => {
    localStorage.removeItem('loggedIn');
    location.href = './index.html';
});
