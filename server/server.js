const http = require('http');
const fs = require('fs');
const express = require('express');
const app = express();
const path = require('path');
const PORT = 8080;

//app.use(express.static("public"));
app.use(express.static(path.join(__dirname, '../dist/streamsearch')));

app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, "../dist/streamsearch/browser/index.html"));
    console.log("Body Sent")
});

app.listen(PORT, function (err) {
    if (err) console.log(err);
    console.log("Server listening on port", PORT);
});