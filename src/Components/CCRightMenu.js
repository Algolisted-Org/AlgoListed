import React, { useState } from 'react'
import styled from 'styled-components'
import image1 from '../Images/Global/three.png'
import AccountCircleIcon from '@material-ui/icons/AccountCircle';

const CCRightMenu = () => {
  return (
    <Container>
      <div className="login-btn">
        <AccountCircleIcon className='icon'/>
      </div>
      <div  className="share-img">
        <img src={image1} alt="" />
      </div>
      <div className="buy-me-a-coffee">
        <div className="text">
          <b>Message from the founder,</b> <br /> Data for this page is generally been updated from the information 
          given by the users. If you find anything wrong or want to update information on this page, you can click below.
        </div>
        <div className="btn-1">Feed Information</div>
      </div>
      <div className="subscribe-box">
        <div className="top-title">Subscribe to Algorithmist, Atanu Nayak Blogs</div>
        <div className="top-desc">Get the best, coolest, and latest in design and no-code delivered to your inbox each week.</div>
        <input type="text" className='input-email' placeholder='atanu.nayak03@gmail.com'/>
        <div className="submit-btn">Subscribe Blogs</div>
        <div className="bottom-desc">
          You can unsubscribe at any time, no hard feelings.
          <a href="/">Privacy policy</a>
        </div>
      </div>
    </Container>
  )
}

export default CCRightMenu

const Container = styled.div`
  width: calc(100vw - 1100px);
  border-left: 1px solid rgba(230, 230, 230, 1);
  height: 100vh;
  min-height: 630px;
  background-color: white;
  z-index: 3;
  position: fixed;
  top: 0;
  right: 0;
  padding: 10px 10px 60px 10px;
  overflow-y: scroll;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;

  .login-btn{
    position: absolute;
    top: 10px;
    right: 10px;

    .icon{
      font-size: 2.75rem;
      fill: #333f45;
    }
  
  }

  .buy-me-a-coffee{
    /* border: 1px solid #b7a7a7; */
    background-color: #ecf0f3;
    padding: 20px;

    .text{
      font-size: 0.9rem;
      font-weight: 200;
      line-height: 1.75rem;

      b{
        font-size: 1.05rem;
        font-weight: 500;
        margin-bottom: 3.5px;
      }

      a{
        color: inherit;
        text-decoration: underline;
      }
    }

    .btn-1{
      width: 100%;
      padding: 10px;
      font-size: 0.8rem;
      font-weight: 400;
      /* letter-spacing: 0.1rem; */
      text-align: center;
      cursor: pointer;
      border: 1px solid #b7a7a7;
      border-radius: 100px;
      margin-top: 20px;
    }
  }

  .share-img{
    margin: 10px 0 20px 0;

    img{
      height: 50px;
    }
  }

  .subscribe-box{
    display: none;
    width: 100%;
    background-color: #eef0f3;
    padding: 25px;

    .top-title{
      font-size: 1.05rem;
      font-weight: 500;
      margin-bottom: 3.5px;
    }

    .top-desc{
      font-size: 0.9rem;
      font-weight: 200;
      line-height: 1.75rem;
    }

    .input-email{
      width: 100%;
      padding: 10px;
      font-size: 0.8rem;
      font-weight: 400;
      letter-spacing: 0.08rem;
      margin: 20px 0 7.5px 0;
    }

    .submit-btn{
      width: 100%;
      padding: 10px;
      font-size: 0.8rem;
      font-weight: 400;
      letter-spacing: 0.1rem;
      background-color: black;
      color: white;
      text-align: center;
      cursor: pointer;
    }

    .bottom-desc{
      font-size: 0.7rem;
      margin-top: 10px;

      a{
        color: inherit;
        text-decoration: underline;
        margin-left: 5px;
      }
    }
  }
`