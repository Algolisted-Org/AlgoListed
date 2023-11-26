import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import CCHeaderDarkPlus from '../Components/CCHeaderDarkPlus'
import CCHeaderPlus from '../Components/CCHeaderPlus'
import LeftMenu from '../Components/LeftMenu'
import LeftMenuDark from '../Components/LeftMenuDark'
import SimpleFooter from '../Components/SimpleFooter'
import InfoIcon from "@material-ui/icons/Info";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import ExpandLessIcon from "@material-ui/icons/ExpandLess";

const MockAssessment = () => {
  const [needDarkMode, setNeedDarkMode] = useState(true);

  useEffect(() => {
    let selectedTheme = localStorage.getItem("selectedTheme");
    if (selectedTheme === 'dark') setNeedDarkMode(true);
  }, []);

  useEffect(() => {
    document.title = "Generate Mock Online Assessment - Algolisted";
  }, []);

  console.log("needDarkMode : ", needDarkMode);
  const toggleDarkMode = () => {
    setNeedDarkMode(!needDarkMode);
  };

  return (
    <GrandContainer needDarkMode={needDarkMode}>
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
          needDarkMode ? <LeftMenuDark marked={"mock-assessment"} /> : <LeftMenu marked={"mock-assessment"} />
        }
        {/* ---> change this all-blogs to your desired page-id */}

        <div className="cc-middle-content">
          <h1 className='main-heading'>Generate Mock Online Assessment</h1>
          <p className="heading-supporter">
            We've designed this page as a platform for students to hone their skills in tackling Online Assessments from various companies. Here, you'll find MCQs to solve within a specified time frame, simulating real competition scenarios. Additionally, we provide comprehensive analytics at the end to enhance your understanding of the subjects.
          </p>
          {/* <div className="message">
                        <div className="icon"></div>
                        <div className="text">
                            Text here : We are constantly looking for good blogs. Want to be a technical content writer <a href="/">click here</a>
                        </div>
                    </div> */}

          <div className="input-container">
            <div className="resume-upload">
              {/* <h3>Topics to Include</h3> */}
              <div className="options">
                <div className="option">
                  <input type="checkbox" id="all" />
                  <label htmlFor="all">Aptitude</label>
                </div>
                <div className="option">
                  <input type="checkbox" id="easy" />
                  <label htmlFor="easy">Operating System</label>
                </div>
                <div className="option">
                  <input type="checkbox" id="medium" />
                  <label htmlFor="medium">DBMS</label>
                </div>
                <div className="option">
                  <input type="checkbox" id="medium" />
                  <label htmlFor="medium">Computer Networks</label>
                </div>
                <div className="option">
                  <input type="checkbox" id="medium" />
                  <label htmlFor="medium">OOPs</label>
                </div>
              </div>
            </div>

            <div className="mid">
              <div className="other-details">
                <h3 className="text">Assessment Information</h3>
                <div className="details">
                  <div className="detail">
                    <select value="" className="text" >
                      <option value="0">Number of Questions :</option>
                      <option value="1">10</option>
                      <option value="2">15</option>
                      <option value="3">20</option>
                      <option value="4">25</option>
                      <option value="4">30</option>
                    </select>
                  </div>
                  <div className="detail">
                    <select value="" className="text" >
                      <option value="0">Assessment Duration :</option>
                      <option value="1">Easy</option>
                      <option value="2">Medium</option>
                      <option value="3">Hard</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="input-api-key">
                <div className="left-section">
                  Already have Test ID ? 
                </div>
                <div className="right-section">
                  <input
                    type="text"
                    placeholder="Enter your Test ID (optional) "
                  />
                </div>
              </div>
            </div>


            <div className="right-end">
              <div className="info">
                <h3 className="text">Data Source</h3>
                <div className="detail">
                  <div className="text">algolisted.com</div>
                </div>
              </div>

              <div className="submit-btn">
                Generate Test
              </div>
            </div>
          </div>
          <div className="main-info">
            <div className="text">
              <InfoIcon />
              If someone gave you an ID then enter in the above requested box, else ignore the box to 
              create a new OA. 
            </div>
          </div>

          <div className="display-line"></div>

          <div className="text btn-clickable">
            Show Sample Results
            <ExpandMoreIcon />
          </div>
        </div>

        <SimpleFooter />
      </Container>
    </GrandContainer>
  )
}

export default MockAssessment

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
    
    .display-line {
      width: 100%;
      margin: 20px 0 30px 0;
      height: 1px;
      background-color: #404249;
    }
    

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

      .input-container {
        display: flex;
        width: 100%;
        margin-top: 50px;
        margin-bottom: 10px;
        justify-content: space-between;
        flex-wrap: wrap;

        .resume-upload {
          width: 240px;;
          height: 155px;
          background-color: ${(props) => props.needDarkMode ? "#404249" : "#e5e5e5"};
          border-radius: 10px;
          padding: 7.5px 15px 15px 15px;


          h3 {
            font-size: 1rem !important;
            font-weight: 500;
            color: ${(props) => (props.needDarkMode ? "#e5e5e5" : "#333")};
          }

          svg {
            fill: ${(props) => (props.needDarkMode ? "#e5e5e5" : "#333")};
            font-size: 2rem;
          }

          .text {
            max-width: 150px;
            color: ${(props) => (props.needDarkMode ? "#e5e5e5" : "#333")};
            font-size: 0.9rem;
            margin-top: 5px;
            font-weight: 200;
          }

          .options{
            display: flex;
            flex-direction: column;

            .option{
              display: flex;
              align-items: center;
              margin-top: 7.5px;
              
              label{
                  color: ${(props) => (props.needDarkMode ? '#e5e5e5' : '#333')};
                  margin-left: 5px;
                  font-size: 0.8rem;
                  font-weight: 300;
              }
    
              input[type="checkbox"] {
                  margin-right: 2.5px;
                  border: none;
                  cursor: pointer;
              }
            }
            
          }
        }

        .mid{
          flex: 1;
          display: flex;
          flex-direction: column;
          padding: 0 10px;
          
          .other-details {
            width: 100%;
            height: 100px;
            background-color: ${(props) => props.needDarkMode ? "#404249" : "#e5e5e5"};
            border-radius: 10px;
            display: flex;
            flex-direction: column;
            align-items: flex-start;
            justify-content: center;
            padding: 15px 15px;
  
            .text {
              font-size: 0.7rem;
              color: ${(props) => (props.needDarkMode ? "#e5e5e5" : "#333")};
            }
  
            h3 {
              font-size: 1rem !important;
              font-weight: 500;
              margin-left: 5px;
            }
  
            .details {
              margin-top: 10px;
              width: 100%;
              display: flex;
              align-items: center;
              /* justify-content: center; */
  
              .detail {
                min-width: 190px;
                height: 35px;
                width: 40%;
                background-color: ${(props) => props.needDarkMode ? "#313337" : "#d0d0d0"};
                border: 1px solid ${(props) => (props.needDarkMode ? "#56575d" : "#c3b4b4")};
                border-radius: 100px;
                margin-right: 5px;
                color: #000;
  
                display: flex;
                align-items: center;
                justify-content: space-between;
  
                padding: 0 10px;
                select {
                  display: flex;
                  width: 100%;
                  border: none;
                  background-color: transparent;
                  outline: none;
                }
              }
            }
  
            svg {
              font-size: 1rem;
              fill: ${(props) => (props.needDarkMode ? "#e5e5e5" : "#333")};
            }
          }

          .input-api-key {
            width: 100%;
            margin-top: 10px;
            background-color: #404249;
            height: 45px;
            border-radius: 10px;
            overflow: hidden;
            padding: 5px;
            display: flex;
            align-items: center;
            justify-content: space-between;
            background-color: ${(props) => props.needDarkMode ? "#404249" : "#e5e5e5"};

            .left-section {
              height: 100%;
              /* background-color: #313337; */
              border-radius: 12.5px;
              padding: 0 20px;
              /* background-color: ${(props) => props.needDarkMode ? "#404249" : "#e5e5e5"}; */
              color: ${(props) => (props.needDarkMode ? "#e5e5e5" : "#333")};
              background-color: ${(props) => props.needDarkMode ? "#313337" : "#d0d0d0"};
              /* border: 1px solid ${(props) => (props.needDarkMode ? "#56575d" : "#c3b4b4")}; */

              display: flex;
              align-items: center;
              justify-content: center;

              svg {
                fill: ${(props) => (props.needDarkMode ? "#e5e5e5" : "#333")};
                font-size: 1rem;
                margin-left: 10px;
              }

              color: ${(props) => (props.needDarkMode ? "#e5e5e5" : "#333")};
              font-size: 0.75rem;
              text-align: center;
              font-weight: 500;
            }

            .right-section {
              flex: 1;
              border-left: 1px solid #635757;
              margin-left: 10px;
              padding: 0 0 0 10px;
              height: 100%;

              input {
                height: 100%;
                border-radius: 100px;
                border: none;
                width: 100%;
                font-size: 0.75rem;
                font-weight: 200;
                padding: 0 12.5px;
                background-color: ${(props) => props.needDarkMode ? "#313337" : "#d0d0d0"};
                color: ${(props) => (props.needDarkMode ? "#e5e5e5" : "#333")};
                /* border: 1px solid ${(props) => (props.needDarkMode ? "" : "#c3b4b4")}; */
              }
            }
          }
        }


        .right-end{
          display: flex;
          flex-direction: column;

          .info {
            width: 180px;
            height: 100px;
            background-color: ${(props) => props.needDarkMode ? "#404249" : "#e5e5e5"};
            border-radius: 10px;
            display: flex;
            flex-direction: column;
            align-items: flex-start;
            justify-content: space-between;
            padding: 15px 15px;

            .text {
              font-size: 0.7rem;
              color: ${(props) => (props.needDarkMode ? "#e5e5e5" : "#333")};
            }

            h3 {
              font-size: 1rem !important;
              font-weight: 500;
              margin-left: 5px;
            }

            .detail {
              height: 35px;
              width: 100%;
              background-color: ${(props) => props.needDarkMode ? "#313337" : "#d0d0d0"};
              border: 1px solid
                ${(props) => (props.needDarkMode ? "#56575d" : "#c3b4b4")};
              border-radius: 100px;
              margin-right: 5px;

              display: flex;
              align-items: center;
              justify-content: space-between;

              padding: 0 10px;
            }

            svg {
              font-size: 1rem;
              fill: ${(props) => (props.needDarkMode ? "#e5e5e5" : "#333")};
            }
          }
          
          .submit-btn {
            width: 180px;
            margin-top: 10px;
            background-color: #404249;
            height: 45px;
            border-radius: 10px;
            border: 1px solid #c2b1b1;
            color: #333;
            display: inline-block;
            font-size: 0.85rem;
            font-weight: 300;
            text-decoration: none;
            /* text-transform: uppercase; */
            border-radius: 100px;
            background: linear-gradient(
              300deg,
              #56f238,
              #b3adff,
              #c5c5ef,
              #bde6ce,
              #56f238
            );
            background-size: 400% 400%;
            -webkit-animation: AnimationName 10s ease infinite;
            -moz-animation: AnimationName 10s ease infinite;
            animation: AnimationName 10s ease infinite;
            border-color: transparent;
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: center;
            text-align: center;
            opacity: 0.75;

            a {
              color: #333;
            }

            &:hover {
              background-color: whitesmoke;
              color: #333;
              cursor: pointer;
              transition-duration: 500ms;
              opacity: 1;
            }
          }
        }

        @-webkit-keyframes AnimationName {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }

        @-moz-keyframes AnimationName {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }

        @keyframes AnimationName {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }
      }
    }
    .main-info {
      margin-top: 10px;

      .text {
        font-size: 0.75rem;
        font-weight: 200;
        color: ${(props) => (props.needDarkMode ? "#c6c2c2" : "#333")};

        svg {
          font-size: 1rem;
          margin-bottom: -3.5px;
          margin-right: 3.5px;
          fill: ${(props) => (props.needDarkMode ? "#c6c2c2" : "#333")};
        }
      }
    }
`
