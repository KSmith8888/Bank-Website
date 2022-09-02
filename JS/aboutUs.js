const board1 = document.getElementById('board1');
const board2 = document.getElementById('board2');
const board3 = document.getElementById('board3');
const board4 = document.getElementById('board4');
const board5 = document.getElementById('board5');
let members = [board1, board2, board3, board4, board5];
const loggedIn = document.getElementsByClassName("loggedIn");

const settingsForm = document.getElementById('settingsForm');
const closeDialogBtn = document.getElementById('closeDialogBtn');
const currentUserInput = document.getElementById('currentUserInput');
const changeUserInput = document.getElementById('changeUserInput');
const confirmUserInput = document.getElementById('confirmUserInput');
const currentPassInput = document.getElementById('currentPassInput');
const changePassInput = document.getElementById('changePassInput');
const confirmPassInput = document.getElementById('confirmPassInput');
const updateStatus = document.getElementById('updateStatus');

function loadStaticUsers() {
    let usersData = [];
    let memberNum = 0;
    fetch('Accounts/database.json')
        .then((response) => {
            return response.json()
        })
        .then((data) => {
            usersData = data.Users;
            for(const member of usersData) {
            members[memberNum].innerText = `${member.name} --- ${member.email} --- ${member.phone} --- ${member.website}`;
            memberNum++
            }
        })
}

for(let i = 0; i < 5; i++) {
fetch(`https://jsonplaceholder.typicode.com/users/${i + 1}`)
    .then((response) => {
    if(response.ok) {
        return response.json();
    } else {
        throw new Error(`Network error: ${response.status}`)
    }
    })
    .then((data) => {
    members[i].innerText = `${data.name} --- ${data.email} --- ${data.phone} --- ${data.website}`;
    })
    .catch((err) => {
    console.log(err);
    loadStaticUsers();
    });
}

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
