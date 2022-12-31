const express = require("express");
const router = express.Router();

const UserBlogResource = require("../Controllers/blogresources/user_blogresources");
const AdminBlogResource = require("../Controllers/blogresources/admin_blogresources");


// Get Routes ------->

router.get('/',(req,res)=>{
    res.send("This is the blog resources get function REST API.");
});

router.get('/all',(req,res)=>{
    UserBlogResource.get_blog_resources(req,res);
});

router.get('/blog/:blogDomain',(req,res)=>{
    UserBlogResource.get_resources_by_blog(req,res);
});

// Post Routes ------->

router.post('/create',(req,res)=>{
    AdminBlogResource.create_blogresource(req,res);
});

module.exports=router;