const All_Resources = require("../../Models/resourcesModel");

const create_resource = async(req,res)=>{
    const { title, description, tags, link, type, createdAt} = req.body;
    
    new All_Resources({
        title,
        description,
        tags,
        link,
        type,
        createdAt,
    }).save((err,result)=>{
        if(err) res.status(400).json({"err" : err , "msg": "A resources cannot be added!"}) ;
        else res.status(200).json("Resource added succesfully !!!") ; 
    })
}


module.exports = { create_resource };