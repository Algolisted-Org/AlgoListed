import React from 'react'
import styled from 'styled-components'
import SearchIcon from '@material-ui/icons/Search';
import { Avatar } from '@material-ui/core';
import GitHubIcon from '@material-ui/icons/GitHub';
import NotificationsIcon from '@material-ui/icons/Notifications';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import PersonIcon from '@material-ui/icons/Person';
import WhatshotIcon from '@material-ui/icons/Whatshot';
import { useState } from 'react';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import Tooltip from '@material-ui/core/Tooltip';
import BuyMeACoffee from './BuyMeACoffee';
import Fade from 'react-reveal/Fade';
import FreeBreakfastIcon from '@material-ui/icons/FreeBreakfast';
import NetworkCheckIcon from '@material-ui/icons/NetworkCheck';
import Brightness4Icon from '@material-ui/icons/Brightness4';

const CCHeaderDark = () => {
  const [showAccountModel, setShowAccountModel] = useState(false);
  const [showWebUpdate, setShowWebUpdate] = useState(false);
  const [showNotificationModel, setShowNotificationModel] = useState(false);
  
  const handleNotification = () => {
    setShowNotificationModel(!showNotificationModel);
    setShowAccountModel(false);
    setShowWebUpdate(false);
  }
  
  const handleWebUpdate = () => {
    setShowWebUpdate(!showWebUpdate);
    setShowAccountModel(false);
    setShowNotificationModel(false);
  }

  const handleAccount = () => {
    setShowAccountModel(!showAccountModel);
    setShowNotificationModel(false);
    setShowWebUpdate(false);
  }
  
  const [showModelCoffee, setshowModelCoffee] = useState(false);
  
  return (
    <Container>
        {
          showModelCoffee ? <BuyMeACoffee showModelCoffee={showModelCoffee} setshowModelCoffee={setshowModelCoffee}/> : <></>
        }
        {/* <div className="search-box">
          <div className="icon"> 
            <SearchIcon/>
          </div>
          <input type="text" className="input" placeholder='Search for algorithm or datastructure'/>
        </div> */}

        <a className="nav-adv" href='https://bit.ly/3t1AktU' target={"_blank"} rel="noreferrer">
          <div className="text">Master complete DSA as a beginner <b>absolutely free</b> with <b>Love Babbar</b></div>
          <div className="promotion-tag linear-gradient">Promotion</div>
        </a>

      {/* <div className="top-header">
        <div className="semi-bold">Advertise with Us : </div>Promote your Linkedin profile, posts or Projects. 
      </div> */}

      <div className="right-icons">
        {/* <a href='https://www.buymeacoffee.com/nayak' target={"_blank"} className="icontext-btn">
          <div className="text">Buy me a coffee</div>
        </a> */}
        <div className="icontext-btn" onClick={() => {setshowModelCoffee(!showModelCoffee)}}>
          <div className="text">
            <FreeBreakfastIcon/>
            Buy me a coffee
          </div>
        </div>
        <div className={showWebUpdate ? "icon-box clicked" : "icon-box"} onClick={() => alert("Light mode not available for this page!")}>
            <Brightness4Icon />
        </div>
        <div className="icon-box">
          <a href='https://github.com/Nayaker/Algorithmist/' target={"_blank"} rel="noreferrer">
            <GitHubIcon/>
          </a>
        </div>
        
        {/* <div className="icon-box" >
            <Brightness4Icon/>
        </div> */}
        
        {/* <div className={showNotificationModel ? "icon-box clicked" : "icon-box"} onClick={handleNotification}>
            <NotificationsIcon/>
        </div>
        <div className={showAccountModel ? "icon-box clicked" : "icon-box"} onClick={handleAccount}>
            <PersonIcon/>
        </div> */}
      </div>

      {
        showNotificationModel ? (
          <div className="nav-model-box">
            <div className="text">Your <b>Notifications</b></div>
            <div className="line"></div>
            <div className="btn">
              <div className="btn-text">Your account has been successfully created, do check out the
              opportunites you have with Algorithmist.
              </div>
            </div>
            <div className="line"></div>
            <div className="btn">
              <div className="btn-text">Your account has been successfully created, Welcome to Algorithmist.
              </div>
            </div>
          </div>
        ) : (<></>)
      }

      {
        showWebUpdate ? (
          <div className="nav-model-box">
            <div className="text">Algolisted <b>Updates</b></div>
            <div className='update-container'>
              <div className="line"></div>
              <div className="btn">
                <div className="btn-text">
                The majority of bugs have been fixed, and version 1 of the beta release is now available as a production build. If you encounter any issues, please visit GitHub.
                </div>
              </div>
              <div className="small">Version - v0.12, 22 Jan 2023</div>
            </div>
            <div className='update-container'>
              <div className="line"></div>
              <div className="btn">
                <div className="btn-text">
                  Coding competitions page was automated for frequent API based competitions.
                </div>
              </div>
              <div className="small">Version - v0.11, 19 Jan 2023</div>
            </div>
            <div className='update-container'>
              <div className="line"></div>
              <div className="btn">
                <div className="btn-text">
                  The coding sheet page was populated using a Python-based web scraping technique, and visualization was added using Chart.js. Local storage is being used temporarily to store the solved problems.
                </div>
              </div>
              <div className="small">Version - v0.10, 12 Jan 2023</div>
            </div>
          </div>
        ) : (<></>)
      }

      {
        showAccountModel ? (
          <div className="nav-model-box">
            <div className="text">Login to <b>Algorithmist</b></div>
            <div className="line"></div>
            <div className="btn">
              <div className="icon"><img src="https://cdn4.iconfinder.com/data/icons/social-media-logos-6/512/112-gmail_email_mail-512.png" alt="" /></div>
              <div className="btn-text">Email and Password</div>
            </div>
            <div className="btn">
              <div className="icon"><img src="https://www.firstrust.com/getattachment/cf7dac57-a2ed-437b-8d50-9fac4634a8a2/google_logo.png?lang=en-US&width=300&height=300&ext=.png" alt="" /></div>
              <div className="btn-text">Google Account</div>
            </div>
            <div className="btn">
              <div className="icon"><img src="https://cdn-icons-png.flaticon.com/512/174/174857.png" alt="" /></div>
              <div className="btn-text">Linkedin</div>
            </div>
            <div className="btn">
              <div className="icon"><img src="https://cdn-icons-png.flaticon.com/512/25/25231.png" alt="" /></div>
              <div className="btn-text">Github</div>
            </div>
          </div>
        ) : (<></>)
      }
    </Container>
  )
}

export default CCHeaderDark

const Container = styled.div`
    z-index: 1000;
    display: flex;
    justify-content: center;
    height: 55px;
    /* width: calc(100vw - 200px); */
    width: 100vw;
    /* background-color: orange; */
    border-bottom: 1px solid #242526;
    box-shadow: rgb(0 0 0 / 5%) 1px 1px 10px 0px;
    position: fixed;
    top: 0;
    /* left: 200px; */
    left: 0;
    padding-left: 200px;
    z-index: 2;
    background-color: #5c5858;
    align-items: center;
    background-color: #2b2d31;
    box-shadow: 1px 1px 10px 0 rgb(0 0 0 / 5%);
    -webkit-backdrop-filter: blur(8px);
    backdrop-filter: blur(8px);
    
    .search-box{
      width: 50%;
      border-radius: 100px;
      border: 1px solid rgba(230, 230, 230, 1);
      height: 80%;
      background-color: #fff;

      display: flex;
      align-items: center;
      padding: 10px 15px;

      .icon{
        margin-top: 7.5px;
        margin-right: 10px;
      }

      input{
        border: none;
        background-color: transparent;
        flex: 1;
        font-weight: 400;
      }
    }

    .nav-adv{
      /* width: 50%; */
      border-radius: 10px;
      border: 1px solid #404249;
      height: 60%;
      background-color: #404249;
      position: relative;

      display: flex;
      align-items: center;
      justify-content: center;
      padding: 10px 50px;
      text-decoration: none;

      .text{
        font-size: 0.8rem;
        text-decoration: none;
        font-weight: 400;
        color: #9db2d9;
      

        b{
          font-weight: 600;
          margin: 0 3.5px;
          color: #9db2d9;
          /* background-color: #f3ec78; */
          /* background-image: linear-gradient(92deg,#6e93db,#819b81); */
            background-size: 100%;
            /* -webkit-background-clip: text; */
            /* -moz-background-clip: text; */
            /* -webkit-text-fill-color: transparent;  */
            /* -moz-text-fill-color: transparent; */
        }
      }

      .promotion-tag{
        position: absolute;
        top: -7.5px;
        left: -20px;
        padding: 3.5px 8.5px;
        background-color: #e89898;
        color: #e5e5e5;
        border-radius: 10px;
        font-weight: 400;
        font-size: 0.6rem;
      }


      &:hover{
        border: 1px solid #5c5858;
        transition-duration: 250ms;
      }
    }

    .linear-gradient{
      background: linear-gradient(316deg,#211f1f,#211f1f,#211f1f,#211f1f,#211f1f,#211f1f,#f2f2f2,#211f1f,#211f1f,#211f1f,#211f1f,#211f1f,#211f1f);
      background-size: 400% 400%;

      -webkit-animation: AnimationName 15s cubic-bezier(0.25, 0.1, 0, 1.47) infinite;
      -moz-animation: AnimationName 15s cubic-bezier(0.25, 0.1, 0, 1.47) infinite;
      animation: AnimationName 15s cubic-bezier(0.25, 0.1, 0, 1.47) infinite;
      &:hover{
      }
    }

    @-webkit-keyframes AnimationName {
        0%{background-position:0% 50%}
        50%{background-position:100% 50%}
        100%{background-position:0% 50%}
    }

    @-moz-keyframes AnimationName {
        0%{background-position:0% 50%}
        50%{background-position:100% 50%}
        100%{background-position:0% 50%}
    }

    @keyframes AnimationName {
        0%{background-position:0% 50%}
        50%{background-position:100% 50%}
        100%{background-position:0% 50%}
    }

    .top-header{
      font-size: 0.8rem;
      font-weight: 300;
      letter-spacing: 0.07rem;
      width: 50%;
      border-radius: 100px;
      height: 80%;
      display: flex;
      align-items: center;
      justify-content: center;
      background-color: #f7f5f5;
      border: 1px solid rgba(230, 230, 230, 1);

      .semi-bold{
        font-weight: 500;
        display: inline;
        margin-right: 7.5px;
      }
    }

    .right-icons{
      position: absolute;
      right: 25px;
      display: flex;
      align-items: center;

      a{
        margin-top: 4px;
        padding: 0;
      }
      
      .icon-box{
        height: 32.5px;
        width: 32.5px;
        display: grid;
        place-items: center;
        border-radius: 10px;
        border: 1px solid #211f1f;
        margin-left: 10px;
        cursor: pointer;
        background-color: #211f1f;

        svg{
          font-size: 20px;
          fill: #b7b8ba;
        }
        
        &:hover{
          /* background-color: #eaeaea; */
          border-color: #5c5858;
          transition-duration: 250ms;
          
        }
      }

      .icontext-btn{
        height: 32.5px;
        border-radius: 10px;
        border: 1px solid #211f1f;
        margin-left: 10px;
        cursor: pointer;
        display: flex;
        align-items: center;
        padding: 10px;
        user-select: none;
        background-color: #211f1f;
        text-decoration: none;

        svg{
          font-size: 20px;
          fill: #b7b8ba;
          margin-bottom: -6.5px;
          margin-right: 3.5px;
        }

        .text{
          font-size: 0.7rem;
          color: #b7b8ba;
        } 
        
        &:hover{
          border-color: #5c5858;
          /* background-color: #eaeaea; */
          transition-duration: 250ms;
        }         
      }

      .clicked{
        background-color: #f2ecf9;
      }
    }

    .nav-model-box{
      position: fixed;
      top: 60px;
      right: 10px;
      width: 320px;
      border-radius: 15px;
      background-color: #5c5858;
      border: 1px solid rgb(232, 232, 232);
      box-shadow: rgb(28 28 28 / 28%) 0px 11px 18px;
      padding: 10px;

      .text{
        font-size: 0.9rem;
        font-weight: 200;
        margin-bottom: 15px;

        b{
          font-weight: 500;
        }
      }

      .update-container{
        position: relative;

        .line{
          width: 100%;
          height: 1px;
          background-color: #e5e7ed;
          margin: 20px 0 10px 0;
        }
        
        .btn{
          display: flex;
          align-items: center;
          padding: 10px;
          
          &:hover{
            background-color: #e5e5e5;
            border-radius: 10px;
            transition-duration: 250ms;
            cursor: pointer;
          }
  
          .icon{
            height: 100%;
            display: grid;
            place-items: center;
            margin-right: 10px;
  
            img{
              height: 30px;
            }
          }
  
          .btn-text{
            font-size: 0.8rem;
            font-weight: 200;
  
            b{
              font-weight: 500;
            }
          }
        }
        
  
        .small{
          position: absolute;
          font-size: 0.65rem;
          background-color: #5c5858;
          /* width: 180px; */
          top: -0.5rem;
          right: 0;
        }

      }


    }

`