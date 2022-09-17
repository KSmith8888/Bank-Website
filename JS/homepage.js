'use strict';

const loginForm = document.getElementById('loginForm');
const loginBtn = document.getElementById('loginBtn');
const userInput = document.getElementById('userInput');
const passwordInput = document.getElementById('passwordInput');
const rememberName = document.getElementById('rememberName');

if(
    JSON.parse(localStorage.getItem('fillUsername')) !== null && 
    JSON.parse(localStorage.getItem('userId')) !== null
    ) {
    userInput.value = JSON.parse(localStorage.getItem('userId'));
    rememberName.checked = true;
}

loginForm.addEventListener('submit', (event) => {
    event.preventDefault();
    //If no username has previously been set, save current values
    if(localStorage.getItem('userId') === null) {
        localStorage.setItem('userId', JSON.stringify(userInput.value));
        localStorage.setItem('password', JSON.stringify(passwordInput.value));
    }
    //If remember User ID box is checked, fill User ID input field on future visits
    if(rememberName.checked) {
        localStorage.setItem('fillUsername', JSON.stringify('fill'));
    } else {
        localStorage.removeItem('fillUsername');
    }
    //If User ID and Password input matches saved values, go to accounts page
    if(JSON.parse(localStorage.getItem('userId')) === userInput.value && JSON.parse(localStorage.getItem('password')) === passwordInput.value) {
        localStorage.setItem('loggedIn', JSON.stringify('yes'));
        location.href = './accounts.html';
    } else {
        alert('User ID or Password does not match, please try again.');
        userInput.focus();
    }
    userInput.value = '';
    passwordInput.value = '';
    rememberName.checked = false;
});

//Sends user to homepage after clicking log out button
document.querySelector('.logOutBtn').addEventListener('click', () => {
    localStorage.removeItem('loggedIn');
    location.href = './index.html';
});

