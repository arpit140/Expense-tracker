const express = require('express')
const router = express.Router()
const ExpenseController = require('../controller/controller')


router.get('/expenses',ExpenseController.getAllExpenses )

router.post('/expenses',ExpenseController.saveExpense )

router.put('/expenses/:id',ExpenseController.editExpense)

router.delete('/expenses/:id',ExpenseController.deleteExpense)


module.exports = router