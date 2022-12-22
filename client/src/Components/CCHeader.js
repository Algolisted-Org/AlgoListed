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

const CCHeader = () => {
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

  return (
    <Container>
      <div className="search-box">
        <div className="icon">
          <SearchIcon/>
        </div>
        <input type="text" className="input" placeholder='Search for algorithm or datastructure'/>
      </div>

      <div className="right-icons">
        <div className="icon-box">
          <a href='https://github.com/Nayaker/Algorithmist/' target={"_blank"}>
            <GitHubIcon/>
          </a>
        </div>
        <div className={showWebUpdate ? "icon-box clicked" : "icon-box"} onClick={handleWebUpdate}>
            <WhatshotIcon/>
        </div>
        <div className={showNotificationModel ? "icon-box clicked" : "icon-box"} onClick={handleNotification}>
            <NotificationsIcon/>
        </div>
        <div className={showAccountModel ? "icon-box clicked" : "icon-box"} onClick={handleAccount}>
            <PersonIcon/>
        </div>
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
            <div className="text">Algorithmist <b>Updates</b></div>
            <div className="line"></div>
            <div className="btn">
              <div className="btn-text">By the end of 2022, we will complete the most features of the website. And in January 2023, we are going to fill real data on the website.</div>
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
            <div className="line"></div>
            <div className="text small">Don't have an account ? <a>sign up</a></div>
          </div>
        ) : (<></>)
      }
      

    </Container>
  )
}

export default CCHeader

const Container = styled.div`
    display: flex;
    justify-content: center;
    height: 55px;
    width: calc(100vw - 200px);
    /* background-color: orange; */
    border-bottom: 1px solid rgba(230, 230, 230, 1);
    position: fixed;
    top: 0;
    left: 200px;
    z-index: 2;
    background-color: white;
    align-items: center;
    
    .search-box{
      width: 50%;
      border-radius: 100px;
      border: 1px solid rgba(230, 230, 230, 1);
      height: 80%;

      display: flex;
      align-items: center;
      padding: 10px 15px;

      .icon{
        margin-top: 7.5px;
        margin-right: 10px;
      }

      input{
        border: none;
        flex: 1;
        font-weight: 400;
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
        border: 1px solid #dfe3e7;
        margin-left: 10px;
        cursor: pointer;

        svg{
          font-size: 20px;
          fill: #514d4d;
        }

        &:hover{
          background-color: #f2ecf9;
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
      background-color: white;
      border: 1px solid rgb(232, 232, 232);
      box-shadow: rgb(28 28 28 / 28%) 0px 11px 18px;
      padding: 10px;

      .line{
        width: 100%;
        height: 1px;
        background-color: #e5e7ed;
        margin: 10px 0;
      }

      .text{
        font-size: 0.9rem;
        font-weight: 200;

        b{
          font-weight: 500;
        }
      }

      .small{
        font-size: 0.75rem;

        a{
          text-decoration: none;
        }
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
          font-size: 0.85rem;
          font-weight: 200;

          b{
            font-weight: 500;
          }
        }
      }

    }

`