import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import FilterListIcon from '@material-ui/icons/FilterList';
import InfoIcon from '@material-ui/icons/Info';
import SimpleFooter from "../Components/SimpleFooter";
import CallMadeIcon from '@material-ui/icons/CallMade';
import PostAddIcon from '@material-ui/icons/PostAdd';
import CCHeaderPlus from '../Components/CCHeaderPlus';
import CCHeaderDark from '../Components/CCHeaderDark';
import LeftMenu from '../Components/LeftMenu';
import LeftMenuDark from '../Components/LeftMenuDark';
import CCHeaderDarkPlus from '../Components/CCHeaderDarkPlus';
import { LinearProgress } from "@material-ui/core";
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import DoneIcon from '@material-ui/icons/Done';
import RemoveCircleOutlineIcon from '@material-ui/icons/RemoveCircleOutline';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';

const Opportunities = () => {
  const [needDarkMode, setNeedDarkMode] = useState(!false);

  useEffect(() => {
    document.title = "All Internship and Job Opportunities - Algolisted";
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

  const [filterContestType, setFilterContestType] = useState("All");
  const [filterContestTypeName, setFilterContestTypeName] = useState("Job Type");
  const [openModel1, setOpenModel1] = useState(false);
  const [openModel2, setOpenModel2] = useState(false);
  const [sliderInputValue, setSliderInputValue] = useState("No Experience");

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
          needDarkMode ? <LeftMenuDark marked={"opportunities"} /> : <LeftMenu marked={"opportunities"} />
        }
        <div className='show-middle-content'>
          <div className="cc-middle-content">
            <h1 className='main-heading'>All Internship & Job Opportunities
              <div className="head-tag">
                Powered by Algolisted Ai{" "}
                <img
                  draggable="false"
                  src="https://static.wixstatic.com/media/592002_0f04cb41e098424588d09e2fba76ec65~mv2.gif"
                  alt=""
                />
              </div>
            </h1>
            <p className="heading-supporter">
              This page provides information on a range of job openings and internship possibilities. While these opportunities are primarily tailored for students in India, we are actively working to incorporate opportunities from around the world as well.
            </p>
            {/* <div className="messages">
              <div className="message">
                <div className="icon"></div>
                <div className="text">
                  We are seeking out <b>small YouTube, Linkedin or Telegram channels</b> engaged in similar activities to ours, with a mutual interest in collaborating on this website.
                  If interested <i><a href="mailto:nayak.primary@gmail.com">contact here</a></i>
                </div>
              </div>
            </div> */}
            <EffectiveFilter className='noselect' needDarkMode={needDarkMode}>
              <div className="left">
                <div className="filter-item check_color noselect" onClick={() => setOpenModel1(!openModel1)}> {filterContestTypeName}
                  {openModel1 === false ? <ExpandMoreIcon /> : <ExpandLessIcon />}
                  {
                    openModel1 ? (
                      <ShowAbsoluteModelDropDown needDarkMode={needDarkMode}>
                        <div className="option">Job Type</div>
                        <div className="option">Intern</div>
                        <div className="option">Full Time</div>
                      </ShowAbsoluteModelDropDown>
                    ) : <></>
                  }
                </div>
                <div className="filter-item check_color">{sliderInputValue}
                  {openModel2 == false ? <ExpandMoreIcon /> : <ExpandLessIcon />}
                </div>
              </div>
              <div className="right">
                {/* <div className="filter-item">A</div>
              <div className="filter-item">B</div>
              <div className="filter-item">C</div>
              <div className="filter-item">D</div> */}
                <div className="filter-item">
                  Filter based on Status
                  <FilterListIcon />
                </div>
                {/* <div className="filter-item">Hide Problem Tags</div> */}
                {/* <div className="filter-item">Show Unsolved</div>  */}
              </div>
            </EffectiveFilter>
            <Table>
              <div className="row top-row">
                <div className="hash">Count</div>
                {/* <div className="company">Company</div> */}
                <div className="opportunity">Opportunity</div>
                {/* <div className="salary">Salary</div> */}
                {/* <div className="exp">Experience</div> */}
                {/* <div className="branch">Branch</div> */}
                <div className="source">Source</div>
              </div>

              {false ? (
                <div className="linear-progess-holder">
                  <LinearProgress />
                </div>
              ) : (
                <>
                  <div className="row">
                    <div className="hash">1</div>
                    {/* <div className="company">Google India</div> */}
                    <div className="opportunity">
                      <div className="left">
                        <div className="link">Google Test Engineer - Bangalore, India</div>
                        <div className="extra-info">
                          <div className="info">Test Engineer</div>
                          <div className="info">FTE</div>
                          <div className="info">2+ Year Exp</div>
                          <div className="info">19 - 25 LPA</div>
                        </div>
                      </div>
                      <div className="right">
                        <CheckCircleOutlineIcon />
                        <RemoveCircleOutlineIcon />
                        <FavoriteBorderIcon />
                      </div>
                    </div>
                    {/* <div className="salary">Salary</div> */}
                    {/* <div className="exp">Experience</div> */}
                    {/* <div className="branch">2025</div> */}
                    <div className="source">
                      <img src="https://cdn1.iconfinder.com/data/icons/logotypes/32/circle-linkedin-512.png" alt="" />
                    </div>
                  </div>
                  <div className="row">
                    <div className="hash">2</div>
                    {/* <div className="company">Amazon India</div> */}
                    <div className="opportunity">
                      <div className="left">
                        <div className="link">Amazon Cloud Engineer - Mumbai, India</div>
                        <div className="extra-info">
                          <div className="info">Cloud Engineer</div>
                          <div className="info">FTE</div>
                          <div className="info">4+ Year Exp</div>
                          <div className="info">20 - 26 LPA</div>
                        </div>
                      </div>
                      <div className="right">
                        <CheckCircleOutlineIcon />
                        <RemoveCircleOutlineIcon />
                        <FavoriteBorderIcon />
                      </div>
                    </div>
                    {/* <div className="salary">Salary</div> */}
                    {/* <div className="exp">Experience</div> */}
                    {/* <div className="branch">2025</div> */}
                    <div className="source">
                      <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/cc/WhatsApp_Logo.svg/2048px-WhatsApp_Logo.svg.png" alt="" />
                    </div>
                  </div>
                  <div className="row">
                    <div className="hash">3</div>
                    {/* <div className="company">Facebook India</div> */}
                    <div className="opportunity">
                      <div className="left">
                        <div className="link">Facebook UX Designer - Delhi, India</div>
                        <div className="extra-info">
                          <div className="info">UX Designer</div>
                          <div className="info">FTE</div>
                          <div className="info">5+ Year Exp</div>
                          <div className="info">24 - 30 LPA</div>
                        </div>
                      </div>
                      <div className="right">
                        <CheckCircleOutlineIcon />
                        <RemoveCircleOutlineIcon />
                        <FavoriteBorderIcon />
                      </div>
                    </div>
                    {/* <div className="salary">Salary</div> */}
                    {/* <div className="exp">Experience</div> */}
                    {/* <div className="branch">2025</div> */}
                    <div className="source">
                      <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/cc/WhatsApp_Logo.svg/2048px-WhatsApp_Logo.svg.png" alt="" />
                    </div>
                  </div>
                  <div className="row">
                    <div className="hash">4</div>
                    {/* <div className="company">Apple India</div> */}
                    <div className="opportunity">
                      <div className="left">
                        <div className="link">Apple iOS Developer - Pune, India</div>
                        <div className="extra-info">
                          <div className="info">iOS Developer</div>
                          <div className="info">FTE</div>
                          <div className="info">3+ Year Exp</div>
                          <div className="info">21 - 27 LPA</div>
                        </div>
                      </div>
                      <div className="right">
                        <CheckCircleOutlineIcon />
                        <RemoveCircleOutlineIcon />
                        <FavoriteBorderIcon />
                      </div>
                    </div>
                    {/* <div className="salary">Salary</div> */}
                    {/* <div className="exp">Experience</div> */}
                    {/* <div className="branch">2025</div> */}
                    <div className="source">
                      <img src="https://cdn1.iconfinder.com/data/icons/logotypes/32/circle-linkedin-512.png" alt="" />
                    </div>
                  </div>
                  <div className="row">
                    <div className="hash">5</div>
                    {/* <div className="company">Adobe India</div> */}
                    <div className="opportunity">
                      <div className="left">
                        <div className="link">Adobe Frontend Developer - Noida, India</div>
                        <div className="extra-info">
                          <div className="info">Frontend Developer</div>
                          <div className="info">FTE</div>
                          <div className="info">4+ Year Exp</div>
                          <div className="info">23 - 29 LPA</div>
                        </div>
                      </div>
                      <div className="right">
                        <CheckCircleOutlineIcon />
                        <RemoveCircleOutlineIcon />
                        <FavoriteBorderIcon />
                      </div>
                    </div>
                    {/* <div className="salary">Salary</div> */}
                    {/* <div className="exp">Experience</div> */}
                    {/* <div className="branch">2025</div> */}
                    <div className="source">
                      <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/8/82/Telegram_logo.svg/2048px-Telegram_logo.svg.png" alt="" />
                    </div>
                  </div>
                </>
              )}
            </Table>
          </div>
        </div>
        <SimpleFooter />
      </Container>
    </GrandContainer>
  )
}

export default Opportunities

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

    .show-middle-content{
      margin-bottom: 30px;
    }

    .cc-middle-content{
      min-height: 100vh;
      width: 100%;
      /* padding: 80px min(120px, 5vw) 50px min(120px, 5vw); */
      padding: 80px 120px 30px 120px;
      position: relative;
      width: 100%;
      max-width: 1360px;
      min-width: 850px;
      margin: auto;
      
      @media only screen and (max-width: 1200px){
        padding: 80px 50px 30px 50px;
      }   

      .main-heading{
        font-size: 1.65rem;
        font-weight: 600;
        color: ${(props) => (props.needDarkMode ? '#e5e6e8' : '#292929')};
        display: flex;
        align-items: center;
        .head-tag {
          display: inline;
          font-size: 0.75rem;
          font-weight: 500;
          padding: 0.25rem 0.5rem;
          padding-right: 35px;
          border-radius: 100px;
          background-color: #a5bb26;
          margin-left: 10px;

          img {
            position: absolute;
            height: 2rem;
            margin-top: -7.5px;
            margin-left: -5px;
          }
        }
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

      

      .messages{
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
      }
    }
`


const Table = styled.div`
  border: 1px solid #c1c1c1;
  border-radius: 5px;
  overflow: hidden;

  .row{
    display: flex;
    align-items: stretch;
    justify-content: space-between;
    border-top: 1px solid #c1c1c1;

    .hash{
      width: 80px;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 10px;
      /* background-color: orange; */
      font-weight: 200;
      font-size: 0.85rem;
      border-right: 1px solid #c1c1c1;
    }
    
    .company{
      width: 150px;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 10px;
      background-color: white;
      font-weight: 200;
      font-size: 0.85rem;
      border-right: 1px solid #c1c1c1;
    }
    
    .opportunity{
      flex: 1;
      padding: 10px 15px;
      background-color: white;
      border-right: 1px solid #c1c1c1;
      font-size: 0.85rem;
      font-weight: 500;

      display: flex;
      align-items: center;
      justify-content: space-between;
      
      .left{
        .link{
          color: cornflowerblue;
          font-size: 0.85rem;
          font-weight: 500;
        }

        .extra-info{
          display: flex;
          flex-wrap: wrap;
          margin-top: 10px;
          
          .info{
            font-size: 0.7rem;
            font-weight: 300;
            padding: 2.5px 7.5px;
            background-color: whitesmoke;
            border-radius: 100px;
            margin-right: 5px;
            border: 1px solid #c1c1c1;
          }
        }
      }

      .right{
        display: flex;
        align-items: center;

        svg{
          font-size: 2rem;
          margin-left: 5px;
          fill: ${(props) => (props.needDarkMode ? '#b4a7a6' : '#b5a6a6;')};
        }
      }
    }

    .salary{
      width: 100px;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 10px;
      background-color: white;
      font-weight: 200;
      font-size: 0.85rem;
      border-right: 1px solid #c1c1c1;
    }

    .exp{
      width: 100px;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 10px;
      background-color: white;
      font-weight: 200;
      font-size: 0.85rem;
      border-right: 1px solid #c1c1c1;
    }

    .branch{
      width: 80px;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 10px;
      background-color: white;
      font-weight: 200;
      font-size: 0.85rem;
      border-right: 1px solid #c1c1c1;
    }

    .source{
      width: 80px;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 10px;
      background-color: white;
      font-weight: 200;
      font-size: 0.85rem;

      img{
        height: 30px;
      }
    }
  }

  .top-row{
    border-top: none;

    .hash{
      background-color: whitesmoke;
      font-weight: 500;
      border-right: 1px solid #c1c1c1;
    }
    
    .company{
      background-color: whitesmoke;
      font-weight: 500;
      border-right: 1px solid #c1c1c1;
    }
    
    .opportunity{
      background-color: whitesmoke;
      font-weight: 500;
      border-right: 1px solid #c1c1c1;
      color: #333;
    }

    .salary{
      background-color: whitesmoke;
      font-weight: 500;
      border-right: 1px solid #c1c1c1;
    }

    .exp{
      background-color: whitesmoke;
      font-weight: 500;
      border-right: 1px solid #c1c1c1;
    }


    .branch{
      background-color: whitesmoke;
      font-weight: 500;
      border-right: 1px solid #c1c1c1;
    }

    .source{
      background-color: whitesmoke;
      font-weight: 500;
    }
  }
`

const EffectiveFilter = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
	margin: 50px 0 20px 0;

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

		.filter-item{
			padding: 5px 10px;
			font-size: 0.7rem;
			border-radius: 3px;
      margin-left: 5px;
			cursor: pointer;
      color: ${(props) => (props.needDarkMode ? '#ebdddd' : '#4a4d5a')};
      border: 1px solid ${(props) => (props.needDarkMode ? '#595b5f' : 'rgb(209, 213, 219)')};
      display: flex;
      align-items: center;

      svg{
        font-size: 1rem;
        margin-left: 5px;
      }
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