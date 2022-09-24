# Bank-Website

A mock bank website made with HTML/CSS and vanilla JavaScript.

https://ksmith8888.github.io/Bank-Website/

## Home Page/Chat Box

- The home page has a login form that allows the user to enter a username and password following a specified pattern. After a user has logged in once, the value of their username and password are placed in localStorage and future sessions require that the entered username and password match the saved values. The username and password can be changed by clicking the settings button, which opens a dialog box with a "change account settings" form. 

- On the bottom of most pages, there is a customer service chat section. When the "Chat Now" button is clicked, a dialog box opens that allows the user to enter messages to a mock virtual agent. The agent gives responses that are pulled from a static JSON file. The users messages are checked for key words, such as "account", and if a key word was included the response will be relevant to the subject.  

## Accounts Overview/Accounts Details Pages

- Once on the accounts overview page, there is an internal transfer section that allows the user to transfer money between accounts. When a transfer is made the balances are updated on the page and saved in localStorage. For each transfer, an item is added to localStorage with the information about the transfer. Every ten seconds, an API call to the JSONPlaceholder API populates a fake advertisement with data.  

- Each account has an account details page, which shows transactions for that account. Static transaction data is first pulled from a local JSON file, then any transfers involving the account are pulled from localStorage and displayed at the top. The user can filter the transactions by type and the section is updated to only show the matching transactions.

## Mortgage Calculator Page

- The mortgage calculator page fetches interest rate information from the U.S. Department of Treasury API and uses that as the basis for the mortgage calculator data. The mortgage calculator allows the user to enter a loan amount and a down payment amount. The interest rate, APR and the monthly mortgage payment amount are then displayed under three different loans. 

## Products Page/About Us Page

- The products page includes a carousel of rotating advertisements for the various types of accounts that the bank offers. The advertisements rotate on a setInterval, with each one having unique text and images. There are tabs on top of each advertisement that allow the user to switch between them. Once a tab has been selected, the rotation ceases.  

- The about us page has a section titled "Our Board" that pulls mock member names and contact information from the JSON Placeholder API. There is also a section for "Our Locations" that includes address information fetched from a local JSON file and images. 
