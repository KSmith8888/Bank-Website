const tranBtnInternal = document.getElementById('tranBtnInternal');
const checkingBal = document.getElementById('checkingBal');
const savingsBal = document.getElementById('savingsBal');
const creditBal = document.getElementById('creditBal');
const tranFromInternal = document.getElementById('tranFromInternal');
const tranToInternal = document.getElementById('tranToInternal');
const tranAmountInternal = document.getElementById('tranAmountInternal');

let checking = JSON.parse(localStorage.getItem('savedCheckingBal')) || 17;
let savings = JSON.parse(localStorage.getItem('savedSavingsBal')) || 610;
let credit = JSON.parse(localStorage.getItem('savedCreditBal')) || 492;
checkingBal.textContent = `$${checking}`;
savingsBal.textContent = `$${savings}`;
creditBal.textContent = `$${credit}`;

let photoNum = 1;
const loggedIn = document.getElementsByClassName("loggedIn");
const internalTransfer = document.getElementById('internalTransfer');
let newCheckingTransactions = [];
let newSavingsTransactions = [];
let newCreditTransactions = [];

/*When user clicks button to transfer between accounts, event listener checks:
-Which account it was transferred from
-Which account it was transferred to
-The amount transferred
Each account balance is updated*/
internalTransfer.addEventListener('submit', (e) => {
    e.preventDefault();
    //Escape certain characters
    if(tranAmountInternal.value.includes('<') || tranAmountInternal.value.includes('>') || tranAmountInternal.value.includes('$') || tranAmountInternal.value.includes('{') || tranAmountInternal.value.includes('}')) {
        alert('Please only enter numbers in the transfer amount input.');
    } else {
    /*Reduces the balance of the account that the transfer came from, checks to make sure the transfer amount is not larger than the balance*/
        if(tranFromInternal.value === 'Everyday Checking 4019' && parseInt(tranAmountInternal.value) < checking && parseInt(tranAmountInternal.value) > 0) {
    /*Increases the balance of the account the the transfer went to, or reduces the balance if it was a credit card*/
            if(tranToInternal.value === 'Rewards Savings 8530') {
            savings += parseInt(tranAmountInternal.value);
            checking -= parseInt(tranAmountInternal.value);
            //Saves new balances in localStorage
            localStorage.setItem('savedSavingsBal', JSON.stringify(savings));
            localStorage.setItem('savedCheckingBal', JSON.stringify(checking));
        /*
        Pushes details of the tranfer to an array and sets a localStorage item specific to each account equal to the relevant array. This allows the appropriate transactions to appear within the account details page of each account.
        */
            newSavingsTransactions.push(`Transfer from Everyday Checking 4019: $${tranAmountInternal.value}`);
            localStorage.setItem('newSavingsTransaction', JSON.stringify(newSavingsTransactions));
            newCheckingTransactions.push(`Transfer to Reward Savings 8530: $${tranAmountInternal.value}`);
            localStorage.setItem('newCheckingTransaction', JSON.stringify(newCheckingTransactions));
            tranAmountInternal.value = '';
            tranToInternal.value = 'Transfer To:';
            tranFromInternal.value = 'Transfer From:';
        } else if(tranToInternal.value === 'Silver Miles Credit Card 9124') {
            credit -= parseInt(tranAmountInternal.value);
            checking -= parseInt(tranAmountInternal.value);
            localStorage.setItem('savedCreditBal', JSON.stringify(credit));
            localStorage.setItem('savedCheckingBal', JSON.stringify(checking));
            newCreditTransactions.push(`Transfer from Everyday Checking 4019: $${tranAmountInternal.value}`);
            localStorage.setItem('newCreditTransaction', JSON.stringify(newCreditTransactions));
            newCheckingTransactions.push(`Transfer to Silver Miles Credit Card 9124: $${tranAmountInternal.value}`);
            localStorage.setItem('newCheckingTransaction', JSON.stringify(newCheckingTransactions));
            tranAmountInternal.value = '';
            tranToInternal.value = 'Transfer To:';
            tranFromInternal.value = 'Transfer From:';
        //Error handling if user attempts to transfer to and from the same account or does not select an account in either field
        } else if(tranToInternal.value === 'Everyday Checking 4019') {
            alert("You cannot transfer from and to the same account.");
        } else if(tranToInternal.value === 'Transfer To:') {
            alert('Please specify which account you would like to transfer to.');
        }
    } else if(tranFromInternal.value === 'Rewards Savings 8530' && parseInt(tranAmountInternal.value) < savings && parseInt(tranAmountInternal.value) > 0) {
        if(tranToInternal.value === 'Everyday Checking 4019') {
            checking += parseInt(tranAmountInternal.value);
            savings -= parseInt(tranAmountInternal.value);
            localStorage.setItem('savedSavingsBal', JSON.stringify(savings));
            localStorage.setItem('savedCheckingBal', JSON.stringify(checking));
            newSavingsTransactions.push(`Transfer to Everyday Checking 4019: $${tranAmountInternal.value}`);
            localStorage.setItem('newSavingsTransaction', JSON.stringify(newSavingsTransactions));
            newCheckingTransactions.push(`Transfer from Reward Savings 8530: $${tranAmountInternal.value}`);
            localStorage.setItem('newCheckingTransaction', JSON.stringify(newCheckingTransactions));
            tranAmountInternal.value = '';
            tranToInternal.value = 'Transfer To:';
            tranFromInternal.value = 'Transfer From:';
        } else if(tranToInternal.value === 'Silver Miles Credit Card 9124' && credit - parseInt(tranAmountInternal.value) > 0) {
            credit -= parseInt(tranAmountInternal.value);
            savings -= parseInt(tranAmountInternal.value);
            localStorage.setItem('savedSavingsBal', JSON.stringify(savings));
            localStorage.setItem('savedCreditBal', JSON.stringify(credit));
            newCreditTransactions.push(`Transfer from Reward Savings 8530: $${tranAmountInternal.value}`);
            localStorage.setItem('newCreditTransaction', JSON.stringify(newCreditTransactions));
            newSavingsTransactions.push(`Transfer to Silver Miles Credit Card 9124: $${tranAmountInternal.value}`);
            localStorage.setItem('newCreditTransaction', JSON.stringify(newCreditTransactions));
            tranAmountInternal.value = '';
            tranToInternal.value = 'Transfer To:';
            tranFromInternal.value = 'Transfer From:';
        } else if(tranToInternal.value === 'Rewards Savings 8530') {
            alert("You cannot transfer from and to the same account.");
        } else if(tranToInternal.value === 'Transfer To:') {
            alert('Please specify which account you would like to transfer to.');
        }
    } else if(tranFromInternal.value === 'Transfer From:') {
        alert('Please specify which account you would like to transfer from.');
    }
    //Updates html to reflect new balances after transfer
    checkingBal.innerText = `$${checking}`;
    savingsBal.innerText = `$${savings}`;
    creditBal.innerText = `$${credit}`;
    }
});

//Get advertisement image and text from jsonplaceholder API
setInterval(()=> {
    if(photoNum < 50) {
    photoNum++;
    fetch(`https://jsonplaceholder.typicode.com/photos/${photoNum}`)
    .then((response) => {
        if(!response.ok) {
            throw new Error(`Network Error: ${response.status}`)
        } else {
            return response.json()
        }
    })
    .then((data) => {
        document.getElementById('apiAds').style.backgroundImage = `url(${data.thumbnailUrl})`;
        document.getElementById('adId').textContent = `Ad Id: ${data.id}`;
        document.getElementById('adText').textContent = `Title: ${data.title}`;
    })
    .catch((err) => {
        document.getElementById('adText').textContent = 'API data failed to load.';
        console.log(err)
    });
}
}, 10000)

if(JSON.parse(localStorage.getItem('userId')) !== null) {
    for(let instance of loggedIn) {
        instance.textContent = JSON.parse(localStorage.getItem('userId'));
    }
}

document.querySelector('.logOutBtn').addEventListener('click', () => {
    localStorage.removeItem('fillUsername');
    localStorage.removeItem('userId');
    location.reload();
});
