const express = require("express");
const router = express.Router();
const fs = require("fs");
const multer = require("multer");
const pdf = require("pdf-parse");
const { OpenAI } = require("openai");
const OPENAI_KEY = "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";
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

const promptForBasicQuestionChunks = [
  "Now you need to act like my mentor/personal coach to help me get an IT-job, give me some info that will help me in the interview.",
  "Given a resume text, 1. Firstly give a intro for the user that he can say in the introduce yourself round in the interview -a concise and focused summary that highlights your relevant work experience, key skills, and accomplishments. Start with a brief introduction of your name and current role, then provide a concise overview of your professional background, mentioning a few career highlights that align with the job you're applying for. Avoid personal details and keep the response professional and job-oriented, setting a positive tone for the rest of the interview. ",
  "2. A short explaination of each project, it should be in star format. (Situation: Set the scene and give the necessary details of your example. Task: Describe what your responsibility was in that situation. Action: Explain exactly what steps you took to address it. Result: Share what outcomes your actions achieved.) - don't give anything just give outlines",
  "3. Provide me some vast number of technical questions from my projects that I made, like why did I use React router, why not xyz instead or something more technical but related to the resume text. The questions should vary, from surface, very technical inside the topic, to scalable to database, to ml model etc",
  "4. And some soft skills questions, related to my resume like why did I volunteer something, what learnings did I get or something like why is your cgpa good/bad, what subjects are you bad at < 8 is bad, < 9 is averagish, 9+ is good ",
  "Questions point 3 and 4 : Give 10 questions from the projects and 5 from soft skill. Don't give very common questions, try to deep dive into the resume text and create some questions very related to them. The project questions should be very detailed to the tech, at least 2-3 lines long.",
  "Ask questions like, In your project of creating a dashboard for blog analytics visualization, what tools or libraries did you use for data visualization?, why did you use this and not that, explain xyz - how did you implement it - where did you store it, how would you increase the efficiency, how would you scale etc. Try to go deep into tech, like if a person is using react js then go to terminologies like react router, async-await etc, if a person used ml then go to things like regression, accuracy etc - basically go a bit deep into the topic just like an interviewer.",
  "Create an markdown text for questions. Keep point 1-2 a bit short and 3-4 comparativly long. Don't give links, give only questions. Heading in h6 and questions in <p>",
  "The input: ",
];

const promptForCompaniesScoreChunks = [
  "Act as my company eligibility checker.",
  "You are required to provide me companies im eligible for in terms of score between 1 to 100.",
  "the companies are amazon, google,microsoft, adobe, adobe and zoho",
  "produce the output in markdown format like - {Company} {Score}.",
  "make sure the output is in consistent format.",
  "here's text:",
];

router.post("/resume-questions", upload.single("file"), async (req, res) => {
  console.log("mark position - 1");
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
    console.log("mark position - 2");
    const reader = fs.readFileSync(path);
    const data = await pdf(reader);
    
    const promptForBasicQuestions = `${promptForBasicQuestionChunks.join(
      "\n"
    )}${data.text}`;

    const promptForCompaniesScoreQuestions = `${promptForCompaniesScoreChunks.join(
      "\n"
    )}${data.text}`;
    
    const aiCompletionForBasicQuestions = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      temperature: 0.5,
      messages: [
        {
          role: "system",
          content: promptForBasicQuestions,
        },
      ],
      max_tokens: 1000, //length of data you want
    });
    console.log("mark position - 3");
    // const aiCompletionForCompaniesScore = await openai.chat.completions.create({
    //   model: "gpt-3.5-turbo",
    //   temperature: 0.7,
    //   messages: [
    //     {
    //       role: "system",
    //       content: promptForCompaniesScoreQuestions,
    //     },
    //   ],
    //   max_tokens: 800, //length of data you want
    // });

    responsePayload.data = {
      basicQuestions: aiCompletionForBasicQuestions.choices[0].message.content,
      // companies: aiCompletionForCompaniesScore.choices[0].message.content
    };

    console.log("mark position - 4");
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
  console.log("mark position - 5");
  return res.status(responsePayload.success ? 200 : 400).json(responsePayload);
});

module.exports = router;
