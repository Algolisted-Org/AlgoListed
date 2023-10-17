const ProblemSheetsModel = require("../../Models/problemsheetsModel");

const createProblemSheet = async (req, res) => {
    const {
        sheetId,
        ownerId,
        sheetName,
        sheetDesc,
        lastUpdated,
    } = req.body;

    try {
        const newSheet = await ProblemSheetsModel.create({
            sheetId,
            ownerId,
            sheetName,
            sheetDesc,
            lastUpdated,
        });

        res.status(200).json({ message: "Problem sheet has been created", sheet: newSheet });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Something went wrong!" });
    }
};

const updateProblemSheet = async (req, res) => {
    const {
        sheetId,
        sheetName,
        sheetDesc,
        problemIds,
        countViews,
        countStars
    } = req.body;

    try {
        const existingSheet = await ProblemSheetsModel.findOne({ sheetId });

        if (!existingSheet) {
            return res.status(404).json({ message: "Problem sheet not found." });
        }

        // Calculate the updated timestamp
        existingSheet.lastUpdated = new Date();

        // Update the problem sheet fields if they are provided in the request
        if (sheetName) existingSheet.sheetName = sheetName;
        if (sheetDesc) existingSheet.sheetDesc = sheetDesc;
        if (problemIds) existingSheet.problemIds = problemIds;
        if (countViews !== undefined) existingSheet.countViews = countViews;
        if (countStars !== undefined) existingSheet.countStars = countStars;

        // Save the updated problem sheet
        await existingSheet.save();

        res.status(200).json({ message: "Problem sheet has been updated", sheet: existingSheet });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Something went wrong!" });
    }
};

const getProblemSheetDetails = async (req, res) => {
    const sheetId = req.params.sheetId;

    try {
        const problemSheet = await ProblemSheetsModel.findOne({ sheetId });

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

module.exports = { createProblemSheet, updateProblemSheet, getProblemSheetDetails, updateViewCount, updateStarCount };