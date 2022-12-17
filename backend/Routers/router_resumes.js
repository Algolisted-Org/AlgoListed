const express = require("express");
const router = express.Router();

const UserResume = require("../Controllers/resumes/user");
const AdminResume = require("../Controllers/resumes/admin");


// Get Routes ------->

router.get('/all',(req,res)=>{
    UserResume.get_resumes(req,res);
});

router.get('/id/:id',(req,res)=>{
    UserResume.get_resume_by_id(req,res);
});

// Post Routes ------->

router.post('/create',(req,res)=>{
    AdminResume.create_resume(req,res);
});

module.exports=router;