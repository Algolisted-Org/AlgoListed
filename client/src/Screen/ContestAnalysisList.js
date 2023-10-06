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



const ContestAnalysisList = () => {
  const [platformName, setPlatformName] = useState('leetcode');
  const [contestType, setContestType] = useState('Weekly Contest');
  const [contestNumber, setContestNumber] = useState('361');
  const [needDarkMode, setNeedDarkMode] = useState(false);

  console.log("needDarkMode : ", needDarkMode);
  const toggleDarkMode = () => {
    setNeedDarkMode(!needDarkMode);
  };

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

  const redirectToContest = () => {
    const url = `/contest-analysis/${contestType.toLowerCase().replace(' ', '-')}-${contestNumber}`;
    window.location.href = url;
  };

  return (
    <GrandContainer>
      <MobContainer>
        We are still working on Responsive Version of the website, please view the site with
        width more than 1100px, a standard laptop or tablet landscape.
        <img src="https://media4.giphy.com/media/13FrpeVH09Zrb2/giphy.gif" alt="" />
      </MobContainer>
      <Container needDarkMode={needDarkMode}>
        {
          needDarkMode ? <CCHeaderDarkPlus needDarkMode={needDarkMode} toggleDarkMode={toggleDarkMode}/> : <CCHeaderPlus needDarkMode={needDarkMode} toggleDarkMode={toggleDarkMode}/>
        }
        
        {
          needDarkMode ? <LeftMenuDark marked={"contest-analysis"} /> : <LeftMenu marked={"contest-analysis"} />
        }
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
          <Filters needDarkMode={needDarkMode}>{filters}</Filters>
          <CleanLine />
          <Filters2 needDarkMode={needDarkMode}>
            <div className="filter selected">Contests Analysis</div>
            <div className="filter">Contests Archive</div>
          </Filters2>
          <div className="search-contest">
            <div className="search-options">
              <div className="contest-type">
                <input
                  type="text"
                  value={contestType}
                  onChange={(e) => setContestType(e.target.value)}
                />
              </div>
              <div className="contest-number">
                <input
                  type="text"
                  value={contestNumber}
                  onChange={(e) => setContestNumber(e.target.value)}
                />
              </div>
            </div>
            <div className="search-btn" onClick={redirectToContest}>
              <SearchIcon/>
            </div>
          </div>
          <div className="note">
            <b>NOTE</b> : Make sure to pick the kind of contest and the contest number you want, like the Weekly Contest and 365, for example.
          </div>
          {/* <div className="message2">
            <div className="icon">
              <WarningIcon/>
            </div>
            <div className="text">
              We uphold LeetCode's policies and, as a result, our API remains inaccessible during contest hours.
            </div>
          </div> */}
        </div>
      </Container>
    </GrandContainer>
  );
};

export default ContestAnalysisList;

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

      .search-contest{
        display: flex;
        margin-bottom: 20px;

        .search-options{
          flex: 1;
          display: flex;
          position: relative;

          div{
            height: 45px;
            width: 50%;
            margin-right: 10px;
            border-radius: 10px;
            border: 1px solid ${(props) => (props.needDarkMode ? 'transparent' : '#c5bcbd')};
            display: flex;
            align-items: center;
            padding: 10px;
            background-color: ${(props) => (props.needDarkMode ? '#282a2d' : 'transparent')};
          }

          input{
            width: 100%;
            height: 100%;
            border: none;
            font-weight: 400;
            font-size: 0.85rem;
		        color: ${(props) => (props.needDarkMode ? '#e5e5e5' : '#333')};
          }
        }
        
        .search-btn{
          height: 45px;
          width: 45px;
          border-radius: 10px;
          background-color: ${(props) => (props.needDarkMode ? '#454754' : '#333')};
          cursor: pointer;
          display: grid;
          place-items: center;
          
          svg{
            font-size: 1.35rem;
            fill: #fff;
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