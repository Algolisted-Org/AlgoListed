import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import CCHeaderDarkPlus from '../Components/CCHeaderDarkPlus'
import CCHeaderPlus from '../Components/CCHeaderPlus'
import LeftMenu from '../Components/LeftMenu'
import LeftMenuDark from '../Components/LeftMenuDark'
import FilterListIcon from '@material-ui/icons/FilterList';
import InfoIcon from '@material-ui/icons/Info';
import axios from "axios";
import { LinearProgress } from "@material-ui/core";
import { resourcesFilters } from '../Components/resourcesFilters'
import SimpleFooter from '../Components/SimpleFooter';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import MobileNavbar from "../Components/MobileNavbar";
import AddIcon from '@material-ui/icons/Add';
import Tooltip from '@material-ui/core/Tooltip';

const Resources = () => {
  const [allResources, setAllResources] = useState([]);
  const [filter, setFilter] = useState("All Resources");
  const [showFilters, setShowFilters] = useState(false);
  const [needDarkMode, setNeedDarkMode] = useState(!false);
  
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
    document.title = "Coding Resources - Algolisted";
  }, []);

  useEffect(() => {
    axios.get("https://algolisted.tonmoy1912.in/resources/all")
      .then((res) => {
        setAllResources(res.data);
        // console.log(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  const handleFilter = (e) => {
    setFilter(e.target.textContent);
  };

  const filters = resourcesFilters.map((item) => {
    return (
      <div
        onClick={(e) => {
          handleFilter(e);
        }}
        key={item.id}
        className={item.text == filter ? "filter selected" : "filter"}
      >
        {item.text}
      </div>
    );
  });

  return (
    <GrandContainer>
      <MobContainer>
        <MobileNavbar />
        <div className="main-content">
          <h1 className="main-heading">Coding Resources</h1>
          <p className="heading-supporter">
            There is a wealth of disorganized notes and other resources available on websites like LinkedIn and Leetcode, but they can be difficult to find because they are not listed in a organized manner. To make your life easier, we have compiled all of these resources by topic in a single location.
          </p>

          <div className="data-filters">
            <div className="toggle-filter" onClick={() => setShowFilters(!showFilters)}>
              {
                showFilters ? (
                  <>
                    <div className="text">Hide Filters</div>
                    <ExpandLessIcon />
                  </>
                ) : (
                  <>
                    <div className="text">Show Filters</div>
                    <ExpandMoreIcon />
                  </>
                )
              }
            </div>
            <div className="sort">
              <FilterListIcon />
            </div>
          </div>

          {
            showFilters ? (<Filters>{filters}</Filters>) : (<></>)
          }
          {
            allResources.length === 0 ? (
              <div className="linear-progess-holder">
                <LinearProgress />
              </div>
            ):(
              <div className="resources-container">
                {
                  allResources.map((item, index) => {
                    if (filter == "All Resources" || item.mainTag == filter) {
                      return (
                        <div className="resource">
                          <a className="img-container" href={item.link} target="_blank" rel="noreferrer" >
                            <img src={item.imgLink}  target="_blank" alt="" />
                          </a>
                          <a href={item.link} target={"_blank"} className="title" rel="noreferrer">{item.title}</a>
                          <div className="short-desc">{item.description}</div>
                          <div className="tags">
                            <div className="main-tag">{item.mainTag}</div>
                            <div className="tag">{item.type}</div>
                          </div>
                        </div>
                      )
                    }
                    else return (<></>)
                  })
                }
              </div>
            )
          }
        </div>
        <SimpleFooter />
      </MobContainer>
 
      <Container needDarkMode={needDarkMode}>
        {
          needDarkMode ? <CCHeaderDarkPlus needDarkMode={needDarkMode} toggleDarkMode={toggleDarkMode} /> : <CCHeaderPlus needDarkMode={needDarkMode} toggleDarkMode={toggleDarkMode} />
        }
        {
          needDarkMode ? <LeftMenuDark marked={"resources"} /> : <LeftMenu marked={"resources"} />
        }
        <div className="cc-middle-content">
          <h1 className='main-heading'>Coding Resources</h1>
          <p className="heading-supporter">
            There is a wealth of disorganized notes and other resources available on websites like LinkedIn and Leetcode, but they can be difficult to find because they are not listed in a organized manner. To make your life easier, we have compiled all of these resources by topic in a single location.
          </p>
          <div className="message">
            <div className="icon"></div>
            <div className="text">
              If you believe that someone has posted your content on our site without giving you proper credit, we encourage you to bring it to our attention with any evidence you may have. We take copyright violations very seriously and will be happy to address this issue for you. If you are the rightful owner of the content and provide us with a complaint, we will promptly remove it from the site.
            </div>
          </div>

          <Filters needDarkMode={needDarkMode}>
            {filters}
          </Filters>
          
          <Sort>
            {/* <Tooltip title="Under Development"> */}
              <a href='/add-content-core-only' className="box">
                <AddIcon />
              </a>
            {/* </Tooltip> */}
            <div className="box">
              <div className="text">By Relevance</div>
              <FilterListIcon />
            </div>
            {/* <InfoIcon style={{ fill: '#333' }} /> */}
          </Sort>



          {
            allResources.length === 0 ? (
              <div className="linear-progess-holder">
                <LinearProgress />
              </div>
            ) : (
              <div className="resources-container">
                {
                  allResources.map((item, index) => {
                    if (item.likes > 0 && (filter == "All Resources" || item.mainTag == filter)) {
                      return (
                        <div className="resource">
                          {
                            item.topRated ? (
                              <div className="top-tag">
                                Top Rated
                              </div>
                            ):(<></>)
                          }
                          <div className="top-part">
                            <a href={item.link} target="_blank" className="img-container" rel="noreferrer">
                              <img src={item.imgLink} target="_blank" alt="" />
                            </a>
                            <a href={item.link} target={"_blank"} className="title" rel="noreferrer">{item.title}</a>
                            <div className="short-desc">{item.description}</div>
                          </div>
                          <div className="bottom-part">
                            <div className="tags">
                              <div className="main-tag">{item.mainTag}</div>
                              <div className="tag">{item.type}</div>
                            </div>
                            <div className="follow-me-link">
                              <a href={item.promotionLink} target={"_blank"} rel="noreferrer">Support contributor</a>
                            </div>
                          </div>
                        </div>
                      )
                    }
                    else return (<></>)
                  })
                }
              </div>
            )
          }
        </div>
        <SimpleFooter />
      </Container>
    </GrandContainer>
  )
}

export default Resources

const GrandContainer = styled.div`
`

const MobContainer = styled.div`
  width: 100vw;
  padding-top: 60px;

  .main-content{
    padding: 10px 15px;

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

    .data-filters{
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin: 30px 0 10px 0;
      position: relative;

      .toggle-filter {
        width: 120px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        border-radius: 500px;
        font-weight: 300;
        padding: 5px 15px;
        font-size: 0.7rem;
        background-color: white;
        border: 1px solid rgb(185, 175, 175);
        box-shadow: rgb(28 28 28 / 8%) 0px 2px 8px;
  
  
  
        .text{
          /* color: #ebdddd; */
        }
  
        svg{
          font-size: 1.15rem;
          /* fill: #ebdddd; */
          margin-right: -4px;
        }
      }

      .sort{
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 500px;
        padding: 5px;
        background-color: white;
        border: 1px solid rgb(185, 175, 175);
        box-shadow: rgb(28 28 28 / 8%) 0px 2px 8px;

        svg{
          font-size: 1.15rem;
        }
      }

      .sort-type{
        position: absolute;
        top: 35px;
        right: -5px;
        background-color: white;
        border: 1px solid rgb(185, 175, 175);
        box-shadow: rgb(28 28 28 / 8%) 0px 2px 8px;
        padding: 5px 10px;
        border-radius: 5px;
        display: none;
        z-index: 100;
        
        .item{
          font-size: 0.7rem;
          padding: 2.5px 0;
        }
      }

      .open{
        display: inline;
      }
    }

    .linear-progess-holder{
      margin-top: 25px;
    }

    .resources-container{
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        width: 100%;
        margin-top: 10px;

        .resource{
          width: 90%;
          max-width: 400px;
          /* background-color: white; */
          border-top: 1px solid rgb(232, 232, 232);
          padding-top: 20px;
          margin: 10px 10px 30px 10px;

          .img-container{
            width: 100%;
            max-height : 200px;
            display: flex;
            align-items: center;
            margin-bottom: 10px;
            overflow: hidden;
            border-radius: 10px;
            border: 1px solid #f3e4e4;

            img{
              width: 100%;
              display: block;
              border-radius: 10px;
            }
          }

          .title{
              font-size: 0.9rem;
              font-weight: 500;
              color: #374151;
              cursor: pointer;
              text-decoration: none;
              width: 100%;
              font-family: 'Poppins', sans-serif;
              
              &:hover{
                color: cornflowerblue;
                /* transition-duration: 150ms; */
              }
          }


          .short-desc{
            font-size: 0.8rem;
            font-weight: 300;
            color: #6b7280;
            font-family: 'Poppins', sans-serif;
          }

          .tags{
              display: flex;
              flex-wrap: wrap;
              margin-top: 10px;

              .main-tag{
                  font-size: 0.7rem;
                  padding: 2.5px 12.5px;
                  border-radius: 100px;
                  background-color: #f3e8ff;
                  color: rgb(107, 33, 168);
                  font-weight: 400;
                  margin: 5px 5px 0 0;
              }

              .tag{
                  font-size: 0.7rem;
                  padding: 2.5px 12.5px;
                  border-radius: 100px;
                  background-color: #eeeeee;
                  font-weight: 300;
                  margin: 5px 5px 0 0;
              }
          }
        }
      }
  }


  @media only screen and (min-width: 1100px) {
    display: none;
  }
`;

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
      color: #18489f;
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

      .linear-progess-holder{
        margin-bottom: 50vh;
      }

      .resources-container{
        display: flex;
        flex-wrap: wrap;
        align-items: stretch;
        height: auto;
        width: 100%;
        margin-top: 10px;

        .resource{
          width: calc(33.33% - 30px);
          height: auto;
          /* min-height: 280px; */
          /* background-color: white; */
          border-top: 1px solid ${(props) => (props.needDarkMode ? '#595b5f' : 'rgb(232, 232, 232)')};
          /* border: 1px solid rgb(232, 232, 232); */
          padding-top: 20px;
          margin: 10px 15px 30px 15px;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          position: relative;

          .top-tag{
            position: absolute;
            padding: 5px 10px;
            font-size: 0.7rem;
            font-weight: 300;
            background-color: white;
            border: 1px solid #b9afaf;
            box-shadow: rgb(28 28 28 / 8%) 0px 2px 8px;
            top: 5px;
            right: -10px;
            border-radius: 100px;
            user-select: none;
          }

          .img-container{
            width: 100%;
            height : 126px;
            display: flex;
            align-items: center;
            margin-bottom: 10px;
            overflow: hidden;
            border-radius: 10px;
            border: 1px solid ${(props) => (props.needDarkMode ? '#595b5f' : '#f3e4e4')};

            img{
              width: 100%;
              display: block;
              border-radius: 10px;
            }
          }

          .title{
              font-size: 0.85rem;
              font-weight: 500;
              color: ${(props) => (props.needDarkMode ? '#b6bff1' : '#374151')};
              cursor: pointer;
              text-decoration: none;
              width: 100%;
              font-family: 'Poppins', sans-serif;
              font-family: "Poppins" !important;

              
              &:hover{
                color: cornflowerblue;
                /* transition-duration: 150ms; */
              }
          }


          .short-desc{
            font-size: 0.75rem;
            font-weight: 200;
            letter-spacing: 0.06rem;
            font-family: 'Poppins', sans-serif;
            color: ${(props) => (props.needDarkMode ? '#e5e5e5' : '#333')};
          }

          .tags{
              display: flex;
              flex-wrap: wrap;
              margin-top: 10px;

              .main-tag{
                  font-size: 0.7rem;
                  padding: 2.5px 12.5px;
                  border-radius: 100px;
                  background-color: ${(props) => (props.needDarkMode ? '#616986' : '#f3e8ff')};
                  color: ${(props) => (props.needDarkMode ? '#ffffff' : 'rgb(107, 33, 168)')};
                  font-weight: 400;
                  margin: 5px 5px 0 0;
              }

              .tag{
                  font-size: 0.7rem;
                  padding: 2.5px 12.5px;
                  border-radius: 100px;
                  background-color: ${(props) => (props.needDarkMode ? '#404249' : '#eeeeee')};
                  color: ${(props) => (props.needDarkMode ? '#aaa2a2' : '#333')};
                  font-weight: 300;
                  margin: 5px 5px 0 0;
              }
          }

          .follow-me-link{
            margin: 10px 5px;

            a{
              font-size: 0.75rem;
              color: ${(props) => (props.needDarkMode ? '#6b66bd' : '#18489f')};
              /* text-decoration: none; */
              /* color: inherit; */

              &:hover{
                text-decoration: underline;
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
const Sort = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  margin: 10px 0;

  .box {
    cursor: pointer;
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
    user-select: none;

    .text {
      font-size: 0.8rem;
      font-weight: 300;
      margin: 0 7.5px;
    }
    
    &:hover{
      background-color: #f4f3f3d6;
      transition-duration: 250ms;
      transition-timing-function: ease-in-out;
    }
  }

`;

const RightBottomMessage = styled.div`
  position: fixed; 
  right: 10px;
  bottom: 10px;
  background-color: black;
  border-radius: 4px;
  padding: 10px;
  font-size: 0.75rem;
  color: white;
  font-weight: 200;
  max-width: 300px;
`