import React, { useState, useEffect } from "react";
import styled from "styled-components";
import CCHeaderDarkPlus from '../Components/CCHeaderDarkPlus'
import CCHeaderPlus from '../Components/CCHeaderPlus'
import LeftMenu from '../Components/LeftMenu'
import LeftMenuDark from '../Components/LeftMenuDark'
import CheckCircleOutlineIcon from "@material-ui/icons/CheckCircleOutline";
import { codingSheetsFilters } from "../Components/codingSheetsFilters";
import axios from "axios";
import { LinearProgress } from "@material-ui/core";
import { useParams } from "react-router-dom";
import SimpleFooter from "../Components/SimpleFooter";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import ExpandLessIcon from "@material-ui/icons/ExpandLess";
import MobileNavbar from "../Components/MobileNavbar";
import DoughnutChart from '../Components/DoughnutChart';
import Tooltip from '@material-ui/core/Tooltip';
import "react-circular-progressbar/dist/styles.css";
import Tagsfilter from "../MicroComponents/Tagsfilter";
import LockIcon from '@material-ui/icons/Lock';
import TimerIcon from '@material-ui/icons/Timer';
import NotesIcon from '@material-ui/icons/Notes';
import ReplayIcon from '@material-ui/icons/Replay';
import { coreSubjectsTrackerFilters } from '../Components/coreSubjectsTrackerFilters';
import OSquestions from '../DummyDB/CoreSubjects/OSquestions.json';
import OOPSquestions from '../DummyDB/CoreSubjects/OOPSquestions.json';
import CNquestions from '../DummyDB/CoreSubjects/CNquestions.json';
import DBMSquestions from '../DummyDB/CoreSubjects/DBMSquestions.json';
import OSTopics from '../DummyDB/CoreSubjects/OSTopics.json';
import OOPSTopics from '../DummyDB/CoreSubjects/OOPSTopics.json';
import CNTopics from '../DummyDB/CoreSubjects/CNTopics.json';
import DBMSTopics from '../DummyDB/CoreSubjects/DBMSTopics.json';
import BookmarkIcon from '@material-ui/icons/Bookmark';
import CallMadeIcon from '@material-ui/icons/CallMade';
import OSResources from '../DummyDB/CoreSubjects/OSResources.json';
import OOPSResources from '../DummyDB/CoreSubjects/OOPSResources.json';
import CNResources from '../DummyDB/CoreSubjects/CNResources.json';
import DBMSResources from '../DummyDB/CoreSubjects/DBMSResources.json';



const CoreSubjectsTracker = () => {
    const [needDarkMode, setNeedDarkMode] = useState(!false);
    const [openVisualiser, setOpenVisualiser] = useState(false);
    const [data, setData] = useState([]);
    const [topicsData, setTopicsData] = useState([]);
    const [resources, setResources] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [dataLoading, setDataLoading] = useState(true);
    const [answerVisibility, setAnswerVisibility] = useState(data.map(() => false));
    const [resourcesListFileName, setResourcesListFileName] = useState("");
    const [topicListFileName, setTopicListFileName] = useState("");
    const [questionsListFileName, setQuestionsListFileName] = useState("");

    const params = useParams();
    const { subjectName } = params;
    const [showAllQuestions, setShowAllQuestions] = useState(true);
    const [showSolvedQuestions, setShowSolvedQuestions] = useState(false);
    const [showMarkedQuestions, setShowMarkedQuestions] = useState(false);


    useEffect(() => {
        let selectedTheme = localStorage.getItem("selectedTheme");
        if (selectedTheme === 'dark') setNeedDarkMode(true);
        if (selectedTheme === 'light') setNeedDarkMode(false);
    }, [])

    console.log("needDarkMode : ", needDarkMode);
    const toggleDarkMode = () => {
        setNeedDarkMode(!needDarkMode);
    };

    useEffect(() => {
        document.title = "Core Subjects Tracker - Algolisted";
    }, []);

    const questionsMapping = {
        'operating-systems': OSquestions,
        'oops': OOPSquestions,
        'computer-networks': CNquestions,
        'dbms': DBMSquestions,
    };

    const topicsMapping = {
        'operating-systems': OSTopics,
        'oops': OOPSTopics,
        'computer-networks': CNTopics,
        'dbms': DBMSTopics,
    };

    const resourceMapping = {
        'operating-systems': OSResources,
        'oops': OOPSResources,
        'computer-networks': CNResources,
        'dbms': DBMSResources,
    };


    useEffect(() => {
        setData(questionsMapping[subjectName]);
        setTopicsData(topicsMapping[subjectName]);
        setResources(resourceMapping[subjectName]);
    }, [])


    useEffect(() => {
        if (data.length > 0) {
            try {
                const updatedFilterData = topicsData.map((item) => {
                    const completed = localStorage.getItem(`completedtopic-coresheet-${item._id}`);

                    return {
                        ...item,
                        completed: completed === "true",
                    };
                });

                setTopicsData(updatedFilterData);

                const updatedData = data.map((item) => {
                    const completed = localStorage.getItem(`completedquestion-coresheet-${item._id}`);
                    const marked = localStorage.getItem(`markedquestion-coresheet-${item._id}`);

                    return {
                        ...item,
                        completed: completed === "true",
                        marked: marked === "true",
                    };
                });
                const filteredData = updatedData.filter((item) => {
                    return (
                      (showAllQuestions || (showSolvedQuestions && item.completed) || (showMarkedQuestions && item.marked))
                    );
                  });

                setFilteredData(filteredData);
            } catch (error) {
                console.error("Error in useEffect:", error);
            }
        }
    }, [data, showAllQuestions, showSolvedQuestions, showMarkedQuestions]);


    const filters = coreSubjectsTrackerFilters.map((item) => {
        return (
            <a href={item.domainFilter} key={item.id} className={item.domainFilter === subjectName ? 'filter selected' : (item.lock === true ? 'locked-feature filter' : 'filter')} >
                {item.text}
                {item.lock === true ? <LockIcon /> : <></>}
            </a>
        );
    });

    useEffect(() => {
        setDataLoading(false);
    }, [data]);


    const handleTopicsLabelClick = (index) => {
        let updatedLabels = [...topicsData];

        updatedLabels[index].completed = !updatedLabels[index].completed;

        localStorage.setItem(
            `completedtopic-coresheet-${updatedLabels[index]._id}`,
            updatedLabels[index].completed
        );

        setTopicsData(updatedLabels);
    };

    const toggleAnswerVisibility = (index) => {
        const updatedVisibility = [...answerVisibility];
        updatedVisibility[index] = !updatedVisibility[index];
        setAnswerVisibility(updatedVisibility);
    };

    const toggleCompleted = (index) => {
        const updatedData = [...filteredData];

        updatedData[index].completed = !updatedData[index].completed;

        localStorage.setItem(
            `completedquestion-coresheet-${updatedData[index]._id}`,
            updatedData[index].completed
        );

        setFilteredData(updatedData);
    };

    const toggleMarked = (index) => {
        const updatedData = [...filteredData];

        updatedData[index].marked = !updatedData[index].marked;

        localStorage.setItem(
            `markedquestion-coresheet-${updatedData[index]._id}`,
            updatedData[index].marked
        );

        setFilteredData(updatedData);
    }

    const completedTopicsCount = topicsData.filter(topic => topic.completed).length;
    const totalTopicsCount = topicsData.length;

    const topicsProgressBarPercent = totalTopicsCount === 0 ? 0 : ((completedTopicsCount / totalTopicsCount) * 100).toFixed(0);
    const questionsProgressBarPercent = data.length === 0 ? 0 : ((filteredData.filter((item) => item.completed === true).length / data.length) * 100).toFixed(data.length > 100 ? 1 : 0);

    return (
        <GrandContainer needDarkMode={needDarkMode}>
            <MobContainer>
                <MobileNavbar />
                <div className="main-content">
                    <h1 className='main-heading'>Core Subjects Tracker</h1>
                    <p className="heading-supporter">
                        We've compiled a comprehensive set of interview questions sourced from reputable websites such as GeeksforGeeks and InterviewBit. Additionally, we've incorporated core subject knowledge shared by renowned YouTubers like Striver, Fraz, etc. The questions undergo thorough parsing using AI to filter out the most relevant ones, and our AI system provides ideal candidate answers.
                    </p>

                    <Filters needDarkMode={needDarkMode}>
                        <a href="https://github.com/Nayaker/AlgoListed/tree/main/client/src/DummyDB/CoreSubjects" target="_blank" className="filter2">
                            Contribute Topics or Questions
                            <CallMadeIcon />
                            <div className="tag">Open Sourced 🚀</div>
                        </a>
                    </Filters>

                    <Filters needDarkMode={needDarkMode}>{filters}</Filters>
                    {/* <div className="message">
                        <div className="icon"></div>
                        <div className="text">
                            If you believe that a certain topic or question is missing from the core subject questions, please <a href="/">click here</a>
                        </div>
                    </div> */}
                    <SheetMessage needDarkMode={needDarkMode}>
                        <div className="text">
                            Discover a goldmine of operating system resources on our website! As an open-source platform, we've handpicked the best content, from YouTube playlists to courses and websites, all designed to supercharge your preparation for placements. Your one-stop shop for all things OS – exclusively on our site!
                        </div>
                        <div className="open-btn" onClick={() => setOpenVisualiser(!openVisualiser)}>
                            {
                                openVisualiser ? (
                                    <>
                                        <div className="desc">
                                            Close Resources
                                        </div>
                                        <ExpandLessIcon />
                                    </>
                                ) : (
                                    <>
                                        <div className="desc">
                                            Open Resources
                                        </div>
                                        <ExpandMoreIcon /> 
                                    </>
                                )
                            }
                        </div>
                        {
                            openVisualiser ? (
                                <div className="all-resources">
                                {
                                    resources.map((item, index) => {
                                        return (
                                            <a target="_blank" href={item.link}>
                                                <img src={item.image} alt="" loading="lazy" />
                                            </a>
                                        )
                                    })
                                }
                                </div>
                            ) : null
                        }
                    </SheetMessage>
                    <h4>Topics</h4>
                    {/* <Progress needDarkMode={needDarkMode}>
                        <div className="text">Progress : </div>
                        <div className="value">{`${topicsProgressBarPercent}%`}</div>
                        <div className="bar">
                            <div
                                className="fill"
                                style={{ width: `${topicsProgressBarPercent}%` }}
                            ></div>
                        </div>
                    </Progress> */}

                    <div className="topics-container">
                        {topicsData.map((topic, index) => (
                            <div className="topic" key={topic.name}>
                                <input
                                    type="checkbox"
                                    id={topic.name.toLowerCase().replace(/\s+/g, "-")}
                                    checked={topic.completed}
                                    onChange={() => handleTopicsLabelClick(index)}
                                />
                                <label htmlFor={topic.name.toLowerCase().replace(/\s+/g, "-")}>{topic.name}</label>
                            </div>
                        ))}
                    </div>

                    <h4>Questions</h4>

                    <Progress needDarkMode={needDarkMode}>
                        <div className="text">Progress : </div>
                        <div className="value">{`${questionsProgressBarPercent}%`}</div>
                        <div className="bar">
                            <div
                                className="fill"
                                style={{ width: `${questionsProgressBarPercent}%` }}
                            ></div>
                        </div>
                    </Progress>

                    <EffectiveFilter needDarkMode={needDarkMode}>
                        {/* <div className="left">
							<select className="filter-item">
								<option value="All">Problem Difficulty</option>
								<option value="Easy">Easy</option>
								<option value="Medium">Medium</option>
								<option value="Hard">Hard</option>
							</select>
							<select className="filter-item">
								<option value="All">Status</option>
								<option value="Marked for later">Marked</option>
								<option value="Marked as completed">Completed</option>
							</select>
						</div> */}
                        <div className="left">
                            <input type="checkbox" id="all" checked={showAllQuestions} onChange={() => {
                            setShowAllQuestions(true);
                            setShowSolvedQuestions(false);
                            setShowMarkedQuestions(false);
          }}/>
                            <label htmlFor="all">All Questions</label>
                            <input type="checkbox" id="easy" checked={showSolvedQuestions} onChange={() => {
                            setShowAllQuestions(false);
                            setShowSolvedQuestions(!showSolvedQuestions);
                            setShowMarkedQuestions(false);
          }} />
                            <label htmlFor="easy">Solved</label>
                            <input type="checkbox" id="medium"   checked={showMarkedQuestions}
          onChange={() => {
            setShowAllQuestions(false);
            setShowSolvedQuestions(false);
            setShowMarkedQuestions(!showMarkedQuestions);
          }}/>
                            <label htmlFor="medium">Marked</label>
                        </div>
                       
                        <div className="right">
                            <a href="https://github.com/Nayaker/AlgoListed/blob/main/client/src/DummyDB/CoreSubjects/OSquestions.json" target="_blank" className="filter-item">Contribute - New or Enhancement <CallMadeIcon /></a>
                        </div>
                    </EffectiveFilter>

                    <div className="table">
                        {dataLoading ? (
                            <>
                                <LinearProgress />
                            </>
                        ) : (
                            filteredData.length === 0 ? <></> : filteredData.map((item, index) => {
                                return (
                                    <div
                                        key={index}
                                        className={
                                            item.marked ? (
                                                item.completed ? "review-row link-row done-row" : "review-row link-row"
                                            ) : (
                                                item.completed ? "link-row done-row" : "link-row"
                                            )
                                        }
                                    >
                                        {" "}
                                        <div className="strip"></div>
                                        <div className="link-row-left">
                                            <div className="count">{index < 9 ? "0" + (index + 1) : index + 1}</div>
                                            <div className="main-row-content">
                                                <div className="question-main">
                                                    {item.quesName}
                                                    <div
                                                        className="toggle-answer"
                                                        onClick={() => toggleAnswerVisibility(index)}
                                                    >
                                                        {answerVisibility[index] ? 'Hide Answer' : 'Show Answer'}
                                                    </div>
                                                </div>

                                                <div className="seperator-line" style={{ display: answerVisibility[index] ? 'block' : 'none' }}></div>

                                                <div className="answer-main" style={{ display: answerVisibility[index] ? 'block' : 'none' }}>
                                                    {item.answer}
                                                </div>
                                            </div>
                                        </div>
                                        <div className="right-icons">
                                            <Tooltip title={item.completed ? "Mark as Uncompleted" : "Mark as Completed"}>
                                                <div className="done-btn">
                                                    <CheckCircleOutlineIcon
                                                        onClick={() => toggleCompleted(index)}
                                                    />
                                                </div>
                                            </Tooltip>
                                            <Tooltip title={item.marked ? "Unmark" : "Mark for Later"}>
                                                <div className="review-btn">
                                                    <BookmarkIcon
                                                        onClick={() => toggleMarked(index)}
                                                    />
                                                </div>
                                            </Tooltip>
                                            {/* <Tooltip title="Add Notes">
												<div className="notes-btn">
													<NotesIcon/>
												</div>
											</Tooltip> */}



                                            {/* <Tooltip title="Notes">
												<div className="review-btn">
													<CreateIcon/>
												</div>
											</Tooltip> */}
                                        </div>
                                    </div>
                                );
                            })
                        )}
                    </div>
                </div>


                <SimpleFooter />


            </MobContainer>
            
            
            
            
            
            
            <Container needDarkMode={needDarkMode}>
                {
                    needDarkMode ? <CCHeaderDarkPlus needDarkMode={needDarkMode} toggleDarkMode={toggleDarkMode} /> : <CCHeaderPlus needDarkMode={needDarkMode} toggleDarkMode={toggleDarkMode} />
                }
                {
                    needDarkMode ? <LeftMenuDark marked={"core-subjects-tracker"} /> : <LeftMenu marked={"core-subjects-tracker"} />
                }
                {/* ---> change this all-blogs to your desired page-id */}

                <div className="cc-middle-content">
                    <h1 className='main-heading'>Core Subjects Tracker</h1>
                    <p className="heading-supporter">
                        We've compiled a comprehensive set of interview questions sourced from reputable websites such as GeeksforGeeks and InterviewBit. Additionally, we've incorporated core subject knowledge shared by renowned YouTubers like Striver, Fraz, etc. The questions undergo thorough parsing using AI to filter out the most relevant ones, and our AI system provides ideal candidate answers.
                    </p>

                    <Filters needDarkMode={needDarkMode}>
                        <a href="https://github.com/Nayaker/AlgoListed/tree/main/client/src/DummyDB/CoreSubjects" target="_blank" className="filter2" rel="noreferrer">
                            Contribute Topics or Questions
                            <CallMadeIcon />
                            <div className="tag">Open Sourced 🚀</div>
                        </a>
                    </Filters>

                    <Filters needDarkMode={needDarkMode}>{filters}</Filters>
                    {/* <div className="message">
                        <div className="icon"></div>
                        <div className="text">
                            If you believe that a certain topic or question is missing from the core subject questions, please <a href="/">click here</a>
                        </div>
                    </div> */}
                    <SheetMessage needDarkMode={needDarkMode}>
                        <div className="text">
                            Discover a goldmine of operating system resources on our website! As an open-source platform, we've handpicked the best content, from YouTube playlists to courses and websites, all designed to supercharge your preparation for placements. Your one-stop shop for all things OS – exclusively on our site!
                        </div>
                        <div className="open-btn" onClick={() => setOpenVisualiser(!openVisualiser)}>
                            {
                                openVisualiser ? (
                                    <>
                                        <div className="desc">
                                            Close Resources
                                        </div>
                                        <ExpandLessIcon />
                                    </>
                                ) : (
                                    <>
                                        <div className="desc">
                                            Open Resources
                                        </div>
                                        <ExpandMoreIcon /> 
                                    </>
                                )
                            }
                        </div>
                        {
                            openVisualiser ? (
                                <div className="all-resources">
                                {
                                    resources.map((item, index) => {
                                        return (
                                            <a target="_blank" href={item.link} rel="noreferrer">
                                                <img src={item.image} alt="" loading="lazy" />
                                            </a>
                                        )
                                    })
                                }
                                </div>
                            ) : null
                        }
                    </SheetMessage>
                    <h4>Topics</h4>
                    <Progress needDarkMode={needDarkMode}>
                        <div className="text">Progress : </div>
                        <div className="value">{`${topicsProgressBarPercent}%`}</div>
                        <div className="bar">
                            <div
                                className="fill"
                                style={{ width: `${topicsProgressBarPercent}%` }}
                            ></div>
                        </div>
                    </Progress>

                    <div className="topics-container">
                        {topicsData.map((topic, index) => (
                            <div className="topic" key={topic.name}>
                                <input
                                    type="checkbox"
                                    id={topic.name.toLowerCase().replace(/\s+/g, "-")}
                                    checked={topic.completed}
                                    onChange={() => handleTopicsLabelClick(index)}
                                />
                                <label htmlFor={topic.name.toLowerCase().replace(/\s+/g, "-")}>{topic.name}</label>
                            </div>
                        ))}
                    </div>

                    <h4>Questions</h4>

                    <Progress needDarkMode={needDarkMode}>
                        <div className="text">Progress : </div>
                        <div className="value">{`${questionsProgressBarPercent}%`}</div>
                        <div className="bar">
                            <div
                                className="fill"
                                style={{ width: `${questionsProgressBarPercent}%` }}
                            ></div>
                        </div>
                    </Progress>

                    <EffectiveFilter needDarkMode={needDarkMode}>
                        {/* <div className="left">
							<select className="filter-item">
								<option value="All">Problem Difficulty</option>
								<option value="Easy">Easy</option>
								<option value="Medium">Medium</option>
								<option value="Hard">Hard</option>
							</select>
							<select className="filter-item">
								<option value="All">Status</option>
								<option value="Marked for later">Marked</option>
								<option value="Marked as completed">Completed</option>
							</select>
						</div> */}
                        <div className="left">
                            <input type="checkbox" id="all" checked={showAllQuestions} onChange={() => {
            setShowAllQuestions(true);
            setShowSolvedQuestions(false);
            setShowMarkedQuestions(false);
          }}/>
                            <label htmlFor="all">All Questions</label>
                            <input type="checkbox" id="easy" checked={showSolvedQuestions} onChange={() => {
            setShowAllQuestions(false);
            setShowSolvedQuestions(!showSolvedQuestions);
            setShowMarkedQuestions(false);
          }} />
                            <label htmlFor="easy">Solved</label>
                            <input type="checkbox" id="medium"   checked={showMarkedQuestions}
          onChange={() => {
            setShowAllQuestions(false);
            setShowSolvedQuestions(false);
            setShowMarkedQuestions(!showMarkedQuestions);
          }}/>
                            <label htmlFor="medium">Marked</label>
                        </div>
                        <div className="right">
                            <a href="https://github.com/Nayaker/AlgoListed/blob/main/client/src/DummyDB/CoreSubjects/OSquestions.json" target="_blank" className="filter-item" rel="noreferrer">Contribute - New or Enhancement <CallMadeIcon /></a>
                        </div>
                    </EffectiveFilter>

                    <div className="table">
                        {dataLoading ? (
                            <>
                                <LinearProgress />
                            </>
                        ) : (
                            filteredData.length === 0 ? <></> : filteredData.map((item, index) => {
                                return (
                                    <div
                                        key={index}
                                        className={
                                            item.marked ? (
                                                item.completed ? "review-row link-row done-row" : "review-row link-row"
                                            ) : (
                                                item.completed ? "link-row done-row" : "link-row"
                                            )
                                        }
                                    >
                                        {" "}
                                        <div className="strip"></div>
                                        <div className="link-row-left">
                                            <div className="count">{index < 9 ? "0" + (index + 1) : index + 1}</div>
                                            <div className="main-row-content">
                                                <div className="question-main">
                                                    {item.quesName}
                                                    <div
                                                        className="toggle-answer"
                                                        onClick={() => toggleAnswerVisibility(index)}
                                                    >
                                                        {answerVisibility[index] ? 'Hide Answer' : 'Show Answer'}
                                                    </div>
                                                </div>

                                                <div className="seperator-line" style={{ display: answerVisibility[index] ? 'block' : 'none' }}></div>

                                                <div className="answer-main" style={{ display: answerVisibility[index] ? 'block' : 'none' }}>
                                                    {item.answer}
                                                </div>
                                            </div>
                                        </div>
                                        <div className="right-icons">
                                            <Tooltip title={item.completed ? "Mark as Uncompleted" : "Mark as Completed"}>
                                                <div className="done-btn">
                                                    <CheckCircleOutlineIcon
                                                        onClick={() => toggleCompleted(index)}
                                                    />
                                                </div>
                                            </Tooltip>
                                            <Tooltip title={item.marked ? "Unmark" : "Mark for Later"}>
                                                <div className="review-btn">
                                                    <BookmarkIcon
                                                        onClick={() => toggleMarked(index)}
                                                    />
                                                </div>
                                            </Tooltip>
                                            {/* <Tooltip title="Add Notes">
												<div className="notes-btn">
													<NotesIcon/>
												</div>
											</Tooltip> */}



                                            {/* <Tooltip title="Notes">
												<div className="review-btn">
													<CreateIcon/>
												</div>
											</Tooltip> */}
                                        </div>
                                    </div>
                                );
                            })
                        )}
                    </div>
                </div>
                <SimpleFooter />
            </Container>
        </GrandContainer>
    )
}

export default CoreSubjectsTracker

const GrandContainer = styled.div`

`

const MobContainer = styled.div`
    width: 100vw;
    min-height: 100vh;
    display: flex;
    flex-direction: column;  // Ensure vertical stacking
    position: relative;
    padding-top: 60px;
    padding-bottom: 100px; // Space for footer
    background-color: ${(props) => (props.needDarkMode ? '#313338' : '#ffffff')};

    .main-content {
        flex: 1;
        padding: 15px;
        margin-bottom: auto;
        flex-direction: column;

        .main-heading {
            font-size: 1.25rem;
            font-weight: 600;
            color: #292929;
            margin-bottom: 5px;
        }

        .heading-supporter {
            font-size: 0.85rem;
            margin-bottom: 10px;
            font-weight: 400;
            color: #696168;

            a {
                color: #18489f;
                font-size: 0.75rem;
                font-weight: 300;
                margin-left: 0.25rem;
            }
        }
        h4{
            margin-top: 20px;
        }

         .topics-container{
        display: flex;
        flex-wrap: wrap;
        flex-direction: row; 
        margin: 0px 0 60px 0;

        .topic{
            width: 50%;
            display: flex;
            align-items: center;
            /* border: 1px solid ${(props) => (props.needDarkMode ? '#595b5f' : 'rgb(209, 213, 219)')}; */
            /* padding: 10px 20px; */
            /* margin: 2.5px 2.5px 0 0; */
            margin-top: 20px;

            label{
                color: ${(props) => (props.needDarkMode ? '#e5e5e5' : '#333')};
                margin-left: 5px;
                font-size: 0.85rem;
                font-weight: 300;
                
            }

            input[type="checkbox"] {
                transform: scale(1.5); 
                margin-right: 10px;
                border: none;
                cursor: pointer;
            }
        }
      }
       

       .table {
			margin: 15px 0;
			width: 100%;
			/* background-color: #fbf7f7; */
			/* border: 1px solid #d1d5db; */
			border: 1px solid ${(props) => (props.needDarkMode ? '#595b5f' : 'rgb(209, 213, 219)')};
			border-radius: 5px;
			/* padding: 0 15px; */
			display: flex;
			flex-direction: column;
			background-color: ${(props) => (props.needDarkMode ? '#2b2d31' : '#fff')};
			border-bottom-color: transparent;

			.link-row {
				min-height: 94px;
				// padding: 20px 20px;
				display: flex;
				justify-content: space-between;
				border-top-left-radius: 5px;
				border-top-right-radius: 5px;
				border-bottom: 1px solid ${(props) => (props.needDarkMode ? '#595b5f' : 'rgb(209, 213, 219)')};
                

				.strip{
					display: none;
				}

				.link-row-left {
					display: flex;
					align-items: center;


					.count {
                        width: 30px;
						font-size: 1rem;
						font-family: Inter var, ui-sans-serif, system-ui, -apple-system,
							BlinkMacSystemFont, Segoe UI, Roboto, Helvetica Neue, Arial,
							Noto Sans, sans-serif, Apple Color Emoji, Segoe UI Emoji,
							Segoe UI Symbol, Noto Color Emoji;
						margin-right: 30px;
                        margin-left: 20px;
						font-weight: 500;
						text-align: center;
						color: ${(props) => (props.needDarkMode ? '#e5e5e5' : '#333')};
                        display: flex;
                        justify-content: space-between;
                        /* background-color: yellow; */
					}

					.main-row-content {
                        flex: 1;

						.question-main{
							position: relative;
                            font-size: 0.85rem;
                            font-weight: 600;
                            text-decoration: none;
                            margin-right: 15px;
                            color: ${(props) => (props.needDarkMode ? '#e5e5e5' : '#333')};
                            
                            .toggle-answer{
                                cursor: pointer;
                                margin-top: 5px;
                                font-weight: 300;
                                color: ${(props) => (props.needDarkMode ? '#e5e5e5' : '#333')};
                            }

                            .toggle-answer:hover {
                                filter: brightness(150%);
                            }
						}

                        .seperator-line{
                            height: 1px;
                            width: 80px;
                            background-color: #595b5f;
                            margin: 10px 0;
                        }
                        
						.answer-main{
                            position: relative;
                            font-size: 0.85rem;
                            font-weight: 300;
                            text-decoration: none;
                            margin-right: 15px;
                            color: ${(props) => (props.needDarkMode ? '#c1c1c1' : '#333')};
                            
                            a{
                                margin-left: 5px;
                            }
                        }
					}
				}

				.right-icons{
					display: flex;
					align-items: center;

					svg{
						font-size: 1.5rem;
						fill: #b5a6a6;
						margin-left: 10px;
						cursor: pointer;
					}

					.done-btn {
						.MuiSvgIcon-root {
							fill: #b5a6a6;
							margin-left: 10px;
	
							&:hover {
								transition-duration: 250ms;
								fill: orange;
								cursor: pointer;
							}
						}
					}

					.review-btn {
						.MuiSvgIcon-root {
							fill: #b5a6a6;
							margin-left: 10px;
	
							&:hover {
								transition-duration: 250ms;
								fill: #cf5f5f;
								cursor: pointer;
							}
						}
					}
				}

			}

			.done-row {
				background-color: ${(props) => (props.needDarkMode ? '#2e3b4c' : '#dcf8eb')};
				
				.right-icons{
					display: flex;
					
					.done-btn {
						.MuiSvgIcon-root {
							fill: orange;
						}
					}
				}

				.strip{
					display: none;
				}
			}

			.review-row {
				z-index: 0;
				position: relative;
				background-color: ${(props) => (props.needDarkMode ? '#2b2023' : '#ffe3e2')};
				border-radius: 0;
				
				.right-icons{
					display: flex;

					.review-btn {
						.MuiSvgIcon-root {
							fill: #cf5f5f;
						}
					}
				}

				.strip{
					display: block !important; 
					position: absolute;
					width: 7.5px;
					height: 100%;
					background-color: #cf5e5f;
					top: 0;
					left: 0;
					
				}
			}
			
			.no-bottom-border {
				border-bottom: 1px solid transparent;
			}
		}
    }

    footer {
        width: 100%;
        background-color: ${(props) => (props.needDarkMode ? '#2b2d31' : '#ffffff')};
        border-top: 1px solid ${(props) => (props.needDarkMode ? '#404040' : '#e0e0e0')};
        padding: 15px;
        margin-top: auto; // Push footer to bottom
    }

    @media only screen and (min-width: 1100px) {
        display: none;
    }
`;




const Container = styled.div`
    position: relative;
    padding-bottom: 80px;

    @media only screen and (max-width: 1099px){
        display: none;
    }

    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding-left: 200px;
    

    background-color: ${(props) => (props.needDarkMode ? '#313338' : 'transparent')};

    a{
      color: ${(props) => (props.needDarkMode ? '#6d93d8' : '#18489f')};
    }

    input{
      background-color: transparent;
    }

    .cc-middle-content{
      min-height: 100vh;
      width: 100%;
      /* padding: 80px min(120px, 5vw) 50px min(120px, 5vw); */
      padding: 80px 120px 50px 120px;
      position: relative;
      width: 100%;
      max-width: 1360px;
      min-width: 850px;
      margin: auto;

      @media only screen and (max-width: 1200px){
        padding: 80px 50px 50px 50px;
      }


      .main-heading{
          font-size: 1.65rem;
          font-weight: 600;
          color: ${(props) => (props.needDarkMode ? '#e5e6e8' : '#292929')};
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

      h4{
            margin-top: 40px;
            font-size: 1.05rem;
            color: ${(props) => (props.needDarkMode ? '#e5e5e5' : '#333')};
            font-weight: 500;
      }

      .resources-used{
          display: flex;
          flex-wrap: wrap;
          margin: 20px 0;

          .resource{
              height: 50px;
              width: 50px;
              margin: 0 7.5px 7.5px 0;
              border-radius: 50%;
              background-color: black;
              border: 1px solid black;
              overflow: hidden;
              display: flex;
              justify-content: center;
              align-items: center;

              img{    
                  height: 50px;
              }
          }

          .special-thanks{
            height: 50px;
            background-color: white;
            border-radius: 100px;
            display: flex;
            align-items: center;
            padding: 0 10px;
            margin: 0 7.5px 7.5px 0;

            img{    
                height: 30px;
                border-radius: 100px;
                margin-top: -7.5px;
            }
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

      .topics-container{
        display: flex;
        flex-wrap: wrap;
        /* flex-direction: column; */
        margin: 10px 0 80px 0;

        .topic{
            width: 33.33%;
            display: flex;
            align-items: center;
            /* border: 1px solid ${(props) => (props.needDarkMode ? '#595b5f' : 'rgb(209, 213, 219)')}; */
            /* padding: 10px 20px; */
            /* margin: 2.5px 2.5px 0 0; */
            margin-top: 20px;

            label{
                color: ${(props) => (props.needDarkMode ? '#e5e5e5' : '#333')};
                margin-left: 5px;
                font-size: 0.85rem;
                font-weight: 300;
                
            }

            input[type="checkbox"] {
                transform: scale(1.5); 
                margin-right: 10px;
                border: none;
                cursor: pointer;
            }
        }
      }

      .table {
			margin: 15px 0;
			width: 100%;
			/* background-color: #fbf7f7; */
			/* border: 1px solid #d1d5db; */
			border: 1px solid ${(props) => (props.needDarkMode ? '#595b5f' : 'rgb(209, 213, 219)')};
			border-radius: 5px;
			/* padding: 0 15px; */
			display: flex;
			flex-direction: column;
			background-color: ${(props) => (props.needDarkMode ? '#2b2d31' : '#fff')};
			border-bottom-color: transparent;

			.link-row {
				min-height: 94px;
				padding: 20px 20px;
				display: flex;
				align-items: flex-start;
				justify-content: space-between;
				border-top-left-radius: 5px;
				border-top-right-radius: 5px;
				border-bottom: 1px solid ${(props) => (props.needDarkMode ? '#595b5f' : 'rgb(209, 213, 219)')};
                

				.strip{
					display: none;
				}

				.link-row-left {
					display: flex;
					align-items: flex-start;

					.count {
                        width: 30px;
						font-size: 1.25rem;
						font-family: Inter var, ui-sans-serif, system-ui, -apple-system,
							BlinkMacSystemFont, Segoe UI, Roboto, Helvetica Neue, Arial,
							Noto Sans, sans-serif, Apple Color Emoji, Segoe UI Emoji,
							Segoe UI Symbol, Noto Color Emoji;
						margin-right: 30px;
                        margin-left: 20px;
						font-weight: 500;
						text-align: center;
						color: ${(props) => (props.needDarkMode ? '#e5e5e5' : '#333')};
                        display: flex;
                        justify-content: space-between;
                        /* background-color: yellow; */
					}

					.main-row-content {
                        flex: 1;

						.question-main{
							position: relative;
                            font-size: 0.85rem;
                            font-weight: 600;
                            text-decoration: none;
                            margin-right: 15px;
                            color: ${(props) => (props.needDarkMode ? '#e5e5e5' : '#333')};
                            
                            .toggle-answer{
                                cursor: pointer;
                                margin-top: 5px;
                                font-weight: 300;
                                color: ${(props) => (props.needDarkMode ? '#e5e5e5' : '#333')};
                            }

                            .toggle-answer:hover {
                                filter: brightness(150%);
                            }
						}

                        .seperator-line{
                            height: 1px;
                            width: 80px;
                            background-color: #595b5f;
                            margin: 10px 0;
                        }
                        
						.answer-main{
                            position: relative;
                            font-size: 0.85rem;
                            font-weight: 300;
                            text-decoration: none;
                            margin-right: 15px;
                            color: ${(props) => (props.needDarkMode ? '#c1c1c1' : '#333')};
                            
                            a{
                                margin-left: 5px;
                            }
                        }
					}
				}

				.right-icons{
					display: flex;
					align-items: center;

					svg{
						font-size: 2rem;
						fill: #b5a6a6;
						margin-left: 10px;
						cursor: pointer;
					}

					.done-btn {
						.MuiSvgIcon-root {
							fill: #b5a6a6;
							margin-left: 10px;
	
							&:hover {
								transition-duration: 250ms;
								fill: orange;
								cursor: pointer;
							}
						}
					}

					.review-btn {
						.MuiSvgIcon-root {
							fill: #b5a6a6;
							margin-left: 10px;
	
							&:hover {
								transition-duration: 250ms;
								fill: #cf5f5f;
								cursor: pointer;
							}
						}
					}
				}

			}

			.done-row {
				background-color: ${(props) => (props.needDarkMode ? '#2e3b4c' : '#dcf8eb')};
				
				.right-icons{
					display: flex;
					
					.done-btn {
						.MuiSvgIcon-root {
							fill: orange;
						}
					}
				}

				.strip{
					display: none;
				}
			}

			.review-row {
				z-index: 0;
				position: relative;
				background-color: ${(props) => (props.needDarkMode ? '#2b2023' : '#ffe3e2')};
				border-radius: 0;
				
				.right-icons{
					display: flex;

					.review-btn {
						.MuiSvgIcon-root {
							fill: #cf5f5f;
						}
					}
				}

				.strip{
					display: block !important; 
					position: absolute;
					width: 7.5px;
					height: 100%;
					background-color: #cf5e5f;
					top: 0;
					left: 0;
					
				}
			}
			
			.no-bottom-border {
				border-bottom: 1px solid transparent;
			}
		}
    }
`

const Filters = styled.div`
	display: flex;
	flex-wrap: wrap;
	margin: 20px 0 10px 0;

	.filter {
        padding: 7.5px 15px;
        font-size: 0.8rem;
        border: 1px solid ${(props) => (props.needDarkMode ? '#514f4f' : '#b9afaf')};
        border-radius: 500px;
        margin: 0px 5px 5px 0px;
        font-weight: 300;
        text-decoration: none;
        background-color: ${(props) => (props.needDarkMode ? 'transparent' : 'transparent')};
        color: ${(props) => (props.needDarkMode ? '#e5e5e5' : 'inherit')};

    svg{
      font-size: 1rem;
      margin-bottom: -0.2rem;
      margin-left: 5px;
      fill: #71c929;
    }

		&:hover {
			background-color: ${(props) => (props.needDarkMode ? '#4a4d5a' : '#f1f1f1')};
			border: 1px solid ${(props) => (props.needDarkMode ? '#fff' : '#333')};
			color: ${(props) => (props.needDarkMode ? '#e5e5e5' : 'inherit')};
			transition-duration: 250ms;
			cursor: pointer;
		}
	}

    .filter2{
		position: relative;
		padding: 7.5px 15px;
		font-size: 0.8rem;
		border: 1px solid #b9afaf;
		border-radius: 500px;
		margin: 40px 5px 5px 0px;
		font-weight: 300;
		text-decoration: none;
		color: ${(props) => (props.needDarkMode ? '#e5e5e5' : '#333')};
		display: flex;
		align-items: center;

		svg{
			font-size: 1rem;
			margin-left: 5px;
			fill: ${(props) => (props.needDarkMode ? '#e5e5e5' : '#333')};
		}

		&:hover {
			background-color: ${(props) => (props.needDarkMode ? '#4a4d5a' : '#f1f1f1')};
			border: 1px solid ${(props) => (props.needDarkMode ? '#fff' : '#333')};
			color: ${(props) => (props.needDarkMode ? '#e5e5e5' : 'inherit')};
			transition-duration: 250ms;
			cursor: pointer;
		}

		svg{
			font-size: 1rem;
			margin-left: 5px;
		}

		.tag{
			position: absolute;
			padding: 2.5px 7.5px;
			font-size: 0.65rem;
			background-color: orange;
			border-radius: 100px;
			left: -10px;
			top: -12.5px;
		}
	}

  .locked-feature{
    &:hover{
      background-color: ${(props) => (props.needDarkMode ? '#4a4d5a' : '#f1f1f1')};
      color: ${(props) => (props.needDarkMode ? '#fff' : 'inherit')};
      border: 1px solid ${(props) => (props.needDarkMode ? '#e5e5e5' : '#333')};
      transition-duration: 250ms;
    }
  }

	.selected {
		/* background-color: #ded7d7;
    color: #111; */
    color: ${(props) => (props.needDarkMode ? '#4a4d5a' : '#ebdddd')};
    border: 1px solid ${(props) => (props.needDarkMode ? '#fff' : '#201f1f')};
    background-color: ${(props) => (props.needDarkMode ? '#e5e5e5' : '#201f1f')};

    &:hover {
      color: ${(props) => (props.needDarkMode ? '#4a4d5a' : '#ebdddd')};
      border: 1px solid ${(props) => (props.needDarkMode ? '#fff' : '#201f1f')};
      background-color: ${(props) => (props.needDarkMode ? '#e5e5e5' : '#201f1f')};
			transition-duration: 250ms;
			cursor: pointer;
		}
	}

	@media only screen and (max-width: 1100px) {
		margin: 10px 0 10px 0;

		.filter {
			padding: 5px 15px;
			font-size: 0.7rem;
			margin: 0px 5px 5px 0px;
		}

		.selected {
			/* background-color: #ded7d7;
      color: #111; */
			border-color: #201f1f;
			background-color: #201f1f;
			color: #ebdddd;
		}
	}
`;

const SheetMessage = styled.div`
	padding: 10px;
	margin: 20px 0 0px 0;
	/* border: 1px solid black; */
	border-radius: 5px;
	/* background-color: #c9e8ff; */
	background-color: ${(props) => (props.needDarkMode ? '#2b2d31' : '#f0f0f0')};

	.text {
		font-size: 0.8rem;
		color: ${(props) => (props.needDarkMode ? '#e5e5e5' : '#333')};
	}

	.open-btn{
		display: flex;
		align-items: center;
		cursor: pointer;
		
		font-size: 0.8rem;
		font-weight: 500;
		margin-top: 15px;

		.desc{
			color: ${(props) => (props.needDarkMode ? '#e5e5e5' : '#333')};
		}

		svg{
			fill: ${(props) => (props.needDarkMode ? '#e5e5e5' : '#333')};
		}
	}

    .all-resources{
        margin-top: 7.5px;

        img{
            height: 100px;
            border-radius: 10px;
            margin: 7.5px 7.5px 0 0;
        }
    }
`;


const Progress = styled.div`
	display: flex;
	align-items: center;
	margin: 20px 0 0 0;

	.text {
		font-size: 0.9rem;
		font-weight: 500;
		color: ${(props) => (props.needDarkMode ? '#e5e5e5' : '#333')};
	}

	.value {
		margin: 0 10px;
		font-size: 0.8rem;
		font-weight: 400;
		letter-spacing: 0.15rem;
		padding: 5px 10px;
		width: 70px;
		text-align: center;
		background-color: #f3f4f7;
		border-radius: 50px;
	}

	.bar {
		/* width: 400px; */
		height: 10px;
		border-radius: 100px;
		border: 1px solid ${(props) => (props.needDarkMode ? '#222' : 'pink')};
		background-color: ${(props) => (props.needDarkMode ? '#2b2d31' : 'whitesmoke')};
		flex: 1;
		overflow: hidden;

		.fill {
			transition: width 0.25s linear;
			height: 100%;
			border-radius: 100px;
			background-color: #ffa500;
		}
	}

	@media only screen and (max-width: 1100px) {
		margin: 20px 0 0 0;

		.value {
			margin: 0 10px 0 0;
			font-size: 0.7rem;
			font-weight: 500;
			letter-spacing: 0.15rem;
			padding: 5px 7px;
			width: 70px;
			text-align: center;
			background-color: #f3f4f7;
			border-radius: 50px;
		}

		.bar {
			/* width: 400px; */
			height: 8px;
			border-radius: 100px;
			background-color: whitesmoke;
			border: 1px solid pink;
			flex: 1;
			overflow: hidden;

			.fill {
				transition: width 0.25s linear;
				height: 100%;
				border-radius: 100px;
				background-color: #ffa500;
			}
		}
	}	


`;

const EffectiveFilter = styled.div`
	display: flex;
    flex-direction: column;
	justify-content: space-between;
	align-items: center;
	margin: 30px 0 20px 0;
        align-items: flex-start;


	svg{
		cursor: pointer;
	}

	.left{
		display: flex;
        display-direction:column;
		justify-content: space-between;
        align-items: flex-start;

		label{
			font-size: 0.75rem;
			display: flex;
			justify-content: space-between;
			align-items: center;
			margin-right: 15px;
			font-weight: 400;
			color: ${(props) => (props.needDarkMode ? '#e5e5e5' : '#333')};
		}
		
		input{
			color: ${(props) => (props.needDarkMode ? '#e5e5e5' : '#333')};
			cursor: pointer;
			margin-right: 5px;
		}

		input[type="checkbox"]:checked + label {
			color: ${(props) => (props.needDarkMode ? '#e5e5e5' : '#333')};
		}
		/* Change the color of the checkboxes when they are not selected */
		input[type="checkbox"] + label {
			color: ${(props) => (props.needDarkMode ? '#e5e5e5' : '#333')};
		}

		.filter-item{
			z-index: 1;
			background: none;
			padding: 5px 10px;
			font-size: 0.7rem;
			border: 1px solid ${(props) => (props.needDarkMode ? '#595b5f' : 'rgb(209, 213, 219)')};
			color: ${(props) => (props.needDarkMode ? '#e5e5e5' : '#333')};
			border-radius: 3px;
			margin-right: 5px;
			cursor: pointer;
			outline: none;
		}

		svg{
			font-size: 1.5rem;
			margin-left: 7.5px;
			fill: ${(props) => (props.needDarkMode ? '#e5e5e5' : '#333')};
		}
	}

	.right{
		display: flex;
        flex-direction: column;
        align-items: flex-start;


		.filter-item{
			z-index: 1;
			background: none;
			padding: 5px 10px;
			font-size: 0.7rem;
			border: 1px solid ${(props) => (props.needDarkMode ? '#595b5f' : 'rgb(209, 213, 219)')};
			color: ${(props) => (props.needDarkMode ? '#e5e5e5' : '#333')};
			border-radius: 3px;
			margin-right: 5px;
			cursor: pointer;
            text-decoration: none;
		}
		svg{
			font-size: 0.9rem;
            margin-bottom: -2.5px;
			margin-left: 5px;
			fill: ${(props) => (props.needDarkMode ? '#e5e5e5' : '#333')};
		}

		.done-btn{
			fill: orange;
		}

		.review-btn{
			fill: #cf5f5f;
		}
	}


    
`