const All_Coding_Sheets = require("../../Models/codingsheetsModel");

const get_questions = async(req,res)=>{
    All_Coding_Sheets.find({}).then((result)=>{
        res.status(200).json(result) ;
    }).catch((err)=>{
        res.status(400).json(err) ;
    }) ;
}

module.exports = { get_questions };