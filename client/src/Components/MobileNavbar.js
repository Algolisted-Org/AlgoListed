import React, { useState, useEffect, CSSProperties } from "react";
import styled from "styled-components";
import MenuIcon from '@material-ui/icons/Menu';
import CloseIcon from '@material-ui/icons/Close';
import logo from "../Images/logo.png";
import Fade from 'react-reveal/Fade';
import Zoom from 'react-reveal/Zoom';
const MobileDownMenu = () => {
  const [showMenu, setshowMenu] = useState(false);

  return (
    <Container>
      <a href="/" className="logo">
        <img src={logo} alt="" />
        <div className="text">
          <div className="up-text gradient-text">Algolisted</div>
          <div className="down-text">Get organised listed information.</div>
        </div>
      </a>
      <div className="menu" onClick={() => setshowMenu(true)}>
        <MenuIcon />
      </div>


      {
        showMenu ? (
            <MenuDropDownList>
                <div className="top-menu-closed">
                  <a href="/" className="logo">
                    <img src={logo} alt="" />
                    <div className="text">
                      <div className="up-text">Navigation Menu</div>
                      {/* <div className="down-text">Get organised listed information.</div> */}
                    </div>
                  </a>
                  <div className="menu" onClick={() => setshowMenu(false)}>
                    <CloseIcon />
                  </div>
                </div>
                <div className="links">
                  <a href="/blogs/all" className="link">Simplified Coding Blogs</a>
                  <a href="/resources" className="link">Coding Resources</a>
                  <a href="/coding-competitions" className="link">All Upcoming Coding Competitions</a>
                  <a href="/coding-sheets/striver-sde-sheet" className="link">SDE Coding Sheets</a>
                  {/* <a href="/selected-profiles" className="link">Selected Profiles</a> */}
                  <a href="/opportunities" className="link">All Internship & Job Opportunities</a>
                  <a href="https://github.com/Nayaker/AlgoListed" target={"_blank"} className="link" rel="noreferrer">Visit Github for Algolisted</a>
                </div>
              </MenuDropDownList>
        ) : (<></>)
      }
    </Container>
  )
}

export default MobileDownMenu

const Container = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    height: 60px;
    width: 100vw;
    background-color: rgb(255, 255, 255);
    border-bottom: 1px solid rgb(233, 229, 229);
    display: flex;
    justify-content: space-between;
    align-items: center;
    z-index: 100;
    border-bottom: 1px solid rgb(233, 229, 229);
    box-shadow: rgb(0 0 0 / 5%) 1px 1px 10px 0px;

    .logo{
      display: flex;
      align-items: center;
      text-decoration: none;
      /* border: 1px solid black; */
      height: 100%;
      padding: 5px 10px;

      img{
        height: 40px;
        border-radius: 4px;
        margin-right: 10px;
      }

      .text{
        .up-text{
          font-size: 1rem;
          font-weight: 500;
        }
        .down-text{
          font-size: 0.6rem;
          font-weight: 300;
        }
      }

      .gradient-text {
          background-color: #f3ec78;
          background-image: linear-gradient(92deg,#0066ff,#5dff00);
          background-size: 100%;
          -webkit-background-clip: text;
          -moz-background-clip: text;
          -webkit-text-fill-color: transparent; 
          -moz-text-fill-color: transparent;
      }
    }

    .menu{
      padding: 0 10px;
      display: grid;
      place-items: center;
      
      svg{
        font-size : 2rem;
      }
    }
`

const MenuDropDownList = styled.div`
  position: fixed;
  width: 96vw;
  top: 2vw;
  background-color: rgb(255, 255, 255);
  border: 1px solid rgb(233, 229, 229);
  box-shadow: rgb(28 28 28 / 8%) 0px 2px 8px;
  left: 2vw;
  border-radius: 5px;
  
  .top-menu-closed{
    width: 100%;
    height: 60px;
    display: flex;
    justify-content: space-between;
    border-bottom: 1px solid rgb(233, 229, 229);

    .logo{
      display: flex;
      align-items: center;
      /* border: 1px solid black; */
      padding: 5px 10px;

      img{
        height: 40px;
        border-radius: 4px;
        margin-right: 10px;
      }

      .text{
        .up-text{
          font-size: 1rem;
          font-weight: 500;
        }
        .down-text{
          font-size: 0.6rem;
          font-weight: 200;
        }
      }
    }

    .menu{
      padding: 0 10px;
      display: grid;
      place-items: center;
      
      svg{
        font-size : 2rem;
      }
    }
  }


  .links{
    margin: 10px 0;
    display: flex;
    flex-direction: column;
    justify-content: center;
    

    .link{
      padding: 10px;
      font-size: 0.75rem;
      margin: 5px;
      color: inherit;
      text-decoration: none;
    }
  }
`