const express = require("express");
const router = express.Router();
const db = require("../database");


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

module.exports = router;
