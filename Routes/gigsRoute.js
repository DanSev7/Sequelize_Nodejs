const express  = require('express');
const router = express.Router();
const db = require('../Config/db');
const Gig = require('../Models/Gig')
const {addGig, getGigList, getGig, updateGig, deleteGig} = require('../Controllers/gigControllers')



// Add a gig
router.post('/addGig',addGig );

// Get Gigs list

router.get('/', getGigList)

// Get a single Gig

router.get('/singleGig', getGig)

// Update

router.patch('/UpdateGig', updateGig )

// Delete

router.delete('/DeleteGig', deleteGig)

module.exports = router;