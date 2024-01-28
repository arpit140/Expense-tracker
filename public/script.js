
function saveExpense(event) {
    event.preventDefault();

    const amount = document.getElementById('amount').value;
    const description = document.getElementById('description').value;
    const category = document.getElementById('category').value;

    axios.post('http://localhost:3000/api/expenses', {
        amount,
        description,
        category,
    })
        .then(response => {
            
            displayExpense(response.data);
        })
        .catch(error => {
            console.error('Error saving expense:', error);
        });


}

function displayExpense(expense) {
    const expensesList = document.getElementById('expensesList');
    const expenseItem = document.createElement('li');


    const contentContainer = document.createElement('div')
    contentContainer.textContent =  `Amount: ${expense.amount}, Description: ${expense.description}, Category: ${expense.category}`
    contentContainer.id = `expense-${expense.id}`
    

    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.onclick = () => deleteExpense(expense.id); 

    
    const editButton = document.createElement('button');
    editButton.textContent = 'Edit';
    editButton.onclick = () => editExpense(expense);

    contentContainer.appendChild(deleteButton)
    contentContainer.appendChild(editButton)
   
    expenseItem.appendChild(contentContainer)
    expensesList.appendChild(expenseItem)

}


function deleteExpense(expenseId) {
    axios.delete(`http://localhost:3000/api/expenses/${expenseId}`)
        .then(response => {
           
            console.log('Expense deleted successfully');
            
            const expenseItem = document.getElementById(`expense-${expenseId}`);
            if (expenseItem) {
                expenseItem.remove();
            }
        })
        .catch(error => {
            console.error('Error deleting expense:', error);
        });
}

function editExpense(expense) {
    const amountInput = prompt('Enter new amount:', expense.amount)
    const descriptionInput = prompt("Enter new description",expense.description)
    const categoryInput = prompt("Enter new category:", expense.category)

    const updatedExpense = {
        amount: amountInput,
        description: descriptionInput,
        category: categoryInput,
    }

    axios.put(`http://localhost:3000/api/expenses/${expense.id}`, updatedExpense)
        .then(response => {
            console.log('Expense update successfully')

            const expenseItem = document.getElementById(`expense-${expense.id}`)
            if(expenseItem) {
                expenseItem.textContent = `Amount: ${updatedExpense.amount}, Description: ${updatedExpense.description}, Category: ${updatedExpense.category}`
            }
        })
        .catch(error => {
            console.log("error updating expense",error)
        })

    
 
}


window.onload = function () {
    axios.get('http://localhost:3000/api/expenses')
        .then(response => {
        
            response.data.forEach(displayExpense);
        })
        .catch(error => {
            console.error('Error fetching expenses:', error);
        });
};
