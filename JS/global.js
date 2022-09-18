'use strict';

const settingsForm = document.getElementById('settingsForm');
const closeDialogBtn = document.getElementById('closeDialogBtn');
const currentUserInput = document.getElementById('currentUserInput');
const changeUserInput = document.getElementById('changeUserInput');
const confirmUserInput = document.getElementById('confirmUserInput');
const currentPassInput = document.getElementById('currentPassInput');
const changePassInput = document.getElementById('changePassInput');
const confirmPassInput = document.getElementById('confirmPassInput');
const updateStatus = document.getElementById('updateStatus');
const loggedIn = document.getElementsByClassName("loggedIn");

if(JSON.parse(localStorage.getItem('userId')) !== null && JSON.parse(localStorage.getItem('loggedIn')) !== null) {
    for(let instance of loggedIn) {
        instance.textContent = JSON.parse(localStorage.getItem('userId'));
    }
}

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

document.querySelector('#open-chat-button').addEventListener('click', () => {
    document.querySelector('#chat-box').showModal();
    document.querySelector('#chat-input').focus();
});

document.querySelector('#close-chat-button').addEventListener('click', () => {
    document.querySelector('#chat-box').close();
});

function chatResponse(userInput) {
    let randomIndex = Math.floor(Math.random() * 2) + 1;
    let chatResponse = '';
    let url = '';
    if(document.querySelector('#transactionFilter')) {
        url = '../Accounts/database.json';
    } else {
        url = 'Accounts/database.json';
    }
    fetch((url))
        .then((response) => response.json())
        .then((data) => {
            if(userInput.toLowerCase().includes('account')) {
                chatResponse = data.Chat.Responses.Account[randomIndex]
            } else {
                chatResponse = data.Chat.Responses.Confused[randomIndex];
            }
            document.querySelector('#chat-list').innerHTML += `
            <p>Agent: ${chatResponse}</p>
            `;
        });
}

document.querySelector('#chat-input-form').addEventListener('submit', (e) => {
    e.preventDefault();
    let message = document.querySelector('#chat-input').value;
    //Do not initiate chat input if it contains certain characters
    if(message.includes('<') || message.includes('>') || message.includes('$') || message.includes('{') || message.includes('}') || message.includes('=') || message.includes('!') || message.includes('*') || message.includes('&') || message.includes(';') || message.includes('(') || message.includes(')') || message.includes('|') || message.includes('@')) {
        alert('Please do not include special characters in the chat input.');
    } else {
        document.querySelector('#chat-list').innerHTML += `
        <p>You: ${message}</p>
        `;
        chatResponse(message)
        document.querySelector('#chat-input').value = '';
    }
});
