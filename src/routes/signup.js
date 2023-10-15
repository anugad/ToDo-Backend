const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const db = require('../models/userModel');


router.post('/', async (req, res) => {
  try {
    const { username, password, role } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);

    const sql = 'INSERT INTO users (username, password, role) VALUES (?, ?, ?)';
    const userData = {username, password, role};
    db.createUser(userData, (err, result) => {
      if (err) {
        console.error('Error registering user: ' + err);
        res.status(500).json({ success: false, message: 'Error registering user' });
      } else {
        res.status(200).json({ success: true, message: 'User registered successfully' });
      }
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
