


function saveExpense() {
    
    var amount = document.getElementById('amount').value;
    var description = document.getElementById('description').value;
    var category = document.getElementById('category').value;

    
    var expense = {
        amount: amount,
        description: description,
        category: category
    };

    
    var expenses = JSON.parse(localStorage.getItem('expenses')) || [];

    
    expenses.push(expense);

    localStorage.setItem('expenses', JSON.stringify(expenses));

    
    displayExpenses();
}


function deleteExpense(index) {
    
    var expenses = JSON.parse(localStorage.getItem('expenses')) || [];

    
    expenses.splice(index, 1);

    
    localStorage.setItem('expenses', JSON.stringify(expenses));

    
    displayExpenses();
}


function editExpense(index) {
    
    var expenses = JSON.parse(localStorage.getItem('expenses')) || [];

   
    var newAmount = prompt('Enter new amount:', expenses[index].amount);
    var newDescription = prompt('Enter new description:', expenses[index].description);
    var newCategory = prompt('Enter new category:', expenses[index].category);

    
    expenses[index].amount = newAmount || expenses[index].amount;
    expenses[index].description = newDescription || expenses[index].description;
    expenses[index].category = newCategory || expenses[index].category;

    
    localStorage.setItem('expenses', JSON.stringify(expenses));

    
    displayExpenses();
}


function displayExpenses() {
    
    var expenses = JSON.parse(localStorage.getItem('expenses')) || [];

  
    var expensesList = document.getElementById('expensesList');

    
    expensesList.innerHTML = '';

    
    expenses.forEach(function (expense, index) {
        var expenseItem = document.createElement('div');
        expenseItem.innerHTML = '<strong>Amount:</strong> ' + expense.amount + ' | <strong>Description:</strong> ' + expense.description + ' | <strong>Category:</strong> ' + expense.category;

        
        var deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.onclick = function() { deleteExpense(index); };

        var editButton = document.createElement('button');
        editButton.textContent = 'Edit';
        editButton.onclick = function() { editExpense(index); };

       
        expenseItem.appendChild(deleteButton);
        expenseItem.appendChild(editButton);

        
        expensesList.appendChild(expenseItem);
    });
}


displayExpenses();
