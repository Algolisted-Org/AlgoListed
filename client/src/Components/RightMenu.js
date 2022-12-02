import React, { useState } from 'react'
import styled from 'styled-components'
import image1 from '../Images/Global/three.png'
import image2 from '../Images/Global/fake-ad1.png'
import AccountCircleIcon from '@material-ui/icons/AccountCircle';

const RightMenu = () => {
  return (
    <Container>
      <div className="similar-questions">
        <div className="top-title">Similar Questions</div>
        <div className="top-desc">
          Blog contains similar questions to be solved at bottom of the page. The questions are generally taken from
          highly rated leetcode blogs, linkedin or contributed by our contributors.
        </div>
        <div className="question">
          <div className="text">
            Solve : <a href="/">Number of Islands</a>
          </div>
        </div>
        <div className="show-all-problems">Show All Problems</div>
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
  height: 100%;
  margin-top: 55px;
  position: relative;
  border-left: 1px solid rgba(230, 230, 230, 1);
  background-color: white;
  padding: 10px 18px 60px 10px;
  display: flex;
  flex-direction: column;

  @media only screen and (max-width: 1380px){
    width: calc(100vw - 920px);
  }   

  @media only screen and (max-width: 1200px){
      display: none;
  }  


  .similar-questions{
    margin-bottom: 20px;
    padding-bottom: 20px;
    border-bottom: 1px solid #d6d9de;

    .top-title{
        font-size: 1.05rem;
        font-weight: 500;
    }

    .top-desc{
      font-size: 0.9rem;
      font-weight: 200;
    }

    .question{
      background-color: #eef0f3;
      padding: 10px;
      border-radius: 5px;
      margin: 10px 0;

      .text{
        font-size: 0.9rem;

        a{
          font-weight: 500;
          color: #6c6bb3;
          text-decoration: none;
        }
      }

    }

    .show-all-problems{
      font-size: 0.8rem;
      color: purple;
      text-decoration: underline;
      cursor: pointer;
    }
  }

  .subscribe-box{
    /* display: none; */
    width: 100%;
    background-color: #eef0f3;
    padding: 25px;
    /* margin: 10px 0; */
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