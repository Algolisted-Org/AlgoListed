const express = require("express");
const router = express.Router();
const sheetsController = require("../Controllers/problemSheets/sheets");

// Get Routes ------->

router.get('/', (req, res) => {
    res.json('You are at the sheets route');
});

router.get('/details/:sheetId', (req, res) => {
    const sheetId = req.params.sheetId;
    sheetsController.getProblemSheetDetails(sheetId, res);
});

// Post Routes ------->

router.post('/create', (req, res) => {
    sheetsController.createProblemSheet(req, res);
});

router.post('/update', (req, res) => {
    sheetsController.updateProblemSheet(req, res);
});

router.post('/increase-views', async (req, res) => {
    const result = await sheetsController.updateViewCount(req.body.sheetId);
    if (result.success) {
        return res.status(200).json({ message: result.message });
    } else {
        return res.status(404).json({ message: result.message });
    }
});

router.post('/increase-stars', async (req, res) => {
    const result = await sheetsController.updateStarCount(req.body.sheetId);
    if (result.success) {
        return res.status(200).json({ message: result.message });
    } else {
        return res.status(404).json({ message: result.message });
    }
});

module.exports = router;
