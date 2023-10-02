import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom'; 
import styled from 'styled-components';
import CCHeader from '../Components/CCHeader';
import LeftMenu from '../Components/LeftMenu';
import axios from 'axios';
import { contestAnalysisFilters } from '../Components/contestAnalysisFilters';
import LockIcon from '@material-ui/icons/Lock';
import LineChart from '../Components/LineChart';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import { Bar } from 'react-chartjs-2';

const ContestAnalysis = () => {
  const [platformName, setPlatformName] = useState('leetcode');
  const [chartData, setChartData] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [barData, setBarData] = useState([]);
  const [IdToProblem, setIdToProblem] = useState({});
  const [wholeLeetcodeData, setWholeLeetcodeData] = useState(null);
  const [selectedCountry, setSelectedCountry] = useState('Select Country');
  const [searchUsername, setSearchUsername] = useState('');
  const [rankings, setRankings] = useState([]);
  const [countryOptions, setCountryOptions] = useState([]);
  const [username, setUsername] = useState('');
  const [prediction, setPrediction] = useState(null);
  const [problemLabels, setProblemLabels] = useState([]);
  const { contestName } = useParams(); 
  console.log(contestName);
  const lineGraphColours = ['rgb(149, 164, 252)', 'rgb(90, 176, 150)', 'rgb(223, 207, 121)', 'rgb(236, 159, 154)']

  useEffect(() => {
    axios
      .get(`https://nayak-leetcode-api.vercel.app/?weekly_contest=${contestName}`)
      // .get(`https://nayak-leetcode-api.vercel.app/?weekly_contest=weekly-contest-352`)
      .then((res) => {
        setWholeLeetcodeData(res.data);
        console.log(res.data);
        const questionData = res.data.questions || [];

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
            'A'.charCodeAt(0) + item.id - min_id
          );
        });

        setIdToProblem(idToProblem); // Set IdToProblem state

        const barDatasets = questionData.map((question) => {
          const { title, fail_count } = question;
          const labels = Object.keys(fail_count);
          const data = Object.values(fail_count);

          return {
            labels,
            datasets: [
              {
                label: 'Fail Count',
                backgroundColor: 'rgba(149, 164, 252, 1)',
                borderColor: 'rgba(149, 164, 252, 1)',
                borderWidth: 1,
                hoverBackgroundColor: 'rgba(129, 142, 219, 0.8)',
                innerWidth: '20px',
                data,
              },
            ],
          };
        });

        setBarData(barDatasets);

        const submissionMap = res.data.submission_map;
        const problemIds = Object.keys(submissionMap);
        const problemLabels = problemIds.map(
          (problemId) => idToProblem[problemId]
        );
        setProblemLabels(problemLabels)

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
            borderRadius: 3,
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
      })
      .catch((err) => console.log(err));
  }, []);


  const filters = contestAnalysisFilters.map((item) => {
    return (
      <div
        key={item.id}
        className={
          item.domainFilter === platformName ? 'filter selected' : 'filter'
        }
      >
        {item.text}
        {item.lock === true ? <LockIcon /> : <></>}
      </div>
    );
  });

  const barOptions = {
    scales: {
      x: {
        grid: {
          display: false,
        }
      }
    },
    datasets: {
      bar: {
        barPercentage: 0.3,
        borderRadius: 4,
      }
    },
    plugins: {
      legend: {
        display: true,
        labels: {
          generateLabels: function () {
              return [
                {
                text: `Fail Count`,
                borderRadius: 4,
                fillStyle: 'rgba(149, 164, 252, 1)',
                strokeStyle: 'rgba(149, 164, 252, 1)',
              }
            ]
          },
        },
      },
    },
  };

  // Render the bar graphs for each problem's fail count
  const barGraphs = barData.map((data, index) => (
    <div key={index} className='problem'>
      <div className="problem-title">Problem {IdToProblem[questions[index].question_id]} : {questions[index].title}</div>
      <div className="bar-chart">
        <Bar data={data} options={barOptions}/>
      </div>
      <div className='bar-stats'>
        <div className='stats'>
          <div className='stat'>Problem credit : {questions[index].credit}</div>
          <div className='stat'>Predicted codeforces rating : {questions[index].codeforces_rating}</div>
          </div>
        <div className='stats'>
          <div className='stat'>Problem Inspiration : {questions[index].inspired_from}</div>
          <div className='stat'>Author : {questions[index].author}</div>
        </div>
      </div>
    </div>
  ));

  const chartOptions = {
    scales: {
      x: {
        grid: {
          display: false,
        },
      },
    },
    plugins: {
      legend: {
        display: true,
        labels: {
          generateLabels: function () {
            return problemLabels.map(function (label, index) {
              return {
                text: `Problem ${label}       `,
                borderRadius: 4,
                fillStyle: lineGraphColours[index],
                strokeStyle: lineGraphColours[index],
                boxHeight: 16,
                boxWidth: 10,
                paddingRight: 20,
              };
            });
          },
          padding: 10,
        },
      },
    },
  };

  useEffect(() => {
    if (wholeLeetcodeData != null) {
      const rankByCountry = wholeLeetcodeData.rank_by_country;
      setCountryOptions(['all countries', ...Object.keys(rankByCountry)]);
  
      let filteredRankings = [];
  
      if (selectedCountry === 'all countries' || selectedCountry === 'Select Country') {
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
  


  const predictRating = () => {
    const url = `http://127.0.0.1:5000/get-prediction`;

    axios.get(url)
    .then((res) => {
      console.log(res.data);
      setPrediction(res.data[0]);
      console.log(prediction);
    })
    .catch((error) => {
      // Handle errors here
      console.error(error);
    });
  }

  return (
    <GrandContainer>
      <MobContainer>
        We are still working on Responsive Version of the website, please view the site with
        width more than 1100px, a standard laptop or tablet landscape.
        <img src="https://media4.giphy.com/media/13FrpeVH09Zrb2/giphy.gif" alt="" />
      </MobContainer>
      <Container>
        <CCHeader />
        <LeftMenu marked={"contest-analysis"} />
        <div className="cc-middle-content">
          <h1 className='main-heading'>Contest Analysis</h1>
          <p className="heading-supporter">
            Unlock a world of coding insights with post-contest analyses from platforms like LeetCode and Codeforces. Predict rating changes, view country rankings, and delve into problem statistics. Explore contest performance showcases and problem archives with visualized topics and difficulty levels – all in one place!
          </p>
          <div className="message">
            <div className="icon"></div>
            <div className="text">
              A particular feature you have in mind that you'd like to see implemented on this page? <a href="https://github.com/Nayaker/AlgoListed/issues/new">create an enhancement issue</a>
            </div>
          </div>
          <Filters>{filters}</Filters>
          <CleanLine />
          <div className="contest-btns">
            <div className="back-btn">
              <ArrowBackIosIcon />
            </div>
            <div className="main-display">Leetcode Weekly Contest 362</div>
          </div>

          <div className="feature-title">1. Question Finished Count</div>
          <div className="line-chart">
            {chartData && <LineChart chartData={chartData} options={chartOptions} />}
          </div>
          <div className="feature-title">2. Problem Stats</div>
          <div className="problems">
            {barGraphs}
          </div>
          <div className="feature-title">3. Country-wise Rank</div>
          {
            countryOptions.length > 1 ? <div>
            <div className='rank-inputs'>
              <div>
                <select
                  className='select-input' 
                  value={selectedCountry} onChange={(e) => setSelectedCountry(e.target.value)}>
                    <option disabled selected value={"Select Country"}>Select Country</option>
                  {countryOptions.map((country, index) => (
                    <option key={index} value={country}>
                      {country === "" ? 'No Country' : country}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <input
                  type="text"
                  className='input'
                  value={searchUsername}
                  placeholder='Search Username'
                  onChange={(e) => setSearchUsername(e.target.value)}
                  />
              </div>
            </div>
            <div className='rankings-holder'>
              <div className='ranking-title'>
                <div>Name</div>
                <div>Country</div>
                <div>Country Rank</div>
                <div>Real Rank</div>
              </div>
              <ul className='list-of-rankings'>
                {rankings.map((ranking, index) => (
                  <li className='ranking' key={index}>
                    <div>{ranking.username}</div>
                    <div>{ranking.country_name}</div>
                    <div>{ranking.country_rank}</div>
                    <div>{ranking.realrank}</div>
                  </li>
                ))}
              </ul>
            </div>
          </div> : <></>
          }

          <div className="feature-title">4. Predict Rating</div>
          <div>
            <input
              className='input'
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder='Enter your username'
            />
            <button 
              className='search-btn' 
              onClick={() => predictRating()}>
                Search
            </button>
            {
              prediction != null ? <div>
                <p>delta_rating : {prediction.delta_rating}</p>
                <p>old_rating : {prediction.old_rating}</p>
                <p>new_rating : {prediction.new_rating}</p>
              </div> : <></>
            }
          </div>
        </div>



      </Container>
    </GrandContainer>
  );
};

export default ContestAnalysis;

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
        margin: 20px 0 10px 0;

        .text{
            font-size: 0.8rem;
            color: #13803b;
            font-weight: 300;
            
        }
      }

      .contest-btns{
        margin: 50px 0 20px 0;
        display: flex;
        
        
        .back-btn{
          height: 34px;
          padding: 0 10px;
          background-color: #e5e5e5;
          border-radius: 7.5px;
          display: flex;
          align-items: center;
          justify-content: center;
          
          svg{
            font-size: 1.25rem;
            margin-right: -5px;
          }
        }
        
        .main-display{
          font-size: 1rem;
          margin: 0 10px;
          font-weight: 500;
          background-color: #e5e5e5;
          display: inline-block;
          padding: 5px 10px;
          border-radius: 7.5px;
          color: cornflowerblue;
        }

      }
      .feature-title{
        font-size: 2rem;
        font-weight: 600;
        margin: 70px 0 30px 0;
      }

      .rank-inputs {
        display: flex;
        column-gap: 20px;
      }

      .select-input {
        padding: 10px 15px;
        border-radius: 20px;
        border-color: #9899A3;
        margin-left: 30px;
        width: 380px;
        font-size: 15px;
        font-weight: 400;
        -moz-appearance: none;
        -webkit-appearance: none;
        appearance: none;
        background-image: url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22292.4%22%20height%3D%22292.4%22%3E%3Cpath%20fill%3D%22%23007CB2%22%20d%3D%22M287%2069.4a17.6%2017.6%200%200%200-13-5.4H18.4c-5%200-9.3%201.8-12.9%205.4A17.6%2017.6%200%200%200%200%2082.2c0%205%201.8%209.3%205.4%2012.9l128%20127.9c3.6%203.6%207.8%205.4%2012.8%205.4s9.2-1.8%2012.8-5.4L287%2095c3.5-3.5%205.4-7.8%205.4-12.8%200-5-1.9-9.2-5.5-12.8z%22%2F%3E%3C%2Fsvg%3E');
          background-repeat: no-repeat, repeat;
          background-position: right .7em top 50%, 0 0;
          background-size: .65em auto, 100%;

        ::-ms-expand {
          display: none;
        }
      }

      .input {
        padding: 10px 15px;
        border-radius: 20px;
        border-color: #9899A3;
        margin-left: 30px;
        width: 380px;
        font-size: 15px;
        font-weight: 400;
      }

      .search-btn {
        padding: 10px 15px;
        margin-left: 10px;
        border-radius: 20px;
        width: 165px;
        border: 1px solid #E5E6ED;
        background-color: #6C7BFF;
        color: #FFF;
        font-size: 15px;

          &:hover{
            cursor: pointer;
            box-shadow: rgba(171, 202, 255, 0.5) 0px 7px 29px 0px;
          }
      }

      .line-chart{
        width: 93%;
      }

      .problems{
        display: flex;
        flex-wrap: wrap;
        gap: 15px;
        
        .problem{
          height: 400px;
          width: 45%;
          box-shadow: 0 4px 8px 4px rgba(167, 180, 251, 0.1);
          border-radius: 10px;
          padding: 30px;
          font-size: 0.9rem;
          line-height: 1.5rem;

          .problem-title{
            font-size: 0.9rem;
            margin-bottom: 10px;
            font-weight: 600;
          }

          .bar-stats{
            font-size: 0.75rem;
            margin-top: 10px;

            .stats{
              display: flex;
              margin-bottom: 10px;
              column-gap: 5px;

              .stat{
                padding: 5px 10px;
                border: 1px solid #95A4FC;
                border-radius: 8px;
              }
            }
          }
        }
      }
      
      .rankings-holder{
        max-height: 400px;
        width: 816px;
        border: 2px solid #4E65FF;
        padding: 10px 10px 10px 15px;
        border-radius: 20px;
        margin-left: 30px;
        margin-top: 30px;
        
        .ranking-title {
          display: grid;
          grid-template-columns: 3fr 2fr 2fr 1fr;
          color: #46515C;
          font-weight: 700;
          padding: 5px 8px;
          margin-right: 35px;
          border-bottom: 2px solid #E5E6ED;
        }

        .list-of-rankings {
          overflow-y: scroll;
          max-height: 345px;
          
          &::-webkit-scrollbar {
            width: 20px;
          }
          
          &::-webkit-scrollbar-track {
            border: 2px solid #ABCAFF;
            border-radius: 20px;
            background-color: #FFF;
          }
          
          &::-webkit-scrollbar-thumb {
            background-color: #95A4FC;
            border-radius: 20px;
            height: 92px;
          }

          .ranking {
            display: grid;
            grid-template-columns: 3fr 2fr 2fr 1fr;
            padding: 5px 8px;
            margin-right: 15px;
            
            &:hover {
              background-color: #6C7BFF;
              color: #FFF;
              border-radius: 10px;
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
		border: 1px solid #b9afaf;
		border-radius: 500px;
		margin: 0px 5px 5px 0px;
		font-weight: 300;
		text-decoration: none;
		color: inherit;

    svg{
      font-size: 1rem;
      margin-bottom: -0.2rem;
      margin-left: 5px;
      fill: #71c929;
    }

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