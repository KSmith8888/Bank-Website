const productSearchForm = document.getElementById('productSearchForm');
const searchInput = document.getElementById('searchInput');
const productResults = document.getElementById('productResults');
let dataSearch = false;
let logisticsSearch = false;
let policySearch = false;

productSearchForm.addEventListener('submit', (e) => {
    e.preventDefault();
    fetch('Accounts/database.json')
        .then((networkResponse) => {
            if(networkResponse.ok) {
                return networkResponse.json();
            } else {
                throw new Error(networkResponse.status)
            } 
        })
        .then((data) => {
            const search = searchInput.value.toLowerCase();
            if(search.includes('data') && dataSearch === false) {
                const dataProducts = data.Products.Data;
                dataSearch = true;
                dataProducts.forEach((product) => {
                    productResults.innerHTML += `
                    <div class="resultCon">
                        <img src="${product.Image}" alt="${product.Alt}" class="resultImage">
                        <div class="resultItem">
                            <p class="resultTitle">${product.Title}</p>
                            <p class="resultDescription">${product.Description}</p>
                            <button class="resultBtn">Buy Now</button>
                        <div>
                    </div>`
                })
            } 
            if(search.includes('logistics') && logisticsSearch === false) {
                const logisticsProducts = data.Products.Logistics;
                logisticsSearch = true;
                logisticsProducts.forEach((product) => {
                    productResults.innerHTML += `
                    <div class="resultCon">
                        <img src="${product.Image}" alt="${product.Alt}" class="resultImage">
                        <div class="resultItem">
                            <p class="resultTitle">${product.Title}</p>
                            <p class="resultDescription">${product.Description}</p>
                            <button class="resultBtn">Buy Now</button>
                        <div>
                    </div>`
                })
            } 
            if(search.includes('policy') && policySearch === false) {
                const policyProducts = data.Products.Policy;
                policySearch = true;
                policyProducts.forEach((product) => {
                    productResults.innerHTML += `
                    <div class="resultCon">
                        <img src="${product.Image}" alt="${product.Alt}" class="resultImage">
                        <div class="resultItem">
                            <p class="resultTitle">${product.Title}</p>
                            <p class="resultDescription">${product.Description}</p>
                            <button class="resultBtn">Buy Now</button>
                        <div>
                    </div>`
                })
            }
            let resultButtons = document.querySelectorAll('.resultBtn')
            resultButtons.forEach((button) => {
                button.addEventListener('click', () => {
                    document.querySelector('#chat-box').showModal();
                    document.querySelector('#chat-input').focus();
                });
            })
        })
        .catch((error) => {
            console.error(error)
        })
});

document.querySelector('#contactBtn').addEventListener('click', () => {
    document.querySelector('#chat-box').showModal();
    if(window.innerWidth > 600) {
        document.querySelector('#chat-input').focus();
    } else {
        document.querySelector('#closeDialogBtn').focus();
    }
});
