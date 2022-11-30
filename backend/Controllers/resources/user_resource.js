const All_Resources = require("../../Models/resourcesModel");

const get_resources = async(req,res)=>{
    All_Resources.find({}).then((result)=>{
        res.status(200).json(result) ;
    }).catch((err)=>{
        res.status(400).json(err) ;
    }) ;
}

const get_resource_by_id = async(req,res)=>{
    var req_id = req.params.id;
    console.log(req_id);
    const result = await All_Resources.findById(req_id); // Make a check position here, otherwise the app crashes
    res.status(200).json(result) ;
}


module.exports = { get_resources, get_resource_by_id };