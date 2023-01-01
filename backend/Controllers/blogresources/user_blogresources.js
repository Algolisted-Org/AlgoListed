const All_Blog_Resources = require("../../Models/blogResourcesModel");

const get_blog_resources = async(req,res)=>{
    All_Blog_Resources.find({}).then((result)=>{
        res.status(200).json(result) ;
    }).catch((err)=>{
        res.status(400).json(err) ;
    }) ;
}   

const get_resources_by_blog = async(req,res)=>{
    var blogDomain = req.params.blogDomain;
    console.log(blogDomain);
    const result = await All_Blog_Resources.find({}); // Make a check position here, otherwise the app crashes
    let filteredData = [];
    let len = result.length;
    console.log(result[0]);
    for(let i = 0; i<len; i++){
        if(result[i].blogDomain == blogDomain) filteredData.push(result[i]);
    }
    res.status(200).json(filteredData);
}

module.exports = { get_blog_resources, get_resources_by_blog };