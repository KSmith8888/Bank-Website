async function getInterestRateData() {
    try {
        const response = await fetch('https://api.fiscaldata.treasury.gov/services/api/fiscal_service/v2/accounting/od/avg_interest_rates?filter=record_date:eq:2022-08-31');
        if(response.ok) {
            const interestRateData = await response.json();
            console.log(interestRateData);
            interestRateData.data.forEach((rate) => {
                if(rate.security_desc === "Treasury Bills" || rate.security_desc === "Treasury Notes" || rate.security_desc === "Treasury Bonds" || rate.security_desc === "Federal Financing Bank" || rate.security_desc === "Total Marketable") {
                    document.querySelector('#interestRateInfo').innerHTML += `
                    <div class="interestRateCon">
                        <p class="interestRate">${rate.security_desc}: ${rate.avg_interest_rate_amt}</p>
                    </div>
                    `;
                }
            })
        } else {
            throw new Error(response.status);
        } 
    }
    catch(error) {
        console.error(error)
    }
}
getInterestRateData();

//Sends user to homepage after clicking log out button
document.querySelector('.logOutBtn').addEventListener('click', () => {
    localStorage.removeItem('loggedIn');
    location.href = './index.html';
});
