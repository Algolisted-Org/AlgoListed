const express = require("express");
const router = express.Router();
const { default: axios } = require("axios");

const UserSheet = require("../Controllers/codingquestions/user_codingquestions");
const AdminSheet = require("../Controllers/codingquestions/admin_codingquestions");

// Get Routes ------->

router.get("/", (req, res) => {
  res.send("hello");
});

router.get("/all", (req, res) => {
  UserSheet.get_questions(req, res);
});

router.get("/question/:connectOnDomain", (req, res) => {
  UserSheet.get_questions_by_sheet(req, res);
});

// Post Routes ------->

router.post("/create", (req, res) => {
  AdminSheet.create_question(req, res);
});

router.post("/gfg", async (req, res) => {
  const url = new URL("https://practiceapi.geeksforgeeks.org/api/vr/problems/");
  url.searchParams.set("pageMode", "explore");
  url.searchParams.set("page", "1");
  if (!req.body?.company)
    return res.status(400).json({ message: "please enter company" });
  url.searchParams.set("company[]", req.body.company);
  try {
    const response = await axios.get(url.href);
    const data = await response.data;
    if(!data.results) return res.status(200).json(data.result);
    const questions = data.results.map(problem=>{
        return {
            name:problem.problem_name,
            difficulty:problem.difficulty,
            problem_url:problem.problem_url,
            tags:problem.tags.company_tags
        }
    })
    return res.status(200).send(questions);
  } catch (error) {
    console.log(error);
    return res.status(400).json(error);
  }
});

module.exports = router;
