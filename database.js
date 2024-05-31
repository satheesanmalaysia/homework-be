const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./database.sqlite'); // Path to the database file

db.serialize(() => {
    db.run(`CREATE TABLE IF NOT EXISTS Homework (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT NOT NULL,
        subject TEXT NOT NULL,
        invited_date TEXT NOT NULL,
        due_date TEXT NOT NULL,
        num_of_submissions INTEGER,
        homework_document TEXT
    )`);

    db.run(`CREATE TABLE IF NOT EXISTS Student (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        email TEXT NOT NULL,
        invited_date TEXT NOT NULL,
        status TEXT,
        download_url TEXT
    )`);

    db.serialize(() => {
        db.run("CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY AUTOINCREMENT, username TEXT UNIQUE, password TEXT, role TEXT, country TEXT)");
    });
});

module.exports = db;
