import React, { useState, useEffect, CSSProperties } from 'react';
import styled from 'styled-components';
import CCRightMenu from '../Components/CCRightMenu';
import CCHeader from '../Components/CCHeader';
import LeftMenu from '../Components/LeftMenu';
import FilterListIcon from '@material-ui/icons/FilterList';
import InfoIcon from '@material-ui/icons/Info';
import { LinearProgress } from '@material-ui/core';
import IntervalTimeLeft from '../helpers/IntervalTimeLeft';
import TimeLeft from '../helpers/TimeLeft';

const CodingCompetitions = () => {
  const [temp, setTemp] = useState([1]);
  const [waitingForData, setWaitingForData] = useState(true);
  const [list, setList] = useState();

  useEffect(async () => {
    await fetch(
      `https://script.google.com/macros/s/AKfycbzXyVH1o6CzzJUfLN0qC-EscTKQeKouAUlU3oBs_S85WvB13wPHuawZLK43QJrqBua3Ng/exec`
    )
      .then((res) => res.json())
      .then((data) => {
        setList(data);
        setWaitingForData(false);

        console.log(data);
      });
  }, []);

  const override = {
    display: 'block',
    margin: '0 auto',
    borderColor: 'red',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  };

  const returnHours = (e) => {
    return Math.floor(e / 60);
  };

  const returnMins = (e) => {
    return Math.floor(e % 60);
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
        <CCHeader />
        <LeftMenu marked={'all-coding-competitions'} />
        <div className="cc-middle-content">
          <h1 className="main-heading">All Upcoming Coding Competitions</h1>
          <p className="heading-supporter">
            We are not fetching the data from any public API, we have build our
            own API which is being constantly updated by our the team and users
            with information.
            {/* <a href="/">I know about a coding competiion which is not mentioned here</a> */}
          </p>
          <div className="message">
            <div className="icon"></div>
            <div className="text">
              You know about a coding competiion which is not mentioned here.{' '}
              <a href="/">click here</a>
            </div>
          </div>
          <p className="heading-supporter">
            Competions like - Google Kickstart, Codeforces, Leetcode, CC,
            Hackethrons, ICPC, Hackethrons, Microsoft Imagine, Microsoft Engage,
            Facebook hackecup, TCS Ninja, Uber Hacktag, Hacktoberfest,
            Girlscript, GSOC, Code jam, Hash Cup.
          </p>
          <Filters> 
            <div className="filter selected">All</div>
            <div className="filter">DSA competiions</div>
            <div className="filter">Competative Coding</div>
            <div className="filter">Hackethrons</div>
            <div className="filter">Open Source</div>
            <div className="filter">Development</div>
            <div className="filter">MNC competiions</div>
            <div className="filter">Global</div>
            <div className="filter">Pan India</div>
            <div className="filter">College Level</div>
            <div className="filter">MAANG</div>
          </Filters>
          <Sort>
            <div className="box">
              <div className="text">By Relevence</div>
              <FilterListIcon />
            </div>
            <InfoIcon style={{ fill: '#333' }} />
          </Sort>
          <Table>
            <div className="row top-row">
              <div className="hash">#</div>
              <div className="platform">Platform</div>
              <div className="contest">Competition</div>
              <div className="date">Date and Time left</div>
              <div className="duration">Duration</div>
              <div className="registration">Registration</div>
            </div>

            {waitingForData ? (
              <LinearProgress />
            ) : (
              <>
                {list
                  .filter(
                    (item) => TimeLeft(item.registration_end_date) !== 'Expired'
                  )
                  .map((item, index) => (
                    <div className="row" key={index}>
                      <div className="hash">{index + 1}</div>
                      <div className="platform">{item.platform}</div>
                      <div className="contest">
                        <a href={`${item.competition_link}`} target="_blank">
                          {item.competition_name}
                        </a>
                      </div>
                      <div className="date">
                        <div className="date-show">
                          {item.competition_date},{' '}
                          {returnHours(item.time_start_mins)}:
                          {returnMins(item.time_start_mins)}
                        </div>
                        <div className="time-left">
                          {<IntervalTimeLeft date={item.competition_date} />}
                        </div>
                      </div>
                      <div className="duration">3 hrs</div>

                      <div className="registration">
                        <div className="status">{item.registration_status}</div>
                        <div className="time-left">
                          {item.registration_status === 'Open' ? (
                            (
                              <IntervalTimeLeft date={item.registration_date} />
                            ) === 'Expired' ? (
                              <>{(item.registration_status = 'Closed')}</>
                            ) : (
                              <IntervalTimeLeft
                                date={item.registration_end_date}
                              />
                            )
                          ) : (
                            <>Registration Closed</>
                          )}
                          {/* 05 days, 19 hours, 02 minutes */}
                        </div>
                      </div>
                    </div>
                  ))}
              </>
            )}
          </Table>
        </div>
        {/* <CCRightMenu/> */}
      </Container>
    </GrandContainer>
  );
};

export default CodingCompetitions;

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
  @media only screen and (max-width: 1100px) {
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
    padding: 80px 120px 50px 120px;
    position: relative;
    width: 100%;
    max-width: 1360px;
    min-width: 850px;
    margin: auto;

    @media only screen and (max-width: 1200px) {
      padding: 80px 50px 50px 50px;
    }

    .main-heading {
      font-size: 1.65rem;
      font-weight: 600;
      color: #292929;
    }

    .heading-supporter {
      font-size: 1.05rem;
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
  margin: 10px 0;

  .box {
    padding: 5px 10px;
    height: 36px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-radius: 100px;
    background-color: white;
    border: 1px solid #b9afaf;
    box-shadow: rgb(28 28 28 / 8%) 0px 2px 8px;
    margin-right: 5px;

    .text {
      font-size: 0.8rem;
      font-weight: 300;
      margin: 0 7.5px;
    }
  }
`;

const Table = styled.div`
  width: 100%;
  border: 1px solid #e0cece;
  border-radius: 5px;
  overflow: hidden;

  .row {
    background-color: white;
    width: 100%;
    height: 75px;
    padding: 0 15px;
    border-top: 1px solid #e0cece;
    display: flex;
    justify-content: space-between;
    /* align-items: flex-start; */

    .time-left {
      font-size: 0.75rem;
      font-weight: 200;
    }

    .hash {
      width: 5%;
      height: 65px;
      padding: 7.5px 0;
      border-right: 1px solid #e0cece;
      height: 100%;
      /* background-color: yellow; */
      font-size: 0.9rem;
      font-weight: 300;
    }

    .platform {
      width: 10%;
      height: 65px;
      padding: 7.5px 0;
      border-right: 1px solid #e0cece;
      height: 100%;
      /* background-color: grey; */
      font-size: 0.9rem;
      font-weight: 300;
    }

    .contest {
      width: 25%;
      height: 65px;
      padding: 7.5px 0;
      border-right: 1px solid #e0cece;
      height: 100%;
      /* background-color: coral; */
      font-size: 0.9rem;
      font-weight: 300;
    }

    .date {
      width: 20%;
      height: 65px;
      padding: 7.5px 0;
      border-right: 1px solid #e0cece;
      height: 100%;
      /* background-color: grey; */
      font-size: 0.9rem;
      font-weight: 300;
    }

    .duration {
      width: 10%;
      height: 65px;
      padding: 7.5px 0;
      border-right: 1px solid #e0cece;
      height: 100%;
      /* background-color: yellow; */
      font-size: 0.9rem;
      font-weight: 300;
    }

    .registration {
      width: 20%;
      height: 65px;
      padding: 7.5px 0;
      height: 100%;
      font-size: 0.9rem;
      font-weight: 300;
    }
  }

  .top-row {
    background-color: whitesmoke;
    width: 100%;
    height: 75px;
    padding: 0 15px;
    border-top: 1px solid transparent;
    display: flex;
    justify-content: space-between;
    align-items: center;
    /* border-radius: 5px; */

    .hash,
    .platform,
    .platform,
    .contest,
    .date,
    .duration {
      border-right: 1px solid #e0cece;
      font-size: 0.95rem;
      font-weight: 400;
      /* color: #c4b8b8; */
      display: flex;
      align-items: center;
    }

    .registration {
      font-size: 0.95rem;
      font-weight: 400;
      /* color: #c4b8b8; */
      display: flex;
      align-items: center;
    }
  }

  .last-row {
    border-bottom: 0px solid transparent;
  }
`;
