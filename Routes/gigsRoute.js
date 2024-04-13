const express  = require('express');
const router = express.Router();
const db = require('../Config/db');
const Gig = require('../Models/Gig')

router.get('/', (req, res)=> Gig.findAll()
    .then(gigs => {
        console.log(gigs);
        res.send(gigs);
    })
    .catch(err => console.log("Error : ", err))
);

module.exports = router;