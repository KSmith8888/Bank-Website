'use strict';

const loginForm = document.getElementById('loginForm');
const loginBtn = document.getElementById('loginBtn');
const userInput = document.getElementById('userInput');
const passwordInput = document.getElementById('passwordInput');
const loggedIn = document.getElementsByClassName("loggedIn");
const rememberName = document.getElementById('rememberName');

const settingsForm = document.getElementById('settingsForm');
const closeDialogBtn = document.getElementById('closeDialogBtn');
const currentUserInput = document.getElementById('currentUserInput');
const changeUserInput = document.getElementById('changeUserInput');
const confirmUserInput = document.getElementById('confirmUserInput');
const currentPassInput = document.getElementById('currentPassInput');
const changePassInput = document.getElementById('changePassInput');
const confirmPassInput = document.getElementById('confirmPassInput');
const updateStatus = document.getElementById('updateStatus');

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

if(JSON.parse(localStorage.getItem('userId')) !== null && JSON.parse(localStorage.getItem('loggedIn')) !== null) {
    for(let instance of loggedIn) {
        instance.textContent = JSON.parse(localStorage.getItem('userId'));
    }
}

document.querySelector('.logOutBtn').addEventListener('click', () => {
    localStorage.removeItem('loggedIn');
    location.href = './index.html';
});

document.querySelector('.settingsBtn').addEventListener('click', () => {
    settingsDialog.showModal();
});

closeDialogBtn.addEventListener('click', () => {
    settingsDialog.close();
});

settingsForm.addEventListener('submit', (event) => {
    event.preventDefault();
    let updatedUser = false;
    let updatedPass = false;
    if(JSON.parse(localStorage.getItem('userId')) === currentUserInput.value && localStorage.getItem('userId') !== null) {
        if(changeUserInput.value === confirmUserInput.value && changeUserInput.value !== '') {
            localStorage.setItem('userId', JSON.stringify(changeUserInput.value));
            updatedUser = true;
        } else {
            alert('Please make sure that both new User ID inputs match.');
            currentUserInput.focus();
        }
    } else {
        if(currentUserInput.value !== '') {
            alert('Current User ID input does not match saved value or online account does not exist. If this is your first time using online banking, enter the User ID and Password you would like to use in the login section.');
            currentUserInput.focus();
        }
    }
    if(JSON.parse(localStorage.getItem('password')) === currentPassInput.value && localStorage.getItem('password') !== null) {
        if(changePassInput.value === confirmPassInput.value && changePassInput.value !== '') {
            localStorage.setItem('password', JSON.stringify(changePassInput.value));
            updatedPass = true;
        } else {
            alert('Please make sure that both new Password inputs match.');
            currentPassInput.focus();
        }
    } else {
        if(currentPassInput.value !== '') {
            alert('Current Password input does not match saved value or online account does not exist. If this is your first time using online banking, enter the User ID and Password you would like to use in the login section.');
            currentPassInput.focus();
        }
    }
    currentUserInput.value = '';
    changeUserInput.value = '';
    confirmUserInput.value = '';
    changePassInput.value = '';
    confirmPassInput.value = '';
    currentPassInput.value = '';
    if(updatedUser && !updatedPass) {
        updateStatus.textContent = 'Success! User ID updated.';
        setTimeout(() => {
            location.reload(); 
        }, 1500);
    } else if(!updatedUser && updatedPass) {
        updateStatus.textContent = 'Success! Password updated.';
        setTimeout(() => {
            location.reload(); 
        }, 1500);
    } else if(updatedUser && updatedPass) {
        updateStatus.textContent = 'Success! User ID and Password updated.';
        setTimeout(() => {
            location.reload(); 
        }, 1500);
    }
});
