import React, { useState } from 'react'
import styled from 'styled-components'
import MenuIcon from '@material-ui/icons/Menu';

const LeftMenu = ({marked}) => {
  const [showMoreInfo, setShowMetmoreInfo] = useState(false);

  return (
    <Container onClick={() => showMoreInfo == true ? setShowMetmoreInfo(false) : showMoreInfo}>
      {/* <div className="logo">Atanu Nayak</div> */}
      <a href='/' className="logo">Algorithmist</a>
      <div className="mid-links">
        {
          marked == "all-blogs" ? (
            <a href='/blogs/all' className="link current-link">Show All Blogs</a>
          ):(
            <a href='/blogs/all' className="link">Show All Blogs</a>
          )
        }
        {
          marked == "resources" ? (
            <a href='/resources' className="link current-link">Resources</a>
          ):(
            <a href='/resources' className="link">Resources</a>
          )
        }
        {
          marked == "aptitude-round" ? (
            <a href='/aptitude-round' className="link current-link">Aptitude Round</a>
          ):(
            <a href='/aptitude-round' className="link">Aptitude Round</a>
          )
        }
        {
          marked == "all-coding-competitions" ? (
            <a href='/coding-competitions' className="link current-link">Coding Competitions</a>
          ):(
            <a href='/coding-competitions' className="link">Coding Competitions</a>
          )
        }
        {
          marked == "opportunities" ? (
            <a href='/opportunities' className="link current-link">Opportunities</a>
          ):(
            <a href='/opportunities' className="link">Opportunities</a>
          )
        }
        {/* <a href='https://jasonfenggit.github.io/Visualizer/' target={"_blank"} className="link">Algorithm Visualizers</a> */}
        
        <div className="flag">
          <div className="line"></div>
          <div className="text">Algorithmist</div>
          <div className="line"></div>
        </div>
        <div className="link">Work with us</div>
        <a href='https://github.com/Nayaker/Algorithmist/' target={"_blank"} className="link">Report an Issue</a>
      </div>

      {
        showMoreInfo ? (
          <div className="more-model"> 
            <div><a  className="more-link" href='/organisation-information/core-team'>Core Team</a></div>
            <div><a  className="more-link" href='/organisation-information/all-contributors'>Contributors</a></div>
            <div><a  className="more-link" href='/organisation-information/about-us'>About Us</a></div>
            <div><a  className="more-link" href='/organisation-information/verify-contributor'>Verify Contributor</a></div>
            <div><a  className="more-link" href='/organisation-information/privacy-policies'>Privacy Policies</a></div>
            <div><a  className="more-link last-more-link" href='/organisation-information/disclaimer'>Disclaimer</a></div>
          </div>
        ) : (<></>)
      }

      <div className="bottom-btns" onClick={() => setShowMetmoreInfo(!showMoreInfo)}>
        <MenuIcon className='icon'/>
        <div className="text">More</div>
      </div>
    </Container>
  )
}

export default LeftMenu

const Container = styled.div`
  width: 200px;
  border-right: 1px solid rgba(230, 230, 230, 1);
  height: 100vh;
  min-height: 580px;
  background-color: white;
  z-index: 3;
  position: fixed;
  top: 0;
  left: 0;
  padding: 10px;

  display: flex;
  justify-content: space-between;
  flex-direction: column;

  .logo{
    width: 100%;
    font-size: 0.8rem;
    font-weight: 300;
    text-decoration: none;
    /* text-transform: uppercase; */
    letter-spacing: 0.15rem;
    height: 45px;
    background-color: #211f1f;
    display: flex;
    color: white;
    align-items: center;
    justify-content: center;
    /* border: 1px solid #f7d59d; */
    border-radius: 100px;
    cursor: pointer;

    &:hover{
      /* background-color: #e0f7e1; */
      transition-duration: 250ms;
    }
  }

  .mid-links{
    margin-top: 15px;
   

    .flag{
      display: flex;
      justify-content: space-between;
      align-items: center;

      margin: 30px 0 10px 0;

      .line{
        width: 20%;
        height: 1px;
        background-color: black;
      }

      .text{
        font-size: 0.8rem;
        font-weight: 400;
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
      
      &:hover{
        background-color: #e5e5e5;
        transition-duration: 250ms;
      }
    }
    
    .current-link{
      background-color: #e5e5e5;
    }
  }

  .more-model{
    width: 200px;
    position: absolute;
    left: 10px;
    bottom: 50px;
    border-radius: 5px;
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
        background-color: #eeeeee;
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

    }

    .text{
      font-weight: 300;
      font-size: 0.85rem;
      margin-left: 5px;
    }
  }
`