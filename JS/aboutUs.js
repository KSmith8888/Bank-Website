'use strict';

const ourBoard = document.getElementById('ourBoard');
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
                <details>
                <summary>Contact Info:</summary>
                <ul>
                    <li>Phone: ${member.phone}</li>
                    <li>Email: ${member.email}</li>
                    <li>Website: ${member.website}</li>
                </ul>
                </details>
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
    const locationImagePaths = ["Images/Locations/location1.jpg", "Images/Locations/location2.jpg", "Images/Locations/location3.jpg", "Images/Locations/location4.jpg", "Images/Locations/location5.jpg"];
    fetch('Accounts/database.json')
        .then((networkResponse) => {
            return networkResponse.json()
        })
        .then((data) => {
            const locationData = data.Users
            let imageIndex = 0;
            for(const location of locationData) {
                
                const rando = Math.floor(Math.random() * 100) + 100;
                ourLocations.innerHTML += `
                <div class="locationCon">
                    <div class="locationText">
                        <h3>Location #${rando}:</h3>
                        <p>${location.address.street}, ${location.address.suite}</p>
                        <p>${location.address.street} ${location.address.zipcode}</p>
                        <p>State, USA</p>
                    </div>
                    <img src="${locationImagePaths[imageIndex]}" alt="The beautiful exterior of this branch of the bank." class="locationImage">
                </div>
                `
                imageIndex++;
            }
        });
}
displayLocations()

//Sends user to homepage after clicking log out button
document.querySelector('.logOutBtn').addEventListener('click', () => {
    localStorage.removeItem('loggedIn');
    location.href = './index.html';
});
