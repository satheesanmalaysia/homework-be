const express = require("express");
const router = express.Router();
const db = require("../database");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const SECRET_KEY = process.env.SECRET_KEY || 'rerer8343400123980';
dotenv.config();
const allowedOrigins = [
    "http://localhost:3000",
    "https://homework-be.onrender.com/api",
    "http://homework-be.onrender.com/api",
    "https://homework-be.onrender.com/api",
    "http://homework-be.onrender.com/api",
    "http://homework-be.onrender.com",
    "https://homework-be.onrender.com",
  ];
// Homework CRUD operations
// For get api/homeworks
router.get("/homeworks", (req, res) => {
  db.all("SELECT * FROM Homework", (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    // Below Access-Control-Allow-Origin is for fixing a cors issue on render 
    // We can avoid this if we are deploying in a standard server 
 
    const origin = req.headers.origin;
    if (allowedOrigins.includes(origin)) {
      res.setHeader("Access-Control-Allow-Origin", origin);
    }
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );
    res.header("Access-Control-Allow-credentials", true);
    res.header(
      "Access-Control-Allow-Methods",
      "GET, POST, PUT, DELETE, UPDATE"
    );
    res.json({ data: rows });
  });
});

// For get api/homeworks/id
router.get("/homeworks/:id", (req, res) => {
  const { id } = req.params;
  db.get("SELECT * FROM Homework WHERE id = ?", [id], (err, row) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
     // Below Access-Control-Allow-Origin is for fixing a cors issue on render 
    // We can avoid this if we are deploying in a standard server 
      const origin = req.headers.origin;
      if (allowedOrigins.includes(origin)) {
        res.setHeader("Access-Control-Allow-Origin", origin);
      }
      res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept, Authorization"
      );
      res.header("Access-Control-Allow-credentials", true);
      res.header(
        "Access-Control-Allow-Methods",
        "GET, POST, PUT, DELETE, UPDATE"
      );
    res.json({ data: row });
  });
});

// For post api/homeworks
router.post("/homeworks", (req, res) => {
  console.log(req.body);
  const {
    title,
    subject,
    invited_date,
    due_date,
    num_of_submissions,
    homework_document,
  } = req.body;
  db.run(
    "INSERT INTO Homework (title, subject, invited_date, due_date, num_of_submissions, homework_document) VALUES (?, ?, ?, ?, ?, ?)",
    [
      title,
      subject,
      invited_date,
      due_date,
      num_of_submissions,
      homework_document,
    ],
    function (err) {
      if (err) {
        res.status(500).json({ error: err.message });
        return;
      }
       // Below Access-Control-Allow-Origin is for fixing a cors issue on render 
    // We can avoid this if we are deploying in a standard server 

      const origin = req.headers.origin;
      if (allowedOrigins.includes(origin)) {
        console.log('setting Access-Control-Allow-Origin');
        console.log(origin);
        res.setHeader("Access-Control-Allow-Origin", origin);
      }
      res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept, Authorization"
      );
      res.header("Access-Control-Allow-credentials", true);
      res.header(
        "Access-Control-Allow-Methods",
        "GET, POST, PUT, DELETE, UPDATE"
      );
      res.json({ id: this.lastID });
    }
  );
});

// For get api/homeworks/id
router.put("/homeworks/:id", (req, res) => {
  const { id } = req.params;
  const {
    title,
    subject,
    invited_date,
    due_date,
    num_of_submissions,
    homework_document,
  } = req.body;
  db.run(
    "UPDATE Homework SET title = ?, subject = ?, invited_date = ?, due_date = ?, num_of_submissions = ?, homework_document = ? WHERE id = ?",
    [
      title,
      subject,
      invited_date,
      due_date,
      num_of_submissions,
      homework_document,
      id,
    ],
    function (err) {
      if (err) {
        res.status(500).json({ error: err.message });
        return;
      }
       // Below Access-Control-Allow-Origin is for fixing a cors issue on render 
    // We can avoid this if we are deploying in a standard server 

      const origin = req.headers.origin;
      if (allowedOrigins.includes(origin)) {
        res.setHeader("Access-Control-Allow-Origin", origin);
      }
      res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept, Authorization"
      );
      res.header("Access-Control-Allow-credentials", true);
      res.header(
        "Access-Control-Allow-Methods",
        "GET, POST, PUT, DELETE, UPDATE"
      );
      res.json({ changes: this.changes });
    }
  );
});

// For delete api/homeworks/id
router.delete("/homeworks/:id", (req, res) => {
  const { id } = req.params;
  db.run("DELETE FROM Homework WHERE id = ?", [id], function (err) {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
     // Below Access-Control-Allow-Origin is for fixing a cors issue on render 
    // We can avoid this if we are deploying in a standard server 
   
      const origin = req.headers.origin;
      if (allowedOrigins.includes(origin)) {
        res.setHeader("Access-Control-Allow-Origin", origin);
      }
      res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept, Authorization"
      );
      res.header("Access-Control-Allow-credentials", true);
      res.header(
        "Access-Control-Allow-Methods",
        "GET, POST, PUT, DELETE, UPDATE"
      );
    res.json({ changes: this.changes });
  });
});

// Student CRUD operations
// For get api/students
router.get("/students", (req, res) => {
  db.all("SELECT * FROM Student", (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
     // Below Access-Control-Allow-Origin is for fixing a cors issue on render 
    // We can avoid this if we are deploying in a standard server 

      const origin = req.headers.origin;
      if (allowedOrigins.includes(origin)) {
        res.setHeader("Access-Control-Allow-Origin", origin);
      }
      res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept, Authorization"
      );
      res.header("Access-Control-Allow-credentials", true);
      res.header(
        "Access-Control-Allow-Methods",
        "GET, POST, PUT, DELETE, UPDATE"
      );
    res.json({ data: rows });
  });
});

// For get api/students/id
router.get("/students/:id", (req, res) => {
  const { id } = req.params;
  db.get("SELECT * FROM Student WHERE id = ?", [id], (err, row) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
     // Below Access-Control-Allow-Origin is for fixing a cors issue on render 
    // We can avoid this if we are deploying in a standard server 
 
      const origin = req.headers.origin;
      if (allowedOrigins.includes(origin)) {
        res.setHeader("Access-Control-Allow-Origin", origin);
      }
      res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept, Authorization"
      );
      res.header("Access-Control-Allow-credentials", true);
      res.header(
        "Access-Control-Allow-Methods",
        "GET, POST, PUT, DELETE, UPDATE"
      );
    res.json({ data: row });
  });
});

// For post  api/students
router.post("/students", (req, res) => {
  const { name, email, invited_date, status, download_url } = req.body;
  db.run(
    "INSERT INTO Student (name, email, invited_date, status, download_url) VALUES (?, ?, ?, ?, ?)",
    [name, email, invited_date, status, download_url],
    function (err) {
      if (err) {
        res.status(500).json({ error: err.message });
        return;
      }

      const origin = req.headers.origin;
      if (allowedOrigins.includes(origin)) {
        res.setHeader("Access-Control-Allow-Origin", origin);
      }
      res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept, Authorization"
      );
      res.header("Access-Control-Allow-credentials", true);
      res.header(
        "Access-Control-Allow-Methods",
        "GET, POST, PUT, DELETE, UPDATE"
      );
      res.json({ id: this.lastID });
    }
  );
});

// For update  api/students
router.put("/students/:id", (req, res) => {
  const { id } = req.params;
  const { name, email, invited_date, status, download_url } = req.body;
  db.run(
    "UPDATE Student SET name = ?, email = ?, invited_date = ?, status = ?, download_url = ? WHERE id = ?",
    [name, email, invited_date, status, download_url, id],
    function (err) {
      if (err) {
        res.status(500).json({ error: err.message });
        return;
      }

      const origin = req.headers.origin;
      if (allowedOrigins.includes(origin)) {
        res.setHeader("Access-Control-Allow-Origin", origin);
      }
      res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept, Authorization"
      );
      res.header("Access-Control-Allow-credentials", true);
      res.header(
        "Access-Control-Allow-Methods",
        "GET, POST, PUT, DELETE, UPDATE"
      );
      res.json({ changes: this.changes });
    }
  );
});

// For delete  api/students
router.delete("/students/:id", (req, res) => {
  const { id } = req.params;
  db.run("DELETE FROM Student WHERE id = ?", [id], function (err) {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }

      const origin = req.headers.origin;
      if (allowedOrigins.includes(origin)) {
        res.setHeader("Access-Control-Allow-Origin", origin);
      }
      res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept, Authorization"
      );
      res.header("Access-Control-Allow-credentials", true);
      res.header(
        "Access-Control-Allow-Methods",
        "GET, POST, PUT, DELETE, UPDATE"
      );
    res.json({ changes: this.changes });
  });
});

// This is for demonstarting a protected route 

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

// This endpoint will only accessable with valid access tocken 

router.get("/homeworksnew", authenticateJWT, (req, res) => {
  console.log('getting here')
  db.all("SELECT * FROM Homework", (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    // Below Access-Control-Allow-Origin is for fixing a cors issue on render 
    // We can avoid this if we are deploying in a standard server 
 
    const origin = req.headers.origin;
    if (allowedOrigins.includes(origin)) {
      res.setHeader("Access-Control-Allow-Origin", origin);
    }
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );
    res.header("Access-Control-Allow-credentials", true);
    res.header(
      "Access-Control-Allow-Methods",
      "GET, POST, PUT, DELETE, UPDATE"
    );
    res.json({ data: rows });
  });
});

module.exports = router;
