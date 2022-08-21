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

const loginBtn = document.getElementById('loginBtn');
const userInput = document.getElementById('userInput');
const loggedIn = document.getElementsByClassName("loggedIn");

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

loginBtn.addEventListener('click', () => {
    localStorage.setItem('userId', JSON.stringify(userInput.value));
});

if(JSON.parse(localStorage.getItem('userId')) !== null) {
    for(let instance of loggedIn) {
        instance.textContent = JSON.parse(localStorage.getItem('userId'));
    }
}
