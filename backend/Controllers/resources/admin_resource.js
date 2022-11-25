const create_resource = async(req,res)=>{
    const { title, desc } = req.body;

    res.status(200).json(`We created a resource, title : ${title}, desc : ${desc}`);
}


module.exports = { create_resource };