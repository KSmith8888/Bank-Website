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

tabSection.addEventListener('click', () => {
    tab1.style.backgroundColor = 'rgb(228, 216, 216)';
    tab2.style.backgroundColor = 'rgb(228, 216, 216)';
    tab3.style.backgroundColor = 'rgb(228, 216, 216)';
    tab4.style.backgroundColor = 'rgb(228, 216, 216)';
    tab5.style.backgroundColor = 'rgb(228, 216, 216)';
    if(tabBtn1.checked) {
        tab1.style.backgroundColor = 'rgb(184, 168, 168)';
        ads.style.backgroundColor = 'lightgreen';
    } else if(tabBtn2.checked) {
        tab2.style.backgroundColor = 'rgb(184, 168, 168)';
        ads.style.backgroundColor = 'lightblue';
    } else if(tabBtn3.checked) {
        tab3.style.backgroundColor = 'rgb(184, 168, 168)';
        ads.style.backgroundColor = 'lightcoral';
    } else if(tabBtn4.checked) {
        tab4.style.backgroundColor = 'rgb(184, 168, 168)';
        ads.style.backgroundColor = 'yellow';
    } else if(tabBtn5.checked) {
        tab5.style.backgroundColor = 'rgb(184, 168, 168)';
        ads.style.backgroundColor = 'grey';
    }
    tabClose1.addEventListener('click', () => {
        tab1.remove();
    })
    tabClose2.addEventListener('click', () => {
        tab2.remove();
    })
    tabClose3.addEventListener('click', () => {
        tab3.remove();
    })
    tabClose4.addEventListener('click', () => {
        tab4.remove();
    })
    tabClose5.addEventListener('click', () => {
        tab5.remove();
    })
})
