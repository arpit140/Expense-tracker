const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
// const Sequelize = require('sequelize')
const port = 3000
const app = express()
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const expenseRoutes = require('./router/routes')


app.use(cors())


app.use('/api', expenseRoutes)
app.use(express.static('public'))


app.listen(port, (err) => {
    if (err) {
        console.log("Server is not running", err);
    }
    console.log("Server is running on port:", port);
});
