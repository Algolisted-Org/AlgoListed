const All_Blog_Resources = require("../../Models/blogResourcesModel");

const create_blogresource = async(req,res)=>{
    const { resourceName, resourceLink, specialTag, tags, blogDomain } = req.body;
    
    try {
        const result = await All_Blog_Resources.create({
            resourceName, resourceLink, specialTag, tags, blogDomain
        })
        res.status(200).json({message : "Blog resource has been added to database."});
        
    } catch (error) {
        console.log(error);
        res.status(500).json({message : "Something went wrong !"});
    }
}


module.exports = { create_blogresource };