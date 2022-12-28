const All_Resources = require("../../Models/resourcesModel");

const create_resource = async(req,res)=>{
    const { title, description, mainTag, link, imgLink, type, createdAt, likes, report_count} = req.body;

    try {
        const result = await All_Resources.create({
            title, description, mainTag, link, imgLink, type, createdAt, likes, report_count
        })
        res.status(200).json({message : "Resource has been added to database."});
        
    } catch (error) {
        console.log(error);
        res.status(500).json({message : "Something went wrong !"});
    }
}


module.exports = { create_resource };