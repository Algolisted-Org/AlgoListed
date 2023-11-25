const ProblemSheetsModel = require("../../Models/problemsheetsModel");
// const Problem = require('../Models/sheetproblemModel'); 

const createProblemSheet = async (req, res) => {
    const {
        ownerId,
        sheetName,
        sheetDesc,
    } = req.body;

    console.log(ownerId, sheetName, sheetDesc);

    try {
        const newSheet = await ProblemSheetsModel.create({
            sheetId: "-1",
            ownerId,
            sheetName,
            sheetDesc,
            lastUpdated: new Date(),
        });

        res.status(200).json({ message: "Problem sheet has been created", sheet: newSheet });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Something went wrong!" });
    }
};

const updateProblemSheet = async (req, res) => {
    console.log("Hello from updateProblemSheet!");
    const {
        sheetId,
        sheetName,
        sheetDesc,
        problemIds,
    } = req.body;

    try {
        const existingSheet = await ProblemSheetsModel.findById( sheetId );

        if (!existingSheet) {
            return res.status(404).json({ message: "Problem sheet not found." });
        }
        
        // Calculate the updated timestamp
        existingSheet.lastUpdated = new Date();

        // Update the problem sheet fields if they are provided in the request
        if (sheetName) existingSheet.sheetName = sheetName;
        if (sheetDesc) existingSheet.sheetDesc = sheetDesc;
        if (problemIds) existingSheet.problemIds = problemIds;
        lastUpdated: new Date(),

        // Save the updated problem sheet
        await existingSheet.save();

        res.status(200).json({ message: "Problem sheet has been updated", sheet: existingSheet });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Something went wrong!" });
    }
};

const getProblemSheetDetails = async (sheetId, res) => {
    try {
        console.log(sheetId);
        const problemSheet = await ProblemSheetsModel.findById( sheetId );
        console.log(problemSheet);

        if (!problemSheet) {
            return res.status(404).json({ message: "Problem sheet not found." });
        }

        res.status(200).json({ sheet: problemSheet });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Something went wrong!" });
    }
};

const updateViewCount = async (sheetId) => {
    try {
        const result = await ProblemSheetsModel.updateOne(
            { sheetId },
            {
                $inc: { countViews: 1 } // Increment the view count by 1
            }
        );

        if (result.nModified === 0) {
            return { success: false, message: "Problem sheet not found." };
        }

        return { success: true, message: "View count updated successfully." };
    } catch (error) {
        console.error(error);
        return { success: false, message: "Something went wrong." };
    }
};

const updateStarCount = async (sheetId) => {
    try {
        const result = await ProblemSheetsModel.updateOne(
            { sheetId },
            {
                $inc: { countStars: 1 } // Increment the star count by 1
            }
        );

        if (result.nModified === 0) {
            return { success: false, message: "Problem sheet not found." };
        }

        return { success: true, message: "Like count updated successfully." };
    } catch (error) {
        console.error(error);
        return { success: false, message: "Something went wrong." };
    }
};

const getAllSheetsByOwnerId = async (ownerId) => {
    try {
        // Find all sheets with the specified ownerId
        const sheets = await ProblemSheetsModel.find({ ownerId });
        return { success: true, sheets };
    } catch (error) {
        console.error(error);
        return { success: false, message: 'Failed to retrieve sheets' };
    }
};


module.exports = { createProblemSheet, updateProblemSheet, getProblemSheetDetails, updateViewCount, updateStarCount, getAllSheetsByOwnerId };