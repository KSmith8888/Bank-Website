# Bank-Website

https://ksmith8888.github.io/Bank-Website/

A mock bank website made with HTML/CSS and vanilla JavaScript. The home page has a login form that allows the user to enter a username and password following a specified pattern. After a user has logged in once, the value of their username and password are placed in localStorage and future sessions require that the entered username and password match the saved values. The username and password can be changed by clicking the settings button, which opens a dialog box with a "change account settings" form. 

Once on the accounts overview page, there is an internal transfer section that allows the user to transfer money between accounts. When a transfer is made the balances are updated on the page and saved in localStorage. For each transfer, an item is added to localStorage with the information about the transfer. Every ten seconds, an API call to the JSONPlaceholder API populates a fake advertisement with data.  

Each account has an account details page, which shows transactions for that account. Static transaction data is first pulled from a local JSON file, then any transfers involving the account are pulled from localStorage and displayed at the top. The user can filter the transactions by type and the section is updated to only show the matching transactions.   
