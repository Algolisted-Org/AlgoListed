import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import CCHeaderDarkPlus from "../Components/CCHeaderDarkPlus";
import CCHeaderPlus from "../Components/CCHeaderPlus";
import LeftMenu from "../Components/LeftMenu";
import LeftMenuDark from "../Components/LeftMenuDark";
import AttachmentIcon from "@material-ui/icons/Attachment";
import axios from "axios";
import Markdown from "react-markdown";
import { PuffLoader } from "react-spinners";

const ResumeQuestions = () => {
  const [needDarkMode, setNeedDarkMode] = useState(false);
  const [currentFile, setCurrentFile] = useState(null);
  const fileRef = useRef(null);
  const [questions, setQuestions] = useState({
    error: null,
    data: null,
    loading: false,
  });

  useEffect(() => {
    let selectedTheme = localStorage.getItem("selectedTheme");
    if (selectedTheme === "dark") setNeedDarkMode(true);
  }, []);

  useEffect(() => {
    document.title = "Resume Questions Page";
  }, []);

  console.log("needDarkMode : ", needDarkMode);
  const toggleDarkMode = () => {
    setNeedDarkMode(!needDarkMode);
  };
  const uploadResume = async () => {
    if(!currentFile) return;
    const formData = new FormData();
    formData.append("file",currentFile);
    try {
      setQuestions({ ...questions, loading: true });
      const response = await axios.post(
        "http://localhost:8000/ai/resume-questions",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      const data = await response.data;
      console.log(data);
      setQuestions({
        ...questions,
        loading: false,
        data: data.data,
      });
    } catch (error) {
      setQuestions({ ...questions, loading: false, error });
      console.log(error);
    }
  };

  const onSelectingResume = (fileEvent) => {
    const file = fileEvent.target.files[0];
    setCurrentFile(file);
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
          <input
            type="file"
            onChange={onSelectingResume}
            ref={fileRef}
            className="file_input"
            accept="application/pdf"
          />
          <button
            className="btn-1"
            onClick={() => fileRef.current.click()}
            disabled={questions.loading}
          >
            <AttachmentIcon /> Attach your Resume
          </button>
          {currentFile && <button className="btn-1" onClick={uploadResume}>Upload</button>}
          {questions.data && !questions.loading && (
            <Markdown>{questions.data}</Markdown>
          )}
          {questions.loading && (
            <div className="loading-section">
              <PuffLoader />
              <p>Sit back and relax we are analysing your resume...</p>
            </div>
          )}
          {questions.error && (
            <div className="error-section">An unexpected error occurred...</div>
          )}
        </div>
      </Container>
    </GrandContainer>
  );
};

export default ResumeQuestions;

const LoadingSection = styled.div``;

const QuestionsSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
`;

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
    .file_input {
      display: none;
    }
    .btn-1 {
      padding: 5px 10px;
      font-size: 0.75rem;
      display: flex;
      align-items: center;
      margin-bottom:0.25rem;
      svg {
        margin-right: 5px;
      }
    }
    .loading-section {
      display: flex;
      flex-direction: column;
      padding: 4rem 0;
      justify-content: center;
      align-items: center;
    }
    .error-section {
      display: flex;
      flex-direction: column;
      padding: 4rem 0;
      justify-content: center;
      align-items: center;
    }
  }
`;
