const checkingTransactions = document.getElementById('checkingTransactions');
let transactionData = [];
const loggedIn = document.getElementsByClassName("loggedIn");
let checkingTransfers = JSON.parse(localStorage.getItem('newCheckingTransaction')) || [];
let savingsTransfers = JSON.parse(localStorage.getItem('newSavingsTransaction')) || [];
let creditTransfers = JSON.parse(localStorage.getItem('newCreditTransaction')) || [];
const checkingTotalBal = document.getElementById('checkingTotalBal');
checkingTotalBal.textContent = `Current Balance: $${JSON.parse(localStorage.getItem('savedCheckingBal'))}` || 124;

for(const transfer of checkingTransfers) {
    checkingTransactions.innerHTML += `
    <p>${transfer}</p>
    `
}

function displayTransactions() {
        console.log(transactionData)
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
