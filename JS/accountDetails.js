const checkingTransactions = document.getElementById('checkingTransactions');
let transactionData = [];
const loggedIn = document.getElementsByClassName("loggedIn");
let checkingTransfers = JSON.parse(localStorage.getItem('newCheckingTransaction')) || [];
let savingsTransfers = JSON.parse(localStorage.getItem('newSavingsTransaction')) || [];
let creditTransfers = JSON.parse(localStorage.getItem('newCreditTransaction')) || [];
const checkingTotalBal = document.getElementById('checkingTotalBal');
if(localStorage.getItem('savedCheckingBal') !== null) {
checkingTotalBal.textContent = `Current Balance: $${JSON.parse(localStorage.getItem('savedCheckingBal')).toFixed(2)}` 
} else { 
    checkingTotalBal.textContent = 'Current Balance: $124';
}
let transferNumber = 1;

for(const transfer of checkingTransfers) {
    checkingTransactions.innerHTML += `
    <p id="transferNum${transferNumber}"></p>`
    document.getElementById(`transferNum${transferNumber}`).textContent = transfer;
    transferNumber++;
}

function displayTransactions() {
        for(const transaction of transactionData.Checking) {
            checkingTransactions.innerHTML += `
        <p>Purchase: ${transaction.Source}: $${transaction.Amount}</p>
        `
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
