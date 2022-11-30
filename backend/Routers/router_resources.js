const express = require("express");
const router = express.Router();

const UserResource = require("../Controllers/resources/user_resource");
const AdminResource = require("../Controllers/resources/admin_resource");


// Get Routes ------->

router.get('/all',(req,res)=>{
    UserResource.get_resources(req,res);
});

router.get('/id/:id',(req,res)=>{
    UserResource.get_resource_by_id(req,res);
});

// Post Routes ------->

router.post('/create',(req,res)=>{
    AdminResource.create_resource(req,res);
});

module.exports=router;