const express = require ('express');
const cors = require ('cors');
const bodyParser = require('body-parser');
const path = require('path');
const PORT = 3230;
const app = express ();
const db = require('./Config/db.js');
// Test DB
db.authenticate()
    .then(()=> console.log('Database connected ...'))
    .catch(err=> console.log("Error : ", err))


app.get('/', (req, res)=>{
    console.log("Server.js is Listening");
    res.json("Hello");
})

// gig routes
app.use('/gigs',require('./Routes/gigsRoute') );

app.listen(PORT, (req, res)=>{
    console.log(`Server listening on ${PORT}`);
})