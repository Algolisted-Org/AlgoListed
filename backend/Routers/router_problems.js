const express = require("express");
const router = express.Router();

const SheetProblem = require("../Controllers/sheetproblem/problem");

router.get('/get-by-problem/:problemId', async (req, res) => {
    const problemId = req.params.problemId;

    const result = await SheetProblem.getProblemsByProblemId(problemId);

    if (result.success) {
        res.status(200).json({ problems: result.problems });
    } else {
        res.status(500).json({ message: result.message });
    }
});

router.get('/get-by-sheet/:sheetId', async (req, res) => {
    const sheetId = req.params.sheetId;

    const result = await SheetProblem.getAllProblemsBySheetId(sheetId);

    if (result.success) {
        res.status(200).json({ problems: result.problems });
    } else {
        res.status(500).json({ message: result.message });
    }
});

router.post('/create', async (req, res) => {
    const { problemId, quesLink, sheetId } = req.body;

    const result = await SheetProblem.createProblem(problemId, quesLink, sheetId);

    if (result.success) {
        res.status(201).json({ message: result.message });
    } else {
        res.status(500).json({ message: result.message });
    }
});

module.exports = router;
