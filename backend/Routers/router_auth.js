const express = require("express");
const router = express.Router();

const UserAuth = require("../Controllers/auth/user_auth");


// Get Routes ------->

router.get('/' , (req,res)=>{
    res.json('You are at the auth route') ;
});

router.get('/user-signup',(req,res)=>{
    res.json('You should send a post on this route.') ;
});

router.get('/user-login',(req,res)=>{
    res.json('You should send a post on this route.') ;
});

// Post Routes ------->

router.post('/user-signup',(req,res)=>{
    UserAuth.signup(req,res);
});

router.post('/user-login',(req,res)=>{
    UserAuth.login(req,res);
});

module.exports=router;