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
            checkingTransactions.innerHTML += `
        <p>Purchase: ${transaction.Source} - $${transaction.Amount}</p>
        `
        }
    } else if(document.querySelector('#savingsTotalBal')) {
        for(const transaction of transactionData.Savings) {
            savingsTransactions.innerHTML += `
        <p>Purchase: ${transaction.Source} - $${transaction.Amount}</p>
        `
        }
    } else if(document.querySelector('#creditTotalBal')) {
        for(const transaction of transactionData.Credit) {
            creditTransactions.innerHTML += `
        <p>Purchase: ${transaction.Source} - $${transaction.Amount}</p>
        `
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

    
if(JSON.parse(localStorage.getItem('userId')) !== null) {
    for(let instance of loggedIn) {
        instance.textContent = JSON.parse(localStorage.getItem('userId'));
     }
}

document.querySelector('.logOutBtn').addEventListener('click', () => {
    localStorage.removeItem('fillUsername');
    localStorage.removeItem('userId');
    localStorage.removeItem('savedCheckingBal');
    localStorage.removeItem('savedSavingsBal');
    localStorage.removeItem('savedCreditBal');
    localStorage.removeItem('newCheckingTransaction');
    localStorage.removeItem('newSavingsTransaction');
    localStorage.removeItem('newCreditTransaction');
    location.href = '../index.html';
});
