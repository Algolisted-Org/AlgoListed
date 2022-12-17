const All_Resumes = require("../../Models/resumesModel");

const get_resumes = async(req,res)=>{
    All_Resumes.find({}).then((result)=>{
        res.status(200).json(result) ;
    }).catch((err)=>{
        res.status(400).json(err) ;
    }) ;
}

const get_resume_by_id = async(req,res)=>{
    var req_id = req.params.id;
    console.log(req_id);
    const result = await All_Resumes.findById(req_id); // Make a check position here, otherwise the app crashes
    res.status(200).json(result) ;
}


module.exports = { get_resumes, get_resume_by_id };