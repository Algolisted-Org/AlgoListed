import React, { useState, useEffect } from 'react';
import styled, { css } from 'styled-components';
import CCHeaderPlus from '../Components/CCHeaderPlus';
import CCHeaderDark from '../Components/CCHeaderDark';
import LeftMenu from '../Components/LeftMenu';
import LeftMenuDark from '../Components/LeftMenuDark';
import axios from 'axios';
import { contestAnalysisFilters } from '../Components/contestAnalysisFilters';
import LockIcon from '@material-ui/icons/Lock';
import WarningIcon from '@material-ui/icons/Warning';
import SearchIcon from '@material-ui/icons/Search';
import CCHeaderDarkPlus from '../Components/CCHeaderDarkPlus';
import contestsData from '../DummyDB/InterviewSummaries/LcContests.json';
import EqualizerIcon from '@material-ui/icons/Equalizer';
import CallMadeIcon from '@material-ui/icons/CallMade';
import NotesIcon from '@material-ui/icons/Notes';
import CreateIcon from '@material-ui/icons/Create';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider';
import { useLocalStorage } from "@uidotdev/usehooks";
import { FaWineBottle } from 'react-icons/fa';
import NoteMaking from '../MicroComponents/NoteMakingCompo';

const ContestArchive = () => {
  const [platformName, setPlatformName] = useState('leetcode');
  const [contestType, setContestType] = useState('Weekly Contest');
  const [contestNumber, setContestNumber] = useState('361');
  const [needDarkMode, setNeedDarkMode] = useState(false);
  const [showTags, setShowTags] = useLocalStorage("showTags", true);
  const [filterContestType, setFilterContestType] = useState("All");
  const [filterContestTypeName, setFilterContestTypeName] = useState("Both Contest Types");
  const [openModel1, setOpenModel1] = useState(false);
  const [openModel2, setOpenModel2] = useState(false);
  const [sliderInputValue, setSliderInputValue] = useState(20);
  const [filteredContestData, setFilteredContestData] = useState(contestsData);
  const [checkbox1, setCheckbox1] = useLocalStorage("checkbox1", false);
  const [checkbox2, setCheckbox2] = useLocalStorage("checkbox2", false);
  const [checkbox3, setCheckbox3] = useLocalStorage("checkbox3", false);
  const [checkbox4, setCheckbox4] = useLocalStorage("checkbox4", false);
  const [notes, setnotes]=useState ( []) ;
  const notesadded = (name) => {
    if(notes.includes(name)){
      const filterdata = notes.filter(each=>each!==name);
      setnotes([...filterdata]);
    }
    else{
      setnotes(prev=>[...prev, name]);
    }
  }
  // const [checkboxShared,setCheckboxShared] = useState(localStorage.getItem("checkboxShared") || {0:false, 1:false, 2:false, 3:false});
  // const [checkboxShared, setCheckboxShared] = useLocalStorageCustom("checkboxShared", []);
  const [checkboxstate,setCheckboxstate]= useState(JSON.parse(localStorage.getItem("checkboxShared")) || null)
  let arr;
  useEffect(() => {
    let selectedTheme = localStorage.getItem("selectedTheme");
    if (selectedTheme === 'dark') setNeedDarkMode(true);
  }, [])

  useEffect(() => {
    document.title = "Contest Archive - Algolisted";
  }, []);

  console.log("needDarkMode : ", needDarkMode);
  const toggleDarkMode = () => {
    setNeedDarkMode(!needDarkMode);
  };

  useEffect(() => {
    console.log(filterContestType);
  }, [filterContestType])

  useEffect(() => {
    const filteredData = contestsData.filter((contest) => {
      if (filterContestType === 'All') {
        return true; // Show all contests
      } else {
        return contest.contest_type === filterContestType;
      }
    }).slice(0, sliderInputValue);

    setFilteredContestData(filteredData);
  }, [filterContestType, sliderInputValue]);


  const filters = contestAnalysisFilters.map((item) => {
    return (
      <div
        key={item.id}
        className={
          item.domainFilter === platformName ? 'filter selected' : (
            item.lock === true ? 'locked-feature filter' : 'filter'
          )
        }
      >
        {item.text}
        {item.lock === true ? <LockIcon /> : <></>}
      </div>
    );
  });

  const onClick1 = (e) => {
    setCheckbox1(e.target.checked)
  }
  const onClick2 = (e) => {

    setCheckbox2(e.target.checked)
  }
  const onClick3 = (e) => {
    setCheckbox3(e.target.checked)
  }
  const onClick4 = (e) => {
    setCheckbox4(e.target.checked)
  }


    const onClickShared = (pname, cname) => {
      pname = pname.toLowerCase().replaceAll(" ", "_");
      cname = cname.toLowerCase().replaceAll(" ", "_");
      let x = JSON.parse(window.localStorage.getItem("checkboxShared"));
      if (!x) {
        const objToSave = {
          [cname]: {
            [pname]: true,
          }
        }
        window.localStorage.setItem("checkboxShared", JSON.stringify(objToSave));
        setCheckboxstate(objToSave);
        return;
      }

      if (!Object.keys(x).includes(cname)) {
        const objToSave = {
          ...x,
          [cname]: {
            [pname]: true,
          }
        }
        window.localStorage.setItem("checkboxShared", JSON.stringify(objToSave));
        // console.log(objToSave);
        setCheckboxstate(objToSave);

        return;
      }

      if (!Object.keys(x[cname]).includes(pname)) {
        const objToSave = {
          ...x,
          [cname]:
          {
            ...x[cname],
            [pname]: true
          }
        }
        window.localStorage.setItem("checkboxShared", JSON.stringify(objToSave));
        // console.log(objToSave);
        setCheckboxstate(objToSave);


        return;
      }

      const newObject = { ...x[cname] }
      delete newObject[pname];

      const objToSave = {
        ...x,
        [cname]: newObject
      }

      localStorage.setItem("checkboxShared", JSON.stringify(objToSave));
      // console.log(objToSave);
      setCheckboxstate(objToSave)
      
    }

    const isQuestionSolved = (cname,pname)=>{
      cname = cname.toLowerCase().replaceAll(" ","_");
      pname = pname.toLowerCase().replaceAll(" ","_");
      return checkboxstate && checkboxstate?.[cname]&& checkboxstate[cname]?.[pname]
    }
  

  const redirectToContest = () => {
    const url = `/contest-analysis/${contestType.toLowerCase().replace(' ', '-')}-${contestNumber}`;
    window.location.href = url;
  };

  const marks = [
    {
      value: 0,
      label: 'None',
    },
    {
      value: 5,
      label: '5',
    },
    {
      value: 10,
      label: '10',
    },
    {
      value: 15,
      label: '15',
    },
    {
      value: 20,
      label: '20',
    },
    {
      value: 25,
      label: '25',
    },
    {
      value: 30,
      label: '30',
    },
    {
      value: 35,
      label: '35',
    },
    {
      value: 40,
      label: '40',
    },
    {
      value: 45,
      label: '45',
    },
    {
      value: 50,
      label: '50',
    },
    {
      value: 55,
      label: '55',
    },
    {
      value: 60,
      label: '60',
    },
    {
      value: 65,
      label: '65',
    },
    {
      value: 70,
      label: '70',
    },
    {
      value: 75,
      label: '75',
    },
    {
      value: 80,
      label: '80',
    },
    {
      value: 85,
      label: '85',
    },
    {
      value: 90,
      label: '90',
    },
    {
      value: 95,
      label: '95',
    },
    {
      value: 100,
      label: '100',
    },
  ];

  function generateContestAnalysisURL(contestName) {
    const contestNameSlug = contestName.replace(/\s+/g, '-').toLowerCase();

    const contestAnalysisURL = `/contest-analysis/${contestNameSlug}`;

    return contestAnalysisURL;
  }


  return (
    <GrandContainer>
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
          {/* <Filters2 needDarkMode={needDarkMode}>
            <a href='/contest-analysis' className="filter">Contests Analysis</a>
            <a href='' className="filter selected">Contests Archive</a>
          </Filters2> */}

          {/* <div className="note">
            <b>NOTE</b> : Make sure to pick the kind of contest and the contest number you want, like the Weekly Contest and 365, for example.
          </div> */}
          <div className="visulization">
            <div className="visulization-cap">Visulization
              <ExpandLessIcon />
            </div>
            <div className="one-type-visualization">
              <p className="small-text">
                Here we are planning to show bar graph of top 5 tags of the <b>filtered contest-problem-set</b>,
                the bar graph will be kind of a complex one - Each column of the graph would have three layers of
                different colors represent the problem difficulty (easy/medium/hard).
              </p>
            </div>
            <div className="one-type-visualization">
              <img src="https://venngage-wordpress.s3.amazonaws.com/uploads/2022/01/Colorful-Stacked-Bar-Chart-Template.png" alt="" />
            </div>
            <div className="one-type-visualization">
              <img src="https://i.ytimg.com/vi/FYxpNm33YBA/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLBzkSliT5dho_jEjc7QF0KVbSFxgw" alt="" />
            </div>
            <div className="one-type-visualization"></div>
          </div>

          <EffectiveFilter className='noselect'>
            <div className="left">
              <div className="filter-item noselect" onClick={() => setOpenModel1(!openModel1)}> {filterContestTypeName}
                {openModel1 == false ? <ExpandMoreIcon /> : <ExpandLessIcon />}
                {
                  openModel1 ? (
                    <ShowAbsoluteModelDropDown>
                      <div className="option" onClick={() => { setFilterContestType("All"); setFilterContestTypeName("Both Contest Types") }}>Both Contest Types</div>
                      <div className="option" onClick={() => { setFilterContestType("Weekly"); setFilterContestTypeName("Weekly Contests Only") }}>Weekly Contests Only</div>
                      <div className="option" onClick={() => { setFilterContestType("Biweekly"); setFilterContestTypeName("Biweekly Contests Only") }}>Biweekly Contests Only</div>
                    </ShowAbsoluteModelDropDown>
                  ) : <></>
                }
              </div>
              <div className="filter-item" onClick={() => setOpenModel2(!openModel2)}>Last {sliderInputValue} Contests
                {openModel2 == false ? <ExpandMoreIcon /> : <ExpandLessIcon />}
              </div>
            </div>
            <div className="right">
              {/* <div className="filter-item">A</div>
              <div className="filter-item">B</div>
              <div className="filter-item">C</div>
              <div className="filter-item">D</div> */}
              <div className="filter-item" onClick={() => { setShowTags(!showTags); }}>{showTags ? "Hide Problem Tags" : "Show Problem Tags"}</div>
              {/* <div className="filter-item">Show Unsolved</div>  */}
            </div>
          </EffectiveFilter>
          {
            openModel2 ? (
              <SliderSelector>
                <Slider onChange={(_, value) => setSliderInputValue(value)}
                  defaultValue={20}
                  aria-label="discrete-slider-custom"
                  step={5}
                  valueLabelDisplay="auto"
                  marks={marks}
                />
              </SliderSelector>
            ) :
              <div></div>
          }


          <div className="problems-table">
            {filteredContestData.map((contestData, index) => (
              <div className="one-contest-problems" key={index}>
                <div className="contest-name">{contestData.contest_name}</div>
                <div className="contest-outlinks">
                  <a href={contestData.contest_link} target='_blank' className="link">
                    <CallMadeIcon />
                  </a>
                  <a href={generateContestAnalysisURL(contestData.contest_name)} target='_blank' className="link">
                    <EqualizerIcon />
                  </a>
                  <div className="link" onClick={() => notesadded(contestData.contest_name)} >
                    <CreateIcon />
                  </div>
                </div>
                {
                  notes.includes(contestData.contest_name) ? 
                  <NoteMaking name={contestData.contest_name}/>
                  : Object.values(contestData.problems).map((problem, problemIndex) => (
                    <div className={`contest-problem ${isQuestionSolved(contestData.contest_name,problem.name)?"solved-problem":""}`} key={problemIndex}>
                      <div className="problem-main-name">
                        <label>
                          <input type="checkbox" onChange={() => { onClickShared(problem.name, contestData.contest_name) }} checked={isQuestionSolved(contestData.contest_name,problem.name)}/>
                          Problem Unsolved
                        </label>
                        <div className="problem-name">{String.fromCharCode(65 + problemIndex)}. {problem.name}</div>
                      </div>
                      {
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
                      }
  
                    </div>
                  ))
                }
              </div>
            ))}
          </div>
        </div>
      </Container>
    </GrandContainer>
  );
};

export default ContestArchive;

const GrandContainer = styled.div`
  .noselect {
    -webkit-touch-callout: none; /* iOS Safari */
    -webkit-user-select: none; /* Safari */
    -khtml-user-select: none; /* Konqueror HTML */
    -moz-user-select: none; /* Old versions of Firefox */
    -ms-user-select: none; /* Internet Explorer/Edge */
    user-select: none; /* Non-prefixed version, currently
    supported by Chrome, Edge, Opera and Firefox */
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



      .message2{
        display: flex;
        align-items: center;
        background-color: #f48b8b;
        border-radius: 5px;
        padding: 10px;
        margin: 20px 0 10px 0;

        .icon{
          svg{
            fill: white;
            font-size: 1.25rem;
            margin-bottom: -0.2rem;
          }
          margin-right: 10px;
        }

        .text{
            font-size: 0.8rem;
            color: white;
            font-weight: 300;

        }
      }

      .visulization{
        position: relative;
        height: 200px;
        width: 100%;
        background-color: #ffffff;
        border-radius: 20px;
        margin: 50px 0 20px 0;
        border: 1px solid rgb(209, 213, 219);
        display: flex;

        .visulization-cap {
            position: absolute;
            height: 30px;
            border-radius: 100px;
            background-color: #f3f4f7;
            border: 1px solid rgb(209, 213, 219);
            left: -15px;
            top: -15px;
            padding: 0 10px;
            display: flex;
            align-items: center;
            font-size: 0.8rem;
            font-weight: 300;

            svg{
              font-size: 1.25rem;
              margin-left: 5px;
            }
          }

        .one-type-visualization{
          height: 100%;
          width: 25%;
          border-right: 1px solid rgb(209, 213, 219);
          overflow-y: scroll;

          ::-webkit-scrollbar {
            display: none;
          }
          
          &:last-child {
            border-right: none;
          }

          .small-text{
            font-size: 0.75rem;
          }

          img{
            height: 100%;
          }

          padding: 20px;
        }
      }

      .problems-table{
        width: 100%;
        border-radius: 20px;
        margin-top: 60px;

        .one-contest-problems{
          position: relative;
          height: 200px;
          width: 100%;
          background-color: #ffffff;
          border-radius: 20px;
          margin-bottom: 30px;
          display: flex;
          border: 1px solid rgb(209, 213, 219);
          
          /* border: 1px solid #e5e5e5; */

          .contest-name {
            position: absolute;
            height: 30px;
            border-radius: 100px;
            background-color: #f3f4f7;
            border: 1px solid rgb(209, 213, 219);
            left: -15px;
            top: -15px;
            padding: 0 10px;
            display: flex;
            align-items: center;
            font-size: 0.8rem;
            font-weight: 300;
          }

          .contest-outlinks{
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
              background-color: #f3f4f7;
              border: 1px solid rgb(209, 213, 219);
              border-radius: 50%;
              margin-bottom: 7.5px;

              display: grid; 
              place-items: center;
              
              svg{
                fill: #cacacd;
                font-size: 1.25rem;
              }

              &:hover{
                cursor: pointer;
                border-color: black;
                transition-duration: 250ms;

                svg{
                  fill: #333;
                }
              }
            }
          }

          .contest-problem {
            height: 100%;
            width: 25%;
            border-right: 1px solid rgb(209, 213, 219);
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

            .problem-main-name{
              margin-bottom: 20px;
              label{
                display: flex;
                align-items: center;
                margin-bottom: 5px;

                input{
                  margin-right: 5px;
                }

                font-size: 0.65rem;
              }

              .problem-name{
                font-size: 0.85rem;
                font-weight: 500;
                color: cornflowerblue;
              }
            }

            .problem-info{
              display: flex;
              flex-wrap: wrap;

              .tag{
                font-size: 0.65rem;
                padding: 2.5px 7.5px;
                border: 1px solid rgb(202, 195, 195);
                border-radius: 100px;
                margin: 0 2.5px 2.5px 0;
                font-weight: 300;
                background-color: #f3f4f7;
              }

              .difficulty-tag{
                border-color: rgb(17, 17, 17);
                /* background-color: #fff; */
              }
            }


          }

          .solved-problem{
            background-color: #dcf8eb;
          }
        }
      }



      .note{
        font-weight: 200;
        font-size: 0.85rem;
        color: ${(props) => (props.needDarkMode ? '#e5e5e5' : '#333')};


        b{
          font-weight: 400;
          color: ${(props) => (props.needDarkMode ? '#e5e5e5' : '#333')};

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

const Filters2 = styled.div`
	display: flex;
	flex-wrap: wrap;
	margin: 10px 0 10px 0;

	.filter {
		padding: 7.5px 15px;
		font-size: 0.7rem;
    text-transform: uppercase;
    letter-spacing: 0.07rem;
		border: 1px solid #675f5f;
		border-radius: 10px;
		margin: 0px 5px 5px 0px;
		font-weight: 300;
		text-decoration: none;
		color: ${(props) => (props.needDarkMode ? '#e5e5e5' : '#333')};

    svg{
      font-size: 1rem;
      margin-bottom: -0.2rem;
      margin-left: 5px;
      fill: #71c929;
    }

		&:hover {
			transition-duration: 250ms;
			cursor: pointer;
      border-color: rgb(185, 175, 175);
  		background-color: ${(props) => (props.needDarkMode ? '#404249' : '#e5e5e5')};
  		border-color: ${(props) => (props.needDarkMode ? '#aea4a4' : 'rgb(185, 175, 175)')};
  		color: ${(props) => (props.needDarkMode ? '#fff' : '#201f1f')};
		}
	}

	.selected {
		/* background-color: #ded7d7;
    color: #111; */
		border-color: #675f5f;
    background-color: ${(props) => (props.needDarkMode ? '#404249' : '#e5e5e5')};
    color: ${(props) => (props.needDarkMode ? '#e5e5e5' : '#201f1f')};
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

const EffectiveFilter = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
	margin: 20px 0;

	.left{
		display: flex;
		justify-content: space-between;
		align-items: center;

    .filter-item{
			padding: 5px 10px;
			font-size: 0.7rem;
			border: 1px solid #d0d5db;
			border-radius: 3px;
			margin-right: 5px;
			cursor: pointer;

      position: relative;

      display: flex;
      align-items: center;

      svg{
        font-size: 1rem;
        margin-left: 5px;
      }
		}
	}

	.right{
		display: flex;
		align-items: center;

		.filter-item{
			padding: 5px 10px;
			font-size: 0.7rem;
			border: 1px solid #d0d5db;
			border-radius: 3px;
      margin-left: 5px;
			cursor: pointer;
		}
	}
`

const ShowAbsoluteModelDropDown = styled.div`
  position: absolute;
  max-height: 200px;
  min-height: 30px;
  width: 200px;
  background-color: #ffffff;
  border: 1px solid #d0d5db;
  border-radius: 5px;
  top: 35px;
  left: -5px;
  z-index: 10;
  overflow-y: scroll;
  cursor: default;

  /* -webkit-box-shadow: 0px 0px 60px 0px rgba(219,212,219,1);
  -moz-box-shadow: 0px 0px 60px 0px rgba(219,212,219,1);
  box-shadow: 0px 0px 60px 0px rgba(219,212,219,1); */
    
  ::-webkit-scrollbar {
    display: none;
  }

  display: flex;
  flex-direction: column;

  .option{
    height: 40px;
    border-bottom: 1px solid #d0d5db;
    display: grid;
    padding: 0 10px;
    display: flex;
    align-items: center;

    &:hover{
      background-color: #e5e5e5;
      cursor: pointer;
      transition-duration: 250ms;
    }
  }

  &:last-child {
    border-bottom: none;
  }

`

const SliderSelector = styled.div`
  height: 80px;
  width: 100%;
  /* background-color: pink; */
  border-radius: 10px;

  span{
    font-family: "Roboto", "Helvetica", "Arial", sans-serif;
    font-size: 0.65rem;
  }

  /* padding: 10px 50px; */
`