import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import CCHeaderDarkPlus from '../Components/CCHeaderDarkPlus'
import CCHeaderPlus from '../Components/CCHeaderPlus'
import LeftMenu from '../Components/LeftMenu'
import LeftMenuDark from '../Components/LeftMenuDark'
import FilterListIcon from '@material-ui/icons/FilterList';
import InfoIcon from '@material-ui/icons/Info';
import allBlogsDatabase from "../Components/allBlogsDatabase.json"
import SimpleFooter from '../Components/SimpleFooter';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import MobileNavbar from "../Components/MobileNavbar";
import Tooltip from '@material-ui/core/Tooltip';
// console.log(allBlogsDatabase);

const AllBlogs = () => {
  const [showFilters, setShowFilters] = useState(false);
  
  // ----- FOR DARK MODE -----
	const [needDarkMode, setNeedDarkMode] = useState(false);
	let selectedTheme = localStorage.getItem("selectedTheme");
	console.log("needDarkMode : ", needDarkMode);
	const toggleDarkMode = () => {
		setNeedDarkMode(!needDarkMode);
	};
	// ----- FOR DARK MODE -----

  useEffect(() => {
    document.title = "Simplified Coding Blogs - Algolisted";
  }, []);  

  

return (
    <GrandContainer>
      <MobContainer>
        <MobileNavbar />
        <div className="main-content">
          <h1 className="main-heading">Simplified Coding Blogs</h1>
          <p className="heading-supporter">
            Algolisted generates informative lists for studying and comprehending a wide range of subjects, encompassing practical data and links to valuable resources. The platform's AI-powered blogs extract information from diverse sources such as LeetCode blogs, GeeksforGeeks, Codeforces, and more, and subsequently provide concise summaries alongside pertinent resources pertaining to the blog's subject matter.
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

          <BlogsContainer>
            {
              allBlogsDatabase.map((item, index) => {
                return (
                  <a href={item.link} className="blog-container" key={index}>
                    <div className="last-updated">{item.date}</div>
                    <a className="blog-title">{item.title}</a>
                    <div className="blog-desc">{item.desc}
                      <div className="author">
                        <a href={item.authorLink[0]} target="_blank" rel="noreferrer">
                          <img src={item.authorImageLink[0]} alt="" />
                        </a>
                        <div className="text">Contribution by {item.author[0]} {item.author.length > 1 ? <>+ {item.author.length - 1} others</> : <></>}</div>
                      </div>
                    </div>

                    <div className="blog-tags">
                      <div className="main-tag">{item.category}</div>
                      {
                        item.tags.map((tag, tagIndex) => {
                          return (
                            <div className="tag" key={tagIndex}>{tag}</div>
                          )
                        })
                      }
                    </div>
                  </a>
                )
              })
            }
          </BlogsContainer>

        </div>
        <SimpleFooter />
      </MobContainer>
      <Container>
        {
					selectedTheme == "dark" ? <CCHeaderDarkPlus needDarkMode={needDarkMode} toggleDarkMode={toggleDarkMode}/> : <CCHeaderPlus needDarkMode={needDarkMode} toggleDarkMode={toggleDarkMode}/>
				}
				{ 
					selectedTheme == "dark" ? <LeftMenuDark marked={"all-blogs"} /> : <LeftMenu marked={"all-blogs"} />
				}

        <div className="cc-middle-content">
          <h1 className='main-heading'>AI Summarization of Blogs <div className="head-tag">Under Development Phase 0.90-C</div> </h1>
          <p className="heading-supporter">
            Algolisted generates informative lists for studying and comprehending a wide range of subjects, encompassing practical data and links to valuable resources. The platform's AI-powered blogs extract information from diverse sources such as LeetCode blogs, GeeksforGeeks, Codeforces, and more, and subsequently provide concise summaries alongside pertinent resources pertaining to the blog's subject matter.
          </p>
          <div className="message">
              <div className="icon"></div>
              <div className="text">
                  <b>Under Development : </b> Our primary goal is to streamline the procedure of searching for a company's name, extracting approximately 25-50 recent and pertinent interview experiences, and utilizing this as input for our machine learning model. Subsequently, our model produces results, which we store for a 30-day period. Consequently, you consistently receive the most up-to-date information, ensuring that you are always provided with current data instead of outdated information. Have an idea in this feature
                  {" "}
                  <a href="https://github.com/Nayaker/AlgoListed/issues/new" target={"_blank"} rel="noreferrer">click here</a>
              </div>
          </div>

            <Sort>
              <Tooltip title="Under Development">
                <div className="box">
                  <div className="text">By Relevance</div>
                  <FilterListIcon />
                </div>
              </Tooltip>
              <InfoIcon style={{ fill: "#333" }} />
            </Sort>

          <BlogsContainer>
            {
              allBlogsDatabase.map((item, index) => {
                return (
                  <div className="blog-container" key={index}>
                    <div className="last-updated">{item.date}</div>
                    <a href={item.link} className="blog-title">{item.title}</a>
                    <div className="blog-desc">{item.desc}
                      <div className="author">
                        <a href={item.authorLink[0]} target="_blank" rel="noreferrer">
                          <img src={item.authorImageLink[0]} alt="" />
                        </a>
                        <div className="text">Contribution by {item.author[0]} {item.author.length > 1 ? <>+ {item.author.length - 1} others</> : <></>}</div>
                      </div>
                    </div>

                    <div className="blog-tags">
                      <div className="main-tag">{item.category}</div>
                      {
                        item.tags.map((tag, tagIndex) => {
                          return (
                            <div className="tag" key={tagIndex}>{tag}</div>
                          )
                        })
                      }
                    </div>
                  </div>
                )
              })
            }
          </BlogsContainer>

          <SimpleFooter />
        </div>
      </Container>
    </GrandContainer>
  )
}

export default AllBlogs

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

  }


  @media only screen and (min-width: 1100px) {
    display: none;
  }
`;
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
          color: #292929;
          display: flex; 
          align-items: center;

          .head-tag{
            display: inline;
            font-size: 0.75rem;
            font-weight: 500;
            padding: 0.25rem 0.5rem;
            border-radius: 100px;
            background-color: #e5e5e5;
            margin-left: 10px;
          }
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
    }
`

const Filters = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin: 80px 0 10px 0;

  .filter{
    padding: 7.5px 15px;
    font-size: 0.8rem;
    border: 1px solid #b9afaf;
    border-radius: 500px;
    margin: 0px 5px 5px 0px;
    font-weight: 300;

    &:hover{
      border-color: #201f1f;
      background-color: #201f1f;
      color: #ebdddd;
      transition-duration: 250ms;
      cursor: pointer;
    }
  }

  .selected{
    /* background-color: #ded7d7;
    color: #111; */
    border-color: #201f1f;
    background-color: #201f1f;
    color: #ebdddd;
  }
`

const Sort = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  margin: 75px 0 15px 0;


  .box{
    padding: 5px 10px;
    height: 36px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-radius: 100px;
    background-color: white;
    box-shadow: rgb(28 28 28 / 8%) 0px 2px 8px;
    border: 1px solid #b9afaf;
    margin-right: 5px;
    
    .text{
      font-size: 0.8rem;
      font-weight: 300;
      margin: 0 7.5px;
    }
  }
`

const BlogsContainer = styled.div`
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;

    .blog-container{
        /* border: 1px solid black; */
        width: calc(50% - 30px);
        /* border: 1px solid #e5e7ed; */
        border-top: 1px solid #e5e7ed;
        min-height: 275px;
        margin-bottom: 20px;
        padding: 20px 20px 20px 5px;
        color: inherit;
        text-decoration: none;

        .last-updated{
            font-size: 0.8rem;
            font-weight: 200;
            color: #6b7281;
            margin-bottom: 5px;
        }

        .blog-title{
            font-size: 1.15rem;
            font-weight: 500;
            margin: 15px 0 5px 0;
            color: #374151;
            cursor: pointer;
            text-decoration: none;
            
            &:hover{
              color: cornflowerblue;
              transition-duration: 250ms;
            }
        }


        .blog-desc{
            margin-top: 5px;
            font-size: 0.9rem;
            font-weight: 200;
            margin-bottom: 25px;
            color: #6b7280;
            
            .author{
              display: flex;
              align-items: center;
              margin-top: 10px;

              img{
                height: 30px;
                width: 30px;
                border-radius: 100px;
                margin-right: 5px;
              }

              .text{
                font-weight: 200;
                font-size: 0.75rem;
                font-weight: 200;
                color: #6b7280;
                text-decoration: none;
              }
            }
        }


        .blog-tags{
            display: flex;
            flex-wrap: wrap;

            .main-tag{
                font-size: 0.7rem;
                padding: 5px 15px;
                border-radius: 100px;
                background-color: #f3e8ff;
                color: rgb(107, 33, 168);
                font-weight: 400;
                margin: 5px 5px 0 0;
            }

            .tag{
                font-size: 0.7rem;
                padding: 5px 15px;
                border-radius: 100px;
                background-color: #eeeeee;
                font-weight: 300;
                margin: 5px 5px 0 0;
            }
        }
    }

    @media only screen and (max-width: 1100px) {
      margin-top: 30px;
      .blog-container{
          width: 100%;
          /* border: 1px solid #e5e7ed; */
          border-top: 1px solid #e5e7ed;
          min-height: 275px;
          padding: 10px 10px 10px 5px;
          color: inherit;
          text-decoration: none;

          .last-updated{
              font-size: 0.65rem;
              font-weight: 300;
              color: #6b7281;
              margin-bottom: 5px;
          }

          .blog-title{
              font-size: 1.1rem;
              font-weight: 600;
              margin: 15px 0 50px 0;
              color: #374151;
              cursor: pointer;
              text-decoration: none;
              
              &:hover{
                color: cornflowerblue;
                transition-duration: 250ms;
              }
          }


          .blog-desc{
              font-size: 0.8rem;
              font-weight: 300;
              margin: 5px 0 15px 0;
              color: #6b7280;
              
              .author{
                display: flex;
                align-items: center;
                margin-top: 20px;

                img{
                  height: 30px;
                  width: 30px;
                  border-radius: 100px;
                  margin-right: 5px;
                }

                .text{
                  font-size: 0.7rem;
                  font-weight: 400;
                  color: #6b7280;
                  text-decoration: none;
                }
              }
          }


          .blog-tags{
              display: flex;
              flex-wrap: wrap;

              .main-tag{
                  font-size: 0.65rem;
                  padding: 5px 10px;
                  border-radius: 100px;
                  background-color: #f3e8ff;
                  color: rgb(107, 33, 168);
                  font-weight: 400;
                  margin: 5px 5px 0 0;
              }

              .tag{
                  font-size: 0.65rem;
                  padding: 5px 10px;
                  border-radius: 100px;
                  background-color: #eeeeee;
                  font-weight: 300;
                  margin: 5px 5px 0 0;
              }
          }
      }
    }


`