let accountBalance = 1000.0;
const transactionHistory = [];

// Update Balance
function updateBalance() {
    const balanceElement = document.getElementById('balance');
    if (balanceElement) {
        const total = transactionHistory.reduce((sum, t) => sum + t.amount, 0);
        accountBalance = total;
        balanceElement.textContent = `$${accountBalance.toFixed(2)}`;
    }
}

// Add Transaction
function addTransaction(event) {
    event.preventDefault();
    const recipient = document.getElementById('transaction-recipient').value;
    const amount = parseFloat(document.getElementById('transaction-amount').value);

    if (recipient && amount) {
        transactionHistory.push({ recipient, amount });
        alert('Transaction added successfully!');
        updateTransactionList();
        updateBalance();
        document.getElementById('transaction-form').reset();
    }
}

// Update Transaction List (Both Dashboard & Editor)
function updateTransactionList() {
    const transactionList = document.getElementById('transaction-list');
    const editableList = document.getElementById('editable-transaction-list');

    const html = transactionHistory.map(
        (t, index) =>
            `<li>${t.recipient}: $${t.amount.toFixed(2)} 
            <button onclick="deleteTransaction(${index})">Delete</button></li>`
    );

    if (transactionList) transactionList.innerHTML = html.join('');
    if (editableList) editableList.innerHTML = html.join('');

    if (transactionHistory.length === 0) {
        if (transactionList) transactionList.innerHTML = '<li>No transactions yet.</li>';
        if (editableList) editableList.innerHTML = '<li>No transactions yet.</li>';
    }
}

// Delete Transaction
function deleteTransaction(index) {
    transactionHistory.splice(index, 1);
    alert('Transaction deleted successfully!');
    updateTransactionList();
    updateBalance();
}

// Clear All Transactions
function clearTransactions() {
    transactionHistory.length = 0;
    alert('All transactions cleared!');
    updateTransactionList();
    updateBalance();
}

// Redirect to Pages
function redirectTo(url) {
    window.location.href = url;
}

// Initialize Page
document.addEventListener('DOMContentLoaded', () => {
    updateBalance();
    updateTransactionList();
});
