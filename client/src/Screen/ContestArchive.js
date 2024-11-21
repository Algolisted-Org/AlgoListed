import React, { useState, useEffect, useRef } from 'react';
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
import NoteMaking from './../MicroComponents/NoteMakingCompo';
import { Bar } from 'react-chartjs-2';
import DoneIcon from '@material-ui/icons/Done';
import SimpleFooter from '../Components/SimpleFooter';
import StyledModal from '../MicroComponents/Allmodals/StyledModal';
import { useParams } from "react-router-dom";
import MobileNavbar from "../Components/MobileNavbar";


const ContestArchive = () => {
  const [openVisualiser, setOpenVisualiser] = useState(true);
  const [contest, setContest] = useState([]);
  const [needDarkMode, setNeedDarkMode] = useState(true);
  const [loading, setLoading] = useState(true);
  const [showTags, setShowTags] = useLocalStorage("showTags", true);
  const [filterContestType, setFilterContestType] = useState("All");
  const [filterContestTypeName, setFilterContestTypeName] = useState("Both Contest Types");
  const [openModel1, setOpenModel1] = useState(false);
  const [openModel2, setOpenModel2] = useState(false);
  const [sliderInputValue, setSliderInputValue] = useState(20);
  const [filteredContestData, setFilteredContestData] = useState([]);
  const [problemAIsChecked, setProblemAIsChecked] = useState(true);
  const [problemBIsChecked, setProblemBIsChecked] = useState(true);
  const [problemCIsChecked, setProblemCIsChecked] = useState(true);
  const [problemDIsChecked, setProblemDIsChecked] = useState(true);
  const [checkbox1, setCheckbox1] = useLocalStorage("checkbox1", false);
  const [checkbox2, setCheckbox2] = useLocalStorage("checkbox2", false);
  const [checkbox3, setCheckbox3] = useLocalStorage("checkbox3", false);
  const [checkbox4, setCheckbox4] = useLocalStorage("checkbox4", false);
  
  // modal  code start
  const [isModalOpen, setIsModalOpen] = useState(false);
  const inputRef = useRef(null);
  
  const openModal = () => {
    setIsModalOpen(true);
  };

  // const params = useParams();
	// const { platform } = params;

  const platform = "leetcode";

  const closeModal = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    const fetchContestData = async () => {
      try {
        const response = await fetch('https://api.thefutureproject.tech/leetcode/contest/last_hundred/info');
        if (!response.ok) {
          throw new Error('Failed to fetch contest data');
        }
        const contestsData = await response.json();
        setContest(contestsData); // Store the entire contest data in state
        setFilteredContestData(contestsData);
      } catch (error) {
        console.log(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchContestData();
  }, []);


  const handleSubscription = () => {
    const inputValue = inputRef.current.value;
    console.log(inputValue);
    setIsModalOpen(false);
  }

  const renderModalBody = () => {
    return (
      <>
        <TextHeader>Stay in touch </TextHeader>
        <TextMuted>
          Exciting premium features are on the way, and to stay in the loop
          about their release, simply share your email address. We'll ensure you
          stay updated.
        </TextMuted>
        <div className="">
          <InputField type="text" ref={inputRef} placeholder="Enter your email" />
          <SubmitButton onClick={handleSubscription}>Subscribe</SubmitButton>
        </div>
      </>
    )
  }

  const [notes, setnotes] = useState([]);
  const notesadded = (name) => {
    if (notes.includes(name)) {
      const filterdata = notes.filter(each => each !== name);
      setnotes([...filterdata])
    }
    else {
      setnotes(prev => [...prev, name])
    }
  }

  // const [checkboxShared,setCheckboxShared] = useState(localStorage.getItem("checkboxShared") || {0:false, 1:false, 2:false, 3:false});
  // const [checkboxShared, setCheckboxShared] = useLocalStorageCustom("checkboxShared", []);
  const [checkboxstate, setCheckboxstate] = useState(JSON.parse(localStorage.getItem("checkboxShared")) || null)
  let arr;

  useEffect(() => {
    document.title = "Contest Archive - Algolisted";
  }, []);

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
    console.log(filterContestType);
  }, [filterContestType])

  useEffect(() => {
    const filteredData = contest.filter((contest) => {
      if (filterContestType === 'All') {
        return true; // Show all contests
      } else {
        const firstWord = contest.contest_name.split(' ')[0];
        return firstWord === filterContestType;
      }
    }).slice(0, sliderInputValue);

    setFilteredContestData(filteredData);
  }, [filterContestType, sliderInputValue]);


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

  const isQuestionSolved = (cname, pname) => {
    cname = cname.toLowerCase().replaceAll(" ", "_");
    pname = pname.toLowerCase().replaceAll(" ", "_");
    return checkboxstate && checkboxstate?.[cname] && checkboxstate[cname]?.[pname]
  }

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

  const tagsMappedToProblems = {
    A: {},
    B: {},
    C: {},
    D: {}
  };

  filteredContestData.forEach(contest => {
    Object.keys(contest.problems).forEach(problemKey => {
      const problem = contest.problems[problemKey];

      problem.tags.forEach(tag => {
        if (!(tag in tagsMappedToProblems[problemKey])) {
          tagsMappedToProblems[problemKey][tag] = [];
        }

        tagsMappedToProblems[problemKey][tag].push(problem);
      });
    });
  });

  const allTags = new Set();

  for (const problemKey in tagsMappedToProblems) {
    const problem = tagsMappedToProblems[problemKey];
    Object.keys(problem).forEach(tag => {
      allTags.add(tag);
    });
  }

  Object.keys(tagsMappedToProblems).forEach((problem) => {
    const tagsInProblem = tagsMappedToProblems[problem]
    allTags.forEach((tag) => {
      if (!(tag in tagsInProblem)) {
        tagsMappedToProblems[problem][tag] = [];
      }
    })
  })
  console.log(tagsMappedToProblems)


  const sortedTags = Object.keys(tagsMappedToProblems['A'])
  sortedTags.sort();

  const dataForTagsInA = [];
  const dataForTagsInB = [];
  const dataForTagsInC = [];
  const dataForTagsInD = [];
  for (const tag of sortedTags) {
    dataForTagsInA.push(tagsMappedToProblems['A'][tag].length);
    dataForTagsInB.push(tagsMappedToProblems['B'][tag].length);
    dataForTagsInC.push(tagsMappedToProblems['C'][tag].length);
    dataForTagsInD.push(tagsMappedToProblems['D'][tag].length);
  }

  const problems = [
    { isChecked: problemAIsChecked, label: 'Problem A', data: dataForTagsInA, backgroundColor: needDarkMode ? '#AAF683' : '#43d640' },
    { isChecked: problemBIsChecked, label: 'Problem B', data: dataForTagsInB, backgroundColor: needDarkMode ? '#60D394' : '#23ae20' },
    { isChecked: problemCIsChecked, label: 'Problem C', data: dataForTagsInC, backgroundColor: needDarkMode ? '#FFD97D' : '#c77248' },
    { isChecked: problemDIsChecked, label: 'Problem D', data: dataForTagsInD, backgroundColor: needDarkMode ? '#EE6055' : '#cf3838' },
  ];

  const datasets = problems
    .filter(problem => problem.isChecked)
    .map(problem => ({
      label: problem.label,
      data: problem.data,
      backgroundColor: problem.backgroundColor,
    }));

  const data = {
    labels: sortedTags,
    datasets: datasets,
  };

  const barChartOptions = {
    plugins: {
      legend: {
        display: false,
      },
      // title: {
      //   display: true,
      //   text: 'Chart.js Bar Chart - Stacked'
      // },
    },
    responsive: true,
    scales: {
      x: {
        grid: {
          display: false,
        },
        ticks: {
          color: needDarkMode ? '#DDDBD5' : '#343a40'
        },
        stacked: true,
      },
      y: {
        border: {
          color: needDarkMode ? '#586566' : '#e5e5e5',
        },
        grid: {
          color: needDarkMode ? '#586566' : '#e5e5e5'
        },
        ticks: {
          color: needDarkMode ? '#DDDBD5' : '#343a40'
        },
        stacked: true,
      },
    },
  };



  return (
    <GrandContainer aria-disabled={isModalOpen}>
      <MobContainer>
      <MobileNavbar />
      <div className="main-content">
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
          <div className={openVisualiser ? "visualization" : "closed-visualization"}>
            {openVisualiser ?
              <div className='stacked-bar-chart'>
                <Bar options={barChartOptions} data={data} />
                <div className='legends'>
                  <div className='legend'>
                    <input type="checkbox" className="checkbox" checked={problemAIsChecked} onChange={() => {
                      setProblemAIsChecked((prevState) => {
                        return !prevState
                      })
                    }} />
                    <div className='box problem-A' />
                    <label className='legend-label' for="problem A">Problem A</label>
                  </div>
                  <div className='legend'>
                    <input type="checkbox" checked={problemBIsChecked} className="checkbox" onChange={() => {
                      setProblemBIsChecked((prevState) => {
                        return !prevState
                      })
                    }} />
                    <div className='box problem-B' />
                    <label className='legend-label' for="problem B">Problem B</label>
                  </div>
                  <div className='legend'>
                    <input type="checkbox" checked={problemCIsChecked} className="checkbox" onChange={() => {
                      setProblemCIsChecked((prevState) => {
                        return !prevState
                      })
                    }} />
                    <div className='box problem-C' />
                    <label className='legend-label' for="problem C">Problem C</label>
                  </div>
                  <div className='legend'>
                    <input type="checkbox" checked={problemDIsChecked} className="checkbox" onChange={() => {
                      setProblemDIsChecked((prevState) => {
                        return !prevState
                      })
                    }} />
                    <div className='box problem-D' />
                    <label className='legend-label' for="problem D">Problem D</label>
                  </div>
                </div>
              </div>
              : <div></div>}
            <div className="visualization-cap" onClick={() => setOpenVisualiser((prevState) => !prevState)}>
              {openVisualiser ? 'Close Visualization' : 'Open Visualization'}
              {openVisualiser ? <ExpandLessIcon /> : <ExpandMoreIcon />}
            </div>
          </div>

          <EffectiveFilter className='noselect' needDarkMode={needDarkMode}>
            <div className="left">
              <div className="filter-item check_color noselect" onClick={() => setOpenModel1(!openModel1)}> {filterContestTypeName}
                {openModel1 === false ? <ExpandMoreIcon /> : <ExpandLessIcon />}
                {
                  openModel1 ? (
                    <ShowAbsoluteModelDropDown needDarkMode={needDarkMode}>
                      <div className="option" onClick={() => { setFilterContestType("All"); setFilterContestTypeName("Both Contest Types") }}>Both Contest Types</div>
                      <div className="option" onClick={() => { setFilterContestType("Weekly"); setFilterContestTypeName("Weekly Contests Only") }}>Weekly Contests Only</div>
                      <div className="option" onClick={() => { setFilterContestType("Biweekly"); setFilterContestTypeName("Biweekly Contests Only") }}>Biweekly Contests Only</div>
                    </ShowAbsoluteModelDropDown>
                  ) : <></>
                }
              </div>
              <div className="filter-item check_color" onClick={() => setOpenModel2(!openModel2)}>Last {sliderInputValue} Contests
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
              <SliderSelector needDarkMode={needDarkMode}>
                <Slider needDarkMode={needDarkMode} onChange={(_, value) => setSliderInputValue(value)}
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
              <div className="one-contest-problems-parent" key={index}>
                <div className="contest-name">{contestData.contest_name}</div>
                <div className="contest-outlinks">
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
                </div>
                {notes.includes(contestData.contest_name) ?
                  <div className="one-contest-problems" style={{ "height": "500px" }}>
                    <NoteMaking name={contestData.contest_name} needDarkMode={needDarkMode} />
                  </div>
                  :
                  <div className="one-contest-problems">
                    {Object.values(contestData.problems).map((problem, problemIndex) => (
                      <div className={`contest-problem ${isQuestionSolved(contestData.contest_name, problem.name) ? "solved-problem" : ""}`} key={problemIndex}>
                        <div className="problem-main-name">
                          <div className="strip"></div>

                          <label>
                            <input type="checkbox" onChange={() => { onClickShared(problem.name, contestData.contest_name) }} checked={isQuestionSolved(contestData.contest_name, problem.name)} />
                            Problem Unsolved
                          </label>
                          <a href={problem.problemset_problem_link} target='_blank' className="problem-name">{String.fromCharCode(65 + problemIndex)}. {problem.name}</a>
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
                    ))}
                  </div>
                }
              </div>
            ))}
          </div>
        </div>
        {/* modal ( can move inside the content if needed ) */}
        {isModalOpen && <StyledModal body={renderModalBody()} onClose={closeModal} />}
        <SimpleFooter />
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
          <div className={openVisualiser ? "visualization" : "closed-visualization"}>
            {openVisualiser ?
              <div className='stacked-bar-chart'>
                <Bar options={barChartOptions} data={data} />
                <div className='legends'>
                  <div className='legend'>
                    <input type="checkbox" className="checkbox" checked={problemAIsChecked} onChange={() => {
                      setProblemAIsChecked((prevState) => {
                        return !prevState
                      })
                    }} />
                    <div className='box problem-A' />
                    <label className='legend-label' for="problem A">Problem A</label>
                  </div>
                  <div className='legend'>
                    <input type="checkbox" checked={problemBIsChecked} className="checkbox" onChange={() => {
                      setProblemBIsChecked((prevState) => {
                        return !prevState
                      })
                    }} />
                    <div className='box problem-B' />
                    <label className='legend-label' for="problem B">Problem B</label>
                  </div>
                  <div className='legend'>
                    <input type="checkbox" checked={problemCIsChecked} className="checkbox" onChange={() => {
                      setProblemCIsChecked((prevState) => {
                        return !prevState
                      })
                    }} />
                    <div className='box problem-C' />
                    <label className='legend-label' for="problem C">Problem C</label>
                  </div>
                  <div className='legend'>
                    <input type="checkbox" checked={problemDIsChecked} className="checkbox" onChange={() => {
                      setProblemDIsChecked((prevState) => {
                        return !prevState
                      })
                    }} />
                    <div className='box problem-D' />
                    <label className='legend-label' for="problem D">Problem D</label>
                  </div>
                </div>
              </div>
              : <div></div>}
            <div className="visualization-cap" onClick={() => setOpenVisualiser((prevState) => !prevState)}>
              {openVisualiser ? 'Close Visualization' : 'Open Visualization'}
              {openVisualiser ? <ExpandLessIcon /> : <ExpandMoreIcon />}
            </div>
          </div>

          <EffectiveFilter className='noselect' needDarkMode={needDarkMode}>
            <div className="left">
              <div className="filter-item check_color noselect" onClick={() => setOpenModel1(!openModel1)}> {filterContestTypeName}
                {openModel1 === false ? <ExpandMoreIcon /> : <ExpandLessIcon />}
                {
                  openModel1 ? (
                    <ShowAbsoluteModelDropDown needDarkMode={needDarkMode}>
                      <div className="option" onClick={() => { setFilterContestType("All"); setFilterContestTypeName("Both Contest Types") }}>Both Contest Types</div>
                      <div className="option" onClick={() => { setFilterContestType("Weekly"); setFilterContestTypeName("Weekly Contests Only") }}>Weekly Contests Only</div>
                      <div className="option" onClick={() => { setFilterContestType("Biweekly"); setFilterContestTypeName("Biweekly Contests Only") }}>Biweekly Contests Only</div>
                    </ShowAbsoluteModelDropDown>
                  ) : <></>
                }
              </div>
              <div className="filter-item check_color" onClick={() => setOpenModel2(!openModel2)}>Last {sliderInputValue} Contests
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
              <SliderSelector needDarkMode={needDarkMode}>
                <Slider needDarkMode={needDarkMode} onChange={(_, value) => setSliderInputValue(value)}
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
              <div className="one-contest-problems-parent" key={index}>
                <div className="contest-name">{contestData.contest_name}</div>
                <div className="contest-outlinks">
                  <a href={contestData.contest_link} target='_blank' className="link" rel="noreferrer">
                    <CallMadeIcon />
                  </a>
                  <a href={generateContestAnalysisURL(contestData.contest_name)} target='_blank' className="link" rel="noreferrer">
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
                </div>
                {notes.includes(contestData.contest_name) ?
                  <div className="one-contest-problems" style={{ "height": "500px" }}>
                    <NoteMaking name={contestData.contest_name} needDarkMode={needDarkMode} />
                  </div>
                  :
                  <div className="one-contest-problems">
                    {Object.values(contestData.problems).map((problem, problemIndex) => (
                      <div className={`contest-problem ${isQuestionSolved(contestData.contest_name, problem.name) ? "solved-problem" : ""}`} key={problemIndex}>
                        <div className="problem-main-name">
                          <div className="strip"></div>

                          <label>
                            <input type="checkbox" onChange={() => { onClickShared(problem.name, contestData.contest_name) }} checked={isQuestionSolved(contestData.contest_name, problem.name)} />
                            Problem Unsolved
                          </label>
                          <a href={problem.problemset_problem_link} target='_blank' className="problem-name" rel="noreferrer">{String.fromCharCode(65 + problemIndex)}. {problem.name}</a>
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
                    ))}
                  </div>
                }
              </div>
            ))}
          </div>
        </div>
        {/* modal ( can move inside the content if needed ) */}
        {isModalOpen && <StyledModal body={renderModalBody()} onClose={closeModal} />}
        <SimpleFooter />
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


  .legends {
            display: grid;
            grid-template-columns: 1fr 1fr; /* Two columns */
            gap: 25px;
            margin-top: 10px;
            
            .legend {
              display: flex;
              flex-direction: row;
              align-items: center;
              justify-content: center;
              
              .legend-label{
                color: ${(props) => (props.needDarkMode ? '#e5e5e5' : '#333')};
              }

              .checkbox {
                height: 12px;
                width: 12px;
              }

              .box {
                height: 12px;
                width: 12px;
                margin: 0px 5px;
              }
              
              .problem-A {
                background-color: ${(props) => (props.needDarkMode ? '#AAF683' : '#43d640')};
              }

              .problem-B {
                background-color: ${(props) => (props.needDarkMode ? '#60D394' : '#23ae20')};
              }

              .problem-C {
                background-color: ${(props) => (props.needDarkMode ? '#FFD97D' : '#c77248')};
              }

              .problem-D {
                background-color: ${(props) => (props.needDarkMode ? '#EE6055' : '#cf3838')};
              }
            }
          }
        }

        .visualization-cap {
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

            &:hover {
              cursor: pointer;
            }

            svg{
              fill: ${(props) => (props.needDarkMode ? '#e5e5e5' : '#333')};
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

        .one-contest-problems-parent{
          position: relative;
          display:flex;
          // flex-direction:column;

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
              width: 30px;
              /* background-color: black; */
              border-radius: 1000px;
              position: absolute;
              right: -12.5px;
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
                  font-size: 1.1rem;
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
            height: 470px;
            width: 100%;
            background-color: ${(props) => (props.needDarkMode ? '#2b2d31' : '#ffffff')};
            /* background-color: #ffffff; */
            border-radius: 20px;
            margin-bottom: 30px;
            display: flex;

            border: 1px solid ${(props) => (props.needDarkMode ? '#595b5f' : 'rgb(209, 213, 219)')};
            overflow: hidden;
            flex-direction: column;

            
            /* border: 1px solid #e5e5e5; */
  
            .contest-problem {
              position: relative;
              height: 100%;
              width: 100%;
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
                  margin-bottom: 0px;
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
                  margin: 0 5px 5px 0;
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



`

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

        .closed-visualization {
          border-top: 1px solid rgb(209, 213, 219);
          position: relative;
          width: 100%;
          margin: 50px 0 30px 0;
          animation: slide-up 0.2s linear both;
          
          @keyframes slide-up {
            from {
              visibility: visible;
              height: 590px;
            }

            to {
              height: 30px;
            }
          }

          .visualization-cap {
            position: absolute;
            height: 30px;
            border-radius: 100px;
            /* background-color: #f3f4f7; */
            /* border: 1px solid rgb(209, 213, 219); */
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

            &:hover {
              cursor: pointer;
            }

            svg{
              fill: ${(props) => (props.needDarkMode ? '#e5e5e5' : '#333')};
              font-size: 1.25rem;
              margin-left: 5px;
            }
          }
        }

      .visualization{
        position: relative;
        width: 100%;
        /* background-color: ${(props) => (props.needDarkMode ? '#282828' : '#ffffff')}; */
        background-color: ${(props) => (props.needDarkMode ? '#232425' : '#ffffff')};
        border-radius: 20px;
        margin: 50px 0 20px 0;
        border: 1px solid ${(props) => (props.needDarkMode ? '#595b5f' : 'rgb(209, 213, 219)')};
        animation: slide-down 0.3s linear both;

        @keyframes slide-down {
          0% {
            height: 30px;
          }

          100% {
            visibility: visible;
            height: 100%;
          }
        }

        .stacked-bar-chart {
          padding: 40px 50px;
          width: 100%;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          font-size: 13px;

          .legends {
            display: flex;
            flex-direction: row;
            gap: 25px;
            margin-top: 10px;
            
            .legend {
              display: flex;
              flex-direction: row;
              align-items: center;
              justify-content: center;
              
              .legend-label{
                color: ${(props) => (props.needDarkMode ? '#e5e5e5' : '#333')};
              }

              .checkbox {
                height: 12px;
                width: 12px;
              }

              .box {
                height: 12px;
                width: 12px;
                margin: 0px 5px;
              }
              
              .problem-A {
                background-color: ${(props) => (props.needDarkMode ? '#AAF683' : '#43d640')};
              }

              .problem-B {
                background-color: ${(props) => (props.needDarkMode ? '#60D394' : '#23ae20')};
              }

              .problem-C {
                background-color: ${(props) => (props.needDarkMode ? '#FFD97D' : '#c77248')};
              }

              .problem-D {
                background-color: ${(props) => (props.needDarkMode ? '#EE6055' : '#cf3838')};
              }
            }
          }
        }

        .visualization-cap {
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

            &:hover {
              cursor: pointer;
            }

            svg{
              fill: ${(props) => (props.needDarkMode ? '#e5e5e5' : '#333')};
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
            display: flex;
            border: 1px solid ${(props) => (props.needDarkMode ? '#595b5f' : 'rgb(209, 213, 219)')};
            overflow: hidden;
            
            /* border: 1px solid #e5e5e5; */
  
            .contest-problem {
              position: relative;
              height: 100%;
              width: 25%;
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
  flex-wrap: wrap; /* Allow items to wrap on smaller screens */
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
			color: ${(props) => (props.needDarkMode ? '#ebdddd' : '#4a4d5a')};
      border: 1px solid ${(props) => (props.needDarkMode ? '#595b5f' : 'rgb(209, 213, 219)')};
      /* background-color: ${(props) => (props.needDarkMode ? '#e5e5e5' : '#201f1f')}; */
			border-radius: 3px;
			margin-right: 5px;
			cursor: pointer;
      /* color: #e5e5e5; */
      /* background-color: ${(props) => (props.needDarkMode ? 'white' : 'yellow')};  */

      position: relative;

      display: flex;
      align-items: center;

      svg{
        font-size: 1rem;
        margin-left: 5px;
        fill: ${(props) => (props.needDarkMode ? '#ebdddd' : '#4a4d5a')};
        /* fill: #e5e5e5; */
        /* fill: ${(props) => (props.needDarkMode ? 'white' : 'black')}; */
      }
		}
	}

	.right{
		display: flex;
		align-items: center;
    margin-top:10px;

		.filter-item{
			padding: 5px 10px;
			font-size: 0.7rem;
			border-radius: 3px;
      margin-left: 5px;
			cursor: pointer;
      color: ${(props) => (props.needDarkMode ? '#ebdddd' : '#4a4d5a')};
      border: 1px solid ${(props) => (props.needDarkMode ? '#595b5f' : 'rgb(209, 213, 219)')};
		}
	}
`


const ShowAbsoluteModelDropDown = styled.div`
  position: absolute;
  max-height: 200px;
  min-height: 30px;
  width: 200px;
  color: ${(props) => (props.needDarkMode ? '#e5e5e5' : '#333')};
  background-color: ${(props) => (props.needDarkMode ? '#2b2d31' : '#ffffff')};
  border: 1px solid ${(props) => (props.needDarkMode ? '#595b5f' : 'rgb(209, 213, 219)')};
  border-radius: 5px;
  top: 35px;
  left: -5px;
  z-index: 10;
  /* overflow-y: scroll; */
  overflow: hidden;
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
    border-bottom: 1px solid ${(props) => (props.needDarkMode ? '#595b5f' : 'rgb(209, 213, 219)')};
    color: ${(props) => (props.needDarkMode ? '#e5e5e5' : '#333')};
    display: grid;
    padding: 0 10px;
    display: flex;
    align-items: center;
    
    &:hover{
      background-color: ${(props) => (props.needDarkMode ? '#404249' : '#e5e5e5')};
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

  span {
    font-family: "Roboto", "Helvetica", "Arial", sans-serif;
    font-size: 0.65rem;
    color: ${(props) => (props.needDarkMode ? '#e5e5e5' : '#333')};
  }

  .PrivateValueLabel-circle-4{
    background-color: ${(props) => (props.needDarkMode ? '#fff' : '#333')};
    
    .PrivateValueLabel-label-5{
      color: ${(props) => (props.needDarkMode == false ? '#e5e5e5' : '#333')};
    }
  }

  /* padding: 10px 50px; */
`
const InputField = styled.input`
  width: 100%;
  padding: 8px;
  margin-top: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
`;

const SubmitButton = styled.button`
  background: #000;
  color: #fff;
  padding: 10px;
  width: 100%;
  margin-top: 10px;
  border: none;
  border-radius: 1rem;
  cursor: pointer;
`;

const TextMuted = styled.p`
  color: #666;
  font-size: 14px;
`;

const TextHeader = styled.h4`
  padding: 5px 0;
`;
