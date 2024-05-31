var express = require('express');
var router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const db = require("../database");
/* GET users listing. */
const SECRET_KEY = process.env.SECRET_KEY || 'rerer8343400123980';
dotenv.config();
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

const authenticateJWT = (req, res, next) => {
  const token = req.header('Authorization')?.split(' ')[1];
  if (token) {
      jwt.verify(token, SECRET_KEY, (err, user) => {
          if (err) {
              return res.sendStatus(403);
          }
          req.user = user;
          next();
      });
  } else {
      res.sendStatus(401);
  }
};

router.post('/login', (req, res) => {
  const { username, password } = req.body;
  db.get('SELECT * FROM users WHERE username = ?', [username], async (err, user) => {
      if (err) {
          return res.status(500).send('Internal server error');
      }
      if (user && await bcrypt.compare(password, user.password)) {
          const accessToken = jwt.sign({ username: user.username, role: user.role, country: user.country }, SECRET_KEY, { expiresIn: '1h' });
         
          res.json({ accessToken, username: user.username ,role: user.role ,country: user.country });
      } else {
          res.status(401).send('Username or password incorrect');
      }
  });
});

router.post('/register', async (req, res) => {
  const { username, password, role, country } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);

  db.run('INSERT INTO users (username, password, role, country) VALUES (?, ?, ?, ?)', [username, hashedPassword, role, country], (err) => {
      if (err) {
          if (err.code === 'SQLITE_CONSTRAINT') {
              return res.status(400).send('Username already exists');
          }
          return res.status(500).send('Internal server error');
      }
      res.status(201).send('User registered');
  });
});

router.get('/protected', authenticateJWT, (req, res) => {
  res.send('This is a protected route');
});

router.get('/profile', authenticateJWT, (req, res) => {
  const { username } = req.user;
  db.get('SELECT username, role, country FROM users WHERE username = ?', [username], (err, user) => {
      if (err) {
          return res.status(500).send('Internal server error');
      }
      if (user) {
          res.json(user);
      } else {
          res.status(404).send('User not found');
      }
  });
});
module.exports = router;
