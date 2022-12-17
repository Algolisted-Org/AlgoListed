const All_Resumes = require("../../Models/resumesModel");

const create_resume = async (req, res) => {
    const { name, company, description, resume, linkedin, codingProfiles, medium, referral, mentorship, category } = req.body;

    try {
        const result = await All_Resumes.create({
            name, company, description, resume, linkedin, codingProfiles, medium, referral, mentorship, category
        })
        res.status(200).json({ message: "Resume has been added to database." });

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Something went wrong !" });
    }
}


module.exports = { create_resume };