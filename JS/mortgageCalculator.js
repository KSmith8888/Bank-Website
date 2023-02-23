"use strict";

let currentRate = 4;
const mortgageAmountInput = document.querySelector("#mortgageAmountInput");
const downPaymentInput = document.querySelector("#downPaymentInput");

function calculatePayment(rate, term) {
    let interest = rate / 100 / 12;
    let principal = mortgageAmountInput.value - downPaymentInput.value;
    let numerator = principal * interest;
    let denominator = 1 - Math.pow(1 + interest, -term);
    let payment = numerator / denominator;
    return payment;
}

function populateMortgageData() {
    let thirtyYearRate = currentRate * 1.5;
    let fifteenYearRate = currentRate * 1.125;
    let fiveYearRate = currentRate * 1.325;
    document.querySelector(
        "#thirtyYearRate"
    ).textContent = `${thirtyYearRate.toFixed(2)}%`;
    document.querySelector("#thirtyYearApr").textContent = `${(
        thirtyYearRate * 1.05
    ).toFixed(2)}%`;
    document.querySelector(
        "#thirtyYearPayment"
    ).textContent = `$${calculatePayment(thirtyYearRate, 360).toFixed(2)}`;
    document.querySelector(
        "#fifteenYearRate"
    ).textContent = `${fifteenYearRate.toFixed(2)}%`;
    document.querySelector("#fifteenYearApr").textContent = `${(
        fifteenYearRate * 1.05
    ).toFixed(2)}%`;
    document.querySelector(
        "#fifteenYearPayment"
    ).textContent = `$${calculatePayment(fifteenYearRate, 180).toFixed(2)}`;
    document.querySelector(
        "#fiveYearRate"
    ).textContent = `${fiveYearRate.toFixed(2)}%`;
    document.querySelector("#fiveYearApr").textContent = `${(
        fiveYearRate * 1.05
    ).toFixed(2)}%`;
    document.querySelector(
        "#fiveYearPayment"
    ).textContent = `$${calculatePayment(fiveYearRate, 360).toFixed(2)}`;
}

async function getInterestRateData() {
    /*
    Get date for the last day of two months prior for treasury API call
    Most recent data that is reliably available
    */
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const currentMonth = currentDate.getMonth();
    const fetchYear = currentMonth < 2 ? currentYear - 1 : currentYear;
    let fetchMonth = 0;
    if (currentMonth === 0) {
        fetchMonth = 10;
    } else if (currentMonth === 1) {
        fetchMonth = 11;
    } else {
        fetchMonth = currentMonth - 2;
    }
    currentDate.setMonth(fetchMonth + 1);
    currentDate.setDate(1);
    currentDate.setHours(-1);

    const fetchDay = currentDate.getDate();
    try {
        const response = await fetch(
            `https://api.fiscaldata.treasury.gov/services/api/fiscal_service/v2/accounting/od/avg_interest_rates?filter=record_date:gte:${fetchYear}-${
                fetchMonth + 1
            }-${fetchDay}`
        );
        if (response.ok) {
            const interestRateData = await response.json();
            interestRateData.data.forEach((rate) => {
                if (
                    rate.security_desc === "Treasury Bills" ||
                    rate.security_desc === "Treasury Notes" ||
                    rate.security_desc === "Treasury Bonds" ||
                    rate.security_desc === "Federal Financing Bank" ||
                    rate.security_desc === "Total Marketable"
                ) {
                    document.querySelector("#interestRateInfo").innerHTML += `
                    <div class="interestRateCon">
                        <p class="interestRate">${rate.security_desc}: ${rate.avg_interest_rate_amt}</p>
                    </div>
                    `;
                    currentRate =
                        interestRateData.data[0].avg_interest_rate_amt;
                    populateMortgageData();
                }
            });
        } else {
            throw new Error(response.status);
        }
    } catch (error) {
        console.error(error);
        populateMortgageData();
    }
}
getInterestRateData();

//Sends user to homepage after clicking log out button
document.querySelector(".logOutBtn").addEventListener("click", () => {
    localStorage.removeItem("loggedIn");
    location.href = "./index.html";
});

document
    .querySelector("#calculatorForm")
    .addEventListener("submit", (event) => {
        event.preventDefault();
        populateMortgageData();
    });
