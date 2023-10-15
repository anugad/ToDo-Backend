const mysql = require('mysql2');
const dbConfig = require('../config/dbConfig');

const db = mysql.createConnection(dbConfig);

// Create a new task
exports.createTask = (newTask, callback) => {
  db.query('INSERT INTO tasks (task) VALUES (?)', [newTask], callback);
};

// Get all tasks
exports.getTasks = (callback) => {
  db.query('SELECT * FROM tasks', callback);
};

// Update a task by ID
exports.updateTask = (taskId, updatedTaskText, callback) => {
  db.query('UPDATE tasks SET task = ? WHERE id = ?', [updatedTaskText, taskId], callback);
};

// Delete a task by ID
exports.deleteTask = (taskId, callback) => {
  db.query('DELETE FROM tasks WHERE id = ?', [taskId], callback);
};