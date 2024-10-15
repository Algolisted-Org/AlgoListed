import React, { useState, useEffect, useMemo, useCallback } from "react";
import { json, useParams } from "react-router-dom";
import styled from "styled-components";
import CCHeader from "../Components/CCHeader";
import CCHeaderPlus from '../Components/CCHeaderPlus';
import LeftMenu from "../Components/LeftMenu";
import axios from "axios";
import { contestAnalysisFilters } from "../Components/contestAnalysisFilters";
import LockIcon from "@material-ui/icons/Lock";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import LineChart from "../Components/LineChart";
import { Bar } from "react-chartjs-2";
import { LinearProgress } from "@material-ui/core";
import InfoIcon from "@material-ui/icons/Info";
import AddIcon from "@material-ui/icons/Add";
import ClearIcon from "@material-ui/icons/Clear";
import AdduserModal from "../MicroComponents/Allmodals/AddfriendModal";
import LeftMenuDark from '../Components/LeftMenuDark';
import CCHeaderDarkPlus from '../Components/CCHeaderDarkPlus';

const ContestAnalysis = () => {
  const [platformName, setPlatformName] = useState("leetcode");
  const [chartData, setChartData] = useState(null);
  const [showVisuals, setShowVisuals] = useState(false);
  const [questions, setQuestions] = useState([]);
  const [barData, setBarData] = useState([]);
  const [IdToProblem, setIdToProblem] = useState({});
  const [wholeLeetcodeData, setWholeLeetcodeData] = useState(null);
  const [selectedCountry, setSelectedCountry] = useState("Select Country");
  const [searchUsername, setSearchUsername] = useState("");
  const [rankings, setRankings] = useState([]);
  const [countryOptions, setCountryOptions] = useState([]);
  const [username, setUsername] = useState("");
  // const [prediction, setPrediction] = useState({
  //   "delta_rating" : "-",
  //   "old_rating" : "-",
  //   "new_rating" : "-",
  // });
  const [prediction, setPrediction] = useState(null);
  const [problemLabels, setProblemLabels] = useState([]);
  const [addUser, setadduser] = useState(false);
  const [Allcountries, setcounteries] = useState([]);
  const [retrivelocalstorage, setretrivestorage] = useState([]);

  const [SessionUserCountChange, setSessionUserCountChange] = useState(0);
  const { contestName } = useParams();

  const [needDarkMode, setNeedDarkMode] = useState(true);

  useEffect(() => { 
    document.title = "Contest Analysis - Algolisted";
  }, []);

  useEffect(() => {
    let selectedTheme = localStorage.getItem("selectedTheme");
    if(selectedTheme === 'dark') setNeedDarkMode(true);
    if(selectedTheme === 'light') setNeedDarkMode(false);
  }, [])
  
  console.log("needDarkMode : ", needDarkMode);
  
  const toggleDarkMode = () => {
    setNeedDarkMode(!needDarkMode);
  };

  

  // console.log(calcA.calculateValue(5000));
  // console.log(calcB.calculateValue(5000));
  // console.log(calcC.calculateValue(5000));
  // console.log(calcD.calculateValue(5000));

  // console.log(Allcountries);
  const lineGraphColours = [
    "rgb(149, 164, 252)",
    "rgb(90, 176, 150)",
    "rgb(223, 207, 121)",
    "rgb(236, 159, 154)",
  ];

  const removeuser = (username) => {
    const updatedArray = retrivelocalstorage.filter(
      (eachuser) => eachuser.username !== username
    );
    localStorage.setItem("myArray", JSON.stringify(updatedArray));
    setSessionUserCountChange(SessionUserCountChange - 1);
  };
  // console.log(retrivelocalstorage);

  useEffect(() => {
    const storedArray = localStorage.getItem("myArray");
    const parsedArray = JSON.parse(storedArray);

    setretrivestorage(parsedArray);
  }, [SessionUserCountChange]);

  const processBarData = (questionData, needDarkMode) => {
    const barDatasets = questionData.map((question) => {
      const { title, fail_count } = question;
      const labels = Object.keys(fail_count);
      const data = Object.values(fail_count);

      return {
        labels,
        datasets: [
          {
            label: "Fail Count",
            backgroundColor: needDarkMode ? "#e0cf7a" : "#5ab097",
            borderColor: needDarkMode ? "#e0cf7a" : "#444",
            borderWidth: 1,
            // hoverBackgroundColor: "#5ab097",
            innerWidth: "20px",
            data,
          },
        ],
      };
    });
    return barDatasets;
  }

  useEffect(() => {
    axios
      .get(
        `https://mark2.vercel.app/?contest=${contestName}`
      )
      // .get(`https://nayak-leetcode-api.vercel.app/?weekly_contest=weekly-contest-352`)
      .then((res) => {
        setWholeLeetcodeData(res.data);
        // console.log(res.data);
        const questionData = res.data.questions || [];
        setcounteries(res.data.rank_by_country["All Countries"]);
        setQuestions(questionData);

        const data = questionData.map((question) => ({
          id: question.id,
          question_id: question.question_id,
        }));

        data.sort((a, b) => a.id - b.id);

        const min_id = data[0].id;

        const idToProblem = {};
        data.forEach((item) => {
          idToProblem[item.question_id] = String.fromCharCode(
            "A".charCodeAt(0) + item.id - min_id
          );
        });

        setIdToProblem(idToProblem); // Set IdToProblem state
        const processedBarData = processBarData(questionData, needDarkMode);

        setBarData(processedBarData);

        const submissionMap = res.data.submission_map;
        const problemIds = Object.keys(submissionMap);
        const problemLabels = problemIds.map(
          (problemId) => idToProblem[problemId]
        );
        setProblemLabels(problemLabels);

        problemLabels.sort();
        const chartDatasets = problemLabels.map((problemLabel, index) => {
          const problemId = problemIds.find(
            (id) => idToProblem[id] === problemLabel
          );

          const data = Object.values(submissionMap[problemId]);
          const label = `Problem ${problemLabel}`;
          return {
            label,
            data,
            borderColor: lineGraphColours[index],
            borderRadius: 10,
            backgroundColor: lineGraphColours[index],
            borderWidth: 3,
            pointStyle: false,
            lineTension: 0,
          };
        });

        const labels = Object.keys(chartDatasets[0].data);

        setChartData({
          labels: labels,
          datasets: chartDatasets,
        });

        setShowVisuals(true);
      })
      .catch((err) => console.log(err));
  }, []);

  useEffect(()=>{
    const processedBarData = processBarData(questions, needDarkMode);
    setBarData(processedBarData);
  }, [needDarkMode, questions]);

  const handleAnalysisName = () => {
    let analysis_heading = "Leetcode ";
    for (let index = 0; index < contestName.length; index++) {
      const element = contestName[index];
      if (element == "-") {
        analysis_heading += " ";
      } else {
        analysis_heading += element;
      }
    }
    analysis_heading += " Analysis";
    // console.log(analysis_heading);
    return analysis_heading;
  };

  const filters = contestAnalysisFilters.map((item) => {
    return (
      <div
        key={item.id}
        className={
          item.domainFilter === platformName
            ? "filter selected"
            : item.lock === true
            ? "locked-feature filter"
            : "filter"
        }
      >
        {item.text}
        {item.lock === true ? <LockIcon /> : <></>}
      </div>
    );
  });

  const barOptions = (needDarkMode) => {
  
    return {
      scales: {
        x: {
          grid: {
            display: false,
          },
          ticks: {
            color: needDarkMode ? '#DDDBD5': '#343a40'
          }
        },
        y: {
          border: {
            color: needDarkMode ? '#586566': '#e5e5e5', 
          },
          grid: {
            color: needDarkMode ? '#586566': '#e5e5e5'
          },
          ticks: {
            color: needDarkMode ? '#DDDBD5': '#343a40'
          }
        }
      },
      datasets: {
        bar: {
          barPercentage: 0.3,
          borderRadius: 4,
        },
      },
      plugins: {
        legend: {
          display: false,
          // labels: {
          //   generateLabels: function () {
          //     return [
          //       {
          //         text: `Wrong submissions count for solution acceptance.`,
          //         fontColor: needDarkMode ? '#DDDBD5':'black',
          //         borderRadius: 4,
          //         fillStyle: backgroundColor,
          //         strokeStyle: borderColor,
          //       },
          //     ];
          //   },
          // },
        },
      },
      yAxes: [{
        gridLines: {
          zeroLineColor: needDarkMode ? '#586566': '#e5e5e5'
        }
      }]
    };
  };

  const barGraphs = barData.map((data, index) => (
    <div key={index} className="problem">
      <div className="problem-title">
        Problem {IdToProblem[questions[index].question_id]} : <br />{" "}
        <i>{questions[index].title}</i>
      </div>
      <div className={`bar-chart chart-container ${needDarkMode ? 'dark-mode' : 'light-mode'}`}>
        <div className="legend">
          <div className="box"/>
          <p className="text">Wrong submissions count for solution acceptance.</p>
        </div>
        <Bar data={data} options={barOptions(needDarkMode)} />
      </div>
      <div className="info">
        <InfoIcon />
        <div className="text">
          The above represents the count of unsuccessful attempts a user made
          before their solution was finally accepted.
        </div>
      </div>
      <div className="bar-stats">
        <div className="stats">
          <div className="stat">Problem credit : {questions[index].credit}</div>
          {/* <div className="stat">
            Predicted codeforces rating : {questions[index].codeforces_rating}
          </div> */}
          <div className="stat">
            {questions[index].inspired_from}
          </div>
        </div>
        {/* <div className="stats">
          <div className="stat">Author : {questions[index].author}</div>
          <div className="stat">Author : Leetcode</div>
        </div> */}
      </div>
    </div>
  ));

  const chartOptions = {
    scales: {
      x: {
        grid: {
          display: false,
        },
        ticks: {
          color: needDarkMode ? '#DDDBD5': '#343a40'
        },
      },
      y: {
        border: {
          color: needDarkMode ? '#586566': '#e5e5e5', 
        },
        grid: {
          color: needDarkMode ? '#586566': '#e5e5e5'
        },
        ticks: {
          color: needDarkMode ? '#DDDBD5': '#343a40'
        }
      }
    },
    plugins: {
      legend: {
        display: false,
        // labels: {
        //   generateLabels: function () {
        //     return problemLabels.map(function (label, index) {
        //       return {
        //         text: `Problem ${label}       `,
        //         borderRadius: 4,
        //         fillStyle: lineGraphColours[index],
        //         strokeStyle: lineGraphColours[index],
        //         boxHeight: 16,
        //         boxWidth: 10,
        //         paddingRight: 20,
        //         fontColor: needDarkMode ? '#DDDBD5':'black',
        //       };
        //     });
        //   },
        //   padding: 10,
        // },
      },
    },
    xAxes: [{  // Modify yAxes instead of y
      grid: {
        color: needDarkMode ? '#586566' : '#e5e5e5',
      },
    }],
  };

  useEffect(() => {
    if (wholeLeetcodeData != null) {
      const rankByCountry = wholeLeetcodeData.rank_by_country;
      setCountryOptions([...Object.keys(rankByCountry)]);

      let filteredRankings = [];

      if (
        selectedCountry === "all countries" ||
        selectedCountry === "Select Country"
      ) {
        // Combine data from all countries
        filteredRankings = Object.values(rankByCountry).flat();
      } else {
        filteredRankings = rankByCountry[selectedCountry] || [];
      }

      if (searchUsername) {
        filteredRankings = filteredRankings.filter((ranking) =>
          ranking.username.toLowerCase().includes(searchUsername.toLowerCase())
        );
      }

      setRankings(filteredRankings);
    }
  }, [wholeLeetcodeData, selectedCountry, searchUsername]);

  const handleUsernameChange = useCallback((e) => {
    setUsername(e.target.value);
  }, []);

  const predictRating = () => {
    const url = `https://mark2.vercel.app/get-prediction?contest_name=${contestName}&username=${username}`;

    axios
      .get(url)
      .then((res) => {
        console.log(res.data[0]);
        setPrediction(res.data[0]);
      })
      .catch((error) => {
        console.error(error);
        alert("Hello there!3");
      });
  };

  return (
    <GrandContainer>
      <AdduserModal 
        addUser={addUser}
        setadduser={setadduser}
        allcountries={Allcountries}
        retrivelocalstorage={retrivelocalstorage}
        setretrivestorage={setretrivestorage}
      />

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
        {/* <CCHeader />
        <LeftMenu marked={"contest-analysis"} /> */}
        {
          needDarkMode ? <CCHeaderDarkPlus needDarkMode={needDarkMode} toggleDarkMode={toggleDarkMode}/> : <CCHeaderPlus needDarkMode={needDarkMode} toggleDarkMode={toggleDarkMode}/>
        }
        
        {
          needDarkMode ? <LeftMenuDark marked={"contest-analysis"} /> : <LeftMenu marked={"contest-analysis"} />
        }
        <div className="cc-middle-content">
          <h1 className="main-heading">Contest Analysis</h1>
          <p className="heading-supporter">
            Unlock a world of coding insights with post-contest analyses from
            platforms like LeetCode and Codeforces. Predict rating changes, view
            country rankings, and delve into problem statistics. Explore contest
            performance showcases and problem archives with visualized topics
            and difficulty levels – all in one place!
          </p>
          <div className="message">
            <div className="icon"></div>
            <div className="text">
              A particular feature you have in mind that you'd like to see
              implemented on this page?{" "}
              <a href="https://github.com/Nayaker/AlgoListed/issues/new">
                create an enhancement issue
              </a>
            </div>
          </div>
          <Filters needDarkMode={needDarkMode}>{filters}</Filters>
          <CleanLine />
          {/* <Filters2>
            <a href='' className="filter selected">Contests Analysis</a>
            <a href='/contests-archive'  className="filter">Contests Archive</a>
          </Filters2> */}

          <div className="contest-btns">
            <a href="/contest-analysis" className="back-btn">
              <ArrowBackIosIcon />
            </a>
            <div className="main-display">{handleAnalysisName()}</div>
          </div>
          <div className="feature-title">1. Question Finished Count</div>
          {showVisuals ? (
            <div className="line-chart">
              <div className="legends">
                <div className="legend">
                  <div className="box problem-A"/>
                  <p className="text">Problem A</p>
                </div>
                <div className="legend">
                  <div className="box problem-B"/>
                  <p className="text">Problem B</p>
                </div>
                <div className="legend">
                  <div className="box problem-C"/>
                  <p className="text">Problem C</p>
                </div>
                <div className="legend">
                  <div className="box problem-D"/>
                  <p className="text">Problem D</p>
                </div>
              </div>
              <LineChart needDarkMode={needDarkMode} chartData={chartData} options={chartOptions} />
            </div>
          ) : (
            <LinearProgress />
          )}
          <div className="feature-title">2. Problem Stats</div>

          {showVisuals ? (
            <div className="problems">{barGraphs}</div>
          ) : (
            <LinearProgress />
          )}

          <div className="feature-title">3. Country-wise Rank</div>
          {countryOptions.length > 1 ? (
            <div className="country-wise-rank">
              <div>
                <div className="rank-inputs">
                  <div>
                    <select
                      className="select-input"
                      value={selectedCountry}
                      onChange={(e) => setSelectedCountry(e.target.value)}
                    >
                      <option disabled selected value={"Select Country"}>
                        Select Country
                      </option>
                      {countryOptions.map((country, index) => (
                        <option key={index} value={country}>
                          {country === "" ? "No Country" : country}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <input
                      type="text"
                      className="input"
                      value={searchUsername}
                      placeholder="Search Username"
                      onChange={(e) => setSearchUsername(e.target.value)}
                    />
                  </div>
                </div>
                <div className="rankings-holder">
                  <div className="ranking-title">
                    <div>Username</div>
                    <div>User's Country</div>
                    <div>Country Rank</div>
                    <div>Real Rank</div>
                  </div>
                  <ul className="list-of-rankings">
                    {rankings.map((ranking, index) => (
                      <li className="ranking" key={index}>
                        <div>
                          <a target="_blank" href={`https://leetcode.com/${ranking.username}`} rel="noreferrer">
                            {ranking.username}
                          </a>
                        </div>
                        <div>{ranking.country_name}</div>
                        <div>{ranking.country_rank}</div>
                        <div>{ranking.realrank}</div>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              <div className="info">
                <InfoIcon />
                <div className="text">
                  If your username doesn't align with your country, it could be
                  because you haven't specified your country in your LeetCode
                  account settings. Visit the following URL:{" "}
                  <a href="https://leetcode.com/profile/" target="_blank" rel="noreferrer">
                    https://leetcode.com/profile/
                  </a>{" "}
                  and update your location information.
                </div>
              </div>
              <div className="pinned-users">
                <h4>Pinned Friend's Rankings</h4>
                <div className="collection">
                  <div
                    className="add-btn"
                    onClick={() => {
                      setadduser(true);
                      setSessionUserCountChange(SessionUserCountChange + 1);
                    }}
                  >
                    <AddIcon />
                  </div>
                  {retrivelocalstorage != null ? (
                    retrivelocalstorage.map((eachuser, index) => {
                      const userExists = Allcountries.find(
                        (user) => user.username === eachuser.username
                      );
                      if (userExists) {
                        return (
                          <div className="friend">
                            <img
                              className="profile-pic"
                              src={
                                eachuser.image_url
                                  ? eachuser.image_url
                                  : "https://i.scdn.co/image/ab6761610000e5eb056f821a5186892979410deb"
                              }
                              alt=""
                            />
                            <div className="user-data">
                              <a
                                href={`https://leetcode.com/${eachuser.username}/`}
                                className="username"
                                target="_blank" rel="noreferrer" 
                              >
                                {eachuser.username}
                              </a>
                              <div className="global-rank">
                                Global Rank : <b>#{userExists.realrank}</b>
                              </div>
                            </div>
                            <div
                              className="clear-btn"
                              onClick={() => {
                                removeuser(eachuser.username);
                              }}
                            >
                              <ClearIcon />
                            </div>
                          </div>
                        );
                      } else {
                        return (
                          <div className="friend">
                            <img
                              className="profile-pic"
                              src={
                                eachuser.image_url
                                  ? eachuser.image_url
                                  : "https://i.scdn.co/image/ab6761610000e5eb056f821a5186892979410deb"
                              }
                              alt=""
                            />
                            <div className="user-data">
                              <a
                                href={`https://leetcode.com/${eachuser.username}/`}
                                className="username"
                                target="_blank" rel="noreferrer" 
                              >
                                {eachuser.username}
                              </a>
                              <div className="global-rank">
                                <i>Did not Attempt</i>
                              </div>
                            </div>
                            <div
                              className="clear-btn"
                              onClick={() => removeuser(eachuser.username)}
                            >
                              <ClearIcon />
                            </div>
                          </div>
                        );
                      }
                    })
                  ) : (
                    <h1 className="warning">
                      You have Not added any friend yet
                    </h1>
                  )}
                  {/* {console.log(retrivelocalstorage)} */}
                  {/* {showVisuals ?
                      <h1>Hello World</h1>
                      : <h1 className="warning">You have Not added any friend yet</h1>
                    } */}
                </div>
              </div>
            </div>
          ) : (
            <LinearProgress />
          )}

          <div className="feature-title">4. Predict Rating Change</div>
          <div className="predict-rating">
            <div className="predict-rating-form">
              <input
                className="input"
                type="text"
                value=""
                // onChange={handleUsernameChange}
                placeholder="Enter your username"
              />

              {/* <div className="search-btn" onClick={predictRating}> */}
              <div className="search-btn">
                <div className="text">Predict</div>
              </div>

              <div className="virtual-btn">{/* Virtual contest ? */}</div>
            </div>
            {/* <div className="info">
              <InfoIcon />
              <div className="text">
                Because the machine learning model is resource-intensive, it
                takes some time to initialize its weights.{" "}
                <b>
                  Consequently, this feature may not function properly within
                  the first 30 minutes of the contest.
                </b>
              </div>
            </div> */}
            <div className="info">
              <InfoIcon />
              <div className="text">
                Sorry for inconvince, but this feature is currently removed because of
                <b>
                  {" "}unconsistant results and high response time
                </b>
                . If you can us create the predictive model then <br />
                <a href="/">Resolve issue : Create Leetcode Rating Prediction | Open Discussion + Issue #170</a>
              </div>
            </div>
            <div className="prediction-values">
              {
                prediction ? 
                <div>
                  <div className="value">delta_rating : {prediction.delta_rating}</div>
                  <div className="value">old_rating : {prediction.old_rating}</div>
                  <div className="value">new_rating : {prediction.new_rating}</div>
                </div>
                : 
                <div></div>
              }
            </div>
          </div>
        </div>
      </Container>
    </GrandContainer>
  );
};

export default ContestAnalysis;

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

  background-color: ${(props) => (props.needDarkMode ? '#313338' : 'transparent')};

  a{
    color: ${(props) => (props.needDarkMode ? '#6d93d8' : '#18489f')};
  }

  input{
    background-color: transparent;
  }

  label{
    color: ${(props) => (props.needDarkMode ? '#e5e5e5' : '#333')};
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

    .contest-btns {
      margin: 20px 0 10px 0;
      display: flex;

      .back-btn {
        height: 34px;
        width: 34px;
        padding: 0 10px;
        /* background-color: #e5e5e5; */
        border-radius: 7.5px;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;

        svg {
          font-size: 1.25rem;
          margin-right: -5px;
          fill: ${(props) => (props.needDarkMode ? '#e5e5e5' : '#333')};
        }
      }

      .main-display {
        font-size: 1rem;
        margin: 0 10px;
        font-weight: 400;
        /* background-color: #dfdff9; */
        display: inline-block;
        /* border: 1px solid #b9afaf; */
        padding: 5px 10px;
        border-radius: 7.5px;
        color: ${(props) => (props.needDarkMode ? '#e5e5e5' : '#333')};
        border: 1px solid ${(props) => (props.needDarkMode ? '#595b5f' : '#b9afaf')};
      }
    }

    .feature-title {
      font-size: 1.5rem;
      font-weight: 600;
      margin: 70px 0 30px 0;
      color: ${(props) => (props.needDarkMode ? '#e5e5e5' : '#333')};
    }

    .country-wise-rank {
      padding-left: 20px;

      .info {
        margin-top: 10px;
        display: flex;
        align-items: center;

        svg {
          margin-right: 10px;
          fill: ${(props) => (props.needDarkMode ? '#e5e5e5' : '#333')};
        }

        .text {
          font-size: 0.8rem;
          font-weight: 200;
          line-height: 1.15rem;
          color: ${(props) => (props.needDarkMode ? '#e5e5e5' : '#333')};
        }
      }

      .pinned-users {
        margin-top: 35px;

        h4 {
          font-size: 1rem;
          font-weight: 500;
          color: ${(props) => (props.needDarkMode ? '#e5e5e5' : '#333')};
        }

        .collection {
          display: flex;
          flex-wrap: wrap;
          align-items: center;

          h1 {
            margin-top: 10px;
            margin-left: 15px;
            color: ${(props) => (props.needDarkMode ? '#e5e5e5' : '#333')};
          }

          .add-btn {
            height: 42px;
            aspect-ratio: 1/1;
            border-radius: 50%;
            border: 1px solid ${(props) => (props.needDarkMode ? '#595b5f' : 'rgb(209, 213, 219)')};
            
            display: grid;
            place-items: center;
            margin-top: 10px;
            /* box-shadow: #c9b9b9 0px 7px 29px 0px; */
            cursor: pointer;

            svg{
              fill: ${(props) => (props.needDarkMode ? '#e5e5e5' : '#333')};
            }

            &:hover {
              /* box-shadow: transparent 0px 7px 29px 0px; */
              /* transition-duration: 250ms; */
            }
          }

          .friend {
            height: 42px;
            min-width: 200px;
            border-radius: 20px;
            border: 1px solid ${(props) => (props.needDarkMode ? '#595b5f' : 'black')};
            margin-left: 10px;
            margin-top: 10px;
            padding: 2.5px;
            padding-right: 15px;
            display: flex;
            align-items: center;
            background-color: ${(props) => (props.needDarkMode ? '#201e1e' : '#f8f8f8')};
            text-decoration: none;
            position: relative;
            cursor: pointer;
            .profile-pic {
              height: 35px;
              width: 35px;
              border-radius: 100%;
              border: 1px solid ${(props) => (props.needDarkMode ? '#595b5f' : 'black')};
            }

            .user-data {
              margin: 0 5px;

              .username {
                font-size: 0.7rem;
                font-weight: 600;
                color: cornflowerblue;
              }

              .global-rank {
                font-size: 0.7rem;
                color: ${(props) => (props.needDarkMode ? '#e5e5e5' : '#333')};
                i{
                  color: ${(props) => (props.needDarkMode ? '#e5e5e5' : '#333')};
                }
                b{
                  color: ${(props) => (props.needDarkMode ? '#e5e5e5' : '#333')};
                }
              }

              color: ${(props) => (props.needDarkMode ? '#e5e5e5' : '#333')};
            }

            &:hover {
              cursor: pointer;
              box-shadow: #00000021 0px 7px 29px 0px;
              transition-duration: 250ms;
            }

            .clear-btn {
              position: absolute;
              right: -3.5px;
              top: -5px;
              height: 20px;
              aspect-ratio: 1/1;
              border-radius: 50%;
              border: 1px solid black;
              display: grid;
              place-items: center;
              background-color: white;

              svg {
                font-size: 15px;
              }
            }
          }
        }
      }
    }

    .predict-rating {
      margin-left: 20px;
      width: 100%;

      .predict-rating-form {
        width: 100%;
        /* border: 1px solid black; */
        display: flex;
        justify-content: space-between;

        input {
          margin: 0;
          color: ${(props) => (props.needDarkMode ? '#e5e5e5' : '#333')};
          width: auto;
          flex: 1;
        }
      }

      .info {
        margin-top: 10px;
        display: flex;
        align-items: center;

        svg {
          margin-right: 10px;
          fill: ${(props) => (props.needDarkMode ? '#e5e5e5' : '#333')};
        }

        .text {
          font-size: 0.8rem;
          font-weight: 200;
          line-height: 1.15rem;
          color: ${(props) => (props.needDarkMode ? '#e5e5e5' : '#333')};
        }

        b {
          color: ${(props) => (props.needDarkMode ? '#e5e5e5' : '#333')};
          font-weight: 500;
        }
      }

      .prediction-values{
        margin-top: 30px;
        .value{
          font-size: 0.8rem;
          font-weight: 300;
          margin-top: 5px;
        }
      }
    }

    .rank-inputs {
      width: 100%;
      /* border: 1px solid black; */
      display: flex;
      justify-content: space-between;
      /* column-gap: 20px; */
    }

    .select-input {
      padding: 10px 15px;
      border-radius: 50px;
      border: 1px solid ${(props) => (props.needDarkMode ? '#595b5f' : '9899a3')};
      background-color: ${(props) => (props.needDarkMode ? '#201e1e' : '#f8f8f8')};
      color: ${(props) => (props.needDarkMode ? '#e5e5e5' : '#333')};

      width: 380px;
      font-size: 0.85rem;
      font-weight: 400;
      -moz-appearance: none;
      -webkit-appearance: none;
      appearance: none;
      background-image: url("data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22292.4%22%20height%3D%22292.4%22%3E%3Cpath%20fill%3D%22%23007CB2%22%20d%3D%22M287%2069.4a17.6%2017.6%200%200%200-13-5.4H18.4c-5%200-9.3%201.8-12.9%205.4A17.6%2017.6%200%200%200%200%2082.2c0%205%201.8%209.3%205.4%2012.9l128%20127.9c3.6%203.6%207.8%205.4%2012.8%205.4s9.2-1.8%2012.8-5.4L287%2095c3.5-3.5%205.4-7.8%205.4-12.8%200-5-1.9-9.2-5.5-12.8z%22%2F%3E%3C%2Fsvg%3E");
      background-repeat: no-repeat, repeat;
      background-position: right 0.7em top 50%, 0 0;
      background-size: 0.65em auto, 100%;

      ::-ms-expand {
        display: none;
      }
    }

    .input {
      padding: 10px 15px;
      border-radius: 50px;
      border-color: #9899a3;
      margin-left: 30px;
      width: 380px;
      font-size: 0.85rem;
      font-weight: 400;
    }

    .search-btn{
      cursor: pointer;
      display: flex;
      align-items: center;
      text-decoration: none;
      background: linear-gradient(150deg, #016df8,#2ba4b4,#d6cd16);
      background-size: 200% 200%;
      animation: AnimationName 10s linear infinite;
      padding: 5px 30px;
      border-radius: 5px;
      font-size: 0.8rem;
      font-weight: 200;
      border-radius: 100px;
      margin-left: 10px;

      .text{
        font-size: 0.85rem;
        font-weight: 300;
        color: #ededf0;
      }

      svg{
        fill: #ededf0;
        font-size: 1.05rem;
      }
    }
      
    @keyframes AnimationName {
      0% {
        background-position: 0% 50%;
      }
      50% {
        background-position: 100% 50%;
      }
      100% {
        background-position: 0% 50%;
      }
    }
      

    .virtual-btn {
      padding: 10px 15px;
      margin-left: 10px;
      border-radius: 200px;
      width: 165px;
      /* border: 1px solid #333; */
      border: none;
      font-size: 0.75rem;
      font-weight: 300;
      letter-spacing: 0.07rem;
      background-color: transparent;
      margin-left: 20%;
      color: cornflowerblue;
    }

    .line-chart {
      width: 100%;
      padding: 10px;
      display: flex;
      flex-direction: column;

      .legends {
        font-size: 13px;
        display:flex;
        flex-direction: row;
        gap: 25px;
        margin-bottom: 5px;
        align-self: center;
        
        .legend {
          display: flex;
          flex-direction: row;
          gap: 6px;
          align-items: center;

          .text {
            color: ${(props) => (props.needDarkMode ? '#DDDBD5' : '#343a40')};
          }
        
          .box {
            border-radius: 2px;
            height: 12px;
            width: 12px;
          }

          .problem-A {
            background-color: rgb(149, 164, 252);
          }

          .problem-B {
            background-color: rgb(90, 176, 150);
          }

          .problem-C {
            background-color: rgb(223, 207, 121);
          }

          .problem-D {
            background-color: rgb(236, 159, 154);
          }
        }
      }
    }

    .problems {
      padding-left: 20px;
      display: flex;
      flex-wrap: wrap;
      gap: 15px;

      .problem {
        /* height: 400px; */
        width: calc(50% - 10px);
        /* box-shadow: 0 4px 8px 4px rgba(167, 180, 251, 0.1); */
        border: 1px solid #b9afaf;
        border-radius: 10px;
        padding: 20px;
        font-size: 0.9rem;
        line-height: 1.5rem;

        .problem-title {
          font-size: 0.9rem;
          margin-bottom: 20px;
          font-weight: 600;
          color: ${(props) => (props.needDarkMode ? '#e5e5e5' : '#333')};

          b {
            color: ${(props) => (props.needDarkMode ? '#fff' : '#000')};
          }

          i{
            color: ${(props) => (props.needDarkMode ? '#fff' : '#000')};
          }
        }

        .info {
          margin-top: 10px;
          display: flex;
          align-items: center;
          color: ${(props) => (props.needDarkMode ? '#e5e5e5' : '#333')};


          svg {
            margin-right: 10px;
            fill: #333;
            fill: ${(props) => (props.needDarkMode ? '#e5e5e5' : '#333')};
          }

          .text {
            font-size: 0.75rem;
            font-weight: 200;
            line-height: 1.15rem;
            color: ${(props) => (props.needDarkMode ? '#e5e5e5' : '#333')};
          }
        }

        .bar-stats {
          font-size: 0.75rem;
          margin-top: 20px;

          .stats {
            display: flex;
            column-gap: 5px;
            flex-wrap: wrap;

            .stat {
              margin-top: 5px;
              padding: 5px 10px;
              border: 1px solid #b9afaf;
              color: ${(props) => (props.needDarkMode ? '#fff' : '#000')};
              border-radius: 8px;
              height: 36px;
            }
          }
        }

        .bar-chart {
          display: flex;
          flex-direction: column;

          .legend {
            display: flex;
            align-self: center;
            flex-direction: row;
            align-items: center;
            justify-content: center;
            gap: 5px;

            .box {
              height: 12px;
              width: 12px;
              background-color: ${(props) => (props.needDarkMode ? "#e0cf7a" : "#5ab097")};
              border-radius: 3px;
            }

            .text {
              font-size: 12px;
              color: ${(props) => (props.needDarkMode ? '#DDDBD5' : '#343a40')};
            }
          }
        }
        
        /* Dark mode styles */
        .chart-container.dark-mode .chartjs-legend ul li span {
          color: #e5e5e5;
        }

        /* Light mode styles */
        .chart-container.light-mode .chartjs-legend ul li span {
          color: #333;
        }
      }
    }

    .rankings-holder {
      max-height: 400px;
      width: 100%;
      border: 1px solid #9899a3;
      padding: 10px 10px 10px 15px;
      border-radius: 20px;
      /* margin-left: 30px; */
      margin-top: 30px;

      .ranking-title {
        display: grid;
        grid-template-columns: 3fr 2fr 2fr 1fr;
        color: pink;


        font-weight: 700;
        padding: 5px 8px;
        margin-right: 35px;
        padding-bottom: 5px;
        margin-bottom: 5px;
        border-bottom: 1px solid ${(props) => (props.needDarkMode ? '#e5e5e5' : '#e5e6ed')};
        
        div {
          color: ${(props) => (props.needDarkMode ? '#e5e5e5' : '#46515c')};
          font-size: 1rem;
          font-weight: 600;
        }
      }

      .list-of-rankings {
        overflow-y: scroll;
        max-height: 330px;
        /* border: 1px solid black; */
        margin-bottom: 10px;

        &::-webkit-scrollbar {
          width: 5px;
        }

        &::-webkit-scrollbar-track {
          /* border: 1px solid #555; */
          border-radius: 200px;
          background-color: #f0e9e9;
        }

        &::-webkit-scrollbar-thumb {
          background-color: #335ddc;
          border-radius: 100px;
          height: 92px;
        }

        .ranking {
          display: grid;
          grid-template-columns: 3fr 2fr 2fr 1fr;
          padding: 5px 8px;
          margin-right: 15px;
          /* border-bottom: 1px solid #ece3e3; */
          /* background-color: #d9d0d1; */

          div {
            font-size: 0.85rem;
            color: ${(props) => (props.needDarkMode ? '#949ba4' : '#46515c')};
            font-weight: 300;
          }

          a {
            font-size: 0.85rem;
            width: auto;
            display: inline-block;
            /* color: ${(props) => (props.needDarkMode ? '#e5e5e5' : '#46515c')}; */
          }

          &:hover {
            background-color: ${(props) => (props.needDarkMode ? '#404249' : '#e5e5e5')};
            color: #fff;
            border-radius: 10px;
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
    border: 1px solid #b9afaf;
    border-radius: 10px;
    margin: 0px 5px 5px 0px;
    font-weight: 300;
    text-decoration: none;
    color: inherit;

    svg {
      font-size: 1rem;
      margin-bottom: -0.2rem;
      margin-left: 5px;
      fill: #71c929;
    }

    &:hover {
      transition-duration: 250ms;
      cursor: pointer;
      border-color: rgb(185, 175, 175);
      background-color: #e5e5e5;
      color: #201f1f;
    }
  }

  .selected {
    /* background-color: #ded7d7;
    color: #111; */
    border-color: rgb(185, 175, 175);
    background-color: #e5e5e5;
    color: #201f1f;
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
