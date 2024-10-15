// InterviewSummaries
import React, { useState, useEffect } from "react";
import styled from "styled-components";
import CCHeaderDarkPlus from "../Components/CCHeaderDarkPlus";
import CCHeaderPlus from "../Components/CCHeaderPlus";
import LeftMenu from "../Components/LeftMenu";
import LeftMenuDark from "../Components/LeftMenuDark";
import FilterListIcon from "@material-ui/icons/FilterList";
import InfoIcon from "@material-ui/icons/Info";
import allBlogsDatabase from "../Components/allBlogsDatabase.json";
import SimpleFooter from "../Components/SimpleFooter";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import ExpandLessIcon from "@material-ui/icons/ExpandLess";
import MobileNavbar from "../Components/MobileNavbar";
import Tooltip from "@material-ui/core/Tooltip";
import Interviewgraph from "./Interviewgraph";
// console.log(allBlogsDatabase);
import data from "../DummyDB/InterviewSummaries/Interview.json";
const InterviewSummaries = () => {
  const [showFilters, setShowFilters] = useState(false);
  const [selectedMainTopic, setSelectedMainTopic] = useState('DSA');
  const [clickedButton, setClickedButton] = useState('DSA');
  const [graphButton, setGraphButton] = useState(false);

  // ----- FOR DARK MODE -----
  const [needDarkMode, setNeedDarkMode] = useState(false);
  let selectedTheme = localStorage.getItem("selectedTheme");
  console.log("needDarkMode : ", needDarkMode);
  const toggleDarkMode = () => {
    setNeedDarkMode(!needDarkMode);
  };
  // ----- FOR DARK MODE -----

  useEffect(() => {
    document.title = "Interview Summaries - Algolisted";
    
  }, []);
  const handleTopicClick = (mainTopic) => {
    setSelectedMainTopic(mainTopic);
    setClickedButton(mainTopic);
    setGraphButton(false);
    // alert(`${mainTopic} is clicked}`);
  };
  const handleGraphClick = (subtopic) => {
    setGraphButton((prev) => ({
      ...prev,
      [subtopic]: !prev[subtopic],
    }));
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
        {selectedTheme == "dark" ? (
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
        {selectedTheme == "dark" ? (
          <LeftMenuDark marked={"interview-summaries"} />
        ) : (
          <LeftMenu marked={"interview-summaries"} />
        )}
        <div className="cc-middle-content">
          <h1 className="main-heading">
            AI Summarization of Interviews{" "}
            <div className="head-tag">Under Development Phase 0.65-C</div>{" "}
          </h1>
          <p className="heading-supporter">
            The Interview Topic Summarizer has arrived! Do you need to prepare
            for a technical interview in Data Structures and Algorithms (DSA),
            Computer Networks (CN), Operating Systems (OS), Database Management
            Systems (DBMS), or Object-Oriented Programming (OOPS)? Our
            revolutionary Summarizer is here to help you prepare for your
            interview. This tool allows you to maximize your study time by
            concentrating on the most important interview issues. It examines
            the amount of questions commonly asked in interviews in these fields
            and delivers them in an easy-to-understand way. You may quickly
            focus your study efforts using the Interview Topic Summarizer, t
            planned, efficient interview preparation method. ensuring you're
            well-prepared for your forthcoming technical interview. Say goodbye
            to winging it and hello to a well-
          </p>
          <div className="message">
            <div className="icon"></div>
            <div className="text">
              <b>Under Development : </b> Our primary goal is to streamline the
              procedure of searching for a company's name, extracting
              approximately 25-50 recent and pertinent interview experiences,
              and utilizing this as input for our machine learning model.
              Subsequently, our model produces results, which we store for a
              30-day period. Consequently, you consistently receive the most
              up-to-date information, ensuring that you are always provided with
              current data instead of outdated information. Have an idea in this
              feature{" "}
              <a
                href="https://github.com/Nayaker/AlgoListed/issues/new"
                target={"_blank"} rel="noreferrer"
              >
                click here
              </a>
            </div>
          </div>
          <div className="topics">
            <div className="categories">
              <div className="main-topics">
                {Object.keys(data).map((mainTopic) => (
                  <button
                    className={clickedButton === mainTopic ? "selected" : ""}
                    key={mainTopic}
                    onClick={() => handleTopicClick(mainTopic)}
                  >
                    {mainTopic}
                  </button>
                ))}
              </div>
              {selectedMainTopic && (
                <div className="sub-topics">
                  <ul className="subele">
                    {Object.keys(data[selectedMainTopic]).map((subtopic) => (
                      <>
                        <li key={subtopic}>
                          {subtopic}{" "}
                          <button
                            key={subtopic}
                            onClick={() => handleGraphClick(subtopic)}
                          >
                            {graphButton[subtopic] ? (
                              <ExpandLessIcon />
                            ) : (
                              <ExpandMoreIcon />
                            )}
                          </button>
                        </li>
                        {graphButton[subtopic] && (
                          <Interviewgraph
                            companies={
                              data[selectedMainTopic][subtopic]
                            }
                            subtopic={subtopic}
                          />
                        )}
                      </>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>

          <SimpleFooter />
        </div>
      </Container>
    </GrandContainer>
  );
};

export default InterviewSummaries;

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
    padding: 80px 120px 30px 120px;
    position: relative;
    width: 100%;
    max-width: 1360px;
    min-width: 850px;
    margin: auto;

    @media only screen and (max-width: 1200px) {
      padding: 80px 50px 30px 50px;
    }

    .main-heading {
      font-size: 1.65rem;
      font-weight: 600;
      color: #292929;
      display: flex;
      align-items: center;

      .head-tag {
        display: inline;
        font-size: 0.75rem;
        font-weight: 500;
        padding: 0.25rem 0.5rem;
        border-radius: 100px;
        background-color: #e5e5e5;
        margin-left: 10px;
      }
    }

    .heading-supporter {
      font-size: 0.9rem;
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
    .topics {
      .categories {
        .main-topics {
          display: flex;
          justify-content: space-between;
          list-style-type: none;
          button {
            padding: 20px;

            background-color: #fff;
            border-radius: 20px;
            border: 1px solid #ccc;
          }
          .selected {
            background-color: #000;
            color: #fff;
            transition-duration: 150ms;
            transition: all 0.5s ease-out;
            box-shadow: 0px 0px 10px 0px #ccc;
          }
        }
        .sub-topics {
          display: flex;
          flex-direction: column;
          margin-top: 10px;
          list-style-type: none;
          .subele {
            display: flex;
            flex-direction: column;
            align-items: center;
            li {
              display: flex;
              justify-content: space-between;
              align-items: center;
              item-align: center;
              border: 2px solid #ccc;
              border-radius: 10px;
              margin: 15px;
              padding: 15px;
              width: 100%;
            }
            button {
              background-color: #fff;
              border: none;
            }
          }
        }
      }
    }

    .resources-container {
      display: flex;
      flex-wrap: wrap;
      align-items: stretch;
      height: auto;
      width: 100%;
      margin-top: 10px;

      .resource {
        width: calc(33.33% - 30px);
        height: auto;
        /* min-height: 280px; */
        /* background-color: white; */
        border-top: 1px solid rgb(232, 232, 232);
        /* border: 1px solid rgb(232, 232, 232); */
        padding-top: 20px;
        margin: 10px 15px 30px 15px;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        position: relative;

        .top-tag {
          position: absolute;
          padding: 5px 10px;
          font-size: 0.7rem;
          font-weight: 300;
          background-color: white;
          border: 1px solid #b9afaf;
          box-shadow: rgb(28 28 28 / 8%) 0px 2px 8px;
          top: 5px;
          right: -10px;
          border-radius: 100px;
          user-select: none;
        }

        .img-container {
          width: 100%;
          height: 156px;
          display: flex;
          align-items: center;
          margin-bottom: 10px;
          overflow: hidden;
          border-radius: 10px;
          border: 1px solid #f3e4e4;

          img {
            width: 100%;
            display: block;
            border-radius: 10px;
          }
        }

        .title {
          font-size: 1rem;
          font-weight: 500;
          color: #374151;
          cursor: pointer;
          text-decoration: none;
          width: 100%;
          font-family: "Poppins", sans-serif;
          font-family: "Poppins" !important;

          &:hover {
            color: cornflowerblue;
            /* transition-duration: 150ms; */
          }
        }

        .short-desc {
          font-size: 0.75rem;
          font-weight: 200;
          letter-spacing: 0.06rem;
          font-family: "Poppins", sans-serif;
          margin: 10px 0;
        }

        .tags {
          display: flex;
          flex-wrap: wrap;
          margin-top: 2.5px;

          .main-tag {
            display: flex;
            align-items: center;
            font-size: 0.7rem;
            padding: 2.5px 12.5px;
            border-radius: 100px;
            background-color: #f3e8ffd4;
            color: rgb(107, 33, 168);
            font-weight: 400;
            margin: 5px 5px 0 0;

            img {
              height: 1.25rem;
              margin-right: -5px;
              margin-left: 5px;
            }
          }

          .tag {
            font-size: 0.7rem;
            padding: 2.5px 12.5px;
            border-radius: 100px;
            background-color: #eeeeee;
            font-weight: 300;
            margin: 5px 5px 0 0;
          }
        }

        .follow-me-link {
          margin: 0px 0 20px 0;
          font-size: 0.7rem;
          font-weight: 200;

          b {
            font-weight: 400;
          }
        }
      }
    }
  }
`;

const Filters = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin: 80px 0 10px 0;

  .filter {
    padding: 7.5px 15px;
    font-size: 0.8rem;
    border: 1px solid #b9afaf;
    border-radius: 500px;
    margin: 0px 5px 5px 0px;
    font-weight: 300;

    &:hover {
      border-color: #201f1f;
      background-color: #201f1f;
      color: #ebdddd;
      transition-duration: 250ms;
      cursor: pointer;
    }
  }

  .selected {
    /* background-color: #ded7d7;
    color: #111; */
    border-color: #201f1f;
    background-color: #201f1f;
    color: #ebdddd;
  }
`;

const Sort = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  margin: 75px 0 15px 0;

  .box {
    padding: 5px 10px;
    height: 36px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-radius: 100px;
    background-color: white;
    box-shadow: rgb(28 28 28 / 8%) 0px 2px 8px;
    border: 1px solid #b9afaf;
    margin-right: 5px;

    .text {
      font-size: 0.8rem;
      font-weight: 300;
      margin: 0 7.5px;
    }
  }
`;
