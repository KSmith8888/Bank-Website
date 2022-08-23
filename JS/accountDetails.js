const checkingTransactions = document.getElementById('checkingTransactions');
let transactionData = [];
const loggedIn = document.getElementsByClassName("loggedIn");

function displayTransactions() {
        console.log(transactionData)
        for(const transaction of transactionData.Checking) {
            checkingTransactions.innerHTML += `
        <p>${transaction.Source}: ${transaction.Amount}</p>
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
