import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import CCHeader from '../Components/CCHeader'
import LeftMenu from '../Components/LeftMenu'
import FilterListIcon from '@material-ui/icons/FilterList';
import InfoIcon from '@material-ui/icons/Info';
import ApartmentIcon from '@material-ui/icons/Apartment';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { selectedProfilesFilters } from "../Components/selectedProfilesFilters";
import axios from "axios";
import { LinearProgress } from "@material-ui/core";
import { companyFilters } from "../Components/companyFilters";
import SimpleFooter from '../Components/SimpleFooter';
import sampleImage from '../Images/sample2.png';
import sampleImage2 from '../Images/sample3.png';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import MobileNavbar from "../Components/MobileNavbar";
const ResumeParser = require("../Screen");


const SelectedProfiles = () => {
  const [allResumesData, setAllResumesData] = useState([]);
  const [filter, setFilter] = useState("All Profiles");
  const [showImageModel, setShowImageModel] = useState(false);
  const [imageValue, setImageValue] = useState(sampleImage);
  const [comapanyName, setComapanyName] = useState(companyFilters[0].text);
  const [showComapanyChange, setShowComapanyChange] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  // const ResumeParser = require('');

  // const resume = new ResumeParser("../Images/my_resume");

  //Convert to JSON Object
//   resume.parseToJSON()
//   .then(data => {
//     console.log('Yay! ', data);
//   })
//   .catch(error => {
//     console.error(error);
//   });

// //Save to JSON File
// resume.parseToFile('../Images') //output subdirectory
//   .then(file => {
//     console.log('Yay! ', file);
//   })
//   .catch(error => {
//     console.error(error);
//   });
  
  // console.log(companyFilters);

  useEffect(() => {
    document.title = "Selected Profiles - Algolisted";
  }, []);


  // useEffect(() => {
  //   axios.get("https://algolisted.tonmoy1912.in/resumes/all")
  //     .then((res) => {
  //       setAllResumesData(res.data);
  //       console.log("All resumes : ", res.data);
  //     })
  //     .catch((err) => console.log(err));
  // }, []);

  const handleFilter = (e) => {
    setFilter(e.target.textContent);
  };

  


  const filters = selectedProfilesFilters.map((item) => {
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

  const handleChangeComapnay = (e) => {
    setComapanyName(e.text);
    setShowComapanyChange(false);
  }


  return (
    <GrandContainer>
      {
        showImageModel ? (
          <ShowImage onClick={() => setShowImageModel(false)} >
            <img src={imageValue} alt="" />
          </ShowImage>
        ) : (<></>)
      }
      <MobContainer>
        <MobileNavbar />
        <div className="main-content">
          <h1 className="main-heading">Selected Profiles</h1>
          <p className="heading-supporter">
            Here you can see all the resumes that recently got shortlisted for a specific company. You can also read that person's interview experience with that particular company or fix a one-on-one google meet to ask queries. This can be helpful for those who want to know what kind of resumes or skills they need to build in order to be selected for a particular company.
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
                    <div className="text">Select Filter</div>
                    <ExpandMoreIcon />
                  </>
                )
              }
            </div>
          </div>

          {
            showFilters ? (<Filters>{filters}</Filters>) : (<></>)
          }

          <CompanyStatistics>
            <div className="topic-heading">Company Statistics</div>
            <div className="desc">
              This new feature is coming soon and will provide graphical representations of information about the company you are targeting, including the median CGPA of recently hired employees and the required LeetCode rating for selection. We will have all the information you need.
            </div>
          </CompanyStatistics>

          <TempDoc>
            <div className="desc">
              We are currently in need of more resumes to improve the accuracy of our machine learning models. If you are currently employed at a company or have access to someone else's resume, we would greatly appreciate it if you could provide it to us. Your help will allow us to continue working on our models and ensuring the best possible results.
            </div>
            <br />
            <div className="desc">
              Prototype Image of what we are planning to make -
            </div>
            <img src={sampleImage} alt="" onClick={() => { setImageValue(sampleImage); setShowImageModel(true); }} />
            <img src={sampleImage2} alt="" onClick={() => { setImageValue(sampleImage2); setShowImageModel(true); }} />
            <div className="small-gap"></div>
            <br />
            <a href="https://forms.gle/oLPuSXBuxCjLZjiYA" target={"_blank"} className='take-data' rel="noreferrer">
              Add resume
            </a>
          </TempDoc>
        </div>
        <SimpleFooter />
      </MobContainer>
      <Container>
        <CCHeader />
        <LeftMenu marked={"selected-profiles"} />
        <div className="cc-middle-content">
          <h1 className='main-heading'>Selected Profiles <div className="head-tag">coming soon</div> </h1>
          <p className="heading-supporter">
            Here you can see all the resumes that recently got shortlisted for a specific company. You can also read that person's
            interview experience with that particular company or fix a one-on-one google meet to ask queries. This can be helpful
            for those who want to know what kind of resumes or skills they need to build in order to be selected for a particular
            company.
          </p>
          <div className="message">
            <div className="icon"></div>
            <div className="text">
              We are constantly looking for profiles which got selected on good companies. If you want to help <a href="/">click here</a>
            </div>
          </div>

          <Filters>{filters}</Filters>

          <SearchHelper>
            <div className="left-filter">
              <div className="box select-box" onClick={() => setShowComapanyChange(!showComapanyChange)}>
                <div className="icon-1"><ApartmentIcon /></div>
                <div className="text">{comapanyName}</div>
                <div className="icon-1 icon-drop"><ExpandMoreIcon /></div>
              </div>
              {
                showComapanyChange ? (
                  <div className="options">
                    {
                      companyFilters.map((item) => {
                        if (item.text == comapanyName) {
                          return (
                            <div className="option option-selected">{item.text}</div>
                          )
                        }
                        else return (
                          <div className="option" onClick={() => handleChangeComapnay(item)}>{item.text}</div>
                        )
                      })
                    }
                  </div>
                ) : (<></>)
              }
            </div>

            <div className='box filter-box'>
              <div className='text'>Recently Added</div>
              <FilterListIcon />
            </div>
            <InfoIcon className='info-icon' style={{ fill: '#333' }} />
          </SearchHelper>

          <div className="full-width-line"></div>

          <SearchResults>
            <div className="current-search">Showing selected {filter} in {comapanyName == "Select Company" ? "all Companies" : comapanyName}</div>


            <CompanyStatistics>
              <div className="topic-heading">Company Statistics</div>
              <div className="desc">
                This new feature is coming soon and will provide graphical representations of information about the company you are targeting, including the median CGPA of recently hired employees and the required LeetCode rating for selection. We will have all the information you need.
              </div>
            </CompanyStatistics>

            <TempDoc>
              <div className="desc">
                We are currently in need of more resumes to improve the accuracy of our machine learning models. If you are currently employed at a company or have access to someone else's resume, we would greatly appreciate it if you could provide it to us. Your help will allow us to continue working on our models and ensuring the best possible results.
              </div>
              <br />
              <div className="desc">
                Prototype Image of what we are planning to make -
              </div>
              <img src={sampleImage} alt="" onClick={() => { setImageValue(sampleImage); setShowImageModel(true); }} />
              <img src={sampleImage2} alt="" onClick={() => { setImageValue(sampleImage2); setShowImageModel(true); }} />
              <div className="small-gap"></div>
              <br />
              <a href="https://forms.gle/oLPuSXBuxCjLZjiYA" target={"_blank"} className='take-data' rel="noreferrer">
                Add resume
              </a>
            </TempDoc>


            {
              allResumesData.length === 0 ? (
                <></>
                // <div className="linear-progess-holder">
                //   <LinearProgress />
                // </div>
              ) : (
                <div className="all-profiles-container">
                  {allResumesData.map((item, index) => {
                    if (filter == "All Profiles" || item.category == filter) {
                      return (
                        <div className="profile-card" key={index}>
                          <div className="card-header">{item.name} | {item.company}</div>

                          <div className="exp-desc">
                            {item.hiringType} {" Hiring on "} {item.hiringDate} <br />
                            {"Location - "} {item.location}
                            <br />
                            <div className="small-gap"></div>
                            {item.location == "-" ? "No previous work experience" : item.workExp}
                          </div>

                          <div className="full-width-line"></div>

                          <div className="btns">
                            <a target={"_blank"} className="default-btn">Coding Profiles</a>
                            <a target={"_blank"} href={item.resume} className="default-btn" rel="noreferrer">Resume</a>
                            <a target={"_blank"} href={item.linkedin} className="default-btn" rel="noreferrer">Linkedin</a>
                            <a target={"_blank"} className="default-btn">Projects</a>
                            <a target={"_blank"} href={item.mentorship} className="default-btn highlight" rel="noreferrer">Personal Mentorship</a>
                          </div>
                        </div>
                      );
                    }
                  })}
                </div>
              )
            }
          </SearchResults>
          <SimpleFooter />
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

    a.default-btn{
      color: inherit;
      font-size: 0.75rem;
      padding: 2.5px 10px;
      margin: 2.5px;
      text-decoration: none;
      background-color: whitesmoke;
      border: 1px solid rgb(229, 229, 229);
    }

    .small-gap{
      display: block;
      height: 7.5px;
    }

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

  .filter {
    padding: 7.5px 15px;
    font-size: 0.8rem;
    border: 1px solid #b9afaf;
    border-radius: 500px;
    margin: 0px 5px 5px 0px;
    font-weight: 300;
	text-decoration: none;
	color: inherit;

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
const SearchHelper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 15px 0 30px 0;
  padding-right: 25px;
  position: relative;

  .box {
    padding: 5px 10px;
    height: 36px;
    display: flex;
    /* justify-content: space-between; */
    align-items: center;
    background-color: white;
    border: 1px solid #b9afaf;
    box-shadow: rgb(28 28 28 / 8%) 0px 2px 8px;
    margin-right: 5px;
  }

  .select-box{
    border-radius: 5px;
    min-width: 178px;
    cursor: pointer;
    user-select: none;
    padding-right: 20px;

    .text {
      font-size: 0.8rem;
      font-weight: 300;
      margin: 0 7.5px;
    }

    svg{
      margin-bottom: -4px;
    }

    .icon-drop{
      position: absolute;
      right: 10px;
    }
  }

  .left-filter{
    position: relative;
    display: flex;
    flex-direction: column;

    .options{
      width: 125%;
      border-radius: 5px;
      overflow: hidden;
      position: absolute;
      top: 40px;
      border: 1px solid #b9afaf;
      box-shadow: rgb(28 28 28 / 8%) 0px 2px 8px;
      background-color: white;
  
      
      .option{
        padding: 5px 10px;
        height: 36px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        font-size: 0.8rem;
        font-weight: 300;
        
        &:hover{
          background-color: #f5efef;
          cursor: pointer;
          /* transition-duration: 250ms; */
        }
      }

      .option-selected{
          background-color: #f5efef;
          font-weight: 400;
      }
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

  .linear-progess-holder{
    margin-bottom: 30vh;
    width: calc(100% - 20px);

    @media only screen and (max-width: 1370px){
      width: calc(100% - 10px);
    }
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
        font-weight: 400;
        line-height: 1.5rem;
        margin: 10px 0 10px 0;
        color: #766161;
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

const CompanyStatistics = styled.div`
    width: 98%;
    border-radius: 5px;
    background-color: #dc7d7d;
    margin: 20px 0 10px 0;
    padding: 15px;

    img{
      margin-top: 15px;
      /* width: 100%; */
      height: 100px;
      background-color: white;
      border-radius: 5px;
      margin-right: 5px;
    }

    .topic-heading{ 
      font-weight: 500;
      font-size: 0.95rem;
      margin-bottom: 7.5px;
      color: white;
    }

    .desc{ 
      font-weight: 200;
      font-size: 0.85rem;
      color: white;
    }

    .take-data{
      font-size: 0.75rem;
      text-decoration: none;
      color: inherit;
      padding: 7.5px 12px;
      border-radius: 100px;
      background-color: #d8c2c2;
      letter-spacing: 0.06rem;
      color: #000;
    }

    @media only screen and (max-width: 1370px){
      width: calc(100% - 10px);
    }

    @media only screen and (max-width: 1100px){
      width: 100%;
      border-radius: 5px;
      background-color: #dc7d7d;
      margin: 15px 0 5px 0;
      padding: 10px;
      background: linear-gradient(274deg, #94a9ff, #83e85e, #62c1ee);
      background-size: 600% 600%;

      -webkit-animation: AnimationName 0s ease infinite;
      -moz-animation: AnimationName 0s ease infinite;
      animation: AnimationName 0s ease infinite;

      img{
        margin-top: 15px;
        /* width: 100%; */
        height: 100px;
        background-color: white;
        border-radius: 5px;
        margin-right: 5px;
      }

      .topic-heading{ 
        font-weight: 500;
        font-size: 0.9rem;
        margin-bottom: 7.5px;
        color: black;
      }

      .desc{ 
        font-weight: 300;
        font-size: 0.75rem;
        color: black;
      }

      .take-data{
        font-size: 0.7rem;
        text-decoration: none;
        color: inherit;
        padding: 7.5px 12px;
        border-radius: 100px;
        background-color: #d8c2c2;
        letter-spacing: 0.06rem;
        color: #000;
      }

    }

    @-webkit-keyframes AnimationName {
        0%{background-position:49% 0%}
        50%{background-position:52% 100%}
        100%{background-position:49% 0%}
    }
    @-moz-keyframes AnimationName {
        0%{background-position:49% 0%}
        50%{background-position:52% 100%}
        100%{background-position:49% 0%}
    }
    @keyframes AnimationName {
        0%{background-position:49% 0%}
        50%{background-position:52% 100%}
        100%{background-position:49% 0%}
    }
`

const TempDoc = styled.div`
    width: 98%;
    border-radius: 5px;
    /* background-color: #dc7d7d; */
    margin: 20px 0 10px 0;
    /* padding: 15px; */
    img{
      margin-top: 15px;
      /* width: 100%; */
      height: 140px;
      background-color: #e5ebec;
      padding: 5px;
      border: 1px solid #b9b1b1;
      border-radius: 5px;
      margin-right: 5px;
      cursor: pointer;
    }
    .topic-heading{ 
      font-weight: 500;
      font-size: 0.9rem;
      margin-bottom: 7.5px;
    }
    .desc{ 
      font-weight: 200;
      font-size: 0.85rem;
    }
    .take-data {
      width: 400px;
      width: 80%;
      height: 36.5px;
      display: grid;
      place-items: center;
      /* padding: 7.5px 115px; */
      font-size: 0.8rem;
      border: 1px solid #b9afaf;
      border-radius: 500px;
      margin: auto;
      font-weight: 300;
      color: inherit;
      text-decoration: none;
      
      &:hover {
        border-color: #201f1f;
        background-color: #201f1f;
        color: #ebdddd;
        transition-duration: 250ms;
        cursor: pointer;
      }
    }
    @media only screen and (max-width: 1370px){
      width: calc(100% - 10px);
    }

    @media only screen and (max-width: 1100px){
      width: 100%;
      border-radius: 5px;
      /* background-color: #dc7d7d; */
      margin: 10px 0 10px 0;
      padding: 5px;

      img{
        margin-top: 15px;
        /* width: 30%; */
        /* height: auto; */
        height: 85px;
        background-color: #e5ebec;
        padding: 5px;
        border: 1px solid #b9b1b1;
        border-radius: 5px;
        cursor: pointer;
      }

      .desc{ 
        font-weight: 300;
        font-size: 0.75rem;
        color: #696169;
      }

      .take-data {
        width: 90%;
        max-width: 400px;
        height: 36.5px;
        display: grid;
        place-items: center;
        /* padding: 7.5px 115px; */
        font-size: 0.75rem;
        border: 1px solid #b9afaf;
        border-radius: 500px;
        margin: auto;
        font-weight: 300;
        color: inherit;
        text-decoration: none;

        &:hover {
          border-color: #201f1f;
          background-color: #201f1f;
          color: #ebdddd;
          transition-duration: 250ms;
          cursor: pointer;
        }
      }

      .take-data {
        background: linear-gradient(274deg, #94a9ff, #83e85e, #62c1ee);
        background-size: 600% 600%;

        -webkit-animation: AnimationName 0s ease infinite;
        -moz-animation: AnimationName 0s ease infinite;
        animation: AnimationName 0s ease infinite;
        }

        @-webkit-keyframes AnimationName {
            0%{background-position:49% 0%}
            50%{background-position:52% 100%}
            100%{background-position:49% 0%}
        }
        @-moz-keyframes AnimationName {
            0%{background-position:49% 0%}
            50%{background-position:52% 100%}
            100%{background-position:49% 0%}
        }
        @keyframes AnimationName {
            0%{background-position:49% 0%}
            50%{background-position:52% 100%}
            100%{background-position:49% 0%}
        }
    }
`

const ShowImage = styled.div`
  position: fixed;
  z-index: 100;
  width: 100vw;
  height: 100vh;
  background-color: #00000070;
  left: 0;
  top: 0;

  display: grid;
  place-items: center;

  img{
    max-height: 70vh;
    max-width: 90vw;
  }
`