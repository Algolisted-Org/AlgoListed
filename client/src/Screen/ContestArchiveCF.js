import React, { useState, useEffect, useRef } from 'react';
import styled, { css } from 'styled-components';
import CCHeaderPlus from '../Components/CCHeaderPlus';
import LeftMenu from '../Components/LeftMenu';
import LeftMenuDark from '../Components/LeftMenuDark';
import { contestAnalysisFilters } from '../Components/contestAnalysisFilters';
import CCHeaderDarkPlus from '../Components/CCHeaderDarkPlus';
import SimpleFooter from '../Components/SimpleFooter';
import LockIcon from '@material-ui/icons/Lock';
import axios from 'axios';

const ContestArchiveCF = () => {
  const [needDarkMode, setNeedDarkMode] = useState(false);
  const [problemsMap, setProblemsMap] = useState(null);
  const platform = "codeforces";

  useEffect(() => {
    document.title = "ContestArchiveCF Page - Algolisted";
  
    let selectedTheme = localStorage.getItem("selectedTheme");
    if (selectedTheme === 'dark') setNeedDarkMode(true);
  
    const getContestsAndProblems = async () => {
      const contestListUrl = "https://codeforces.com/api/contest.list";
      const problemsUrl = "https://codeforces.com/api/problemset.problems";
  
      try {
        // Fetch the list of contests
        const contestResponse = await axios.get(contestListUrl);
        const contests = contestResponse.data.result;
  
        // Filter out completed contests and take the latest 100
        const completedContests = contests
          .filter(contest => contest.phase === "FINISHED")
          .slice(0, 100);
  
        // Extract contest IDs
        const contestIds = completedContests.map(contest => contest.id);
  
        const problemsResponse = await axios.get(problemsUrl);
  
        const problemsMapLocal = new Map();
  
        problemsResponse.data.result.problems.forEach(problem => {
          const contestId = problem.contestId;
        
          // Check if the contestId is in the array of completed contest IDs
          if (contestIds.includes(contestId)) {
            if (!problemsMapLocal.has(contestId)) {
              problemsMapLocal.set(contestId, []);
            }
        
            problemsMapLocal.get(contestId).push({
              name: problem.name,
              index: problem.index,
              type: problem.type,
              rating: problem.rating,
              tags: problem.tags,
            });
          }
        });
  
        console.log(problemsMapLocal);
        setProblemsMap(problemsMapLocal);
      } catch (error) {
        console.error('Error fetching contest list or problems:', error);
      }
    };
  
    getContestsAndProblems();
  }, []);

  useEffect(() => {
    console.log(problemsMap);
  }, [problemsMap])

  console.log("needDarkMode : ", needDarkMode);

  const toggleDarkMode = () => {
    setNeedDarkMode(!needDarkMode);
  };

  const filters = contestAnalysisFilters.map((item) => {
    return item.lock === true ? (
      <div key={item.id} className='locked-feature filter'>
        {item.text}
        <LockIcon />
      </div>
    ) : (
      <a
        href={item.domainFilter}
        key={item.id}
        className={item.domainFilter === platform ? 'filter selected' : 'filter'}
      >
        {item.text}
      </a>
    );
  });




  return (
    <GrandContainer needDarkMode={needDarkMode}>
      <MobContainer>
        We are still working on Responsive Version of the website, please view the site with
        width more than 1100px, a standard laptop or tablet landscape.
        <img src="https://media4.giphy.com/media/13FrpeVH09Zrb2/giphy.gif" alt="" />
      </MobContainer>
      <Container needDarkMode={needDarkMode}>
        {
          needDarkMode ? <CCHeaderDarkPlus needDarkMode={needDarkMode} toggleDarkMode={toggleDarkMode} /> : <CCHeaderPlus needDarkMode={needDarkMode} toggleDarkMode={toggleDarkMode} />
        }
        {
          needDarkMode ? <LeftMenuDark marked={"contests-archive"} /> : <LeftMenu marked={"contests-archive"} />
        }
        <div className="cc-middle-content">
          <h1 className='main-heading'>Contest Archive</h1>
          <p className="heading-supporter">
            Cruise through a seamless and organized collection of all contest problems, empowering you to tackle them with maximum efficiency. On top of that, we enrich your contest experience with interactive visualizations and engaging infographics that bring the game to life and help you grasp it more effectively.
          </p>
          <div className="message">
            <div className="icon"></div>
            <div className="text">
              A particular feature you have in mind that you'd like to see implemented on this page? <a href="https://github.com/Nayaker/AlgoListed/issues/new">create an enhancement issue</a>
            </div>
          </div>
          <Filters needDarkMode={needDarkMode}>{filters}</Filters>
          <CleanLine />
          <div>
            {problemsMap && (
              <div className="problems-table">
                {[...problemsMap].map(([contestId, problems]) => (
                  <div className="one-contest-problems-parent" key={contestId}>
                    <div className="contest-name">Contest {contestId}</div>
                    {/* <div className="contest-outlinks">
                    <a href={contestData.contest_link} target='_blank' className="link">
                      <CallMadeIcon />
                    </a>
                    <a href={generateContestAnalysisURL(contestData.contest_name)} target='_blank' className="link">
                      <EqualizerIcon />
                    </a>
                    {notes.includes(contestData.contest_name) ?
                      <div className="link" onClick={() => notesadded(contestData.contest_name)} style={{ border: needDarkMode ? "1px solid #e5e5e5" : "1px solid #333" }}>
                        <NotesIcon style={{ fill: needDarkMode ? "#e5e5e5" : "#333" }} />
                      </div> :
                      <div className="link" onClick={() => notesadded(contestData.contest_name)}>
                        <NotesIcon />
                      </div>
                    }
                  </div> */}
                    {/* {notes.includes(contestData.contest_name) ? */}
                    {false ?
                      <div className="one-contest-problems" style={{ "height": "500px" }}>
                        {/* <NoteMaking name={contestData.contest_name} needDarkMode={needDarkMode} /> */}
                      </div>
                      :
                      <div className="one-contest-problems">
                        {problems.map((problem, problemIndex) => (
                          <div className="contest-problem" key={problemIndex}>
                            <div className="problem-main-name">
                              <div className="strip"></div>
                              <label>
                                <input type="checkbox" />
                                Problem Unsolved
                              </label>
                              <a href="/" target='_blank' className="problem-name">{problem.name}</a>
                            </div>
                            {/* {
                            showTags ? (
                              <div className="problem-info">
                                <div className="tag difficulty-tag">{problem.difficulty}</div>
                                {problem.tags.map((tag, tagIndex) => (
                                  <div className="tag" key={tagIndex}>
                                    {tag}
                                  </div>
                                ))}
                              </div>
                            ) : (
                              <div className="problem-info">
                                <div className="tag">Problem Tags are Hidden</div>
                              </div>
                            )
                          } */}
                          </div>
                        ))}
                      </div>
                    }
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
        <SimpleFooter />
      </Container>
    </GrandContainer>
  )
}

export default ContestArchiveCF

const GrandContainer = styled.div`

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
    position: relative;
    padding-bottom: 80px;

    @media only screen and (max-width: 1099px){
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

      .problems-table{
        width: 100%;
        border-radius: 20px;
        margin-top: 60px;
        
        .one-contest-problems-parent{
          position: relative;
          

          .contest-name {
            position: absolute;
            height: 30px;
            border-radius: 100px;
            color: ${(props) => (props.needDarkMode ? '#e5e5e5' : '#333')};
            background-color: ${(props) => (props.needDarkMode ? '#201e1e' : '#f3f4f7')};
            border: 1px solid ${(props) => (props.needDarkMode ? '#595b5f' : 'rgb(209, 213, 219)')};
            left: -15px;
            top: -15px;
            padding: 0 10px;
            display: flex;
            align-items: center;
            font-size: 0.8rem;
            font-weight: 300;
            z-index: 1;
          }

          .contest-outlinks{
              z-index: 1;
              width: 45px;
              /* background-color: black; */
              border-radius: 1000px;
              position: absolute;
              right: -22.5px;
              top: -15px;
  
              display: flex;
              flex-direction: column;
  
              .link{
                width: 100%;
                aspect-ratio: 1/1;
                background-color: ${(props) => (props.needDarkMode ? '#201e1e' : '#f3f4f7')};
                border: 1px solid ${(props) => (props.needDarkMode ? '#595b5f' : 'rgb(209, 213, 219)')};
                /* background-color: #f3f4f7; */
                /* border: 1px solid rgb(209, 213, 219); */
                border-radius: 50%;
                margin-bottom: 7.5px;
  
                display: grid; 
                place-items: center;
                
                svg{
                  fill: ${(props) => (props.needDarkMode ? '#e5e5e5' : '#cacacd')};
                  font-size: 1.25rem;
                }

                .keep-hovered-effect{
                  transition-duration: 250ms;
                  
                  svg{
                    fill: ${(props) => (props.needDarkMode ? '#fff' : '#333')};
                  }
                }
  
                &:hover{
                  cursor: pointer;
                  border-color: black;
                  transition-duration: 250ms;
  
                  svg{
                    fill: ${(props) => (props.needDarkMode ? '#fff' : '#333')};
                  }
                }
              }
            }

          .one-contest-problems{
            transition: height 500ms;
            transition-timing-function: ease-in-out;
            position: relative;
            height: 200px;
            width: 100%;
            background-color: ${(props) => (props.needDarkMode ? '#2b2d31' : '#ffffff')};
            /* background-color: #ffffff; */
            border-radius: 20px;
            margin-bottom: 30px;
            border: 1px solid ${(props) => (props.needDarkMode ? '#595b5f' : 'rgb(209, 213, 219)')};
            overflow: hidden;
            overflow-x: scroll;
            display: flex;

            ::-webkit-scrollbar {
              height: 3px;
              width: 3px; 
            }

            ::-webkit-scrollbar-thumb {
              /* background-color: #211f1f; */
            }

            ::-webkit-scrollbar-track {
              background-color: transparent !important;
            }

            ::-webkit-scrollbar-track-piece:end {
              background-color: transparent; 
            }

            ::-webkit-scrollbar-corner {
              background-color: transparent; 
            }

            
            /* border: 1px solid #e5e5e5; */
  
            .contest-problem {
              position: relative;
              height: 100%;
              width: 25%;
              flex: 0 0 25%;
              border-right: 1px solid ${(props) => (props.needDarkMode ? '#595b5f' : 'rgb(209, 213, 219)')};
              overflow-y: scroll;
  
              ::-webkit-scrollbar {
                display: none;
              }
              
              &:last-child {
                border-right: none;
              }
  
              padding: 20px;
  
              display: flex;
              flex-direction: column;
              justify-content: space-between;
              
              .strip{
                display: none;
                position: absolute;
                height: 2.5px;
                width: 100%;
                background-color: cornflowerblue;
                top: 0;
                left: 0;
              }
  
              .problem-main-name{
                margin-bottom: 20px;
                
                label{
                  display: flex;
                  align-items: center;
                  margin-bottom: 5px;
                  cursor: pointer;
                  color: ${(props) => (props.needDarkMode ? '#e5e5e5' : '#333')};

  
                  input{
                    margin-right: 5px;
                  }
  
                  font-size: 0.65rem;
                }
  
                .problem-name{
                  font-size: 0.85rem;
                  font-weight: 500;
                  color: ${(props) => (props.needDarkMode ? '#8ba0c6' : 'cornflowerblue')};

                  text-decoration: none;
                  line-height: 0.85rem;

                  &:hover{
                    text-decoration: underline;
                  }
                }
              }
  
              .problem-info{
                display: flex;
                flex-wrap: wrap;
  
                .tag{
                  font-size: 0.65rem;
                  padding: 2.5px 7.5px;
                  border: 1px solid ${(props) => (props.needDarkMode ? '#595b5f' : 'rgb(202, 195, 195)')};
                  border-radius: 100px;
                  margin: 0 2.5px 2.5px 0;
                  font-weight: 300;
                  color: ${(props) => (props.needDarkMode ? '#e5e5e5' : '#333')};
                  background-color: ${(props) => (props.needDarkMode ? '#2b2b2b' : '#f3f4f7')};
                }
  
                .difficulty-tag{
                  border-color: 1px solid ${(props) => (props.needDarkMode ? '#595b5f' : 'rgb(17, 17, 17)')};
                  /* background-color: #fff; */
                }
              }
            }
  
            .solved-problem{
              background-color: ${(props) => (props.needDarkMode ? '#232425' : '#dcf8eb')};
              
              .strip{
                display: block;
                background-color: ${(props) => (props.needDarkMode ? '#9affab' : 'transparent')};
              }
            }
          }
        }
      }
    }
`


const Filters = styled.div`
	display: flex;
	flex-wrap: wrap;
	margin: 80px 0 10px 0;

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

const CleanLine = styled.div`
  height: 1px;
  width: 100%;
  background-color: grey;
`