import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import MenuIcon from '@material-ui/icons/Menu';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import Tooltip from '@material-ui/core/Tooltip';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import { Link as RouterLink }from 'react-router-dom';

const LeftMenuCodeClub = ({marked}) => {
  console.log(marked);

  useEffect(() => {
    document.title = "Jadavpur University | Codeclub - powered by Algolisted";
  }, []);

  return (
    <Container>
      {/* <div className="logo">Atanu Nayak</div> */}
      <Tooltip title="Jadavpur University">
        <div className="logo">Codeclub</div>
      </Tooltip>
      <div className="mid-links">
        <a href='/blogs/all' className="link">
          <ArrowBackIosIcon/>
          Explore Algolisted
        </a>
        <div className="flag">
          <div className="line"></div>
          <div className="text">Codeclub JU</div>
          <div className="line"></div>
        </div>
        {/* {
          marked == "core-team" ? (<a href='/organisation-information/core-team' className="link current-link">Core Team</a>) : (<a href='/organisation-information/core-team' className="link">Core Team</a>)
        } */}
        {
          marked == "about-club" ? (<RouterLink to='/codeclub/jadavpur-university' className="link current-link">About the JUCC</RouterLink>) : (<RouterLink to='/codeclub/jadavpur-university' className="link">About the JUCC</RouterLink>)
        }
        {
          marked == "about-us" ? (<RouterLink to='/organisation-information/about-us' className="link current-link">About Us</RouterLink>) : (<RouterLink to='/organisation-information/about-us' className="link">Announcements</RouterLink>)
        }
        {
          marked == "resources" ? (<RouterLink to='/codeclub/jadavpur-university' className="link current-link">Resources</RouterLink>) : (<RouterLink to='/codeclub/jadavpur-university' className="link">Resources</RouterLink>)
        }
        {
          marked == "potd" ? (<RouterLink to='/codeclub/jadavpur-university' className="link current-link">Problem of the Day</RouterLink>) : (<RouterLink to='/codeclub/jadavpur-university' className="link">Problem of the Day</RouterLink>)
        }
        {
          marked == "privacy-policies" ? (<RouterLink to='/organisation-information/privacy-policies' className="link current-link">Privacy Policies</RouterLink>) : (<RouterLink to='/organisation-information/privacy-policies' className="link">All Session Recordings</RouterLink>)
        }
        {
          marked == "disclaimer" ? (<RouterLink to='/organisation-information/disclaimer' className="link current-link">Disclaimer</RouterLink>) : (<RouterLink to='/organisation-information/disclaimer' className="link">List of all Contests</RouterLink>)
        }
        {
          marked == "disclaimer" ? (<RouterLink to='/organisation-information/disclaimer' className="link current-link">Disclaimer</RouterLink>) : (<RouterLink to='/organisation-information/disclaimer' className="link">Social Links</RouterLink>)
        }
      </div>
      <div className="bottom-btns">
        Open Source Project <br />
        Version - v0.12 <br />
        {/* <MenuIcon className='icon'/> */}
        {/* <div className="text">More</div> */}
      </div>
    </Container>
  )
}

export default LeftMenuCodeClub

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
  overflow: hidden;
  padding: 10px;

  display: flex;
  justify-content: space-between;
  flex-direction: column;

  a{
    text-decoration: none;
  }

  .logo{
    width: 100%;
    font-size: 0.8rem;
    font-weight: 300;
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
    .flag{
      display: flex;
      justify-content: space-between;
      align-items: center;

      margin: 20px 0 10px 0;

      .line{
        width: 12.5%;
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
      text-decoration: none;
      color: inherit;

      svg{
        font-size: 0.8rem;
        margin-right: 10px;
      }
      
      &:hover{
        background-color: #e5e5e5;
        transition-duration: 250ms;
      }
    }
    
    .current-link{
      background-color: #e5e5e5;
    }
  }

  .bottom-btns{
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 45px;
    text-align: center;
    font-weight: 400;
    color: #494545;
    /* cursor: pointer; */

    font-size: 0.6rem;

    .icon{

    }

    .text{
      font-weight: 300;
      font-size: 0.85rem;
      margin-left: 5px;
    }
  }
`