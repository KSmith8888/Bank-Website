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

/*When user clicks button to transfer between accounts, event listener checks:
-Which account it was transferred from
-Which account it was transferred to
-The amount transferred
Each account balance is updated*/
tranBtnInternal.addEventListener('click', function() {
    /*Reduces the balance of the account that the transfer came from, checks to make sure the transfer amount is not larger than the balance*/
    if(tranFromInternal.value === 'Everyday Checking 4019' && parseInt(tranAmountInternal.value) < checking && parseInt(tranAmountInternal.value) > 0) {
        /*Increases the balance of the account the the transfer went to, or reduces the balance if it was a credit card*/
        if(tranToInternal.value === 'Rewards Savings 8530') {
            savings += parseInt(tranAmountInternal.value);
            checking -= parseInt(tranAmountInternal.value);
            //Saves new balances in localStorage
            localStorage.setItem('savedSavingsBal', JSON.stringify(savings));
            localStorage.setItem('savedCheckingBal', JSON.stringify(checking));
            } else if(tranToInternal.value === 'Silver Miles Credit Card 9124') {
            credit -= parseInt(tranAmountInternal.value);
            checking -= parseInt(tranAmountInternal.value);
            localStorage.setItem('savedCreditBal', JSON.stringify(credit));
            localStorage.setItem('savedCheckingBal', JSON.stringify(checking));
            }
    } else if(tranFromInternal.value === 'Rewards Savings 8530' && parseInt(tranAmountInternal.value) < savings && parseInt(tranAmountInternal.value) > 0) {
        if(tranToInternal.value === 'Everyday Checking 4019') {
            checking += parseInt(tranAmountInternal.value);
            savings -= parseInt(tranAmountInternal.value);
            localStorage.setItem('savedSavingsBal', JSON.stringify(savings));
            localStorage.setItem('savedCheckingBal', JSON.stringify(checking));
        } else if(tranToInternal.value === 'Silver Miles Credit Card 9124' && credit - parseInt(tranAmountInternal.value) > 0) {
            credit -= parseInt(tranAmountInternal.value);
            savings -= parseInt(tranAmountInternal.value);
            localStorage.setItem('savedSavingsBal', JSON.stringify(savings));
            localStorage.setItem('savedCreditBal', JSON.stringify(credit));
            }
    } 
    //Updates html to reflect new balances after transfer
    checkingBal.innerText = `$${checking}`;
    savingsBal.innerText = `$${savings}`;
    creditBal.innerText = `$${credit}`;
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
