import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import CCHeaderDarkPlus from "../Components/CCHeaderDarkPlus";
import CCHeaderPlus from "../Components/CCHeaderPlus";
import LeftMenu from "../Components/LeftMenu";
import LeftMenuDark from "../Components/LeftMenuDark";
import VisibilityIcon from "@material-ui/icons/Visibility";
import GradeIcon from "@material-ui/icons/Grade";
import CallMadeIcon from "@material-ui/icons/CallMade";
import AddIcon from "@material-ui/icons/Add";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { customCodingSheetsFilters } from "../Components/customCodingSheetsFilters";
import LinkIcon from "@material-ui/icons/Link";
import DeleteIcon from "@material-ui/icons/Delete";
import DoneIcon from "@material-ui/icons/Done";
import StorageIcon from "@material-ui/icons/Storage";
import problemsData from "../DummyDB/InterviewSummaries/LcProblems.json";
import problemsDataServer from "../DummyDB/InterviewSummaries/LcUserServerProblems.json";
import axios from "axios";

const CreateCustomCodingSheetsEdit = (userGlobal) => {
  const [needDarkMode, setNeedDarkMode] = useState(!false);
  const [problemLink, setProblemLink] = useState("");
  const [recentlyAddedProblems, setRecentlyAddedProblems] = useState([]);
  const [problemStatus, setProblemStatus] = useState({});
  // const [problemsStoredInServer, setProblemsStoredInServer] = useState(problemsDataServer);
  const [problemsStoredInServer, setProblemsStoredInServer] = useState([]);
  const [ownerId, setOwnerId] = useState(null);
  // const [sheetId, setSheetId] = useState(params.sheetId);
  const [sheetName, setSheetName] = useState(""); // Add this
  const [sheetDesc, setSheetDesc] = useState(""); // Add this
  const [combinedProblems, setCombinedProblems] = useState([]);
  const [exportingSheet, setExportingSheet] = useState(false);
  const params = useParams();
  const { sheetId } = params;
  const [showModal, setShowModal] = useState(false);
  const [sheetData, setsheetData] = useState(null);
  const [OwnerInformation, setOwnerInformation] = useState(null);
  const [github, setGithub] = useState('');
  const [instagram, setInstagram] = useState('');
  const [linkedin, setLinkedin] = useState('');
  const [name, setName] = useState('');
  const [profilePictureURL, setProfilePictureURL] = useState('');
  const [twitter, setTwitter] = useState('');
  const [youtube, setYoutube] = useState('');

  console.log(OwnerInformation);

  console.log("sheetId" + sheetId);
  useEffect(() => {
    document.title = "Edit your Sheet | Create Custom Coding Sheets - Algolisted";
  }, []);

  console.log(userGlobal);
  const userId = localStorage.getItem('userId');
  console.log(userId);

  const userDataString = sessionStorage.getItem('userData');
  console.log(userDataString);

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
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://algolisted.tonmoy1912.in/problem-sheets/details?sheetId=${sheetId}`
        );

        setsheetData(response.data.sheet);
        setSheetName(response.data.sheet.sheetName);
        setSheetDesc(response.data.sheet.sheetDesc);

        const sheetOwnerId = response.data.sheet.ownerId;

        try {
          // alert("Hello World");
          const response = await fetch(`https://algolisted.tonmoy1912.in/user-details/profile-details/?ownerId=${sheetOwnerId}`);
          if (response.ok) {
            const data = await response.json();
            // alert("Hello World2");
            console.log(data.user);
            setOwnerInformation(data.user);

            setOwnerId(data.user._id);
            setGithub(data.user.github);
            setInstagram(data.user.instagram);
            setLinkedin(data.user.linkedin);
            setName(data.user.name);
            setProfilePictureURL(data.user.profilePictureURL);
            setTwitter(data.user.twitter);
            setYoutube(data.user.youtube);
          } else {
            // alert("Hello World3");
            // Handle any errors here
            console.error('Failed to fetch data');
          }
        } catch (error) {
          // alert("Hello World4");
          console.error('Error:', error);
        }

        console.log(response.data.sheet);

        const problemIds = response.data.sheet.problemIds;

        // Initialize an array to store the scraped problem data
        const scrapedProblems = [];

        for (let i = 0; i < problemIds.length; i++) {
          const problemId = problemIds[i];
          const scrapedProblemData = problemsData[problemId];

          if (scrapedProblemData) {
            scrapedProblems.push(scrapedProblemData);
          }
        }

        // Update the state with the scraped problem data
        setProblemsStoredInServer(scrapedProblems);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData(); // Call the fetchData function when the component mounts or when sheetId changes
  }, [sheetId]);

  useEffect(() => {
    console.log(problemsStoredInServer);
  }, [problemsStoredInServer]);

  const filters = customCodingSheetsFilters.map((item) => {
    return (
      <a href={item.domainFilter} key={item.id} className="filter">
        {item.text}
      </a>
    );
  });

  // console.log(problemsData);

  function extractProblemName(url) {
    // Define a regular expression to match the "anything" part of the URL
    const regex = /https:\/\/leetcode\.com\/problems\/([^/?]+)/;

    // Use the regular expression to extract the "anything" part
    const match = url.match(regex);

    // Check if a match was found
    if (match && match[1]) {
      return match[1];
    }

    // If no match is found, return an empty string or an error message
    return "Invalid URL";
  }

  const handleAddProblem = () => {
    const problemName = extractProblemName(problemLink);
    // console.log(problemName);
    let scrapedProblemData = problemsData[problemName];
    if (scrapedProblemData === undefined) {
      alert("Problem Not Found!");
    } else {
      const timestamp = Date.now();
      setRecentlyAddedProblems(
        recentlyAddedProblems.concat(scrapedProblemData)
      );

      // Set the initial status as "scrapping" with the timestamp
      setProblemStatus((prevStatus) => ({
        ...prevStatus,
        [scrapedProblemData.quesName]: { status: "scrapping", timestamp },
      }));
    }
    // console.log(scrapedProblemData);
    setProblemLink("");
  };

  useEffect(() => {
    const updateProblemStatus = () => {
      const currentTime = Date.now();
      const updatedStatus = { ...problemStatus };

      for (const problemName in problemStatus) {
        const problem = problemStatus[problemName];
        if (
          problem.status === "scrapping" &&
          currentTime - problem.timestamp >= 6000
        ) {
          updatedStatus[problemName] = { status: "scrapping-done" };
        }
      }

      setProblemStatus(updatedStatus);
    };

    const interval = setInterval(updateProblemStatus, 1000);

    return () => clearInterval(interval);
  }, [problemStatus]);

  const handleDeleteProblem = (problemName) => {
    const updatedProblems = recentlyAddedProblems.filter(
      (problemData) => problemData.quesName !== problemName
    );
    setRecentlyAddedProblems(updatedProblems);
  };

  const handleDeleteProblemFromServerProblems = (problemName) => {
    const updatedProblems = problemsStoredInServer.filter(
      (problemData) => problemData.quesName !== problemName
    );
    setProblemsStoredInServer(updatedProblems);
    // console.log(updatedProblems);
  };

  const handleExportProblemSheet = async () => {
    setExportingSheet(true);

    const serverProblemIds = problemsStoredInServer.map((problemData) =>
      extractProblemName(problemData.quesLink)
    );
    const localProblemIds = recentlyAddedProblems.map((problemData) =>
      extractProblemName(problemData.quesLink)
    );
    const allProblemsIds = [...serverProblemIds, ...localProblemIds];

    const data = {
      sheetId: sheetId.toString(),
      sheetDesc: sheetDesc,
      sheetName: sheetName,
      problemIds: allProblemsIds,
    };

    const userData = {
      ownerId: ownerId.toString(),
      github,
      instagram,
      linkedin,
      name,
      profilePictureURL,
      twitter,
      youtube
    };

    try {
      const startTime = Date.now();

      const response = await axios.post("http://localhost:8000/problem-sheets/update", data, {
        withCredentials: true,
      });

      const response2 = await axios.post("https://algolisted.tonmoy1912.in/user-details/profile-update", userData, {
        withCredentials: true,
      });

      const endTime = Date.now();
      const timeElapsed = endTime - startTime;

      // Wait for a minimum of 5 seconds if the MongoDB operation finishes before that
      const minimumWaitTime = 5000;
      const waitTime = Math.max(minimumWaitTime - timeElapsed, 0);

      setTimeout(() => {
        if (response.status === 200) {
          console.log(response.data);
          //   alert("Problem sheet has been updated.");
          setRecentlyAddedProblems([]);
          setProblemsStoredInServer([
            ...problemsStoredInServer,
            ...recentlyAddedProblems,
          ]);

          // Open a new tab with the specified URL
          window.open(
            `https://algolisted.tonmoy1912.in/create-problem-list/sheet/${sheetId}`,
            "_blank"
          );
        } else {
          alert("Something went wrong!");
        }
        setExportingSheet(false);
      }, waitTime);
    } catch (error) {
      console.error(error);
      alert("Something went wrong!");
      setExportingSheet(false);
    }
  };

  return (
    <GrandContainer>
      {
        showModal ? (
          <Modal>
            <div className="dark"></div>
            <div className="modal-body">
              <div className="done-btn" onClick={() => {
                setShowModal(false);
                handleExportProblemSheet();
              }}>
                <DoneIcon />
              </div>
              <div className="input-field">
                <div className="label">Sheet Name</div>
                <input
                  type="text"
                  value={sheetName}
                  onChange={(event) => setSheetName(event.target.value)}
                />
              </div>
              <div className="text-field">
                <div className="label">Sheet Name</div>
                <textarea
                  cols="30"
                  rows="10"
                  value={sheetDesc}
                  onChange={(event) => setSheetDesc(event.target.value)}
                ></textarea>
              </div>
              <div className="input-field">
                <div className="label">Github</div>
                <input type="text" value={github} onChange={(e) => setGithub(e.target.value)} />
              </div>
              <div className="input-field">
                <div className="label">Instagram</div>
                <input type="text" value={instagram} onChange={(e) => setInstagram(e.target.value)} />
              </div>
              <div className="input-field">
                <div className="label">LinkedIn</div>
                <input type="text" value={linkedin} onChange={(e) => setLinkedin(e.target.value)} />
              </div>
              <div className="input-field">
                <div className="label">Name</div>
                <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
              </div>
              <div className="input-field">
                <div className="label">Profile Picture URL</div>
                <input type="text" value={profilePictureURL} onChange={(e) => setProfilePictureURL(e.target.value)} />
              </div>
              <div className="input-field">
                <div className="label">Twitter</div>
                <input type="text" value={twitter} onChange={(e) => setTwitter(e.target.value)} />
              </div>
              <div className="input-field">
                <div className="label">Youtube</div>
                <input type="text" value={youtube} onChange={(e) => setYoutube(e.target.value)} />
              </div>
            </div>
          </Modal>
        ) : (
          <div></div>
        )
      }
\
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
          needDarkMode ? <LeftMenuDark marked={"coding-sheets"} /> : <LeftMenu marked={"coding-sheets"} />
        }
        {/* ---> change this all-blogs to your desired page-id */}
        <div className="cc-middle-content">
          <h1 className="main-heading">Custom Coding Sheets</h1>
          <p className="heading-supporter">
            In this feature, you can make lists of coding problems you like and easily share them with your friends. This helps you remember your favorite problems and lets you share the list link with others. Plus, if you share a link to a problem, we'll automatically scrape information about that problem and show it in your list with visualizations.
          </p>
          <div className="message">
            <div className="icon"></div>
            <div className="text">
              Curious about how to use it? Watch our{" "}
              <a href="/">youtube video</a> to see how it's done!
            </div>
          </div>
          {/* <Filters>
                        {filters}
                    </Filters> */}
          <div className="controls">
            <p className="link">Your generated link is <div><a target="_blank" href={`/create-problem-list/sheet/${sheetId}`} rel="noreferrer">https://www.algolisted.com/create-problem-list/sheet/{sheetId}</a></div> <CallMadeIcon /> </p>
            <div className="export-btn" onClick={() => setShowModal(true)}>
              {exportingSheet ? (
                <>Exporting...</>
              ) : (
                <>
                  <LinkIcon />
                  Click to Save and Export Problem Sheet Link
                </>
              )}
            </div>
            {/* <div className='export-btn' onClick={handleExportProblemSheet}>
                            <LinkIcon />
                            Click to Save and Export Problem Sheet Link
                        </div> */}
            <div className="add-link">
              <div className="options">
                <div className="platform">Leetcode</div>
                <ExpandMoreIcon />
              </div>

              <input
                type="text"
                placeholder="Enter Problem Link"
                value={problemLink}
                onChange={(e) => setProblemLink(e.target.value)}
              />
              <div className="square" onClick={() => handleAddProblem()}>
                <AddIcon />
              </div>

            </div>
          </div>

          {/* <Model>
                        <div className="model">You material UI modal https://mui.com/material-ui/react-modal/</div>
                    </Model> */}
          <div className="problem-sheet">
            {/* <h3>Update Sheet Details</h3> */}
            <h3>Newly added Problems</h3>
            {recentlyAddedProblems.length > 0 ? (
              <div>
                {recentlyAddedProblems.map((problemData, index) => {
                  const status = problemStatus[problemData.quesName]
                    ? problemStatus[problemData.quesName].status
                    : "scrapping";
                  return (
                    <div className="problem" key={index}>
                      <div className="square-box">{index + 1}</div>
                      <a
                        href={problemData.quesLink}
                        target="_blank"
                        className="problem-name" rel="noreferrer"
                      >
                        {problemData.quesName}
                        {status === "scrapping" ? (
                          <div className="scrapping">
                            <img
                              src="https://openaccess.sagepub.com/SciPrisV4S12/Content/images/loading7.gif"
                              alt=""
                            />
                            <div className="status-message">
                              Scraping Problem Data
                            </div>
                          </div>
                        ) : (
                          <div className="scrapping-done">
                            <DoneIcon />
                            <div className="status-message">
                              Problem Data Scraped
                            </div>
                          </div>
                        )}
                      </a>
                      <div className="square-box cursor-pointer">
                        <DeleteIcon
                          onClick={() =>
                            handleDeleteProblem(problemData.quesName)
                          }
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="empty-array-message">
                <div className="text">
                  You currently don't have any problem added in the local
                  server. Please paste a link in the above input bar and hit the
                  add symbol to see you problem.
                </div>
              </div>
            )}

            {/* <div className="problem">
                            <div className="square-box">1</div>
                            <div className="problem-name">
                                Search Insert Position
                                <img src="https://openaccess.sagepub.com/SciPrisV4S12/Content/images/loading7.gif" alt="" />
                                <div className="status-message">
                                    Scraping Problem Data 
                                </div>
                                <DoneIcon />
                                <div className="status-message">
                                    Problem Data Scraped
                                </div>
                            </div>
                            <div className="square-box cursor-pointer"><DeleteIcon /></div>
                        </div>
                        <div className="problem">
                            <div className="square-box">2</div>
                            <div className="problem-name">
                                Median of Two Sorted Arrays
                                <img src="https://openaccess.sagepub.com/SciPrisV4S12/Content/images/loading7.gif" alt="" />
                                <div className="status-message">
                                    Scraping Problem Data
                                </div>
                                <DoneIcon/>
                                <div className="status-message">
                                    Problem Data Scraped
                                </div>
                            </div>
                            <div className="square-box cursor-pointer"><DeleteIcon /></div>
                        </div> */}
          </div>
          <div className="problem-sheet">
            <h3>Previously Added Problems Stored in Server</h3>
            {problemsStoredInServer.length > 0 ? (
              <div>
                {problemsStoredInServer.map((problemData, index) => {
                  return (
                    <div className="problem" key={index}>
                      <div className="square-box">{index + 1}</div>
                      <a
                        href={problemData.quesLink}
                        target="_blank"
                        className="problem-name" rel="noreferrer"
                      >
                        {problemData.quesName}
                        <StorageIcon />
                        <div className="status-message">
                          Problem Stored in Server
                        </div>
                      </a>
                      <div className="square-box cursor-pointer">
                        <DeleteIcon
                          onClick={() =>
                            handleDeleteProblemFromServerProblems(
                              problemData.quesName
                            )
                          }
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="empty-array-message">
                <div className="text">Empty Array</div>
              </div>
            )}
          </div>
        </div>
      </Container>
    </GrandContainer>
  );
};

export default CreateCustomCodingSheetsEdit;

const GrandContainer = styled.div`
  .cursor-pointer {
    cursor: pointer;
  }
`;

const Model = styled.div`
  z-index: 10000;
  left: 0;
  top: 0;
  position: fixed;
  height: 100vh;
  width: 100vw;
  background-color: #000000b8;

  display: grid;
  place-items: center;

  .model {
    width: 500px;
    height: 400px;
    background-color: white;
    border-radius: 10px;
  }
`;

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
  
  background-color: ${(props) => (props.needDarkMode ? '#313338' : 'transparent')};

  a{
    color: ${(props) => (props.needDarkMode ? '#93b5f3' : '#18489f')};
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

    .controls {
      .link{
        display: flex;
        align-items: center;
        flex-wrap: wrap;
        font-size: 0.85rem;
        color: ${(props) => (props.needDarkMode ? '#e5e5e5' : '#333')};

        div{
          padding: 5px 10px;
          margin: 10px 0;
          background-color:  ${(props) => (props.needDarkMode ? '#454754' : '#f7f8f8')};
          border: 1px solid ${(props) => (props.needDarkMode ? 'transparent' : '#e5e5e5')};
          margin-left: 5px;
          border-radius: 10px;

          a{
            font-size: 0.7rem;
            /* letter-spacing: 0.05rem; */
            font-weight: 400;
            text-decoration: none;
          }
        }

        svg{
          font-size: 1rem;
          margin-left: 5px;
          fill: ${(props) => (props.needDarkMode ? '#e5e5e5' : '#333')};
        }
      }

      .export-btn {
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        color: ${(props) => (props.needDarkMode ? '#e5e5e5' : '#333')};
        background-color: ${(props) => (props.needDarkMode ? '#2b2d31' : '#f7f8f8')};
        border: 1px solid ${(props) => (props.needDarkMode ? '#595b5f' : 'rgb(209, 213, 219)')};
        border-radius: 10px;
        font-size: 0.8rem;
        padding: 5px 15px;
        height: 50px;
        text-align: center;

        svg {
          margin-right: 10px;
          fill: ${(props) => (props.needDarkMode ? '#e5e5e5' : '#333')};
        }
      }

      .square {
        width: 50px;
        height: 50px;
        display: flex;
        align-items: center;
        justify-content: center;
        
        background-color: ${(props) => (props.needDarkMode ? '#252526' : 'white')};
        border: 1px solid ${(props) => (props.needDarkMode ? '#595b5f' : 'rgb(209, 213, 219)')};
        border-radius: 10px;
        cursor: pointer;

        svg{
          fill: ${(props) => (props.needDarkMode ? '#e5e5e5' : '#333')};
        }
      }

      .add-link {
        margin-top: 10px;
        width: 100%;
        display: flex;
        align-items: center;

        .options {
          display: flex;
          align-items: center;
          justify-content: space-between;
          color: ${(props) => (props.needDarkMode ? '#e5e5e5' : '#333')};
          background-color: ${(props) => (props.needDarkMode ? '#252526' : '#fff')};
          border: 1px solid ${(props) => (props.needDarkMode ? '#595b5f' : 'rgb(209, 213, 219)')};
          border-radius: 10px;
          font-size: 0.8rem;
          padding: 5px 15px;
          width: 150px;
          height: 50px;

          .platform{
            color: ${(props) => (props.needDarkMode ? '#e5e5e5' : '#333')};
          }

          svg{
            fill: ${(props) => (props.needDarkMode ? '#e5e5e5' : '#333')};
          }
        }

        input {
          display: flex;
          align-items: center;
          color: ${(props) => (props.needDarkMode ? '#e5e5e5' : '#333')};
          background-color: ${(props) => (props.needDarkMode ? '#252526' : '#fff')};
          border: 1px solid ${(props) => (props.needDarkMode ? '#595b5f' : 'rgb(209, 213, 219)')};
          border-radius: 10px;
          font-size: 0.8rem;
          padding: 5px 15px;
          flex: 1;
          height: 50px;
          margin: 0 10px;
        }
      }
    }

    .problem-sheet {
      margin-top: 30px;

      h3 {
        margin-top: 50px;
        font-size: 1.25rem;
        font-weight: 500;
        margin-bottom: 20px;
        color: ${(props) => (props.needDarkMode ? '#e5e5e5' : '#333')};
      }

      .empty-array-message {
        .text {
          font-size: 0.8rem;
          color: ${(props) => (props.needDarkMode ? '#e5e5e5' : '#333')};
        }
      }

      .problem {
        margin-top: 10px;
        display: flex;
        align-items: center;

        .square-box {
          width: 50px;
          height: 50px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: ${(props) => (props.needDarkMode ? '#e5e5e5' : '#333')};
          background-color: ${(props) => (props.needDarkMode ? '#252526' : '#fff')};
          border: 1px solid ${(props) => (props.needDarkMode ? '#252526' : 'rgb(209, 213, 219)')};
          border-radius: 10px;

          svg{
            fill: ${(props) => (props.needDarkMode ? '#e5e5e5' : '#333')};
          }
        }

        .problem-name {
          position: relative;
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: space-between;
          border-radius: 10px;
          font-size: 0.8rem;
          padding: 5px 15px;
          height: 50px;
          text-align: center;
          margin: 0 10px;
          text-decoration: none;
          /* color: ${(props) => (props.needDarkMode ? '#e5e5e5' : '#333')}; */
          background-color: ${(props) => (props.needDarkMode ? '#252526' : '#fff')};
          border: 1px solid ${(props) => (props.needDarkMode ? '#252526' : 'rgb(209, 213, 219)')};

          .status-message {
            position: absolute;
            height: 20px;
            right: 55px;
            top: 18px;
            font-size: 0.6rem;
            color: ${(props) => (props.needDarkMode ? '#e5e5e5' : '#333')};
            
          }

          svg{
            fill: ${(props) => (props.needDarkMode ? '#e5e5e5' : '#333')};
          }

          img {
            height: 25px;
          }
        }
      }
    }
  }
`;

const Progress = styled.div`
  display: flex;
  align-items: center;
  margin: 20px 0 20px 0;

  .text {
    font-size: 0.75rem;
    font-weight: 500;
  }

  .value {
    margin: 0 10px 0 0px;
    font-size: 0.65rem;
    font-weight: 500;
    padding: 2.5px 7.5px;
    text-align: center;
    background-color: #f3f4f7;
    letter-spacing: 0.05rem;
    border-radius: 50px;
    border: 1px solid #e7dcdc;
  }

  .bar {
    /* width: 400px; */
    height: 10px;
    border-radius: 100px;
    background-color: whitesmoke;
    border: 1px solid pink;
    flex: 1;
    overflow: hidden;

    .fill {
      transition: width 0.25s linear;
      height: 100%;
      border-radius: 100px;
      background-color: #64e1b5;
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

const SignUpButton = styled.div`
  height: 40px;
  width: 220px;
  background-color: white;
  border: 1px solid #e5e5e5;
  border-radius: 100px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;

  img {
    height: 20px;
  }

  .text {
    font-size: 0.8rem;
    font-weight: 500;
    margin-left: 10px;
  }
`;
const Filters = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin: 10px 0 10px 0;

  .filter {
    padding: 7.5px 15px;
    font-size: 0.8rem;
    border: 1px solid #b9afaf;
    border-radius: 500px;
    margin: 0px 5px 5px 0px;
    font-weight: 300;
    text-decoration: none;
    color: inherit;

    &:hover {
      border-color: #201f1f;
      background-color: #201f1f;
      color: #ebdddd;
      transition-duration: 250ms;
      cursor: pointer;
    }
  }

  .filter2 {
    position: relative;
    padding: 7.5px 15px;
    font-size: 0.8rem;
    border: 1px solid #b9afaf;
    border-radius: 500px;
    margin: 0px 5px 5px 0px;
    font-weight: 300;
    text-decoration: none;
    color: inherit;
    display: flex;
    align-items: center;

    svg {
      font-size: 1rem;
      margin-left: 5px;
    }

    &:hover {
      border-color: #201f1f;
      background-color: #201f1f;
      color: #ebdddd;
      transition-duration: 250ms;
      cursor: pointer;

      svg {
        fill: #ebdddd;
      }
    }

    svg {
      font-size: 1rem;
      margin-left: 5px;
    }

    .tag {
      position: absolute;
      padding: 2.5px 7.5px;
      font-size: 0.65rem;
      background-color: orange;
      border-radius: 100px;
      left: -10px;
      top: -12.5px;
    }
  }

  .selected {
    /* background-color: #ded7d7;
    color: #111; */
    border-color: #201f1f;
    background-color: #201f1f;
    color: #ebdddd;
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


const Modal = styled.div`
  z-index: 1000;
  position: fixed;
  width: 100vw;
  height: 100vh;
  top: 0;
  left: 0;
  
  display: grid;
  place-items: center;

  .dark{
    position: absolute;
    width: 100vw;
    height: 100vh;
    background-color: #0000007d;
    top: 0;
    left: 0;
  }

  .modal-body{
    position: relative;
    z-index: 1001;
    /* height: 500px; */
    width: 800px;
    background-color: white;
    border-radius: 20px;

    padding: 20px;

    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;

    .done-btn{
      cursor: pointer;
      position: absolute;
      height: 40px;
      aspect-ratio: 1/1;
      right: -20px;
      top: -20px;
      background-color: white;
      border-radius: 20px;
      border: 1px solid #e5e5e5;
      display: grid;
      place-items: center;
      box-shadow: 1px 2px 30px 1px rgba(0,0,0,0.75);
      -webkit-box-shadow: 1px 2px 30px 1px rgba(0,0,0,0.75);
      -moz-box-shadow: 1px 2px 30px 1px rgba(0,0,0,0.75);
    }


    .input-field{
      position: relative;
      width: calc(50% - 5px);

      .label{
        position: absolute;
        font-size: 0.65rem;
        top: -7.5px;
        left: 10px;
        background-color: white;
        padding: 0 5px;
        color: grey;
        letter-spacing: 0.09rem;
      }

      input{
        height: 45px;
        width: 100%;
        padding: 10px 10px 10px 15px;
        font-size: 0.75rem;
        font-weight: 200;
        margin-bottom: 25px;
        border-radius: 15px;
        border: 1px solid #a9a9a9;
        
      }
    }

    .text-field{
      position: relative;
      width: 100%;

      .label{
        position: absolute;
        font-size: 0.65rem;
        top: -7.5px;
        left: 10px;
        background-color: white;
        padding: 0 5px;
        color: grey;
        letter-spacing: 0.09rem;
      }

      textarea{
        width: 100%;
        padding: 10px;
        font-size: 0.75rem;
        font-weight: 200;
        margin-bottom: 25px;
        height: 120px;
        border-radius: 20px;
        border: 1px solid #a9a9a9;
        outline: none;
      }
    }
    
    


  }

`