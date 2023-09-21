const mongoose = require('mongoose');

// Task Schema
const taskSchema = new mongoose.Schema({
  taskName: {
    type: String,
    required: true
  },
  status: {
    type: String,
    enum: ['Pending', 'Completed'],
    default: 'Pending'
  }
});

// Progress Schema
const progressSchema = new mongoose.Schema({
  date: {
    type: Date,
    default: Date.now
  },
  dailyTimer: {
    type: Date,
    default: Date.now() + 24 * 60 * 60 * 1000 
  },
  result: {
    type: String,
    enum: ['Green Day', 'Red Day'],
    default: 'Red Day'
  }
});

// Models & Export
const Task = mongoose.model('Task', taskSchema);
const Progress = mongoose.model('Progress', progressSchema);

module.exports = { Task, Progress };

