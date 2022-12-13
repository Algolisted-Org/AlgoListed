import React from "react";
import styled from "styled-components";

function HeroHeader({ gif }) {
  return (
    <Hero>
      <div className="top-page">
        <div className="responsive-1700">
          <div className="left">
            <div className="heading">
              <h1 className="gradient-text">Open Community.</h1>
              <h1>Better Information.</h1>
            </div>
            <div className="small-desc">
              Algorithmist is an open software for coders. We contain
              information about Data structures and Algorithms in the best way
              possible. Community can learn, comment, modify, and add
              information.
            </div>
            <div className="btn">Learn More</div>
          </div>
          <div className="right">
            <img src={gif} alt="" />
          </div>
        </div>
      </div>
    </Hero>
  );
}

/* background: linear-gradient( rgba(0, 0, 0, 0.4),  rgba(0, 0, 0, 0.4) ), url("https://i.gifer.com/OsLU.gif") center top / cover no-repeat fixed; */

export default HeroHeader;

const Hero = styled.div`
  .top-page {
    height: calc(100vh - 40px);
    min-height: 700px;
    display: inline-block;
    width: 100vw;
    background-color: #111;
    padding: 50px;
    @media only screen and (max-width: 600px) {
      display: flex;
      justify-content: center;
      padding: 20px;
      height: auto;
    }

    .responsive-1700 {
      width: 100%;
      max-width: 1600px;
      margin: auto;
      display: flex;
      justify-content: space-between;
      align-items: center;
      height: 100%;

      @media only screen and (max-width: 600px) {
        display: grid;
        justify-content: center;
        grid-template-columns: repeat(1, 1fr);
      }

      .left {
        width: 70vw;
        max-width: 800px;
        @media only screen and (max-width: 600px) {
          text-align: center;
          flex-wrap: wrap;
          align-content: flex-start;
          align-content: center;
          width: 100vw;
        }
      }

      .right {
        img {
          width: 100%;
          @media only screen and (max-width: 600px) {
            width: 70%;
          }
        }

        @media only screen and (max-width: 600px) {
          display: flex;
          justify-content: center;
          grid-row: 1;
        }
      }

      .heading {
        /* SIZE BUG HERE!!!!! */

        h1 {
          color: white;
          font-size: 65px;
          font-weight: 400;
          @media only screen and (max-width: 600px) {
            font-size: 35px;
          }
        }

        .gradient-text {
          background-color: #f3ec78;
          background-image: linear-gradient(185deg, #f3ec78, #803c3c);
          background-size: 100%;
          -webkit-background-clip: text;
          -moz-background-clip: text;
          -webkit-text-fill-color: transparent;
          -moz-text-fill-color: transparent;
        }
      }

      .small-desc {
        color: white;
        font-size: 1.15rem;
        font-weight: 200;
        margin: 30px 0;
        line-height: 2.25rem;
        letter-spacing: 0.1rem;
        @media only screen and (max-width: 600px) {
          display:flex;
          justify-content:center;
          padding:0px 50px;
          font-size: 1rem;
          line-height: 1.45rem;
          font-weight: 100;
          margin: 10px 0px;
        }
      }
    }
  }

  /* text-transform: uppercase;  */
  .btn {
    border: 1px solid #c2b1b1;
    color: white;
    padding: 12.5px 25px;
    display: inline-block;
    font-size: 0.85rem;
    font-weight: 400;
    text-decoration: none;
    letter-spacing: 0.15rem;
    border-radius: 100px;

    &:hover {
      background-color: whitesmoke;
      color: #333;
      cursor: pointer;
      transition-duration: 250ms;
    }
  }
`;
