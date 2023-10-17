const Problem = require("../../Models/sheetproblemModel");

const createProblem = async (problemId, quesLink, sheetId) => {
    try {
        const problem = new Problem({ problemId, quesLink, sheetId });
        await problem.save();
        return { success: true, message: 'Problem created successfully' };
    } catch (error) {
        console.error(error);
        return { success: false, message: 'Failed to create problem' };
    }
};

const getProblemsByProblemId = async (problemId) => {
    try {
        const problems = await Problem.find({ problemId });
        return { success: true, problems };
    } catch (error) {
        console.error(error);
        return { success: false, message: 'Failed to retrieve problems' };
    }
};


module.exports = { createProblem, getProblemsByProblemId };
