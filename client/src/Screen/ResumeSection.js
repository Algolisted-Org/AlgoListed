import React, { useState, useEffect } from "react";
import styled from "styled-components";
import CCHeaderDarkPlus from "../Components/CCHeaderDarkPlus";
import CCHeaderPlus from "../Components/CCHeaderPlus";
import LeftMenu from "../Components/LeftMenu";
import LeftMenuDark from "../Components/LeftMenuDark";
import Markdown from "react-markdown";
import AttachmentIcon from "@material-ui/icons/Attachment";
import { Document } from "react-pdf";

import OpenAI from "openai";
import * as pdfjs from "pdfjs-dist";

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

const promptForMncQuestionChunks = [
  "Now you need to act like my mentor to help me get the job",
  "Given a resume text, provide me some vast number of technical and soft skills questions for MNCs. Keep it very much in sync with the resume, like 'say the name of the project' and then ask a technical question on the topics that, that project have used. ",
  "Create an markdown text for 10 questions. Just have two sections techical(10 2-line questions) and soft(2 3.5-line questions), and no other heading. And the questions should have a numbering on left, 1 to 10. Don't use any bold or anything. Just have h1 for heading and ol and li for questions",
  "Keep it long, and releated so that an student should really have to think about the technology details.",
  "Sample technical questions : 1. How did you implement xyz, can you tell why abc and not mn. What is a1b1 in xyz. 2. How will you optimise if xyz happens in mn. 3. Can you explain the implementation of abc function, and how would you optimise it and scale it?",
  "Sample soft questions : 1. I see you have worked in xyz, where did you get the inspiration for working with xyz. What did you learn from it, and what values you think that experience thought you which you can bring to out company. 2. How will you resolve a xyz problem with your team, .....",
  // "Create an JSON of 10 questions like 'questions': and in array ['question1 here', 'question2 here'...]",
  "The input text for resume is: ",
];
const promptForStartup = [
  "Now you need to act like my mentor to help me get the job",
  "Given a resume text, provide me some vast number of technical and soft skills questions for Startups.",
  "Create an markdown text for questions and supported links for resources.",
  "The input text is: ",
];
const promptForUnicorn = [
  "Now you need to act like my mentor to help me get the job",
  "Given a resume text, provide me some vast number of technical and soft skills questions for Unicorns.",
  "Create an markdown text for questions and supported links for resources.",
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
  "Create an markdown text for questions and supported links for resources.",
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
  const [needDarkMode, setNeedDarkMode] = useState(!false);
  const openai = new OpenAI({
    apiKey: apiKey,
    dangerouslyAllowBrowser: true,
  });
  
  useEffect(() => {
    let selectedTheme = localStorage.getItem("selectedTheme");
    if (selectedTheme === "dark") setNeedDarkMode(true);
  }, []);

  useEffect(() => {
    document.title = "Resume Based Questions | Open AI - Algolisted";
    if (textFromPDF) {
      handleSend();
    }
  }, []);

  const uploadresume = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
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
    if(selectedTheme === 'dark') setNeedDarkMode(true);
    if(selectedTheme === 'light') setNeedDarkMode(false);
  }, [])
  
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
        console.log(response);
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
        {
          needDarkMode ? <CCHeaderDarkPlus needDarkMode={needDarkMode} toggleDarkMode={toggleDarkMode} /> : <CCHeaderPlus needDarkMode={needDarkMode} toggleDarkMode={toggleDarkMode} />
        }
        {
          needDarkMode ? <LeftMenuDark marked={"resume-questions"} /> : <LeftMenu marked={"resume-questions"} />
        }
        
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
          {/* <div className="message">
                        <div className="icon"></div>
                        <div className="text">
                            Text here : We are constantly looking for good blogs. Want to be a technical content writer <a href="/">click here</a>
                        </div>
                    </div> */}




          <div className="main-container">
            <div className="main-features">
              <div className="system-inputs">
                
                <input type="file" accept=".pdf" onChange={uploadresume} />
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
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                    <option value="6">6</option>
                    <option value="7">7</option>
                    <option value="8">8</option>
                    <option value="9">9</option>
                    <option value="10">10</option>
                  </select>

                  <input
                  type="text"
                  placeholder="Enter your open API KEY here....."
                  onChange={(e) => setApiKey(e.target.value)}
                  className="api_input"
                />
                </div>
                <button className="btn-2" onClick={handleSend}>
                  Submit
                </button>
              </div>
              <div className="right-results">
                <h3>Powered by,</h3>
                <img src="https://chatgptaihub.com/wp-content/uploads/2023/06/ChatGpt-Logo-with-Black-Background.png" alt="" />
                <p>
                  We've conducted extensive research and developed highly tailored prompts to meet individual user requirements. We have invested considerable effort in prompt engineering, research, and data analysis. However, due to budget constraints, we kindly ask users to utilize their own API keys.
                </p>
              </div>
            </div>
            <Line></Line>
            <h3>AI Generated Resume Based Questions</h3>
            <div className="generated-mark-up">
              {
                responseText ? <></> : <p>No questions generated yet!</p>
              }
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
          </div>
        </div>
      </Container>
    </GrandContainer>
  );
};

export default ResumeSection;

const GrandContainer = styled.div``;

const MobContainer = styled.div`
  width: 100vw;
  @@ -72,111 +137,110 @@ const MobContainer = styled.div
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
  @media only screen and (max-width: 1099px) {
    display: none;
  }
  
  display: flex;
  justify-content: space-between;
  padding-left: 200px;

  background-color: ${(props) => (props.needDarkMode ? '#313338' : 'transparent')};

  a{
    color: ${(props) => (props.needDarkMode ? '#6d93d8' : '#18489f')};
  }

  input{
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
    .main-heading{
        font-size: 1.65rem;
        font-weight: 600;
        color: ${(props) => (props.needDarkMode ? '#e5e6e8' : '#292929')};
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

      .heading-supporter{
          font-size: 1.05rem;
          margin-bottom: 10px;
          font-weight: 400;
          color: ${(props) => (props.needDarkMode ? '#ffffffa6' : '#696168')};

          a{
            color: ${(props) => (props.needDarkMode ? '#18489f' : '#18489f')};
            font-size: 0.95rem;
            font-weight: 300;
            margin-left: 0.25rem;
          }
      }

      .message{
        display: inline-block;
        /* display: flex; */
        /* align-items: center; */
        background-color: ${(props) => (props.needDarkMode ? '#444754' : '#d5f7e1')};
        border-radius: 5px;
        padding: 10px;
        margin: 20px 0 10px 0;

        .text{
            font-size: 0.8rem;
            color: ${(props) => (props.needDarkMode ? '#b7b8ba' : '#13803b')};
            font-weight: 300;

            b{
                font-weight: 500;
                color: ${(props) => (props.needDarkMode ? '#b7b8ba' : '#13803b')};
            }
        }
      }


    .main-container{
      .main-features{
        display: flex;
        margin: 50px 20px 0 0;
  
        .system-inputs{
          display: flex;
          flex-direction: column;
          width: 50%;
          border-right: 1px solid #e6e0e0;
          padding: 10px 20px 0 0;
          color: ${(props) => (props.needDarkMode ? '#e5e5e5' : '#333')};
    
          input, select, button{
            width: 100%;
            color: ${(props) => (props.needDarkMode ? '#e5e5e5' : '#333')};
            border: 1px solid ${(props) => (props.needDarkMode ? '#595b5f' : '#bbbbbb')};
            background-color: transparent;
            border-radius: 15px;
            overflow: hidden;
            padding: 10px;
            margin-bottom: 10px;
            font-size: 0.75rem;
          }
  
          button{
            margin-bottom: 20px;
            background-color: ${(props) => (props.needDarkMode ? '#201e1e' : '#f3f4f7')};
            border: 1px solid ${(props) => (props.needDarkMode ? '#595b5f' : 'rgb(209, 213, 219)')};
          }
        }
  
        .right-results{
          flex: 1;
          padding: 10px 0 20px 20px;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
  
          img{
            height: 80px;
            width: 80px;
          }
  
          h3{
            font-weight: 500;
            color: ${(props) => (props.needDarkMode ? '#e5e5e5' : '#333')};
          }
  
          p{
            font-weight: 200;
            font-size: 0.85rem;
            color: ${(props) => (props.needDarkMode ? '#e5e5e5' : '#333')};
          }
  
        }
      }

      
      h3{
        font-weight: 500;
        color: ${(props) => (props.needDarkMode ? '#e5e5e5' : '#333')};
      }
      .generated-mark-up{
        margin-top: 10px;
       
        p{
          font-size: 0.95rem;
          font-weight: 300;
          color: ${(props) => (props.needDarkMode ? '#e5e5e5' : '#333')};
        }

        h1, h2, h3, h4, h5, h6 {
          font-size: 1.25rem;
          font-weight: 600;
          color: ${(props) => (props.needDarkMode ? '#e5e5e5' : '#333')};
          margin-top: 50px;
        }

        ul, ol{
          margin-left: 15px;
        }

        span, h1, h2, h3, h4, h5, h6, div, p, section, ol, ul, li, ul > li {
          color: ${(props) => (props.needDarkMode ? '#e5e5e5' : '#333')};
        }

        li {
          margin-top: 15px;
          font-weight: 300;
          line-height: 1.5rem;
          font-size: 0.95rem;
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
`