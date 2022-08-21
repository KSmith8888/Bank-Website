const board1 = document.getElementById('board1');
const board2 = document.getElementById('board2');
const board3 = document.getElementById('board3');
const board4 = document.getElementById('board4');
const board5 = document.getElementById('board5');
let members = [board1, board2, board3, board4, board5];
const loggedIn = document.getElementsByClassName("loggedIn");

for(let i = 0; i < 5; i++) {
fetch(`https://jsonplaceholder.typicode.com/users/${i + 1}`)
.then((response) => {
    if(!response.ok) {
        throw new Error(`Network error: ${response.status}`)
    } else {
        return response.json();
    }
})
.then((data) => {
    members[i].innerText = `${data.name} --- ${data.email} --- ${data.phone} --- ${data.website}`;
})
.catch((err) => {
    console.log(err);
});
}

if(JSON.parse(localStorage.getItem('userId')) !== null) {
    for(let instance of loggedIn) {
        instance.textContent = JSON.parse(localStorage.getItem('userId'));
    }
}
