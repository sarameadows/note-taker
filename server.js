const express = require('express');
const app = express();
const PORT = process.env.PORT || 3001;
const fs = require('fs');
const path = require('path');

//HTML route: GET /notes should return notes.html
//HTML route: GET * should return the index.html file
//API route: GET /api/notes should read db.json and return saved notes as json
//API route: POST /api/notes should recieve a new note and save it to db.json with unique id, then return to client

app.listen(PORT, () => {
    console.log(`API server now on port ${PORT}!`);
});