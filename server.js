// IMPORTS
const express = require('express')
const app = express()
require('dotenv').config()
const PORT = process.env.PORT || 3000
const { Task, Progress } = require('./models/daywin');
const methodOverride = require('method-override');

// MIDDLEWARE
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(express.static('public'));
app.use(methodOverride('_method'));

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

// Normal Route (Homepage)
app.get('/', (req, res) => {
    res.render('daywin.ejs');
});

// Index Route (List all tasks)
app.get('/tasks', async (req, res) => {
    const allTasks = await Task.find({});
    res.render('tasks.ejs', { Task: allTasks });
});

// Create Route (Add new task to the database)
app.post('/tasks', async (req, res) => {
    const newTask = await Task.create({
        taskName: req.body.taskName,
        dueDate: new Date(),
        status: 'Pending',
        dayResult: 'Pending'
    });
    res.redirect('/tasks');
});

// Show Route 
app.get('/tasks/:id', async (req, res) => {
    const task = await Task.findById(req.params.id);
    res.render('show.ejs', { task: task });
});

// Edit Route 
app.get('/tasks/:id/edit', async (req, res) => {
    const task = await Task.findById(req.params.id);
    res.render('edit.ejs', { task: task });
});

// Update Route 
app.put('/tasks/:id', async (req, res) => {
    const updatedTask = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.redirect(`/tasks/${updatedTask.id}`);
});

// Delete Route 
app.delete('/tasks/:id', async (req, res) => {
    await Task.findByIdAndDelete(req.params.id);
    res.redirect('/tasks');
});

// Server Listening
app.listen(PORT, () => {
    console.log(`Server is listening on PORT: ${PORT}`);
});
