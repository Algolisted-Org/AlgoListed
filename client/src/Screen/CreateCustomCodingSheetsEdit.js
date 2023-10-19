import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import CCHeaderDarkPlus from '../Components/CCHeaderDarkPlus'
import CCHeaderPlus from '../Components/CCHeaderPlus'
import LeftMenu from '../Components/LeftMenu'
import LeftMenuDark from '../Components/LeftMenuDark'
import VisibilityIcon from '@material-ui/icons/Visibility';
import GradeIcon from '@material-ui/icons/Grade';
import CallMadeIcon from '@material-ui/icons/CallMade';
import AddIcon from '@material-ui/icons/Add';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { customCodingSheetsFilters } from "../Components/customCodingSheetsFilters";
import LinkIcon from '@material-ui/icons/Link';
import DeleteIcon from '@material-ui/icons/Delete';
import DoneIcon from '@material-ui/icons/Done';
import StorageIcon from '@material-ui/icons/Storage';
import problemsData from '../DummyDB/InterviewSummaries/LcProblems.json';
import problemsDataServer from '../DummyDB/InterviewSummaries/LcUserServerProblems.json';
import axios from 'axios';

const CreateCustomCodingSheetsEdit = () => {
    const [needDarkMode, setNeedDarkMode] = useState(false);
    const [problemLink, setProblemLink] = useState('');
    const [recentlyAddedProblems, setRecentlyAddedProblems] = useState([]);
    const [problemStatus, setProblemStatus] = useState({});
    // const [problemsStoredInServer, setProblemsStoredInServer] = useState(problemsDataServer);
    const [problemsStoredInServer, setProblemsStoredInServer] = useState([]);
    
    const [ownerId, setOwnerId] = useState(942);
    const [sheetId, setOheetId] = useState(823);
    const [sheetName, setSheetName] = useState('This is Sheet Name'); // Add this
    const [sheetDesc, setSheetDesc] = useState('This is Sheet Desc'); // Add this


    useEffect(() => {
        document.title = "Contest Archive - Algolisted";
    }, []);

    useEffect(() => {
        let selectedTheme = localStorage.getItem("selectedTheme");
        if (selectedTheme === 'dark') setNeedDarkMode(true);
    }, []);

    // console.log(problemsDataServer);



    // console.log("needDarkMode : ", needDarkMode);
    const toggleDarkMode = () => {
        setNeedDarkMode(!needDarkMode);
    };

    const filters = customCodingSheetsFilters.map((item) => {
        return (
            <a
                href={item.domainFilter}
                key={item.id}
                className="filter"
            >
                {item.text}
            </a>
        );
    });

    // console.log(problemsData);

    function extractProblemName(url) {
        // Define a regular expression to match the "anything" part of the URL
        const regex = /https:\/\/leetcode\.com\/problems\/([^/]+)/;
      
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
            setRecentlyAddedProblems(recentlyAddedProblems.concat(scrapedProblemData));

            // Set the initial status as "scrapping" with the timestamp
            setProblemStatus((prevStatus) => ({
                ...prevStatus,
                [scrapedProblemData.quesName]: { status: 'scrapping', timestamp },
            }));
        }
        // console.log(scrapedProblemData);
        setProblemLink("");
    }

    useEffect(() => {
        const updateProblemStatus = () => {
            const currentTime = Date.now();
            const updatedStatus = { ...problemStatus };

            for (const problemName in problemStatus) {
                const problem = problemStatus[problemName];
                if (problem.status === 'scrapping' && currentTime - problem.timestamp >= 6000) {
                    updatedStatus[problemName] = { status: 'scrapping-done' };
                }
            }

            setProblemStatus(updatedStatus);
        };

        const interval = setInterval(updateProblemStatus, 1000);

        return () => clearInterval(interval);
    }, [problemStatus]);

    const handleDeleteProblem = (problemName) => {
        const updatedProblems = recentlyAddedProblems.filter(problemData => problemData.quesName !== problemName);
        setRecentlyAddedProblems(updatedProblems);
    };

    const handleDeleteProblemFromServerProblems = (problemName) => {
        const updatedProblems = problemsStoredInServer.filter(problemData => problemData.quesName !== problemName);
        setProblemsStoredInServer(updatedProblems);
        // console.log(updatedProblems);
    };

    const handleExportProblemSheet = async () => {
        const problemIds = recentlyAddedProblems.map(problemData => extractProblemName(problemData.quesLink));
        console.log(problemIds);

        const data = {
            sheetId,
            // sheetName,
            // sheetDesc,
            problemIds,
        };

        try {
            const response = await axios.post('http://localhost:8000/problem-sheets/update', data);

            if (response.status === 200) {
                console.log(response.data);
                alert("Problem sheet has been updated.");
                
            } else {
                alert("Something went wrong!");
            }
        } catch (error) {
            console.error(error);
            alert("Something went wrong!");
        }
    };


    return (
        <GrandContainer>
            <MobContainer>
                We are still working on Responsive Version of the website, please view the site with
                width more than 1100px, a standard laptop or tablet landscape.
                <img src="https://media4.giphy.com/media/13FrpeVH09Zrb2/giphy.gif" alt="" />
            </MobContainer>
            <Container>
                {
                    needDarkMode ? <CCHeaderDarkPlus needDarkMode={needDarkMode} toggleDarkMode={toggleDarkMode} /> : <CCHeaderPlus needDarkMode={needDarkMode} toggleDarkMode={toggleDarkMode} />
                }
                {
                    needDarkMode ? <LeftMenuDark marked={"coding-sheets"} /> : <LeftMenu marked={"coding-sheets"} />
                }
                {/* ---> change this all-blogs to your desired page-id */}

                <div className="cc-middle-content">
                    <h1 className='main-heading'>Binary Search for Beginners</h1>
                    <p className="heading-supporter">
                        Explore 'Binary Search for Beginners,' a comprehensive guide by a seasoned LeetCode enthusiast. Discover over 50 LeetCode questions and hone your binary search skills, making complex problem-solving seem like a breeze. Perfect for newcomers seeking a solid foundation in this essential algorithm.
                    </p>
                    <div className="message">
                        <div className="icon"></div>
                        <div className="text">
                            Curious about how to use it? Watch our <a href="/">youtube video</a> to see how it's done!
                        </div>
                    </div>
                    {/* <Filters>
                        {filters}
                    </Filters> */}

                    <div className="controls">
                        <div className='export-btn' onClick={handleExportProblemSheet}>
                            <LinkIcon />
                            Click to Save and Export Problem Sheet Link
                        </div>
                        <div className="add-link">
                            <div className='options'>
                                <div className="platform">Leetcode</div>
                                <ExpandMoreIcon />
                            </div>

                            <input type="text" placeholder="Enter Problem Link" value={problemLink} onChange={(e) => setProblemLink(e.target.value)} />
                            <div className='square' onClick={() => handleAddProblem()}><AddIcon /></div>
                        </div>
                    </div>
                    
                    {/* <Model>
                        <div className="model">You material UI modal https://mui.com/material-ui/react-modal/</div>
                    </Model> */}
                    <div className="problem-sheet">
                        <h3>Newly added Problems</h3>
                        {
                            recentlyAddedProblems.length > 0 ? (
                                <div>
                                    {recentlyAddedProblems.map((problemData, index) => {
                                        const status = problemStatus[problemData.quesName] ? problemStatus[problemData.quesName].status : 'scrapping';
                                        return (
                                            <div className="problem" key={index}>
                                                <div className="square-box">{index + 1}</div>
                                                <a href={problemData.quesLink} target='_blank' className="problem-name">
                                                    {problemData.quesName}
                                                    {status === 'scrapping' ? (
                                                        <div className="scrapping">
                                                            <img src="https://openaccess.sagepub.com/SciPrisV4S12/Content/images/loading7.gif" alt="" />
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
                                                    <DeleteIcon onClick={() => handleDeleteProblem(problemData.quesName)} />
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            ) : (
                                <div className='empty-array-message'>
                                    <div className="text">
                                        You currently don't have any problem added in the local server. Please paste a link in the above
                                        input bar and hit the add symbol to see you problem.
                                    </div>
                                </div>
                            )
                        }

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
                                {problemsStoredInServer.length > 0 && problemsStoredInServer.map((problemData, index) => {
                                    return (
                                        <div className="problem" key={index}>
                                            <div className="square-box">{index + 1}</div>
                                            <a href={problemData.quesLink} target="_blank" className="problem-name">
                                                {problemData.quesName}
                                                <StorageIcon />
                                                <div className="status-message">
                                                    Problem Stored in Server
                                                </div>
                                            </a>
                                            <div className="square-box cursor-pointer">
                                                <DeleteIcon onClick={() => handleDeleteProblemFromServerProblems(problemData.quesName)} />
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        ) : (
                            <div className='empty-array-message'>
                                <div className="text">Empty Array</div>
                            </div>
                        )}
                    </div>
                </div>
            </Container>
        </GrandContainer>
    )
}

export default CreateCustomCodingSheetsEdit

const GrandContainer = styled.div`
    .cursor-pointer{
        cursor: pointer;
    }
`

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

    .model{
        width: 500px;
        height: 400px;
        background-color: white;
        border-radius: 10px;
    }
`

const MobContainer = styled.div`
  width: 100vw;
  padding: 40px;
  text-align: center;
  font-size: 2rem;
  font-weight: 500;

  img{
    width: calc(100% - 80px);
    margin: 40px;
    border-radius: 5px;
    display: block;
  }

  @media only screen and (min-width: 1099px){
    display: none;
  }
`

const Container = styled.div`
    @media only screen and (max-width: 1099px){
        display: none;
    }

    display: flex;
    justify-content: space-between;
    padding-left: 200px;

    a{
      color: #18489f;
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
          color: #292929;
      }

      .heading-supporter{
          font-size: 1.05rem;
          margin-bottom: 10px;
          font-weight: 400;
          color: #696168;

          a{
            color: #18489f;
            font-size: 0.95rem;
            font-weight: 300;
            margin-left: 0.25rem;
          }
      }

      .message{
        display: inline-block;
        /* display: flex; */
        /* align-items: center; */
        background-color: #d5f7e1;
        border-radius: 5px;
        padding: 10px;
        margin: 20px 0 40px 0;

        .text{
            font-size: 0.8rem;
            color: #13803b;
            font-weight: 300;
            
        }
      }

      .controls{
        .export-btn{
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: center;
            background-color: #f7f8f8;
            border: 1px solid #e5e5e5;
            border-radius: 10px;
            font-size: 0.8rem;
            padding: 5px 15px;
            height: 50px;
            text-align: center;

            svg{
                margin-right: 10px;
            }
        }

        .square{
            width: 50px;
            height: 50px;
            display: flex;
            align-items: center;
            justify-content: center;
            background-color: white;
            border: 1px solid #e5e5e5;
            border-radius: 10px;
            cursor: pointer;
        }

        .add-link{
            margin-top: 10px;
            width: 100%;
            display: flex;
            align-items: center;

            .options{
                display: flex;
                align-items: center;
                justify-content: space-between;
                background-color: white;
                border: 1px solid #e5e5e5;
                border-radius: 10px;
                font-size: 0.8rem;
                padding: 5px 15px;
                width: 150px;
                height: 50px;
            }

            input{
                display: flex;
                align-items: center;
                background-color: white;
                border: 1px solid #e5e5e5;
                border-radius: 10px;
                font-size: 0.8rem;
                padding: 5px 15px;
                flex: 1;
                height: 50px;
                margin: 0 10px;
            }
        }
      }

      .problem-sheet{
        margin-top: 30px;
          
        h3{
            margin-top: 50px;
            font-size: 1.25rem;
            font-weight: 500;
            margin-bottom: 20px;
        }

        .empty-array-message{
            .text{
                font-size: 0.8rem;
            }
        }

        .problem{
            margin-top: 10px;
            display: flex;
            align-items: center;

            .square-box{
                width: 50px;
                height: 50px;
                display: flex;
                align-items: center;
                justify-content: center;
                background-color: white;
                border: 1px solid #e5e5e5;
                border-radius: 10px;
            }

            .problem-name{
                position: relative;
                flex: 1;
                display: flex;
                align-items: center;
                justify-content: space-between;
                background-color: #fff;
                border: 1px solid #e5e5e5;
                border-radius: 10px;
                font-size: 0.8rem;
                padding: 5px 15px;
                height: 50px;
                text-align: center;
                margin: 0 10px;
                text-decoration: none;
                color: cornflowerblue;

                svg{
                    
                }

                .status-message{
                    position: absolute;
                    height: 20px;
                    right: 55px;
                    top: 18px;
                    font-size: 0.6rem;
                }

                img{
                    height: 25px;
                }
            }
        }
      }
    }
`

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

    img{
        height: 20px;
    }

    .text{
        font-size: 0.8rem;
        font-weight: 500;
        margin-left: 10px;
    }
`
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

	.filter2{
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

		svg{
			font-size: 1rem;
			margin-left: 5px;
		}

		&:hover {
			border-color: #201f1f;
			background-color: #201f1f;
			color: #ebdddd;
			transition-duration: 250ms;
			cursor: pointer;

			svg{
				fill: #ebdddd;
			}
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
