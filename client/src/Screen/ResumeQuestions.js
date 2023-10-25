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
// import { useFetch } from "@uidotdev/usehooks";
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

const companies = ["Google", "Zoho", "Microsoft", "Amazon"];
const difficulties = ["Easy", "Medium", "Hard"];

const generateCodingQuestionsTemplate = (data, company, difficulty = "all") => {
  if (!data) return "";
  const template = [
    `# Top Coding Questions of ${company} of ${difficulty} level`,
    "Here are some curated problems\n",
  ];
  const questions = data.map(
    (item, index) => `${index + 1}. [${item.name}](${item.problem_url})\n`
  );
  const result = `${template.join("\n")}\n${questions.join("\n")}`;
  return result;
};

const ResumeQuestions = () => {
  const [needDarkMode, setNeedDarkMode] = useState(false);
  const [currentFile, setCurrentFile] = useState(null);
  const fileRef = useRef(null);
  const [currentCompany, setCurrentCompany] = useState("*");
  const [basicQuestions, setBasicQuestions] = useState({
    error: null,
    data: null,
    loading: false,
  });
  const [codingQuestions, setCodingQuestions] = useState({
    error: null,
    data: null,
    loading: false,
    filteredData: null,
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
    if (!currentFile) return;
    const formData = new FormData();
    formData.append("file", currentFile);
    try {
      setBasicQuestions({ ...basicQuestions, loading: true, error: null });
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
      setBasicQuestions({
        ...basicQuestions,
        loading: false,
        data: data.data,
      });

      console.log(data);
    } catch (error) {
      setBasicQuestions({ ...basicQuestions, loading: false, error });
      console.log(error);
    }
  };

  const onSelectingResume = (fileEvent) => {
    const file = fileEvent.target.files[0];
    setCurrentFile(file);
  };
  const getQuestions = async (e) => {
    if (e.target.value === "*") return;
    try {
      setCodingQuestions({ ...codingQuestions, loading: true });
      const response = await axios.post(
        "http://localhost:8000/coding-questions/gfg",
        { company: e.target.value }
      );
      const data = await response.data;

      setCodingQuestions({
        ...codingQuestions,
        loading: false,
        data,
        filteredData: generateCodingQuestionsTemplate(data, e.target.value, ""),
      });
      setCurrentCompany(e.target.value);
    } catch (error) {
      setCodingQuestions({ ...codingQuestions, loading: false, error });
      console.log(error);
    }
  };
  const filterQuestions = (e) => {
    const value = e.target.value;
    if (!codingQuestions.data || !currentCompany) return;
    if (value === "*") {
      setCodingQuestions({
        ...codingQuestions,
        filteredData: generateCodingQuestionsTemplate(
          codingQuestions.data.filter(
            (item) => item.difficulty === e.target.value
          ),
          currentCompany),
      });
      return;
    }
    setCodingQuestions({
      ...codingQuestions,
      filteredData: generateCodingQuestionsTemplate(
        codingQuestions.data.filter((item) => item.difficulty === value),currentCompany, value
      ),
    });
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
          <div className="message">
              <div className="icon"></div>
              <div className="text">
                  Text here : We are constantly looking for good blogs. Want to be a technical content writer <a href="/">click here</a>
              </div>
          </div>
          {/* <select onChange={getQuestions}>
            <option value="*">Select company</option>
            {companies.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
          <select onChange={filterQuestions}>
            <option value="*">Select difficulty</option>
            {difficulties.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select> */}

          <div className="options">
            <div className="option">
              <div className="text">Company Type</div>
              <ExpandMoreIcon/>
            </div>
            <div className="option">
              <div className="text">Interview Level</div>
              <ExpandMoreIcon/>
            </div>
          </div>

          <input type="file" onChange={onSelectingResume} ref={fileRef} className="file_input" accept="application/pdf"/>
          <button className="btn-1" onClick={() => fileRef.current.click()} disabled={basicQuestions.loading} >
            <AttachmentIcon /> Attach your Resume
          </button>

          {currentFile && (
            <button className="btn-1" onClick={uploadResume}>
              Upload
            </button>
          )}

          

          {basicQuestions.loading && (
            <div className="loading-section">
              <PuffLoader />
              <p>We are analysing your resume, it will take around 60 seconds...</p>
            </div>
          )}

          {basicQuestions.data?.basicQuestions && !basicQuestions.loading && (
            <div className="output-result-container">
              <Markdown>{basicQuestions.data.basicQuestions}</Markdown>
              {/* <Markdown>{`# Scores based on resume\n\n${basicQuestions.data.companies}`}</Markdown> */}
            </div>
          )}

          {codingQuestions.filteredData && !codingQuestions.loading && (
            <Markdown>{codingQuestions.filteredData}</Markdown>
          )}

          {basicQuestions.error && (
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

    .options{
      margin: 20px 0;
      display: flex;
      .option{  
        display: flex;
        align-items: center;
        margin-right: 10px;
        background-color: #e5e5e5;
        border-radius: 100px;
        padding: 7.5px 15px;

        .text{
          font-size: 0.7rem;
        }

        svg{
          font-size: 1rem;
        }
      }
    }

    .output-result-container{
      margin: 50px 0;

      h6{
        margin-top: 75px;
        font-size: 1.25rem;
        margin-bottom: 20px;
        color: #333;
        font-weight: 600;
      }

      p{
        font-size: 0.85rem;
        font-weight: 300;
        margin-bottom: 15px;
        line-height: 1.75rem;
        color: #333;
        background-color: #ccdeff;
        padding: 20px;
        border-radius: 20px;
      }

      li{
        font-size: 0.85rem;
        font-weight: 300;
        margin-bottom: 15px;
        margin-left: 15px;

        p{
          font-weight: 500;
          background-color: transparent;
          padding: 0;
          border-radius: 0;
        }
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
      margin-bottom: 0.25rem;
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
