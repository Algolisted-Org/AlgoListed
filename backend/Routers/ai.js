const express = require("express");
const router = express.Router();
const fs = require("fs");
const multer = require("multer");
const pdf = require("pdf-parse");
const { OpenAI } = require("openai");
const OPENAI_KEY =
  process.env.OPENAI_KEY ??
  "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";
const openai = new OpenAI({ apiKey: OPENAI_KEY });
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});
const upload = multer({ storage: storage });
const promptChunks = [
  "Now you need to act like my mentor to help me get the job",
  "Given a resume text, provide me some vast number of technical and soft skills questions i need to prepare with and help me get the job.",
  "Create an markdown text for questions and supported links for resources.",
  "The input:",
];

router.post("/resume-questions", upload.single("file"), async (req, res) => {
  if (!req?.file) {
    return res.status(400).json({ message: "unable to upload file" });
  }
  const path = `uploads/${req.file.filename}`;
  const responsePayload = {
    error: null,
    success: false,
    data: null,
  };
  try {
    const reader = fs.readFileSync(path);
    const data = await pdf(reader);
    const prompt = `${promptChunks.join("\n")}${data.text}`;
    const aiCompletion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      temperature: 0.7,
      messages: [
        {
          role: "system",
          content: prompt,
        },
      ],
      max_tokens: 500, //length of data you want
    });
    responsePayload.data = aiCompletion.choices[0].message.content;
    responsePayload.success = true;
  } catch (error) {
    console.log(error);
    responsePayload.error = error;
  } finally {
    fs.unlink(path, (err) => {
      if (err) console.log("unable to delete file");
      else console.log("file successfully deleted");
    });
  }
  return res.status(responsePayload.success ? 200 : 400).json(responsePayload);
});

module.exports = router;
