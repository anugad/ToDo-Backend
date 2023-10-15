// const express = require('express');
// const router = express.Router();
// const bcrypt = require('bcrypt');
// const jwt = require('jsonwebtoken');
// const db = require('../models/taskModel');


// router.post('/signin', async (req, res) => {
//   try {
//     const { username, password } = req.body;

//     // Get user from db
//     const sql = 'SELECT * FROM users WHERE username = ?';
//     db.query(sql, [username], async (err, results) => {
//       if (err) {
//         console.error('Error signing in: ' + err);
//         return res.status(500).json({ success: false, message: 'Error signing in' });
//       }


//       if (results.length === 0 || !(await bcrypt.compare(password, results[0].password))) {
//         return res.status(401).json({ success: false, message: 'Invalid credentials' });
//       }


//       const token = jwt.sign(
//         { user: { id: results[0].id, username: results[0].username, role: results[0].role } },
//         'anuga', // secret key
//         { expiresIn: '1h' }
//       );

//       res.status(200).json({ success: true, token });
//     });
//   } catch (err) {
//     console.error(err.message);
//     res.status(500).send('Server Error');
//   }
// });

// module.exports = router;































const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const db = require('../models/taskModel');

// Require the JWT secret key from the secrets.js file
const { jwtSecret } = require('../config/secrets');

// Handle user sign-in
router.post('/signin', async (req, res) => {
  try {
    const { username, password } = req.body;

    // Retrieve user from the database
    const sql = 'SELECT * FROM users WHERE username = ?';
    db.query(sql, [username], async (err, results) => {
      if (err) {
        console.error('Error signing in: ' + err);
        return res.status(500).json({ success: false, message: 'Error signing in' });
      }

      // Check if user exists
      if (results.length === 0) {
        return res.status(401).json({ success: false, message: 'User not found' });
      }

      // Verify password using bcrypt
      const hashedPassword = results[0].password;
      const passwordMatch = await bcrypt.compare(password, hashedPassword);

      if (!passwordMatch) {
        return res.status(401).json({ success: false, message: 'Invalid credentials' });
      }

      // Generate JWT token with user role
      const token = jwt.sign(
        { user: { id: results[0].id, username: results[0].username, role: results[0].role } },
        jwtSecret, // Secret key
        { expiresIn: '1h' }
      );

      res.status(200).json({ success: true, token });
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
