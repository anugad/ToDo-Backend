const mysql = require('mysql2');
const dbConfig = require('../config/dbConfig');

const db = mysql.createConnection(dbConfig);

// Create a new user
exports.createUser = (userData, callback) => {
  db.query('INSERT INTO users (username, password, role) VALUES (?, ?, ?)', [userData.username, userData.password, userData.role], callback);
};

// Find a user by username
exports.getUserByUsername = (username, callback) => {
  db.query('SELECT * FROM users WHERE username = ?', [username], callback);
};

// Find a user by ID
exports.getUserById = (userId, callback) => {
  db.query('SELECT * FROM users WHERE id = ?', [userId], callback);
};
