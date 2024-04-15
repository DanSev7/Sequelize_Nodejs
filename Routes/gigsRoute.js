const express  = require('express');
const router = express.Router();
const db = require('../Config/db');
const Gig = require('../Models/Gig')



// Add a gig
router.post('/addGig', async (req, res) => {
    try {
        const data = req.body;
        console.log("The data inserted to the gigs table is : ", data);
        const addData = await Gig.create(data);
        console.log("Data : ", data);
        res.json(addData);
    } catch (error) {
        res.status(500).json({error: error.message});
    }   
} );

// Get Gigs list

router.get('/', async(req, res)=>{
    try {
        const Gigs = await Gig.findAll();
        res.json(Gigs);
    } catch (error) {
        res.status(500).json({error: error.message});
    }
})

// Update

router.patch('/UpdateGig', async (req, res)=>{
    try {
        const { id } = req.query;
        console.log("Id from the Updated request is : ", id);
        const updatedData = req.body;
        console.log("Updated Data is : ", updatedData);
        const updated = await Gig.update(updatedData, id);
        console.log("Updated is : ", updated);
        if(updated) {
            const updateGig = await Gig.findOne({where: {id}});
            res.json(updateGig);
        } else {
            res.status(404).json({message: 'Gig not found'});
        }
        
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: error.message});
    }
})

// Delete

router.delete('/DeleteGig', async (req, res)=>{
    try {
        const {id} = req.query;
        console.log("The id from the delete request is : ", id);
        const deleted = await Gig.destroy(id);
        
        if(deleted) {
            res.status(204).send();
        } else {
            res.status(404).json({ message: 'Gig not found'});
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
})

module.exports = router;