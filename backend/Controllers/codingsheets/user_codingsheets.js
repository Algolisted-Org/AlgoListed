const All_Coding_Sheets = require("../../Models/codingsheetsModel");

const get_questions = async(req,res)=>{
    All_Coding_Sheets.find({}).then((result)=>{
        res.status(200).json(result) ;
    }).catch((err)=>{
        res.status(400).json(err) ;
    }) ;
}

const get_questions_by_sheet = async(req,res)=>{
    var connectOnDomain = req.params.connectOnDomain;
    console.log(connectOnDomain);
    const result = await All_Coding_Sheets.find({}); // Make a check position here, otherwise the app crashes
    let filteredData = [];
    let len = result.length;
    console.log(result[0]);
    for(let i = 0; i<len; i++){
        if(result[i].connectOnDomain == connectOnDomain) filteredData.push(result[i]);
    }
    res.status(200).json(filteredData);
}

module.exports = { get_questions, get_questions_by_sheet };