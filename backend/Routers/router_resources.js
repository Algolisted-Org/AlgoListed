const express = require("express");
const router = express.Router();

const UserResource = require("../Controllers/resources/user_resource");
const AdminResource = require("../Controllers/resources/admin_resource");


// Get Routes ------->

router.get('/',(req,res)=>{
    res.json('Showing all resources . . .') ;
});

router.get('/:id',(req,res)=>{
    var required_id = req.params.id;
    res.json(`Showing a specific resource ${required_id} . . .`) ;
});

// Post Routes ------->

router.post('/create',(req,res)=>{
    AdminResource.create_resource(req,res);
});

module.exports=router;