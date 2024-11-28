let accountBalance = 1000.0;
const transactionHistory = [];

// Update balance on dashboard
function updateBalance() {
    const balanceElement = document.getElementById('balance');
    if (balanceElement) balanceElement.textContent = `$${accountBalance.toFixed(2)}`;
}

// Transfer Funds
function transferFunds(event) {
    event.preventDefault();
    const recipient = document.getElementById('recipient').value;
    const amount = parseFloat(document.getElementById('amount').value);

    if (amount > 0 && amount <= accountBalance) {
        accountBalance -= amount;
        transactionHistory.push({ type: 'Transfer', amount, recipient, date: new Date() });
        alert('Transfer successful!');
        updateBalance();
        document.querySelector('form').reset();
    } else {
        alert('Invalid amount or insufficient balance!');
    }
}

// Edit balance
function editBalance(event) {
    event.preventDefault();
    const newBalance = parseFloat(document.getElementById('new-balance').value);
    if (newBalance >= 0) {
        accountBalance = newBalance;
        alert('Balance updated successfully!');
        window.location.href = 'index.html';
    } else {
        alert('Invalid balance value!');
    }
}

// Display transaction history
function displayTransactions() {
    const transactionList = document.getElementById('transaction-list');
    if (transactionList) {
        transactionList.innerHTML = transactionHistory
            .map(
                t => `<li>${t.date.toLocaleString()}: $${t.amount.toFixed(2)} to ${t.recipient}</li>`
            )
            .join('');
    }
}

// On page load
document.addEventListener('DOMContentLoaded', () => {
    updateBalance();
    displayTransactions();
});
