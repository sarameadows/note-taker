const express = require('express');
const app = express();
const PORT = process.env.PORT || 3001;
const fs = require('fs');
const path = require('path');
const uniqid = require('uniqid');

const db = require('./db/db.json');

//parse incoming string or array ata
app.use(express.urlencoded({ extended: true }));
//parse incoming JSON ata
app.use(express.json());
//make javascript and css files easily accessible
app.use(express.static('public'));

app.get('/', (req,res) => {
    res.sendFile(path.join(__dirname, './public/index.html'));
});

//HTML route: GET /notes should return notes.html
app.get('/notes', (req,res) => {
    res.sendFile(path.join(__dirname, './public/notes.html'));
});

//API route: GET /api/notes should read db.json and return saved notes as json
app.get('/api/notes', (req,res) => {
    res.json(db);
});

// API route: POST /api/notes should recieve a new note and save it to db.json with unique id, then return to client
app.post('/api/notes', (req,res) => {
    req.body["id"] = uniqid();
    db.push(req.body);
    console.log(db);
    fs.writeFile('./db/db.json', JSON.stringify(db), err => {
        if (err) {
            console.log(err)
        }
        res.json(db);
    });
});

//HTML route: GET * should return the index.html file
app.get('*', (req,res) => {
    res.sendFile(path.join(__dirname, './public/index.html'));
});

app.listen(PORT, () => {
    console.log(`API server now on port ${PORT}!`);
});