'use strict';

const loggedIn = document.getElementsByClassName("loggedIn");
const ourBoard = document.getElementById('ourBoard');
const settingsForm = document.getElementById('settingsForm');
const closeDialogBtn = document.getElementById('closeDialogBtn');
const currentUserInput = document.getElementById('currentUserInput');
const changeUserInput = document.getElementById('changeUserInput');
const confirmUserInput = document.getElementById('confirmUserInput');
const currentPassInput = document.getElementById('currentPassInput');
const changePassInput = document.getElementById('changePassInput');
const confirmPassInput = document.getElementById('confirmPassInput');
const updateStatus = document.getElementById('updateStatus');
const ourLocations = document.getElementById('ourLocations');

function loadStaticUsers() {
    let usersData = [];
    fetch('Accounts/database.json')
        .then((response) => {
            return response.json()
        })
        .then((data) => {
            usersData = data.Users;
            for(const member of usersData) {
                ourBoard.innerHTML += `
                <div class="memberCon">
                    <p>${member.name}</p>
                    <p>Contact Info:</p>
                    <ul>
                        <li>Phone: ${member.phone}</li>
                        <li>Email: ${member.email}</li>
                        <li>Website: ${member.website}</li>
                    </ul>
                </div>
                `;
            }
        })
}

function displayBoard() {
fetch(`https://jsonplaceholder.typicode.com/users`)
    .then((response) => {
    if(response.ok) {
        return response.json();
    } else {
        throw new Error(`Network error: ${response.status}`)
    }
    })
    .then((data) => {
        for(const member of data) {
            ourBoard.innerHTML += `
            <div class="memberCon">
                <p>${member.name}</p>
                <p>Contact Info:</p>
                <ul>
                    <li>Phone: ${member.phone}</li>
                    <li>Email: ${member.email}</li>
                    <li>Website: ${member.website}</li>
                </ul>
            </div>
            `;
        }
    })
    .catch((err) => {
    console.log(err);
    loadStaticUsers();
    });
}
displayBoard()

function displayLocations() {
    fetch('Accounts/database.json')
        .then((networkResponse) => {
            return networkResponse.json()
        })
        .then((data) => {
            const locationData = data.Users
            for(const location of locationData) {
                const rando = Math.floor(Math.random() * 100) + 100;
                ourLocations.innerHTML += `
                <div class="locationCon">
                    <h3>Location #${rando}:</h3>
                    <p>${location.address.street}, ${location.address.suite}</p>
                    <p>${location.address.street} ${location.address.zipcode}</p>
                    <p>State, USA</p>
                </div>
                `
            }
        });
}
displayLocations()

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
