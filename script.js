let accountBalance = 1000.0;
const transactionHistory = [];
const exchangeRates = {
    USD: 1,
    GBP: 0.75
};

// Update balance on all pages
function updateBalanceDisplay() {
    const balanceElement = document.getElementById('balance');
    const currency = document.getElementById('currency')?.value || 'USD';
    const rate = exchangeRates[currency];
    const convertedBalance = accountBalance * rate;

    if (balanceElement) {
        balanceElement.textContent = `${currency === 'USD' ? '$' : '£'}${convertedBalance.toFixed(2)}`;
    }
}

// Edit Balance
function editBalance(event) {
    event.preventDefault();
    const newBalance = parseFloat(document.getElementById('new-balance').value);
    const rate = parseFloat(document.getElementById('currency-rate').value);

    if (!isNaN(newBalance)) {
        accountBalance = newBalance / rate;
        alert('Balance updated successfully!');
        redirectTo('index.html');
    } else {
        alert('Please enter a valid balance!');
    }
}

// Add Transaction
function addTransaction(event) {
    event.preventDefault();
    const recipient = document.getElementById('recipient').value;
    const amount = parseFloat(document.getElementById('amount').value);

    if (recipient && !isNaN(amount)) {
        transactionHistory.push({ recipient, amount });
        updateTransactionList();
        updateBalance();
        alert('Transaction added successfully!');
        document.getElementById('recipient').value = '';
        document.getElementById('amount').value = '';
    }
}

// Update Transaction List
function updateTransactionList() {
    const transactionList = document.getElementById('transaction-list');
    const editableList = document.getElementById('editable-transaction-list');

    const listItems = transactionHistory.map(
        (t, i) => `<li>${t.recipient}: $${t.amount.toFixed(2)}
                    <button onclick="deleteTransaction(${i})">Delete</button></li>`
    );

    if (transactionList) transactionList.innerHTML = listItems.join('') || '<li>No transactions yet.</li>';
    if (editableList) editableList.innerHTML = listItems.join('') || '<li>No transactions yet.</li>';
}

// Delete Transaction
function deleteTransaction(index) {
    transactionHistory.splice(index, 1);
    updateTransactionList();
    updateBalance();
    alert('Transaction deleted successfully!');
}

// Redirect Function
function redirectTo(url) {
    window.location.href = url;
}

// Initialize Page
