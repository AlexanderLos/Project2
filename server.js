// IMPORTS
const express = require('express')
const app = express()
require('dotenv').config()
const PORT = process.env.PORT || 3000
const { Task, Progress } = require('./models/daywin');

// // MIDDLEWARE
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(express.static('public'));

app.use((req, res, next) => {
  console.log(`Request made to url: ${req.url}`)
  next()
})

//Setup Database.
const mongoose = require('mongoose')
const mongoURI = process.env.MONGO_URI

//Connection to mongo.
mongoose.connect(mongoURI)

const db = mongoose.connection
db.on('error', (err) => { console.log('ERROR: ' , err)})
db.on('connected', () => { console.log('mongo connected')})
db.on('disconnected', () => { console.log('mongo disconnected')})

//Normal Route.
app.get('/', (req, res) => {
   res.render(`daywin.ejs`)
})

// Tasks (INDEX) Route.
app.get("/tasks", (req, res) => {
    res.render(`tasks.ejs`, {
        Task: Task
    });
});





app.listen(PORT, () => {
    console.log(`Server is listening on PORT: ${PORT}`)
})
