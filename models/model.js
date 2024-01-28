const Sequelize = require('sequelize')

const sequelize = new Sequelize('expenses', 'root', '7488552785aA@', {
    host: 'localhost',
    dialect: 'mysql'
});

const Expense = sequelize.define('expense', {
    amount: Sequelize.INTEGER,
    description: Sequelize.STRING,
    category: {
        type: Sequelize.ENUM('movies', 'shopping', 'food', 'travel'),
        allowNull: false
    }
});

sequelize.sync()
    .then(() => {
        console.log("Database and table created")
    })
    .catch(err => console.log("Error syncing the database", err))

module.exports = Expense