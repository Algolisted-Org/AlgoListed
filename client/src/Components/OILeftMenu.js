import React, { useState } from 'react'
import styled from 'styled-components'
import MenuIcon from '@material-ui/icons/Menu';

const OILeftMenu = ({marked}) => {
  console.log(marked);

  return (
    <Container>
      {/* <div className="logo">Atanu Nayak</div> */}
      <div className="logo">Algorithmist</div>
      <div className="mid-links">
        <a href='/blogs/all' className="link">Home Page</a>
        <div className="flag">
          <div className="line"></div>
          <div className="text">Organisation Info</div>
          <div className="line"></div>
        </div>
        {
          marked == "core-team" ? (<a href='/organisation-information/core-team' className="link current-link">Core Team</a>) : (<a href='/organisation-information/core-team' className="link">Core Team</a>)
        }
        {
          marked == "all-contributors" ? (<a href='/organisation-information/all-contributors' className="link current-link">Contributors</a>) : (<a href='/organisation-information/all-contributors' className="link">Contributors</a>)
        }
        {
          marked == "about-us" ? (<a href='/organisation-information/about-us' className="link current-link">About Us</a>) : (<a href='/organisation-information/about-us' className="link">About Us</a>)
        }
        {
          marked == "verify-contributor" ? (<a href='/organisation-information/verify-contributor' className="link current-link">Verify Contributor</a>) : (<a href='/organisation-information/verify-contributor' className="link">Verify Contributor</a>)
        }
        {
          marked == "privacy-policies" ? (<a href='/organisation-information/privacy-policies' className="link current-link">Privacy Policies</a>) : (<a href='/organisation-information/privacy-policies' className="link">Privacy Policies</a>)
        }
        {
          marked == "disclaimer" ? (<a href='/organisation-information/disclaimer' className="link current-link">Disclaimer</a>) : (<a href='/organisation-information/disclaimer' className="link">Disclaimer</a>)
        }
      </div>
      <div className="bottom-btns">
        <MenuIcon className='icon'/>
        <div className="text">More</div>
      </div>
    </Container>
  )
}

export default OILeftMenu

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