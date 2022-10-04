'use strict';

const checkingTransactions = document.getElementById('checkingTransactions');
const savingsTransactions = document.getElementById('savingsTransactions');
const creditTransactions = document.getElementById('creditTransactions');
let transactionData = [];
let checkingTransfers = JSON.parse(localStorage.getItem('newCheckingTransaction')) || [];
let savingsTransfers = JSON.parse(localStorage.getItem('newSavingsTransaction')) || [];
let creditTransfers = JSON.parse(localStorage.getItem('newCreditTransaction')) || [];
const checkingTotalBal = document.getElementById('checkingTotalBal');
const savingsTotalBal = document.getElementById('savingsTotalBal');
const creditTotalBal = document.getElementById('creditTotalBal');
const transactionFilter = document.getElementById('transactionFilter');
const creditScore = document.querySelectorAll('.creditScore');
const creditScoreBar = document.querySelector('#creditScoreBar');

function displayCreditScore() {
    document.getElementById('positiveListItem1').style.display = 'list-item';
    document.getElementById('positiveListItem2').style.display = 'list-item';
    document.getElementById('negativeListItem1').style.display = 'list-item';
    document.getElementById('negativeListItem2').style.display = 'list-item';
    let randomScore = Math.floor(Math.random() * (850 - 300) + 300);
    let scorePercentage = (((randomScore - 300)* 100) / 550).toFixed(0);
    let angle = ((scorePercentage * 180) / 100).toFixed(0);
    document.getElementById('scorePercentile').textContent = scorePercentage;
    creditScore.forEach((instance) => {
        instance.textContent = randomScore;
    });
    creditScoreBar.value = randomScore;
    if(randomScore < 525) {
        creditScoreBar.style.backgroundImage = `conic-gradient(white 95deg, red 95deg ${parseInt(angle) + 270}deg, white ${parseInt(angle) + 270}deg 360deg)`;
        document.getElementById('creditScoreBarCon').style.backgroundColor = 'rgb(247, 223, 223)';
        document.getElementById('innerCircle').style.backgroundColor = 'rgb(247, 223, 223)';
        document.getElementById('positiveListItem1').style.display = 'none';
        document.getElementById('positiveListItem2').style.display = 'none';
    } else if(randomScore >= 525 && randomScore < 700) {
        creditScoreBar.style.backgroundImage = `conic-gradient(orange ${parseInt(angle - 90)}deg, white ${parseInt(angle - 90)}deg 95deg, orange 95deg 360deg)`;
        document.getElementById('creditScoreBarCon').style.backgroundColor = 'rgb(247, 243, 207)';
        document.getElementById('innerCircle').style.backgroundColor = 'rgb(247, 243, 207)';
        document.getElementById('positiveListItem1').style.display = 'none';
        document.getElementById('negativeListItem2').style.display = 'none';
    } else{
        creditScoreBar.style.backgroundImage = `conic-gradient(green ${parseInt(angle - 90)}deg, white ${parseInt(angle - 90)}deg 95deg, green 95deg 360deg)`;
        document.getElementById('creditScoreBarCon').style.backgroundColor = 'rgb(212, 248, 212)';
        document.getElementById('innerCircle').style.backgroundColor = 'rgb(212, 248, 212)';
        document.getElementById('negativeListItem1').style.display = 'none';
        document.getElementById('negativeListItem2').style.display = 'none';
    }
}

displayCreditScore();

document.getElementById('updateReport').addEventListener('click', displayCreditScore);

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

//Sends user to homepage after clicking log out button    
document.querySelector('.logOutBtn').addEventListener('click', () => {
    localStorage.removeItem('loggedIn');
    location.href = '../index.html';
});
