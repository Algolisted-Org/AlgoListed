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

const Opportunities = () => {
  const [needDarkMode, setNeedDarkMode] = useState(!false);
  
  useEffect(() => {
    document.title = "All Internship and Job Opportunities - Algolisted";
  }, []);

  useEffect(() => {
    let selectedTheme = localStorage.getItem("selectedTheme");
    if(selectedTheme === 'dark') setNeedDarkMode(true);
    if(selectedTheme === 'light') setNeedDarkMode(false);
  }, [])
  
  console.log("needDarkMode : ", needDarkMode);
  const toggleDarkMode = () => {
    setNeedDarkMode(!needDarkMode);
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
          needDarkMode ? <LeftMenuDark marked={"opportunities"} /> : <LeftMenu marked={"opportunities"} />
        }
        <div className='show-middle-content'>
          <div className="cc-middle-content">
            <h1 className='main-heading'>All Internship & Job Opportunities <div className="head-tag">coming soon</div> </h1>
            <p className="heading-supporter">
              On this page, you'll find details about various job openings and internship opportunities, along with the corresponding schedules. We are presently in the process of planning and will be unveiling this page shortly.
            </p>
            <p className="heading-supporter">
              We currently have two plans :
            </p>
            <div className="messages">
              <div className="message">
                <div className="icon"></div>
                <div className="text">
                  We are seeking out <b>small YouTube, Linkedin or Telegram channels</b> engaged in similar activities to ours, with a mutual interest in collaborating on this website.
                  If interested <i><a href="mailto:nayak.primary@gmail.com">contact here</a></i>
                </div>
              </div>
              <div className="message">
                <div className="icon"></div>
                <div className="text">
                  Make a public JSON file on GitHub that anyone can add to. You can include links to job openings at the company, and we'll display them on our website. These job listings will only be visible for one week, or a maximum of 7 days. To do this, we need people to help manage and ensure the job opportunities are valid. If you're interested in being a maintainer, please get in touch with us. <i><a href="mailto:nayak.primary@gmail.com">contact here</a></i>
                </div>
              </div>
              <div className="messages2">
                <h3>Have got an innovative way to resolve this issue? </h3>
                <div className="message2">
                  <a href="/" className="text">
                    Express your thoughts on github issue #145
                  </a>
                  <div className="icon">
                    <CallMadeIcon />
                  </div>
                </div>
                <div className="message2">
                  <a href="/" className="text">
                    Express your with Algolisted owner
                  </a>
                  <div className="icon">
                    <CallMadeIcon />
                  </div>
                </div>
              </div>
            </div>

          </div>
          <SimpleFooter></SimpleFooter>
        </div>
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
          border-radius: 100px;
          background-color: #a5bb26;
          margin-left: 10px;
          
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

      .messages2{
        margin: 30px 0 10px 0;
        
        h3{
          font-size: 1.25rem;
          font-weight: 500;
          color: ${(props) => (props.needDarkMode ? '#e5e5e5' : '#333')};
        }
        .message2{
          display: flex;
          align-items: center;
          border-radius: 5px;
          margin: 10px 0 0 0;
  
          .text{
              font-size: 0.9rem;
              font-weight: 300;
              margin-right: 5px;
              
              b{
                font-weight: 400;
              }
  
              a{
                margin-left: 2.5px;
                text-decoration: none;
              }
          }
  
          svg{
            font-size: 1rem;
            fill: ${(props) => (props.needDarkMode ? '#e5e5e5' : '#333')};
          }
  
  
        }
      }

    }
`
