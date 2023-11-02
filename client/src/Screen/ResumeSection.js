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

// New Code
const API_KEY = "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";
const promptForBasicQuestionChunks = [
  "Now you need to act like my mentor to help me get the job",
  "Given a resume text, provide me some vast number of technical and soft skills questions i need to prepare with and help me get the job.",
  "Create an markdown text for questions and supported links for resources.",
  "The input:",
];

const ResumeSection = () => {
  const [needDarkMode, setNeedDarkMode] = useState(false);
  const [file, setFile] = useState(null);
  const [apiKey, setApiKey] = useState(null);
  const [responseText, setResponseText] = useState("");

  const [textFromPDF, setTextFromPDF] = useState(""); // Extracted text from
  const openai = new OpenAI({
    apiKey: apiKey,
    dangerouslyAllowBrowser: true,
  });
  useEffect(() => {
    let selectedTheme = localStorage.getItem("selectedTheme");
    if (selectedTheme === "dark") setNeedDarkMode(true);
  }, []);

  useEffect(() => {
    document.title = "Resume Questions Page";
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

  console.log("needDarkMode : ", needDarkMode);
  const toggleDarkMode = () => {
    setNeedDarkMode(!needDarkMode);
  };

  //   New Code
  const handleSend = async () => {
    if (textFromPDF) {
      try {
        const promptForBasicQuestions = `${promptForBasicQuestionChunks.join(
          "\n"
        )}${textFromPDF}`;
        const response = await openai.chat.completions.create({
          model: "gpt-3.5-turbo",
          messages: [
            {
              role: "system",
              content: promptForBasicQuestions,
            },
          ],
          temperature: 0.5,
          max_tokens: 500,
        });
        setResponseText(response.choices[0].message.content);
        console.log(response);
      } catch (error) {
        console.error("Error sending message to Chat API:", error);
      }
    } else {
      console.error("No text to send to Chat API.");
    }
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
      <Container>
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
          {/* <div className="message">
                        <div className="icon"></div>
                        <div className="text">
                            Text here : We are constantly looking for good blogs. Want to be a technical content writer <a href="/">click here</a>
                        </div>
                    </div> */}

          <div className="btn-1">
            <input
              type="text"
              placeholder="Enter your open API KEY here....."
              onChange={(e) => setApiKey(e.target.value)}
              className="api_input"
            />
            <input type="file" accept=".pdf" onChange={uploadresume} />
            <button className="btn-2" onClick={handleSend}>
              Submit
            </button>
            {file && (
              <div>
                <Document file={file} onLoadSuccess={handleTextExtraction} />
                {responseText && (
                  <div className="response-text">
                    <Markdown>{responseText}</Markdown>
                  </div>
                )}
              </div>
            )}
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
  a {
    color: #18489f;
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
      color: #696168;
      a {
        color: #18489f;
        font-size: 0.95rem;
        font-weight: 300;
        margin-left: 0.25rem;
      }
    }
    .message {
      display: inline-block;
      /* display: flex; */
      /* align-items: center; */
      background-color: #d5f7e1;
      border-radius: 5px;
      padding: 10px;
      margin: 20px 0 10px 0;
      .text {
        font-size: 0.8rem;
        color: #13803b;
        font-weight: 300;
      }
    }
    .btn-1 {
      padding: 5px 10px;
      font-size: 0.75rem;
      display: flex;
      flex-direction: column;
      align-items: center;
      svg {
        margin-right: 5px;
      }
    }
  }
`;
