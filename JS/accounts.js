const tranBtnInternal = document.getElementById('tranBtnInternal');
const checkingBal = document.getElementById('checkingBal');
const savingsBal = document.getElementById('savingsBal');
const creditBal = document.getElementById('creditBal');
const tranFromInternal = document.getElementById('tranFromInternal');
const tranToInternal = document.getElementById('tranToInternal');
const tranAmountInternal = document.getElementById('tranAmountInternal');

let checking = JSON.parse(localStorage.getItem('savedCheckingBal')) || 124;
let savings = JSON.parse(localStorage.getItem('savedSavingsBal')) || 610;
let credit = JSON.parse(localStorage.getItem('savedCreditBal')) || 492;
checkingBal.textContent = `$${checking.toFixed(2)}`;
savingsBal.textContent = `$${savings.toFixed(2)}`;
creditBal.textContent = `$${credit.toFixed(2)}`;

const settingsDialog = document.getElementById('settingsDialog');
let photoNum = 1;
const loggedIn = document.getElementsByClassName("loggedIn");
const internalTransfer = document.getElementById('internalTransfer');
let newCheckingTransactions = JSON.parse(localStorage.getItem('newCheckingTransaction')) || [];
let newSavingsTransactions = JSON.parse(localStorage.getItem('newSavingsTransaction')) || [];
let newCreditTransactions = JSON.parse(localStorage.getItem('newCreditTransaction')) || [];

const settingsForm = document.getElementById('settingsForm');
const closeDialogBtn = document.getElementById('closeDialogBtn');
const currentUserInput = document.getElementById('currentUserInput');
const changeUserInput = document.getElementById('changeUserInput');
const confirmUserInput = document.getElementById('confirmUserInput');
const currentPassInput = document.getElementById('currentPassInput');
const changePassInput = document.getElementById('changePassInput');
const confirmPassInput = document.getElementById('confirmPassInput');
const updateStatus = document.getElementById('updateStatus');

internalTransfer.addEventListener('submit', (e) => {
    e.preventDefault();
    //Do not initiate transfer if user input contains certain characters
    if(tranAmountInternal.value.includes('<') || tranAmountInternal.value.includes('>') || tranAmountInternal.value.includes('$') || tranAmountInternal.value.includes('{') || tranAmountInternal.value.includes('}') || tranAmountInternal.value.includes('=') || tranAmountInternal.value.includes('!') || tranAmountInternal.value.includes('*') || tranAmountInternal.value.includes('&') || tranAmountInternal.value.includes(';') || tranAmountInternal.value.includes('(') || tranAmountInternal.value.includes(')') || tranAmountInternal.value.includes('|') || tranAmountInternal.value.includes('@')) {
        alert('Please only enter numbers in the transfer amount input.');
    } else {
        completeTransfer();
    }
});

/*When user clicks button to transfer between accounts, checks:
-Which account it was transferred from
-Which account it was transferred to
-The amount transferred
Each account balance is updated*/
function completeTransfer() {
    /*Reduces the balance of the account that the transfer came from, checks to make sure the transfer amount is not larger than the balance*/
    if(tranFromInternal.value === 'Everyday Checking 4019' && parseFloat(tranAmountInternal.value) < checking && parseFloat(tranAmountInternal.value) > 0) {
    /*Increases the balance of the account the the transfer went to, or reduces the balance if it was a credit card*/
        if(tranToInternal.value === 'Rewards Savings 8530') {
            savings += parseFloat(tranAmountInternal.value);
            checking -= parseFloat(tranAmountInternal.value);
        //Saves new balances in localStorage
            localStorage.setItem('savedSavingsBal', JSON.stringify(savings));
            localStorage.setItem('savedCheckingBal', JSON.stringify(checking));
        /*
        Pushes details of the tranfer to an array and sets a localStorage item specific to each account equal to the relevant array. This allows the appropriate transactions to appear within the account details page of each account.
        */
            newSavingsTransactions.push(`Transfer: Everyday Checking 4019 + $${tranAmountInternal.value}`);
            localStorage.setItem('newSavingsTransaction', JSON.stringify(newSavingsTransactions));
            newCheckingTransactions.push(`Transfer: Reward Savings 8530 - $${tranAmountInternal.value}`);
            localStorage.setItem('newCheckingTransaction', JSON.stringify(newCheckingTransactions));
            tranAmountInternal.value = '';
            tranToInternal.value = 'Transfer To:';
            tranFromInternal.value = 'Transfer From:';
        } else if(tranToInternal.value === 'Silver Miles Credit Card 9124') {
            credit -= parseFloat(tranAmountInternal.value);
            checking -= parseFloat(tranAmountInternal.value);
            localStorage.setItem('savedCreditBal', JSON.stringify(credit));
            localStorage.setItem('savedCheckingBal', JSON.stringify(checking));
            newCreditTransactions.push(`Bill Pay from: Everyday Checking 4019 + $${tranAmountInternal.value}`);
            localStorage.setItem('newCreditTransaction', JSON.stringify(newCreditTransactions));
            newCheckingTransactions.push(`Bill Pay to: Silver Miles Credit Card 9124 - $${tranAmountInternal.value}`);
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
    } else if(tranFromInternal.value === 'Rewards Savings 8530' && parseFloat(tranAmountInternal.value) < savings && parseFloat(tranAmountInternal.value) > 0) {
        if(tranToInternal.value === 'Everyday Checking 4019') {
            checking += parseFloat(tranAmountInternal.value);
            savings -= parseFloat(tranAmountInternal.value);
            localStorage.setItem('savedSavingsBal', JSON.stringify(savings));
            localStorage.setItem('savedCheckingBal', JSON.stringify(checking));
            newSavingsTransactions.push(`Transfer: Everyday Checking 4019 - $${tranAmountInternal.value}`);
            localStorage.setItem('newSavingsTransaction', JSON.stringify(newSavingsTransactions));
            newCheckingTransactions.push(`Transfer: Reward Savings 8530 + $${tranAmountInternal.value}`);
            localStorage.setItem('newCheckingTransaction', JSON.stringify(newCheckingTransactions));
            tranAmountInternal.value = '';
            tranToInternal.value = 'Transfer To:';
            tranFromInternal.value = 'Transfer From:';
        } else if(tranToInternal.value === 'Silver Miles Credit Card 9124' && credit - parseFloat(tranAmountInternal.value) > 0) {
            credit -= parseFloat(tranAmountInternal.value);
            savings -= parseFloat(tranAmountInternal.value);
            localStorage.setItem('savedSavingsBal', JSON.stringify(savings));
            localStorage.setItem('savedCreditBal', JSON.stringify(credit));
            newCreditTransactions.push(`Bill Pay from: Reward Savings 8530 + $${tranAmountInternal.value}`);
            localStorage.setItem('newCreditTransaction', JSON.stringify(newCreditTransactions));
            newSavingsTransactions.push(`Bill Pay to: Silver Miles Credit Card 9124 - $${tranAmountInternal.value}`);
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
    checkingBal.textContent = `$${checking.toFixed(2)}`;
    savingsBal.textContent = `$${savings.toFixed(2)}`;
    creditBal.textContent = `$${credit.toFixed(2)}`;
}

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
}, 10000);

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
