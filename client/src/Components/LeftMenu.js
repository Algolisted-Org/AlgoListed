import React, { useState } from 'react'
import styled from 'styled-components'
import MenuIcon from '@material-ui/icons/Menu';
import Tooltip from '@material-ui/core/Tooltip';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import { Link as RouterLink }from 'react-router-dom';

const LeftMenu = ({ marked }) => {
  const [showMoreInfo, setShowMetmoreInfo] = useState(false);

  const menuItems = [
    {
      value: "Show All Blogs",
      showAt: "all-blogs",
      link: "/blogs/all",
    },
    {
      value: "Coding Resources",
      showAt: "resources",
      link: "/resources",
    },
    {
      value: "Showdown Server",
      showAt: "showdown-server",
      link: "/showdown-server",
    }, 
    {
      value: "Interview Summaries",
      showAt: "interview-summaries",
      link: "/interview-summaries",
    },
    {
      value: "Coding Sheets",
      showAt: "coding-sheets",
      link: "/coding-sheets/striver-sde-sheet",
    },
    
    // {
    //   value: "Coding Competitions",
    //   showAt: "all-coding-competitions",
    //   link: "/coding-competitions",
    // },
    {
      value: "Contest Analysis",
      showAt: "contest-analysis",
      link: "/contest-analysis",
    },
    // {
    //   value: "Contest Archive",
    //   showAt: "contest-archive",
    //   link: "/contest-archive",
    // },
    // {
    //   value: "Selected Profiles",
    //   showAt: "selected-profiles",
    //   link: "/selected-profiles",
    // },
    // {
    //   value: "Online Assessment",
    //   showAt: "online-assessment",
    //   link: "/online-assessment",
    // },
    // {
    //   value: "Resume Shortlisting",
    //   showAt: "resume-shortlisting",
    //   link: "/resume-shortlisting",
    // },
    // {
    //   value: "Opportunities",
    //   showAt: "opportunities",
    //   link: "/opportunities",
    // },
    // {
    //   value: "Aptitude Round",
    //   showAt: "aptitude-round",
    //   link: "/aptitude-round",
    // },
  ]

  return (
    <Container onClick={() => showMoreInfo == true ? setShowMetmoreInfo(false) : showMoreInfo}>
      {/* <a href='/' className="logo">AlgoListed</a> */}
      
      <Tooltip title="Version - v2.10">
        <div className="logo">
          {/* Alpha Version */}
            Dev Mode
          {/* <div className="small-top">V2.17</div> */}
        </div>
      </Tooltip>
      <div className="mid-links">
        {
          menuItems.map((item, index) => {
            return <RouterLink key={index} to={`${item.link}`} className={item.showAt == marked ? "link current-link" : "link"}>{item.value}
              {/* <ChevronRightIcon/> */}
            </RouterLink>
          })
        }
        {/* <a href='https://jasonfenggit.github.io/Visualizer/' target={"_blank"} className="link">Algorithm Visualizers</a> */}

        <div className="flag">
          <div className="line"></div>
          <div className="text">algolisted.com</div>
          <div className="line"></div>
        </div>
        <a href='mailto:nayak.primary@gmail.com' target={"_blank"} className="link">Request API Access</a>
        <a href='https://github.com/Nayaker/Algorithmist/' target={"_blank"} className="link">Report an Issue</a>
      </div>

      {
        showMoreInfo ? (
          <div className="more-model">
            {/* <div><a className="more-link" href='/organisation-information/core-team'>Core Team</a></div> */}
            <div><RouterLink className="more-link" to='/organisation-information/all-contributors'>Contributors</RouterLink></div>
            <div><RouterLink className="more-link" to='/organisation-information/about-us'>About Us</RouterLink></div>
            <div><RouterLink className="more-link" to='/organisation-information/contributor-work'>Contributor Work</RouterLink></div>
            <div><RouterLink className="more-link" to='/organisation-information/privacy-policies'>Privacy Policies</RouterLink></div>
            <div><RouterLink className="more-link last-more-link" to='/organisation-information/disclaimer'>Disclaimer</RouterLink></div>
          </div>
        ) : (<></>)
      }

      <div className="bottom-btns" onClick={() => setShowMetmoreInfo(!showMoreInfo)}>
        <MenuIcon className='icon' />
        <div className="text">More</div>
      </div>
    </Container>
  )
}

export default LeftMenu

const Container = styled.div`
  width: 200px;
  /* border-right: 0.5px solid rgba(230, 230, 230, 1); */
  border-right: 0.5px solid var(--body_borderright);
  height: 100vh;
  min-height: 600px;
  /* background-color: white; */
  background-color: var(--body_menubgcolor);
  z-index: 2;
  position: fixed;
  /* overflow-y: scroll; */
  top: 0;
  left: 0;
  padding: 10px;

  display: flex;
  justify-content: space-between;
  flex-direction: column;
  user-select: none;

  .logo{
    user-select: none;
    width: 100%;
    font-size: 0.8rem;
    font-weight: 300;
    text-decoration: none;
    /* text-transform: uppercase; */
    letter-spacing: 0.15rem;
    height: 45px;
    /* background-color: #211f1f; */
    background-color: var(--body_logobg);
    /* color: white; */
    color: var(--body_logocolor);
    display: flex;
    align-items: center;
    justify-content: center;
    /* border: 1px solid #f7d59d; */
    border-radius: 100px;
    cursor: pointer;
    position: relative;;

    .small-top{
      position: absolute;
      font-size: 0.5rem;
      font-weight: 200; 
      top: 3.5px;
      right: 100px;
      color: white;
    }
  }

  .mid-links{
    margin-top: 15px;
    color: var(--body_menulinks);
   

    .flag{
      display: flex;
      justify-content: space-between;
      align-items: center;

      margin: 30px 0 10px 0;

      .line{
        width: 20%;
        height: 1px;
        /* background-color: black; */
        background-color: var(--body_color);
      }

      .text{
        font-size: 0.8rem;
        font-weight: 400;
        color: var(--body_color);
      }
    }

    .link{
      width: 100%;
      font-size: 0.75rem;
      font-weight: 300;
      height: 45px;
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 100px;
      cursor: pointer;
      text-align: center;
      margin-bottom: 7.5px;
      color: inherit;
      text-decoration: none;
      
      svg{
        display: none;
      }

      &:hover{
        /* background-color: #e5e5e5; */
        background-color: var(--body_menuhoverbg);
        color: var(--body_menuhovercolor);
        transition-duration: 250ms;
      }
    }
    
    .current-link{
      /* background-color: #e5e5e5; */
      background-color: var(--body_menuhoverbg);
      color: var(--body_menuhovercolor);

      svg{
        display: block;
        font-size: 1rem;
        position: absolute;
        right: -25px;
      }
    }
  }

  .more-model{
    width: 200px;
    position: absolute;
    left: 10px;
    bottom: 50px;
    border-radius: 15px;
    border: 1px solid #e5e5e5;
    box-shadow: rgb(28 28 28 / 26%) 0px 2px 20px;
    background-color: white;

    .more-link{
      display:block;
      width: 100%;
      font-size: 0.75rem;
      font-weight: 300;
      cursor: pointer;
      padding: 12.5px 20px;
      color: inherit;
      text-decoration: none;
      border-bottom: 1px solid #e5e5e5;

      &:hover{
        background-color: #eeeeee6c; 
        transition-duration: 250ms;
        color: black;
      }
    }

    .last-more-link{
      border-bottom-color: transparent;
    }
  }

  .bottom-btns{
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 45px;
    
    cursor: pointer;

    .icon{
      color: var(--body_menubtncolor);
    }

    .text{
      font-weight: 300;
      font-size: 0.85rem;
      margin-left: 5px;
      color: var(--body_menubtncolor);
    }
  }
`