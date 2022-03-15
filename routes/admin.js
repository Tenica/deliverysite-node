const path = require('path');
const express = require('express');
const AdminController = require('../controllers/admin')

const router =  express.Router();





 //addtrack 
 router.get('/AddTrack', AdminController.getAddTrack)


//create a client-detail
router.post('/dashboard', AdminController.postTrack)




//Get all clients-detail
router.get('/dashboard', AdminController.getTrackers);


//post edited input to db
router.post('/edit', AdminController.postEditTracker);


//delete tracker detail
router.post('/deleteTrack', AdminController.postDeleteTrack)
      
    
//edit tracker detail
router.get('/edit/:trackerId', AdminController.getEditTrack)    


  
module.exports = router