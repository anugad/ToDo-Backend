const db = require('../models/taskModel');

// Creating a new task
exports.createTask = (req, res) => {
  const newTask = req.body.task;
  db.createTask(newTask, (err, result) => {
    if (err) {
      console.error('Error adding task: ' + err);
      res.status(500).json({ success: false, message: 'Error adding task' });
    } else {
      res.status(200).json({ success: true, message: 'Task added successfully' });
    }
  });
};

// Get all tasks
exports.getTasks = (req, res) => {
  db.getTasks((err, results) => {
    if (err) {
      console.error('Error fetching tasks: ' + err);
      res.json({ success: false, message: 'Error fetching tasks' });
    } else {
      res.json({ tasks: results });
    }
  });
};

// Update a task using ID
exports.updateTask = (req, res) => {
  const taskId = req.params.id;
  const updatedTaskText = req.body.task;

  db.updateTask(taskId, updatedTaskText, (err, result) => {
    if (err) {
      console.error('Error updating task: ' + err);
      res.json({ success: false, message: 'Error updating task' });
    } else {
      res.json({ success: true, message: 'Task updated successfully' });
    }
  });
};

// Delete a task by ID
exports.deleteTask = (req, res) => {
  const taskId = req.params.id;
  db.deleteTask(taskId, (err, result) => {
    if (err) {
      console.error('Error deleting task: ' + err);
      res.json({ success: false, message: 'Error deleting task' });
    } else {
      res.json({ success: true, message: 'Task deleted successfully' });
    }
  });
};