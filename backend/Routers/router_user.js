const express = require("express");
const router = express.Router();

const updateProfile = require("../Controllers/userprofile/profile");


// Get Routes ------->

router.get('/' , (req,res)=>{
    res.json('You are at the user detail route') ;
});

router.get('/profile-details' , (req,res)=>{
    const email = req.body.email;
    updateProfile.getUserProfile(email,res);
});

// Post Routes ------->

router.post('/profile-create',(req,res)=>{
    updateProfile.createUserProfile(req,res);
});

router.post('/profile-update', (req, res) => {
    updateProfile.updateUserProfile(req, res);
});

module.exports=router;