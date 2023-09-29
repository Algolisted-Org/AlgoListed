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
  const [selectedCountry, setSelectedCountry] = useState('all countries');
  const [searchUsername, setSearchUsername] = useState('');
  const [rankings, setRankings] = useState([]);
  const [countryOptions, setCountryOptions] = useState([]);
  const [username, setUsername] = useState('');
  const [prediction, setPrediction] = useState(null);
  
  const { contestName } = useParams(); 
  console.log(contestName);

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
                backgroundColor: 'rgba(75, 192, 192, 0.6)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1,
                hoverBackgroundColor: 'rgba(75, 192, 192, 0.8)',
                hoverBorderColor: 'rgba(75, 192, 192, 1)',
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

        problemLabels.sort();
        const chartDatasets = problemLabels.map((problemLabel) => {
          const problemId = problemIds.find(
            (id) => idToProblem[id] === problemLabel
          );

          const data = Object.values(submissionMap[problemId]);
          const label = `Problem ${problemLabel}`;
          return {
            label,
            data,
            borderColor: 'rgb(75, 192, 192)',
            borderWidth: 3,
            pointRadius: 1.5,
            pointHoverRadius: 10,
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

  // Render the bar graphs for each problem's fail count
  const barGraphs = barData.map((data, index) => (
    <div key={index} className='problem'>
      <div className="problem-title">Problem {IdToProblem[questions[index].question_id]} : {questions[index].title}</div>
      <div className="bar-chart">
        <Bar data={data} />
      </div>
      <div>Problem credit : {questions[index].credit}</div>
      <div>Predicted codeforces_rating : {questions[index].codeforces_rating}</div>
      <div>Problem Inspiration : {questions[index].inspired_from}</div>
      <div>Problem Author : {questions[index].author}</div>
    </div>
  ));

  const options = {
    plugins: {
      legend: {
        display: true,
      },
    },
  };

  useEffect(() => {
    if (wholeLeetcodeData != null) {
      const rankByCountry = wholeLeetcodeData.rank_by_country;
      setCountryOptions(['all countries', ...Object.keys(rankByCountry)]);
  
      let filteredRankings = [];
  
      if (selectedCountry === 'all countries') {
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
            {chartData && <LineChart chartData={chartData} options={options} />}
          </div>
          <div className="feature-title">2. Problem Stats</div>
          <div className="problems">
            {barGraphs}
          </div>
          <div className="feature-title">3. Country-wise Rank</div>
          {
            countryOptions.length > 1 ? <div>
            <div>
              <label>Select Country: </label>
              <select value={selectedCountry} onChange={(e) => setSelectedCountry(e.target.value)}>
                {countryOptions.map((country, index) => (
                  <option key={index} value={country}>
                    {country === "" ? 'No Country' : country}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label>Search Username: </label>
              <input
                type="text"
                value={searchUsername}
                onChange={(e) => setSearchUsername(e.target.value)}
              />
            </div>
            <div>
              <h4>Rankings</h4>
              
              <ul className='rankings-holder'>
                {rankings.map((ranking, index) => (
                  <li key={index}>
                    {ranking.username} - Country {ranking.country_name} Rank: {ranking.country_rank} and Real Rank {ranking.realrank}
                  </li>
                ))}
              </ul>
            </div>
          </div> : <></>
          }

          <div className="feature-title">4. Predict Rating</div>
          <div>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder='Enter your username'
            />
            <button onClick={() => predictRating()}>Search</button>
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
        font-size: 0.95rem;
        font-weight: 400;
        margin: 40px 0 10px 0;
      }

      .line-chart{
        /* width: 80%; */
      }

      .problems{
        display: flex;
        flex-wrap: wrap;
        border-left: 1px solid #e5e5e5;
        border-top: 1px solid #e5e5e5;
        
        .problem{
          height: 400px;
          width: 50%;
          border-right: 1px solid #e5e5e5;
          border-bottom: 1px solid #e5e5e5;
          padding: 10px;
          font-size: 0.9rem;
          line-height: 1.5rem;

          .problem-title{
            font-size: 0.9rem;
            margin-bottom: 10px;

          }
        }
      }

      .rankings-holder{
        max-height: 400px;
        overflow-y: scroll;
        border: 1px solid black;
        padding: 10px 25px;

        ::-webkit-scrollbar {
          width: 2px;
        }
        
        ::-webkit-scrollbar-track {
          background-color: #f0e9e9;
          border-left: 1px solid #e9e5e5;
        }
        
        ::-webkit-scrollbar-thumb {
          background-color: #335ddc;
          border-radius: 100px;
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