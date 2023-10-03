// InterviewSummaries
import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import CCHeader from '../Components/CCHeader'
import LeftMenu from '../Components/LeftMenu'
import FilterListIcon from '@material-ui/icons/FilterList';
import InfoIcon from '@material-ui/icons/Info';
import allBlogsDatabase from "../Components/allBlogsDatabase.json"
import SimpleFooter from '../Components/SimpleFooter';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import MobileNavbar from "../Components/MobileNavbar";
import Tooltip from '@material-ui/core/Tooltip';
// console.log(allBlogsDatabase);

const InterviewSummaries = () => {
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    document.title = "Interview Summaries - Algolisted";
  }, []);

  return (
    <GrandContainer>
      <MobContainer>
        We are still working on Responsive Version of the website, please view the site with
        width more than 1100px, a standard laptop or tablet landscape.
        <img src="https://media4.giphy.com/media/13FrpeVH09Zrb2/giphy.gif" alt="" />
      </MobContainer>
      <Container>
        <CCHeader />
        <LeftMenu marked={"interview-summaries"} />
        <div className="cc-middle-content">
          <h1 className='main-heading'>AI Summarization of Interviews <div className="head-tag">Under Development Phase 0.65-C</div> </h1>
          <p className="heading-supporter">
            Algolisted AI compiles interview experiences from a range of sources, such as LeetCode and GeeksforGeeks, and creates a comprehensive summary of these interviews. This feature provides a consolidated view of interview knowledge, allowing you to access a wealth of information in one place. The algorithm also organizes questions that were asked in each interview round into a single list for your convenience.
          </p>
          <div className="message">
            <div className="icon"></div>
            <div className="text">
              <b>Under Development : </b> Our primary goal is to streamline the procedure of searching for a company's name, extracting approximately 25-50 recent and pertinent interview experiences, and utilizing this as input for our machine learning model. Subsequently, our model produces results, which we store for a 30-day period. Consequently, you consistently receive the most up-to-date information, ensuring that you are always provided with current data instead of outdated information. Have an idea in this feature
              {" "}
              <a href="https://github.com/Nayaker/AlgoListed/issues/new" target={"_blank"}>click here</a>
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
          <div className="resources-container">
          <div className="resource">
              <div className="top-tag">
                Trending
              </div>
              <div className="top-part">
                <a href="" target="_blank" className="img-container">
                  <img src="https://t.ctcdn.com.br/VPosJ-jijekcHEJCcf9yb1hjHcs=/51x28:971x545/920x518/smart/i381149.jpeg" target="_blank" alt="" />
                </a>
                <a href="" target={"_blank"} className="title">Google India</a>
                <div className="short-desc">Amazon's internship hiring in India typically includes rounds of technical interviews that focus on Data Structures and Algorithms (DSA) knowledge. Candidates are also evaluated based on their relevant projects and practical application of skills.</div>
              </div>
              <div className="bottom-part">
                <div className="follow-me-link">
                  Last Updated : <b>2 Oct 2023</b>
                </div>
                <div className="tags">
                  <div className="tag">Internship</div>
                  <div className="tag">Product Based</div>
                </div>
                <div className="tags">
                  <div className="main-tag">
                    Algolisted AI summarized 284 Articles 
                    <img src="https://www.gstatic.com/lamda/images/sparkle_resting_v2_darkmode_2bdb7df2724e450073ede.gif" alt="" />
                  </div> 
                  <br />
                </div>
              </div>
            </div>
            <div className="resource">
              <div className="top-tag">
                Trending
              </div>
              <div className="top-part">
                <a href="" target="_blank" className="img-container">
                  <img src="https://www.thetechedvocate.org/wp-content/uploads/2023/05/amazon-1.jpg" target="_blank" alt="" />
                </a>
                <a href="" target={"_blank"} className="title">Amazon India</a>
                <div className="short-desc">Amazon's internship hiring in India typically includes rounds of technical interviews that focus on Data Structures and Algorithms (DSA) knowledge. Candidates are also evaluated based on their relevant projects and practical application of skills.</div>
              </div>
              <div className="bottom-part">
                <div className="follow-me-link">
                  Last Updated : <b>2 Oct 2023</b>
                </div>
                <div className="tags">
                  <div className="main-tag">Internship</div>
                  <div className="tag">Product Based</div>
                </div>
              </div>
            </div>
            <div className="resource">
              <div className="top-tag">
                Trending
              </div>
              <div className="top-part">
                <a href="" target="_blank" className="img-container">
                  <img src="https://helios-i.mashable.com/imagery/articles/03y6VwlrZqnsuvnwR8CtGAL/hero-image.fill.size_1200x675.v1623372852.jpg" target="_blank" alt="" />
                </a>
                <a href="" target={"_blank"} className="title">Uber India</a>
                <div className="short-desc">Amazon's internship hiring in India typically includes rounds of technical interviews that focus on Data Structures and Algorithms (DSA) knowledge. Candidates are also evaluated based on their relevant projects and practical application of skills.</div>
              </div>
              <div className="bottom-part">
                <div className="follow-me-link">
                  Last Updated : <b>2 Oct 2023</b>
                </div>
                <div className="tags">
                  <div className="main-tag">Internship</div>
                  <div className="tag">Product Based</div>
                </div>
              </div>
            </div>
            <div className="resource">
              <div className="top-tag">
                Trending
              </div>
              <div className="top-part">
                <a href="" target="_blank" className="img-container">
                  <img src="https://www-us2.api.concursolutions.com/appcenter/api/v3/listings/57fd5e96140411120087e9dd/images/584b3ee7b490ec6ac904e93d?v=1481326311944&lang=en-us" target="_blank" alt="" />
                </a>
                <a href="" target={"_blank"} className="title">Ola India</a>
                <div className="short-desc">Amazon's internship hiring in India typically includes rounds of technical interviews that focus on Data Structures and Algorithms (DSA) knowledge. Candidates are also evaluated based on their relevant projects and practical application of skills.</div>
              </div>
              <div className="bottom-part">
                <div className="follow-me-link">
                  Last Updated : <b>2 Oct 2023</b>
                </div>
                <div className="tags">
                  <div className="main-tag">Internship</div>
                  <div className="tag">Product Based</div>
                </div>
              </div>
            </div>
            <div className="resource">
              <div className="top-tag">
                Trending
              </div>
              <div className="top-part">
                <a href="" target="_blank" className="img-container">
                  <img src="https://pbs.twimg.com/profile_images/1605279612216348672/PCYJMyaB_400x400.png" target="_blank" alt="" />
                </a>
                <a href="" target={"_blank"} className="title">Paypal India</a>
                <div className="short-desc">Amazon's internship hiring in India typically includes rounds of technical interviews that focus on Data Structures and Algorithms (DSA) knowledge. Candidates are also evaluated based on their relevant projects and practical application of skills.</div>
              </div>
              <div className="bottom-part">
                <div className="follow-me-link">
                  Last Updated : <b>2 Oct 2023</b>
                </div>
                <div className="tags">
                  <div className="main-tag">Internship</div>
                  <div className="tag">Product Based</div>
                </div>
              </div>
            </div>
          </div>
          <SimpleFooter />
        </div>
      </Container>
    </GrandContainer>
  )
}

export default InterviewSummaries

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
          border-top: 1px solid rgb(232, 232, 232);
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
            height : 156px;
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
              font-size: 1rem;
              font-weight: 500;
              color: #374151;
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
            margin: 10px 0;
          }

          .tags{
              display: flex;
              flex-wrap: wrap;
              margin-top: 2.5px;

              .main-tag{
                  display: flex;
                  align-items: center;
                  font-size: 0.7rem;
                  padding: 2.5px 12.5px;
                  border-radius: 100px;
                  background-color: #f3e8ffd4;
                  color: rgb(107, 33, 168);
                  font-weight: 400;
                  margin: 5px 5px 0 0;

                  img{
                    height: 1.25rem;
                    margin-right: -5px;
                    margin-left: 5px;
                  }
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

          .follow-me-link{
            margin: 0px 0 20px 0;
            font-size: 0.7rem;
            font-weight: 200;

            b{
              font-weight: 400;
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
