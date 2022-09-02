const tabBtn1 = document.getElementById('tabBtn1');
const tabBtn2 = document.getElementById('tabBtn2');
const tabBtn3 = document.getElementById('tabBtn3');
const tabBtn4 = document.getElementById('tabBtn4');
const tabBtn5 = document.getElementById('tabBtn5');

const tab1 = document.getElementById('tab1');
const tab2 = document.getElementById('tab2');
const tab3 = document.getElementById('tab3');
const tab4 = document.getElementById('tab4');
const tab5 = document.getElementById('tab5');

const tabClose1 = document.getElementById('tabClose1');
const tabClose2 = document.getElementById('tabClose2');
const tabClose3 = document.getElementById('tabClose3');
const tabClose4 = document.getElementById('tabClose4');
const tabClose5 = document.getElementById('tabClose5');

const tabSection = document.getElementById('tabSection');
const ads = document.getElementById('ads');

const loginForm = document.getElementById('loginForm');
const loginBtn = document.getElementById('loginBtn');
const userInput = document.getElementById('userInput');
const passwordInput = document.getElementById('passwordInput');
const loggedIn = document.getElementsByClassName("loggedIn");
const rememberName = document.getElementById('rememberName');

const settingsForm = document.getElementById('settingsForm');
const closeDialogBtn = document.getElementById('closeDialogBtn');
const currentUserInput = document.getElementById('currentUserInput');
const changeUserInput = document.getElementById('changeUserInput');
const confirmUserInput = document.getElementById('confirmUserInput');
const currentPassInput = document.getElementById('currentPassInput');
const changePassInput = document.getElementById('changePassInput');
const confirmPassInput = document.getElementById('confirmPassInput');
const updateStatus = document.getElementById('updateStatus');

if(
    JSON.parse(localStorage.getItem('fillUsername')) !== null && 
    JSON.parse(localStorage.getItem('userId')) !== null
    ) {
    userInput.value = JSON.parse(localStorage.getItem('userId'));
    rememberName.checked = true;
}

tabSection.addEventListener('click', () => {
    tab1.style.backgroundColor = 'rgb(228, 216, 216)';
    tab2.style.backgroundColor = 'rgb(228, 216, 216)';
    tab3.style.backgroundColor = 'rgb(228, 216, 216)';
    tab4.style.backgroundColor = 'rgb(228, 216, 216)';
    tab5.style.backgroundColor = 'rgb(228, 216, 216)';
    if(tabBtn1.checked) {
        tab1.style.backgroundColor = 'rgb(190, 189, 189)';
        ads.style.backgroundColor = 'lightgreen';
    } else if(tabBtn2.checked) {
        tab2.style.backgroundColor = 'rgb(190, 189, 189)';
        ads.style.backgroundColor = 'lightblue';
    } else if(tabBtn3.checked) {
        tab3.style.backgroundColor = 'rgb(190, 189, 189)';
        ads.style.backgroundColor = 'lightcoral';
    } else if(tabBtn4.checked) {
        tab4.style.backgroundColor = 'rgb(190, 189, 189)';
        ads.style.backgroundColor = 'yellow';
    } else if(tabBtn5.checked) {
        tab5.style.backgroundColor = 'rgb(190, 189, 189)';
        ads.style.backgroundColor = 'grey';
    }
    tabClose1.addEventListener('click', () => {
        tabBtn1.checked = false;
        ads.style.backgroundColor = 'rgb(228, 216, 216)';
        tab1.remove();
    })
    tabClose2.addEventListener('click', () => {
        tabBtn2.checked = false;
        ads.style.backgroundColor = 'rgb(228, 216, 216)';
        tab2.remove();
    })
    tabClose3.addEventListener('click', () => {
        tabBtn3.checked = false;
        ads.style.backgroundColor = 'rgb(228, 216, 216)';
        tab3.remove();
    })
    tabClose4.addEventListener('click', () => {
        tabBtn4.checked = false;
        ads.style.backgroundColor = 'rgb(228, 216, 216)';
        tab4.remove();
    })
    tabClose5.addEventListener('click', () => {
        tabBtn5.checked = false;
        ads.style.backgroundColor = 'rgb(228, 216, 216)';
        tab5.remove();
    })
})

loginForm.addEventListener('submit', (event) => {
    event.preventDefault();
    //If no username has previously been set, save current values
    if(localStorage.getItem('userId') === null) {
        localStorage.setItem('userId', JSON.stringify(userInput.value));
        localStorage.setItem('password', JSON.stringify(passwordInput.value));
    }
    //If remember User ID box is checked, fill User ID input field on future visits
    if(rememberName.checked) {
        localStorage.setItem('fillUsername', JSON.stringify('fill'));
    } else {
        localStorage.removeItem('fillUsername');
    }
    //If User ID and Password input matches saved values, go to accounts page
    if(JSON.parse(localStorage.getItem('userId')) === userInput.value && JSON.parse(localStorage.getItem('password')) === passwordInput.value) {
        localStorage.setItem('loggedIn', JSON.stringify('yes'));
        location.href = './accounts.html';
    } else {
        alert('User ID or Password does not match, please try again.');
        userInput.focus();
    }
    userInput.value = '';
    passwordInput.value = '';
    rememberName.checked = false;
});

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
