// IMPORTS
const express = require('express')
const app = express()
require('dotenv').config()
const PORT = process.env.PORT || 3000

// // MIDDLEWARE
// app.use(express.json())
// app.use(express.urlencoded({extended: true}))
// app.use((req, res, next) => {
//   console.log(`Request made to url: ${req.url}`)
//   next()
// })

// setup database 
const mongoose = require('mongoose')
const mongoURI = process.env.MONGO_URI

// connect to mongo 
mongoose.connect(mongoURI)

const db = mongoose.connection
// optional create status messages to check mongo connection 
db.on('error', (err) => { console.log('ERROR: ' , err)})
db.on('connected', () => { console.log('mongo connected')})
db.on('disconnected', () => { console.log('mongo disconnected')})

app.get('/', (req, res) => {
   res.render(`daywin.ejs`)
})

app.listen(PORT, () => {
    console.log(`Server is listening on PORT: ${PORT}`)
})

// Index Route
app.get('/', (req, res) => {
    res.send('Welcome To Day Win.')
})

