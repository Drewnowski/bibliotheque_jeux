// Import express & cors
let express = require('express');
let cors = require('cors')

// Initialize the app 
let app = express();

app.use(express.json());
app.use(cors());

// Importing the database model
const Sequelize = require('sequelize')
const db = require('./db.js');

// Creating all the tables defined in user
db.sync()
//db.sync({force: true})

let router = require('./routes');
app.use("/", router)

 // Launch app to listen to specified port
app.listen(8000, function () {
    console.log('Runnings on port 8000');
})