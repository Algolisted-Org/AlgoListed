const express = require("express");
const router = express.Router();

const UserSheet = require("../Controllers/codingsheets/user_codingsheets");
const AdminSheet = require("../Controllers/codingsheets/admin_codingsheets");


// Get Routes ------->

router.get('/',(req,res)=>{
    res.send("hello");
});

router.get('/all',(req,res)=>{
    UserSheet.get_questions(req,res);
});

router.get('/sheet/:connectOnDomain',(req,res)=>{
    UserSheet.get_questions_by_sheet(req,res);
});

// Post Routes ------->

router.post('/create',(req,res)=>{
    AdminSheet.create_question(req,res);
});

module.exports=router;