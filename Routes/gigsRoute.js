const express  = require('express');
const router = express.Router();
const db = require('../Config/db');
const Gig = require('../Models/Gig')



// Add a gig
router.post('/addGig', async (req, res) => {
    try {
        const data = await Gig.create(req.body);
        res.json(data);
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

router.post('/UpdateGig/:id', async (req, res)=>{
    try {
        const { id } = req.params;
        const [updated] = await Gig.update(req.body, {
            where: {id},
        });
        if(updated) {
            const updateGig = await Gig.findOne({where: {id}});
            res.json(updatedGig);
        } else {
            res.status(404).json({message: 'Gig not found'});
        }
        
    } catch (error) {
        res.status(500).json({ error: error.message});
    }
})

// Delete

router.delete('/DeleteGig/:id', async (req, res)=>{
    try {
        const { id } = req.params;
        console.log("The id from the delete request is : ", {id: id});
        const deleted = await Gig.destroy({id});
        
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