const Expense = require('../models/model')

const ExpenseController = {
    getAllExpenses: (req, res) => {
        Expense.findAll()
            .then(expense => {
                res.json(expense);
            })
            .catch(err => {
                console.log('Error getting the expense', err);
                res.status(500).send('Internal server error');
            });
    },


    saveExpense: (req, res) => {
        const { amount, description, category } = req.body;
        Expense.create({
            amount,
            description,
            category,
        })
            .then(expense => {
                res.json(expense);
            })
            .catch(err => {
                console.error("Error posting expense", err);
                res.status(500).send("Internal server error");
            });
    },

    deleteExpense: (req,res) => {
        const expenseId = req.params.id
        console.log(expenseId)
    
        Expense.destroy({
            where: {
                id: expenseId
            }
        })
            .then(() => {
                res.status(204).send()
            })
            .catch(err => {
                console.log('Error deleting expense',err)
                res.status(500).send("internal server error")
            }) 
    },

    editExpense: (req,res) => {
        const expenseId = req.params.id
        const {amount,description,category} = req.body
    
        Expense.update(
            {amount, description, category},
            {where: {id: expenseId}}
        )
        .then(() => {
            res.status(200).send('Expense updated successfully')
        })
        .catch(err => {
            console.log("Errir updating expense",err)
            res.status(500).send("intermal server error")
        })
    
    }
    

}

module.exports = ExpenseController