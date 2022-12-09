import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import CCHeader from '../Components/CCHeader'
import LeftMenu from '../Components/LeftMenu'
import FilterListIcon from '@material-ui/icons/FilterList';
import InfoIcon from '@material-ui/icons/Info';
import ApartmentIcon from '@material-ui/icons/Apartment';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

const SelectedProfiles = () => {
    const randomValues = [
      {
        "cardHeader" : "Abhishek Verma | Google",
        "expDesc" : "Hi there I am Abhishek Verma, I recented cracked Google and Uber. Most of the questions which were asked to me were relatively compairable to codeforces Div 2, and my interview gave emphasis on my open source projects a lot.",
      },
      {
        "cardHeader" : "Atanu Nayak | Uber India",
        "expDesc" : "Hi there I am Abhishek Verma, I recented cracked Google and Uber. Most of the questions which were asked to me were relatively compairable to codeforces Div 2, and my interview gave emphasis on my open source projects a lot.",
      },
      {
        "cardHeader" : "Striver | Google Warsaw",
        "expDesc" : "Hi there I am Abhishek Verma, I recented cracked Google and Uber. Most of the questions which were asked to me were relatively compairable to codeforces Div 2, and my interview gave emphasis on my open source projects a lot.",
      },
      {
        "cardHeader" : "Aditiya Singh | Uber UX developer",
        "expDesc" : "Hi there I am Abhishek Verma, I recented cracked Google and Uber. Most of the questions which were asked to me were relatively compairable to codeforces Div 2, and my interview gave emphasis on my open source projects a lot.",
      },
      {
        "cardHeader" : "Ayush Tripathi | Zomato",
        "expDesc" : "Hi there I am Abhishek Verma, I recented cracked Google and Uber. Most of the questions which were asked to me were relatively compairable to codeforces Div 2, and my interview gave emphasis on my open source projects a lot.",
      },
      {
        "cardHeader" : "Abhishek Verma | Google",
        "expDesc" : "Hi there I am Abhishek Verma, I recented cracked Google and Uber. Most of the questions which were asked to me were relatively compairable to codeforces Div 2, and my interview gave emphasis on my open source projects a lot.",
      },
      {
        "cardHeader" : "Atanu Nayak | Uber India",
        "expDesc" : "Hi there I am Abhishek Verma, I recented cracked Google and Uber. Most of the questions which were asked to me were relatively compairable to codeforces Div 2, and my interview gave emphasis on my open source projects a lot.",
      },
      {
        "cardHeader" : "Striver | Google Warsaw",
        "expDesc" : "Hi there I am Abhishek Verma, I recented cracked Google and Uber. Most of the questions which were asked to me were relatively compairable to codeforces Div 2, and my interview gave emphasis on my open source projects a lot.",
      },
      {
        "cardHeader" : "Aditiya Singh | Uber UX developer",
        "expDesc" : "Hi there I am Abhishek Verma, I recented cracked Google and Uber. Most of the questions which were asked to me were relatively compairable to codeforces Div 2, and my interview gave emphasis on my open source projects a lot.",
      },
      {
        "cardHeader" : "Ayush Tripathi | Zomato",
        "expDesc" : "Hi there I am Abhishek Verma, I recented cracked Google and Uber. Most of the questions which were asked to me were relatively compairable to codeforces Div 2, and my interview gave emphasis on my open source projects a lot.",
      },
    ];
    

    return ( 
        <GrandContainer>
            <MobContainer>
                We are still working on Responsive Version of the website, please view the site with 
                width more than 1100px, a standard laptop or tablet landscape. 
                <img src="https://media4.giphy.com/media/13FrpeVH09Zrb2/giphy.gif" alt="" />
            </MobContainer>
            <Container> 
                <CCHeader />
                <LeftMenu marked={"selected-profiles"} />
                <div className="cc-middle-content">
                    <h1 className='main-heading'>Selected Profiles</h1>
                    <p className="heading-supporter">
                        Here you can see all the resumes that recently got shortlisted for a specific company. You can also read that person’s interview experience with that particular company or fix a one-on-one google meet to ask queries. 
                        This can be helpful for those who want to know what kind of resumes or skills they need to build in order to be selected for a particular company.
                    </p>
                    <div className="message">
                        <div className="icon"></div>
                        <div className="text">
                            We are constantly looking for profiles which got selected on good companies. If you want to help <a href="/">click here</a>
                        </div>
                    </div>

                    <Filters>
                      <div className='filter selected'>SDE Roles</div>
                      <div className='filter'>UX Developers</div>
                      <div className='filter'>Indian StartUps</div>
                      <div className='filter'>Remote StartUps</div>
                    </Filters>

                    <SearchHelper>
                      <div className="box select-box">
                        <div className="icon-1"><ApartmentIcon/></div>
                        <div className="text">Select Company</div>
                        <div className="icon-1"><ExpandMoreIcon/></div>
                      </div>
                      <div className='box filter-box'>
                        <div className='text'>By Relevence</div>
                        <FilterListIcon />
                      </div>
                      <InfoIcon className='info-icon' style={{ fill: '#333' }} />
                    </SearchHelper>

                    <div className="full-width-line"></div>

                    <SearchResults>
                      <div className="current-search">Showing selected SDEs in all companies</div>
                      <div className="all-profiles-container">
                        {
                          randomValues.map((item) => {
                            return (
                              <div className="profile-card">
                                <div className="card-header">{item.cardHeader}</div>
                                <div className="exp-desc">{item.expDesc}
                                  {" "}<a href="/">read more</a>
                                </div>

                                <div className="full-width-line"></div>
            
                                <div className="btns">
                                  <button className="default-btn">Resume</button>
                                  <button className="default-btn">Linkedin</button> 
                                  <button className="default-btn">Coding Profiles</button>
                                  <button className="default-btn">Blogs - Medium</button>
                                  <button className="default-btn highlight">Ask for Referral</button>
                                  <button className="default-btn highlight">Personal Mentorship</button>
                                </div>
                              </div>
                            )
                        
                          })
                        }
                      </div>
                    </SearchResults>
                </div>
            </Container>
        </GrandContainer>
    )
}

export default SelectedProfiles

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
`
const SearchHelper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 15px 0 30px 0;
  position: relative;
  padding-right: 25px;

  .box {
    padding: 5px 10px;
    height: 36px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: white;
    border: 1px solid #b9afaf;
    box-shadow: rgb(28 28 28 / 8%) 0px 2px 8px;
    margin-right: 5px;
  }

  .select-box{
    border-radius: 5px;

    .text {
      font-size: 0.8rem;
      font-weight: 300;
      margin: 0 7.5px;
    }

    svg{
      margin-bottom: -4px;
    }
  }

  .filter-box{
    border-radius: 100px;
  }
  
  
  .text {
    font-size: 0.8rem;
    font-weight: 300;
    margin: 0 7.5px;
  }

  .info-icon{
    position: absolute;
    right: 0;
  }
`

const SearchResults = styled.div`
  margin-top: 15px;

  .current-search{
    font-size: 0.85rem;
    font-weight: 400;
  } 

  .all-profiles-container{
    display: flex;
    flex-wrap: wrap;
    margin: 20px 0;

    .profile-card{
      /* width: max(300px, calc(33% - 10px)); */
      width: calc(33% - 10px);
      min-width: 300px;
      border: 1px solid #e5e5e5;
      border-radius: 5px;
      padding: 10px;
      margin: 0 10px 10px 0;

      .card-header{
        font-size: 1rem;
        font-weight: 500;
      }

      .exp-desc{
        font-size: 0.8rem;
        font-weight: 200;
        margin: 5px 0 20px 0;
      }
      
      .btns{
        display: flex;
        flex-wrap: wrap;
        margin-top: 15px;

        button{
          padding: 2.5px 10px;
          font-size: 0.75rem;
          font-weight: 300;
          margin: 0 4px 4px 0;
          background-color: whitesmoke;
          border: 1px solid #e5e5e5;
        }
        
        .highlight{
          background-color: #f3e8ff;
          color: rgb(107,33,168);
          font-weight: 400;
        }
      }
      

      @media only screen and (max-width: 1370px){
        width: calc(50% - 10px);
      }

    }
  }
`