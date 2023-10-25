const express = require("express");
const router = express.Router();
const sheetsController = require("../Controllers/problemSheets/sheets");
const { isAuthenticatedUser } = require("../Middleware/auth");
// Get Routes ------->

router.get("/", (req, res) => {
  res.json("You are at the sheets route");
});
router.get("/get-by-owner/:ownerId", async (req, res) => {
  const { ownerId } = req.params;
  const result = await sheetsController.getAllSheetsByOwnerId(ownerId);

  if (result.success) {
    res.status(200).json({ sheets: result.sheets });
  } else {
    res.status(500).json({ message: result.message });
  }
});
router.get("/details", (req, res) => {
  const sheetId = req.query.sheetId;
  sheetsController.getProblemSheetDetails(sheetId, res);
});

// Post Routes ------->

router.post("/create", isAuthenticatedUser, (req, res) => {
  sheetsController.createProblemSheet(req, res);
});

router.post("/update", isAuthenticatedUser, (req, res) => {
  sheetsController.updateProblemSheet(req, res);
});

router.post("/increase-views", isAuthenticatedUser, async (req, res) => {
  const result = await sheetsController.updateViewCount(req.body.sheetId);
  if (result.success) {
    return res.status(200).json({ message: result.message });
  } else {
    return res.status(404).json({ message: result.message });
  }
});

router.post("/increase-stars", isAuthenticatedUser, async (req, res) => {
  const result = await sheetsController.updateStarCount(req.body.sheetId);
  if (result.success) {
    return res.status(200).json({ message: result.message });
  } else {
    return res.status(404).json({ message: result.message });
  }
});

module.exports = router;
