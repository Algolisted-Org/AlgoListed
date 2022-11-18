import React, { useState } from 'react'
import styled from 'styled-components'
import image1 from '../Images/Global/three.png'
import image2 from '../Images/Global/fake-ad1.png'
import AccountCircleIcon from '@material-ui/icons/AccountCircle';

const RightMenu = () => {
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
          <b>Message from the founder,</b> <br /> All the blogs are originally written by the founder and contributors. We also have few other sections like
          beginner level problems for topics, we have used websites like leetcode, interviewbit and other 
          third party websites to get the best resources and assemble them here. <br />
          You can help us by becoming a contributor, by sending a PDF of any of the required topic on <a href="/">new blog ideas</a> page
          and then if selected, you will be considered a <a href="/">technical content writter</a>.
        </div>
        <div className="btn-1">Become a content writter</div>
      </div>
      <div className="ad-img">
        <img src={image2} alt="" />
      </div>
      <div className="subscribe-box">
        <div className="top-title">Subscribe to Algorithmist,</div>
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

export default RightMenu

const Container = styled.div`
  width: calc(100vw - 1100px);
  max-width: 360px;
  /* height: calc(100vh - 55px); */
  /* min-height: 630px; */
  /* height: 1040px; */
  height: 100%;
  margin-top: 65px;
  position: relative;
  border-left: 1px solid rgba(230, 230, 230, 1);
  background-color: white;
  /* position: fixed; */
  /* top: 55px; */
  /* right: 0px; */
  padding: 10px 10px 60px 10px;
  /* overflow-y: scroll; */
  /* overflow: scroll; */
  display: flex;
  flex-direction: column;

  @media only screen and (max-width: 1380px){
    width: calc(100vw - 920px);
  }   

  @media only screen and (max-width: 1200px){
      display: none;
  }  

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
    margin-top: 100px;

    img{
      height: 50px;
    }
  }

  .ad-img{
    margin: 30px 0 30px 0;

    img{
      width: 100%;
      border-radius: 5px;
    }
  }

  .subscribe-box{
    /* display: none; */
    width: 100%;
    background-color: #eef0f3;
    padding: 25px;
    margin: 10px 0;
    position: sticky;
    top: 65px;

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