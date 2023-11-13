import React, { useState, useEffect } from "react";
import styled from "styled-components";
import CCHeaderDarkPlus from "../Components/CCHeaderDarkPlus";
import CCHeaderPlus from "../Components/CCHeaderPlus";
import LeftMenu from "../Components/LeftMenu";
import LeftMenuDark from "../Components/LeftMenuDark";
import Markdown from "react-markdown";
import AttachmentIcon from "@material-ui/icons/Attachment";
import { Document } from "react-pdf";
import CloudUploadIcon from "@material-ui/icons/CloudUpload";
import CallMadeIcon from "@material-ui/icons/CallMade";
import InfoIcon from "@material-ui/icons/Info";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import ExpandLessIcon from '@material-ui/icons/ExpandLess';

import OpenAI from "openai";
import * as pdfjs from "pdfjs-dist";
import SimpleFooter from "../Components/SimpleFooter";

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

const promptForMncQuestionChunks = [
  "Now you need to act like my mentor to help me get the job",
  "Given a resume text, provide me some vast number of technical and soft skills questions for MNCs. Keep it very much in sync with the resume, like 'say the name of the project' and then ask a technical question on the topics that, that project have used. Also rate that project on scale of 10 based on the tech stack used in that project ",
  "Create an JSON text for 10 questions for example like 'questions': and in array ['question1 here', 'question2 here'...]`. Just have two sections techical(10 2-line questions) and soft(2 3.5-line questions), and no other heading. And the questions should have a numbering on left, 1 to 10. Don't use any bold or anything. Just have h1 for heading and ol and li for questions,Don't give any resuorces.",
  "Keep it long, and releated so that an student should really have to think about the technology details.",
  "Sample technical questions : 1. How did you implement xyz, can you tell why abc and not mn. What is a1b1 in xyz. 2. How will you optimise if xyz happens in mn. 3. Can you explain the implementation of abc function, and how would you optimise it and scale it?",
  "Sample soft questions : 1. I see you have worked in xyz, where did you get the inspiration for working with xyz. What did you learn from it, and what values you think that experience thought you which you can bring to out company. 2. How will you resolve a xyz problem with your team, .....",
  "Rate all the projects in scale of 10 based on the tech stack they have used for example more complex tech stack more rating.",
  "Give the ATS score of the resume as well in percentage. and Area of imporvement in the resume.",
  "The input text for resume is: ",
];
const promptForStartup = [
  "Now you need to act like my mentor to help me get the job",
  "Given a resume text, provide me some vast number of technical and soft skills questions for Startups.",

  "The input text is: ",
];
const promptForUnicorn = [
  "Now you need to act like my mentor to help me get the job",
  "Given a resume text, provide me some vast number of technical and soft skills questions for Unicorns.",

  "The input text is: ",
];
const promptForRemote = [
  "Now you need to act like my mentor to help me get the job",
  "Given a resume text,prove me some vast number of technical and soft skills question for Remote Jobs.",
  "The input text is:",
];
const promptForBasicQuestionChunks = [
  "Now you need to act like my mentor to help me get the job",
  "Given a resume text, provide me some vast number of technical and soft skills questions for the specific type of company and difficulty level  I need to prepare with and help me get the job.",
  "The input category of company ,difficuty level and text are:",
];

const ResumeSection = () => {
  const [file, setFile] = useState(null);
  const [apiKey, setApiKey] = useState(null);
  const [responseText, setResponseText] = useState("");
  const [selectedCompany, setSelectedCompany] = useState("0");
  const [companyName, setCompanyName] = useState("");
  const [difficultyLevel, setDifficultyLevel] = useState("0");
  const [difficultyLevelName, setDifficultyLevelName] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [textFromPDF, setTextFromPDF] = useState(""); // Extracted text from
  const [dummyResponse, setDummyResponse] = useState({
    technical: [
      "1. In the project SocialSphere, how did you implement the forum functionality? Can you explain the role of React JS and MongoDB in this project?",
      "2. For the project Algolisted, what technologies did you use to develop the personalized resume questionnaire feature? How did you integrate OpenAI API into the project?",
      "3. In Cryptomania, can you explain how you utilized Chartjs and API integration to provide cryptocurrency statistics and real-time news updates?",
      "4. How did you optimize the performance of the website you built for ArtBeat Entertainment? Can you mention any specific techniques or tools you used?",
      "5. In the project Sukham Resort, how did you dynamically design web pages using Reactjs and Tailwind CSS? Can you provide an example of a dynamically designed page?",
      "6. Can you explain the role of Redux in the Algolisted project? How did it enhance the user experience and performance?",
      "7. For the project SocialSphere, how did you implement the authentication and user authorization features? Which technologies did you use for this?",
      "8. In Cryptomania, how did you utilize the Rapid API and News API to fetch real-time cryptocurrency data and news updates? Can you explain the implementation?",
      "9. Can you explain the role of Netlify in the SocialSphere project? How did it contribute to the deployment and hosting of the application?",
      "10. For the project Algolisted, how did you implement the job listing feature? Can you explain the technology stack used for this?",
    ],
    soft: [
      "1. I see you have worked on the project SocialSphere. What inspired you to create a forum for history and political enthusiasts? How do you think this project aligns with your values?",
      "2. How did you handle teamwork while collaborating with the web development interns for ArtBeat Entertainment? Can you share an example of a challenge you faced and how you resolved it?",
      "3. In the project Algolisted, how did you ensure effective communication and collaboration within the team? Can you share an example of a conflict you encountered and how you resolved it?",
    ],
    project_ratings: [
      {
        project_name: "SocialSphere",
        rating: 7,
      },
      {
        project_name: "Algolisted",
        rating: 9,
      },
      {
        project_name: "Cryptomania",
        rating: 8,
      },
      {
        project_name: "ArtBeat Entertainment",
        rating: 6,
      },
      {
        project_name: "Sukham Resort",
        rating: 5,
      },
    ],
    ats_score: 85,
    improvement_areas: [
      "Add more specific achievements and responsibilities under work experience",
      "Include any relevant certifications or online courses in the education section",
      "Provide more details about the technologies and tools used in each project",
    ],
  });
  const [needDarkMode, setNeedDarkMode] = useState(!false);
  const openai = new OpenAI({
    apiKey: "",
    dangerouslyAllowBrowser: true,
  });

  useEffect(() => {
    let selectedTheme = localStorage.getItem("selectedTheme");
    if (selectedTheme === "dark") setNeedDarkMode(true);
  }, []);

  useEffect(() => {
    document.title = "Resume Based Questions | Open AI - Algolisted";
  }, []);

  const uploadresume = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
    handleTextExtraction();
    if (textFromPDF) {
      console.log("object");
      handleSend();
    }
    console.log(textFromPDF);
  };

  const handleTextExtraction = async () => {
    if (file) {
      const reader = new FileReader();
      reader.onload = async function () {
        const pdfData = new Uint8Array(reader.result);
        const pdf = await pdfjs.getDocument({ data: pdfData }).promise;
        const page = await pdf.getPage(1);
        const textContent = await page.getTextContent();
        const text = textContent.items.map((item) => item.str).join(" ");
        setTextFromPDF(text);
      };
      reader.readAsArrayBuffer(file);
    }
  };

  useEffect(() => {
    let selectedTheme = localStorage.getItem("selectedTheme");
    if (selectedTheme === "dark") setNeedDarkMode(true);
    if (selectedTheme === "light") setNeedDarkMode(false);
  }, []);

  console.log("needDarkMode : ", needDarkMode);
  const toggleDarkMode = () => {
    setNeedDarkMode(!needDarkMode);
  };

  //   New Code
  const handleSend = async () => {
    if (textFromPDF) {
      setIsLoading(true);
      try {
        // const promptForBasicQuestions = `${promptForBasicQuestionChunks.join(
        //   "\n"
        // )} category of company is ${companyName} with question difficulty level ${difficultyLevelName} ${textFromPDF}`;
        let prompt = "";

        if (companyName == "Multinational Corporation (MNC)") {
          prompt = `${promptForMncQuestionChunks.join(
            "\n"
          )}${textFromPDF} with question difficulty level ${difficultyLevelName}`;
        } else if (companyName == "Startups") {
          prompt = `${promptForStartup.join(
            "\n"
          )}${textFromPDF} with question difficulty level ${difficultyLevelName}`;
        } else if (companyName == "Unicorn") {
          prompt = `${promptForUnicorn.join(
            "\n"
          )}${textFromPDF} with question difficulty level ${difficultyLevelName}`;
        } else if (companyName == "Remote") {
          prompt = `${promptForRemote.join(
            "\n"
          )}${textFromPDF} with question difficulty level ${difficultyLevelName}`;
        } else {
          prompt = `${promptForBasicQuestionChunks.join("\n")}${textFromPDF}`;
        }
        const response = await openai.chat.completions.create({
          model: "gpt-3.5-turbo",
          messages: [
            {
              role: "system",
              content: prompt,
            },
          ],
          temperature: 0.5,
          max_tokens: 500,
        });

        setResponseText(response.choices[0].message.content);
        console.log(response.choices[0].message.content);
        console.log(responseText);
        console.log(prompt);
        setIsLoading(false);
      } catch (error) {
        console.error("Error sending message to Chat API:", error);
        setIsLoading(false);
      }
    } else {
      console.error("No text to send to Chat API.");
    }
  };

  const handleCompany = (e) => {
    setCompanyName(e.target.options[e.target.selectedIndex].text);
    setSelectedCompany(e.target.value);
  };

  const handleDifficult = (e) => {
    setDifficultyLevelName(e.target.options[e.target.selectedIndex].text);
    setDifficultyLevel(e.target.value);
  };
  const handleDrop = (e) => {
    e.preventDefault();
    const dropedFile = e.dataTransfer.files[0];
    setFile(dropedFile);
    handleTextExtraction();
    if (textFromPDF) {
      console.log("object");
      handleSend();
    }
    console.log(textFromPDF);
  };
  const handleUploadClick = () => {
    document.getElementById("fileInput").click();
  };

  return (
    <GrandContainer>
      <MobContainer>
        We are still working on Responsive Version of the website, please view
        the site with width more than 1100px, a standard laptop or tablet
        landscape.
        <img
          src="https://media4.giphy.com/media/13FrpeVH09Zrb2/giphy.gif"
          alt=""
        />
      </MobContainer>
      <Container needDarkMode={needDarkMode}>
        {needDarkMode ? (
          <CCHeaderDarkPlus
            needDarkMode={needDarkMode}
            toggleDarkMode={toggleDarkMode}
          />
        ) : (
          <CCHeaderPlus
            needDarkMode={needDarkMode}
            toggleDarkMode={toggleDarkMode}
          />
        )}
        {needDarkMode ? (
          <LeftMenuDark marked={"resume-questions"} />
        ) : (
          <LeftMenu marked={"resume-questions"} />
        )}

        {/* ---> change this all-blogs to your desired page-id */}

        <div className="cc-middle-content">
          <h1 className="main-heading">
            Resume Based Questions{" "}
            <div className="head-tag">
              Powered by Algolisted Ai{" "}
              <img
                draggable="false"
                src="https://static.wixstatic.com/media/592002_0f04cb41e098424588d09e2fba76ec65~mv2.gif"
                alt=""
              />
            </div>
          </h1>
          <p className="heading-supporter">
            Using this feature, once you've uploaded your resume, our AI
            identifies the specific qualities your target company is looking for
            and then poses questions that match those company preferences. This
            encompasses your preparation for non-technical interview rounds,
            such as HR and project-related discussions.
          </p>

          {/* <div className="main-container">
            <div className="main-features">
              <div className="system-inputs ">
                <div className="input-container">
                  <div
                    className="resume-upload"
                    onDragOver={(e) => e.preventDefault()}
                    onDragEnter={(e) => e.preventDefault()}
                    onDrop={handleDrop}
                    onClick={handleUploadClick}
                  >
                    <CloudUploadIcon />
                    <div className="text">Click to upload or drag and drop</div>
                    <input
                      type="file"
                      id="fileInput"
                      accept=".pdf"
                      style={{ display: "none" }}
                      onChange={uploadresume}
                    />
                  </div>
                </div>
                <div>
                  <select value={selectedCompany} onChange={handleCompany}>
                    <option value="0">Select Category:</option>
                    <option value="1">Multinational Corporation (MNC)</option>
                    <option value="2">Startups</option>
                    <option value="3">Unicorn</option>
                    <option value="4">Remote</option>
                  </select>
                  <select value={difficultyLevel} onChange={handleDifficult}>
                    <option value="0">Select Difficulty level:</option>
                    <option value="1">Easy</option>
                    <option value="2">Medium</option>
                    <option value="3">Hard</option>
                  </select>
                </div>
                <button className="btn-2" onClick={handleSend}>
                  Submit
                </button>
              </div>
              <div className="right-results">
                <h3>Powered by,</h3>
                <img
                  src="https://chatgptaihub.com/wp-content/uploads/2023/06/ChatGpt-Logo-with-Black-Background.png"
                  alt=""
                />
                <p>
                  We've conducted extensive research and developed highly
                  tailored prompts to meet individual user requirements. We have
                  invested considerable effort in prompt engineering, research,
                  and data analysis. However, due to budget constraints, we
                  kindly ask users to utilize their own API keys.
                </p>
              </div>
            </div>
            <Line></Line>
            <h3>AI Generated Resume Based Questions</h3>

            <div className="generated-mark-up">
              {responseText ? <></> : <p>No questions generated yet!</p>}
              {isLoading ? (
                <LoadingSection>Loading....</LoadingSection>
              ) : (
                <>
                  {file && (
                    <div>
                      <Document
                        file={file}
                        onLoadSuccess={handleTextExtraction}
                      />
                      {responseText && (
                        <div className="response-text">
                          <Markdown>{responseText}</Markdown>
                        </div>
                      )}
                    </div>
                  )}
                </>
              )}
            </div>
          </div> */}

          <div className="input-container">
            <div
              className="resume-upload"
              onDragOver={(e) => e.preventDefault()}
              onDragEnter={(e) => e.preventDefault()}
              onDrop={handleDrop}
              onClick={handleUploadClick}
            >
              <CloudUploadIcon />
              <div className="text">Click to upload or drag and drop</div>
              <input
                type="file"
                id="fileInput"
                accept=".pdf"
                style={{ display: "none" }}
                onChange={uploadresume}
              />
            </div>

            <div className="other-details">
              <h3 className="text">Additional Information</h3>
              <div className="details">
                <div className="detail">
                  <div className="text">Company Type</div>
                  <ExpandMoreIcon />
                </div>
                <div className="detail">
                  <div className="text">Interview Level</div>
                  <ExpandMoreIcon />
                </div>
              </div>
            </div>
            <div className="info">
              <h3 className="text">Choose Model</h3>
              <div className="detail">
                <div className="text">gpt-3.5-turbo</div>
                <ExpandMoreIcon />
              </div>
            </div>
            <div className="input-api-key">
              <div className="left-section">
                Generate your Free Open AI API key
                <CallMadeIcon />
              </div>
              <div className="right-section">
                <input type="text" placeholder="Enter you Open AI API key eg. sk-.... " />
              </div>
            </div>
            <div className="submit-btn">
              Generate Result
            </div>
          </div>
          <div className="main-info">
            <div className="text">
              <InfoIcon />
              We operate as an open-source company without current sponsorship, which is why it's necessary to input your API key. Rest assured, we're committed to introducing a version of the feature that doesn't require a personal API key in the near future. 
            </div>
          </div>

          <div className="display-line"></div>
          
          <div className="show-sample">
            <div className="text">Hide Sample Result</div>
            <ExpandLessIcon/>
          </div>
          <div className="ai-generated-results">
            <div className="graphs"></div>
            <div className="questions">
              <h2>Technical Questions</h2>
              <p>1. In the project SocialSphere, how did you implement the forum functionality? Can you explain the role of React JS and MongoDB in this project? </p>
              <p>2. For the project Algolisted, what technologies did you use to develop the personalized resume questionnaire feature? How did you integrate OpenAI API into the project?</p>
              <p>3. In Cryptomania, can you explain how you utilized Chartjs and API integration to provide cryptocurrency statistics and real-time news updates?</p>
              
              <h2>Soft Questions</h2>
              <p>1. I see you have worked on the project SocialSphere. What inspired you to create a forum for history and political enthusiasts? How do you think this project aligns with your values?</p>
            </div>
            <div className="stats">
              <h2>Useful Stats about Resumes</h2>
              <p>This is will be a locally generated stuff!</p>
            </div>
            <div className="stats">
              <h2>Get your Resume Reviewed by Professionals</h2>
              <p>topmate.io shit! with LLM vector database</p>
            </div>
            <div className="stats">
              <h2>Resourses for Resume</h2>
              <p>Local stuff!</p>
            </div>
          </div>

        </div>
        <SimpleFooter />
      </Container>
    </GrandContainer>
  );
};

export default ResumeSection;

const GrandContainer = styled.div``;

const MobContainer = styled.div`
  width: 100vw;
  padding: 40px;
  text-align: center;
  font-size: 2rem;
  font-weight: 500;

  img {
    width: calc(100% - 80px);
    margin: 40px;
    border-radius: 5px;
    display: block;
  }

  @media only screen and (min-width: 1099px) {
    display: none;
  }
`;

const Container = styled.div`
  position: relative;
  padding-bottom: 80px;

  @media only screen and (max-width: 1099px) {
    display: none;
  }

  .display-line{
    width: 100%;
    margin: 20px 0 30px 0;
    height: 1px;
    background-color: #404249;
  }

  display: flex;
  justify-content: space-between;
  padding-left: 200px;

  background-color: ${(props) =>
    props.needDarkMode ? "#313338" : "transparent"};

  a {
    color: ${(props) => (props.needDarkMode ? "#6d93d8" : "#18489f")};
  }

  input {
    background-color: transparent;
  }

  .cc-middle-content {
    min-height: 100vh;
    width: 100%;
    /* padding: 80px min(120px, 5vw) 50px min(120px, 5vw); */
    padding: 80px 120px 50px 120px;
    position: relative;
    width: 100%;
    max-width: 1360px;
    min-width: 850px;
    margin: auto;
    @media only screen and (max-width: 1200px) {
      padding: 80px 50px 50px 50px;
    }
    .main-heading {
      font-size: 1.65rem;
      font-weight: 600;
      color: ${(props) => (props.needDarkMode ? "#e5e6e8" : "#292929")};
      display: flex;
      align-items: center;
      .head-tag {
        display: inline;
        font-size: 0.75rem;
        font-weight: 500;
        padding: 0.25rem 0.5rem;
        padding-right: 35px;
        border-radius: 100px;
        background-color: #a5bb26;
        margin-left: 10px;

        img {
          position: absolute;
          height: 2rem;
          margin-top: -7.5px;
          margin-left: -5px;
        }
      }
    }

    .heading-supporter {
      font-size: 1.05rem;
      margin-bottom: 10px;
      font-weight: 400;
      color: ${(props) => (props.needDarkMode ? "#ffffffa6" : "#696168")};

      a {
        color: ${(props) => (props.needDarkMode ? "#18489f" : "#18489f")};
        font-size: 0.95rem;
        font-weight: 300;
        margin-left: 0.25rem;
      }
    }

    .message {
      display: inline-block;
      /* display: flex; */
      /* align-items: center; */
      background-color: ${(props) => props.needDarkMode ? "#444754" : "#d5f7e1"};
      border-radius: 5px;
      padding: 10px;
      margin: 20px 0 10px 0;

      .text {
        font-size: 0.8rem;
        color: ${(props) => (props.needDarkMode ? "#b7b8ba" : "#13803b")};
        font-weight: 300;

        b {
          font-weight: 500;
          color: ${(props) => (props.needDarkMode ? "#b7b8ba" : "#13803b")};
        }
      }
    }

    .main-container {
      .main-features {
        display: flex;
        margin: 50px 20px 0 0;

        .system-inputs {
          display: flex;
          flex-direction: column;
          width: 50%;
          border-right: 1px solid #e6e0e0;
          padding: 10px 20px 0 0;
          color: ${(props) => (props.needDarkMode ? "#e5e5e5" : "#333")};

          input,
          select,
          button {
            width: 100%;
            color: ${(props) => (props.needDarkMode ? "#e5e5e5" : "#333")};
            border: 1px solid
              ${(props) => (props.needDarkMode ? "#595b5f" : "#bbbbbb")};
            background-color: transparent;
            border-radius: 15px;
            overflow: hidden;
            padding: 10px;
            margin-bottom: 10px;
            font-size: 0.75rem;
          }

          button {
            margin-bottom: 20px;
            background-color: ${(props) =>
    props.needDarkMode ? "#201e1e" : "#f3f4f7"};
            border: 1px solid
              ${(props) =>
    props.needDarkMode ? "#595b5f" : "rgb(209, 213, 219)"};
          }
        }

        .right-results {
          flex: 1;
          padding: 10px 0 20px 20px;
          display: flex;
          flex-direction: column;
          justify-content: space-between;

          img {
            height: 80px;
            width: 80px;
          }

          h3 {
            font-weight: 500;
            color: ${(props) => (props.needDarkMode ? "#e5e5e5" : "#333")};
          }

          p {
            font-weight: 200;
            font-size: 0.85rem;
            color: ${(props) => (props.needDarkMode ? "#e5e5e5" : "#333")};
          }
        }
      }

      h3 {
        font-weight: 500;
        color: ${(props) => (props.needDarkMode ? "#e5e5e5" : "#333")};
      }
      .generated-mark-up {
        margin-top: 10px;

        p {
          font-size: 0.95rem;
          font-weight: 300;
          color: ${(props) => (props.needDarkMode ? "#e5e5e5" : "#333")};
        }

        h1,
        h2,
        h3,
        h4,
        h5,
        h6 {
          font-size: 1.25rem;
          font-weight: 600;
          color: ${(props) => (props.needDarkMode ? "#e5e5e5" : "#333")};
          margin-top: 50px;
        }

        ul,
        ol {
          margin-left: 15px;
        }

        span,
        h1,
        h2,
        h3,
        h4,
        h5,
        h6,
        div,
        p,
        section,
        ol,
        ul,
        li,
        ul > li {
          color: ${(props) => (props.needDarkMode ? "#e5e5e5" : "#333")};
        }

        li {
          margin-top: 15px;
          font-weight: 300;
          line-height: 1.5rem;
          font-size: 0.95rem;
        }
      }
    }

    .input-container {
      display: flex;
      width: 100%;
      margin-top: 50px;
      margin-bottom: 10px;
      justify-content: space-between;
      flex-wrap: wrap;

      .resume-upload {
        width: calc(25% - 10px);
        height: 100px;
        background-color: ${(props) => props.needDarkMode ? "#404249" : "#e5e5e5"};
        border-radius: 10px;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        border: 1px dashed
          ${(props) => (props.needDarkMode ? "#e5e5e5" : "#333")};

        svg {
          fill: ${(props) => (props.needDarkMode ? "#e5e5e5" : "#333")};
          font-size: 2rem;
        }

        .text {
          max-width: 150px;
          color: ${(props) => (props.needDarkMode ? "#e5e5e5" : "#333")};
          font-size: 0.75rem;
          text-align: center;
          margin-top: 5px;
          font-weight: 200;
        }
      }

      .other-details {
        width: calc(75% - 190px);
        height: 100px;
        background-color: ${(props) => props.needDarkMode ? "#404249" : "#e5e5e5"};
        border-radius: 10px;
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        justify-content: center;
        padding: 15px 15px;

        .text {
          font-size: 0.7rem;
          color: ${(props) => (props.needDarkMode ? "#e5e5e5" : "#333")};
        }

        h3 {
          font-size: 1rem !important;
          font-weight: 500;
          margin-left: 5px;
        }

        .details {
          margin-top: 10px;
          width: 100%;
          display: flex;
          align-items: center;
          /* justify-content: center; */

          .detail {
            min-width: 190px;
            height: 35px;
            width: 40%;
            background-color: ${(props) => props.needDarkMode ? "#313337" : "#d0d0d0"};
            border: 1px solid ${(props) => (props.needDarkMode ? "#56575d" : "#c3b4b4")};
            border-radius: 100px;
            margin-right: 5px;

            display: flex;
            align-items: center;
            justify-content: space-between;

            padding: 0 10px;
          }
        }

        svg {
          font-size: 1rem;
          fill: ${(props) => (props.needDarkMode ? "#e5e5e5" : "#333")};
        }
      }

      .info {
        width: 180px;
        height: 100px;
        background-color: ${(props) => props.needDarkMode ? "#404249" : "#e5e5e5"};
        border-radius: 10px;
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        justify-content: space-between;
        padding: 15px 15px;

        .text {
          font-size: 0.7rem;
          color: ${(props) => (props.needDarkMode ? "#e5e5e5" : "#333")};
        }

        h3 {
          font-size: 1rem !important;
          font-weight: 500;
          margin-left: 5px;
        }

        .detail {
          height: 35px;
          width: 100%;
          background-color: ${(props) => props.needDarkMode ? "#313337" : "#d0d0d0"};
          border: 1px solid ${(props) => (props.needDarkMode ? "#56575d" : "#c3b4b4")};
          border-radius: 100px;
          margin-right: 5px;

          display: flex;
          align-items: center;
          justify-content: space-between;

          padding: 0 10px;
        }

        svg {
          font-size: 1rem;
          fill: ${(props) => (props.needDarkMode ? "#e5e5e5" : "#333")};
        }
      }

      .input-api-key{
        width: calc(100% - 190px);
        margin-top: 10px;
        background-color: #404249;
        height: 45px;
        border-radius: 10px;
        overflow: hidden;
        padding: 5px;
        display: flex;
        align-items: center;
        justify-content: space-between;

        .left-section{
          height: 100%;
          background-color: #313337;
          border-radius: 12.5px;
          padding: 0 20px;

          display: flex;
          align-items: center;
          justify-content: center;

          svg {
            fill: ${(props) => (props.needDarkMode ? "#e5e5e5" : "#333")};
            font-size: 1rem;
            margin-left: 10px;
          }

          color: ${(props) => (props.needDarkMode ? "#e5e5e5" : "#333")};
          font-size: 0.75rem;
          text-align: center;
          font-weight: 500;
        }

        .right-section{
          flex: 1;
          border-left: 1px solid #635757;
          margin-left: 10px;
          padding: 0 0 0 10px;
          height: 100%;

          input{
            height: 100%;
            background-color: #313337;
            border-radius: 100px;
            border: none;
            width: 100%;
            color: ${(props) => (props.needDarkMode ? "#e5e5e5" : "#333")};
            font-size: 0.75rem;
            font-weight: 200;
            padding: 0 12.5px;
          }
        }
      }
      
      .submit-btn{
        width: 180px;
        margin-top: 10px;
        background-color: #404249;
        height: 45px;
        border-radius: 10px;
        border: 1px solid #c2b1b1;
        color: #333;
        display: inline-block;
        font-size: 0.85rem;
        font-weight: 300;
        text-decoration: none;
        /* text-transform: uppercase; */
        border-radius: 100px;
        background: linear-gradient(300deg,#56f238,#b3adff,#c5c5ef,#bde6ce,#56f238);
        background-size: 400% 400%;
        -webkit-animation: AnimationName 10s ease infinite;
        -moz-animation: AnimationName 10s ease infinite;
        animation: AnimationName 10s ease infinite;
        border-color: transparent;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        text-align: center;
        opacity: 0.75;
        

        a{
          color: #333; 
        }

        &:hover{
          background-color: whitesmoke;
          color: #333;
          cursor: pointer;
          transition-duration: 500ms;
          opacity: 1;
        }
      }

      @-webkit-keyframes AnimationName {
          0%{background-position:0% 50%}
          50%{background-position:100% 50%}
          100%{background-position:0% 50%}
      }

      @-moz-keyframes AnimationName {
          0%{background-position:0% 50%}
          50%{background-position:100% 50%}
          100%{background-position:0% 50%}
      }

      @keyframes AnimationName {
          0%{background-position:0% 50%}
          50%{background-position:100% 50%}
          100%{background-position:0% 50%}
      }

    }

    .main-info {
      margin-top: 10px;

      .text {
        font-size: 0.75rem;
        font-weight: 200;
        color: ${(props) => (props.needDarkMode ? "#c6c2c2" : "#333")};

        svg {
          font-size: 1rem;
          margin-bottom: -3.5px;
          margin-right: 3.5px;
          fill: ${(props) => (props.needDarkMode ? "#c6c2c2" : "#333")};
        }
      }
    }

    .show-sample{
      display: flex;
      align-items: center;
      margin-bottom: 20px;

      .text{
        font-size: 0.9rem;
        color: ${(props) => (props.needDarkMode ? "#e5e5e5" : "#333")};
      }
      
      svg{
        margin-left: 5px;
        font-size: 1.25rem;
        fill: ${(props) => (props.needDarkMode ? "#e5e5e5" : "#333")};
        
      }
    }

    .ai-generated-results{
      .graphs{
        height: 320px;
        width: 100%;
        border-radius: 10px;
        background-color: #404249;
        margin: 10px 0;
      }

      .questions{
        h2{
          color: ${(props) => (props.needDarkMode ? "#fff" : "#333")};
          font-size: 1.5rem;
          font-weight: 500;
          margin-top: 35px;
        }
        
        p{
          color: ${(props) => (props.needDarkMode ? "#e5e5e5" : "#333")};
          font-size: 0.9rem;
          font-weight: 300;
          margin: 15px 0;
        }
      }

      .stats{
        h2{
          color: ${(props) => (props.needDarkMode ? "#fff" : "#333")};
          font-size: 1.5rem;
          font-weight: 500;
          margin-top: 35px;
        }

        p{
          color: ${(props) => (props.needDarkMode ? "#e5e5e5" : "#333")};
          font-size: 0.9rem;
          font-weight: 300;
          margin: 15px 0;
        }
      }
    }
  }
`;
const LoadingSection = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 200px;
  font-size: 1.5rem;
  font-weight: 500;
  color: #000;
`;

const Line = styled.div`
  height: 1px;
  background-color: #e6e0e0;
  width: 100%;
  margin-bottom: 30px;
`;
