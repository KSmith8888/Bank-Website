'use strict';

const checkingTransactions = document.getElementById('checkingTransactions');
const savingsTransactions = document.getElementById('savingsTransactions');
const creditTransactions = document.getElementById('creditTransactions');
let transactionData = [];
const loggedIn = document.getElementsByClassName("loggedIn");
let checkingTransfers = JSON.parse(localStorage.getItem('newCheckingTransaction')) || [];
let savingsTransfers = JSON.parse(localStorage.getItem('newSavingsTransaction')) || [];
let creditTransfers = JSON.parse(localStorage.getItem('newCreditTransaction')) || [];
const checkingTotalBal = document.getElementById('checkingTotalBal');
const savingsTotalBal = document.getElementById('savingsTotalBal');
const creditTotalBal = document.getElementById('creditTotalBal');

const settingsForm = document.getElementById('settingsForm');
const closeDialogBtn = document.getElementById('closeDialogBtn');
const currentUserInput = document.getElementById('currentUserInput');
const changeUserInput = document.getElementById('changeUserInput');
const confirmUserInput = document.getElementById('confirmUserInput');
const currentPassInput = document.getElementById('currentPassInput');
const changePassInput = document.getElementById('changePassInput');
const confirmPassInput = document.getElementById('confirmPassInput');
const updateStatus = document.getElementById('updateStatus');
const transactionFilter = document.getElementById('transactionFilter');

if(localStorage.getItem('loggedIn') === null) {
    alert('Please log back in to view accounts');
    location.href = '../index.html';
}

/*
Determines which account page is the user is on and displays the correct information for that account. Displays localStorage data for internal transfers if present.
*/
if(document.querySelector('#checkingTotalBal')) {
    if(localStorage.getItem('savedCheckingBal') !== null) {
    checkingTotalBal.textContent = `Current Balance: $${JSON.parse(localStorage.getItem('savedCheckingBal')).toFixed(2)}` 
    } else { 
        checkingTotalBal.textContent = 'Current Balance: $124.00';
    }
} else if(document.querySelector('#savingsTotalBal')) {
    if(localStorage.getItem('savedSavingsBal') !== null) {
        savingsTotalBal.textContent = `Current Balance: $${JSON.parse(localStorage.getItem('savedSavingsBal')).toFixed(2)}` 
    } else { 
        savingsTotalBal.textContent = 'Current Balance: $610.00';
    }
} else if(document.querySelector('#creditTotalBal')) {
    if(localStorage.getItem('creditCheckingBal') !== null) {
        creditTotalBal.textContent = `Current Balance: $${JSON.parse(localStorage.getItem('creditCheckingBal')).toFixed(2)}` 
    } else { 
        creditTotalBal.textContent = 'Current Balance: $492.00';
    }
}
let transferNumber = 1;

if(document.querySelector('#checkingTotalBal')) {
    for(const transfer of checkingTransfers) {
        checkingTransactions.innerHTML += `
        <p id="transferNum${transferNumber}"></p>`;
        document.getElementById(`transferNum${transferNumber}`).textContent = transfer;
        transferNumber++;
    }
} else if(document.querySelector('#savingsTotalBal')) {
    for(const transfer of savingsTransfers) {
        savingsTransactions.innerHTML += `
        <p id="transferNum${transferNumber}"></p>`;
        document.getElementById(`transferNum${transferNumber}`).textContent = transfer;
        transferNumber++;
    }
} else if(document.querySelector('#creditTotalBal')) {
    for(const transfer of creditTransfers) {
        creditTransactions.innerHTML += `
        <p id="transferNum${transferNumber}"></p>`;
        document.getElementById(`transferNum${transferNumber}`).textContent = transfer;
        transferNumber++;
    }
}

function displayTransactions() {
    if(document.querySelector('#checkingTotalBal')) {
        for(const transaction of transactionData.Checking) {
            checkingTransfers.push(transaction);
            checkingTransactions.innerHTML += `
            <p>${transaction.Type}: ${transaction.Source} - $${transaction.Amount.toFixed(2)}</p>`;
        }
    } else if(document.querySelector('#savingsTotalBal')) {
        for(const transaction of transactionData.Savings) {
            savingsTransfers.push(transaction);
            savingsTransactions.innerHTML += `
            <p>${transaction.Type}: ${transaction.Source} + $${transaction.Amount.toFixed(2)}</p>`;
        }
    } else if(document.querySelector('#creditTotalBal')) {
        for(const transaction of transactionData.Credit) {
            creditTransfers.push(transaction);
            creditTransactions.innerHTML += `
            <p>${transaction.Type}: ${transaction.Source} - $${transaction.Amount.toFixed(2)}</p>`;
        }
    }
}

fetch('./database.json')
    .then((response) => {
        if(response.ok) {
            return response.json()
        } else {
            throw new Error(response.status)
        }
    })
    .then((data) => {
        transactionData = data;
        displayTransactions();
    })
    .catch((err) => console.log(err));

transactionFilter.addEventListener('change', () => {
    if(document.querySelector('#checkingTotalBal')) {
        checkingTransactions.innerHTML = '';
        checkingTransfers.filter((transaction) => {
            if(transaction.Type === transactionFilter.value) {
                checkingTransactions.innerHTML += `<p>${transaction.Type}: ${transaction.Source} - $${transaction.Amount.toFixed(2)}</p>`;
            } else if(!transaction.Type && transactionFilter.value === 'Transfer') {
                checkingTransactions.innerHTML += `<p>${transaction}</p>`
            }
        });
    } else if(document.querySelector('#savingsTotalBal')) {
        savingsTransactions.innerHTML = '';
        savingsTransfers.filter((transaction) => {
            if(transaction.Type === transactionFilter.value) {
                savingsTransactions.innerHTML += `<p>${transaction.Type}: ${transaction.Source} - $${transaction.Amount.toFixed(2)}</p>`;
            } else if(!transaction.Type && transactionFilter.value === 'Transfer') {
                savingsTransactions.innerHTML += `<p>${transaction}</p>`
            }
        });
    } else if(document.querySelector('#creditTotalBal')) {
        creditTransactions.innerHTML = '';
        creditTransfers.filter((transaction) => {
            if(transaction.Type === transactionFilter.value) {
                creditTransactions.innerHTML += `<p>${transaction.Type}: ${transaction.Source} - $${transaction.Amount.toFixed(2)}</p>`;
            } else if(!transaction.Type && transactionFilter.value === 'Transfer') {
                creditTransactions.innerHTML += `<p>${transaction}</p>`
            }
        });
    }
});

if(JSON.parse(localStorage.getItem('userId')) !== null && JSON.parse(localStorage.getItem('loggedIn')) !== null) {
    for(let instance of loggedIn) {
        instance.textContent = JSON.parse(localStorage.getItem('userId'));
    }
}
    
document.querySelector('.logOutBtn').addEventListener('click', () => {
    localStorage.removeItem('loggedIn');
    location.href = '../index.html';
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
