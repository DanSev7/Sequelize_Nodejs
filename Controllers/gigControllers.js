const express = require('express');
const Gig = require('../Models/Gig');

// Insert gig into the table

const addGig =  async (req, res) => {
    try {
        const data = req.body;
        console.log("The data inserted to the gigs table is : ", data);
        const addData = await Gig.create(data);
        console.log("Data : ", data);
        res.json(addData);
    } catch (error) {
        res.status(500).json({error: error.message});
    }   
} 

// Get gigs list

const getGigList = async(req, res)=>{
    try {
        const Gigs = await Gig.findAll();
        res.json(Gigs);
    } catch (error) {
        res.status(500).json({error: error.message});
    }
}

// Get a single gig

const getGig = async (req, res) => {
    const {id} = req.query;
    console.log("Id from get gig is : ", id);
    try {
        const singleGig = await Gig.findOne({id});
        res.json(singleGig);
    } catch (error) {
        res.status(500).json({error: error.message});
    }
}

// Update gig

const updateGig = async (req, res)=>{
    try {
        const { id } = req.query;
        console.log("Id from the Updated request is : ", id);
        const updatedData = req.body;
        console.log("Updated Data is : ", updatedData);
        const updated = await Gig.update(updatedData, {where: {id}});
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
}

// Delete gig 

const deleteGig = async (req, res)=>{
    try {
        const {id} = req.query;
        console.log("The id from the delete request is : ", id);
        const deleted = await Gig.destroy({where : {id}});
        
        if(deleted) {
            res.status(200).json({ success: "successfully deleted!" });
        } else {
            res.status(404).json({ message: 'Gig not found'});
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

module.exports = {
    addGig,
    getGigList,
    getGig,
    updateGig,
    deleteGig
}