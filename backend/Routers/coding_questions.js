const express = require("express");
const router = express.Router();

const UserSheet = require("../Controllers/codingquestions/user_codingquestions");
const AdminSheet = require("../Controllers/codingquestions/admin_codingquestions");


// Get Routes ------->

router.get('/',(req,res)=>{
    res.send("hello");
});

router.get('/all',(req,res)=>{
    UserSheet.get_questions(req,res);
});

router.get('/question/:connectOnDomain',(req,res)=>{
    UserSheet.get_questions_by_sheet(req,res);
});

// Post Routes ------->

router.post('/create',(req,res)=>{
    AdminSheet.create_question(req,res);
});

module.exports=router;