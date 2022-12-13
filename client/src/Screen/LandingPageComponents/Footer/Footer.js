import React from "react";
import styled from "styled-components";
import InstagramIcon from "@material-ui/icons/Instagram";
import GitHubIcon from "@material-ui/icons/GitHub";
import EmailIcon from "@material-ui/icons/Email";
import FacebookIcon from "@material-ui/icons/Facebook";

function Footer() {
  return (
    <Foot>
      <PageThreeFooter>
        <div className="top">
          <p>connect with us</p>
          <input type="email" placeholder="Email Address" />
          <div className="social-icons">
            <a className="social-icon">
              <GitHubIcon style={{ fill: "white", fontSize: "1.2rem" }} />
            </a>
            <a className="social-icon">
              <EmailIcon style={{ fill: "white", fontSize: "1.2rem" }} />
            </a>
            <a className="social-icon">
              <InstagramIcon style={{ fill: "white", fontSize: "1.2rem" }} />
            </a>
            <a className="social-icon">
              <FacebookIcon style={{ fill: "white", fontSize: "1.2rem" }} />
            </a>
          </div>
        </div>

        <div className="middle">
          <div className="left">
            <div className="left-content">
              <div className="title">Algorithmist</div>
              <div className="points">
                <a href="/" className="link">
                  About us
                </a>
                <a href="/" className="link">
                  Team
                </a>
                <a href="/" className="link">
                  Our Mission
                </a>
                <a href="/" className="link">
                  Contact
                </a>
                <a href="/" className="link">
                  Future Vision
                </a>
              </div>
            </div>

            <div className="left-content">
              <div className="title">General</div>
              <div className="points">
                <a href="/" className="link">
                  Terms and Conditions
                </a>
                <a href="/" className="link">
                  Data protection
                </a>
                <a href="/" className="link">
                  Trust and Security
                </a>
              </div>
            </div>

            <div className="left-content">
              <div className="title">Account</div>
              <div className="points">
                <a href="/" className="link">
                  Login
                </a>
                <a href="/" className="link">
                  Create account
                </a>
                <a href="/" className="link">
                  Request API access
                </a>
              </div>
            </div>
          </div>
          <div className="right">
            <h1>Algorithmist.</h1>
            <span>
              A smart open source resource website for coders, by coders.
            </span>
          </div>
        </div>
      </PageThreeFooter>
    </Foot>
  );
}

export default Footer;

const Foot = styled.div`
  background-color: #111;
`;

const PageThreeFooter = styled.div`
  height: auto;
  background-color: #111;
  padding-top: 36px;
  position: relative;
  transition: box-shadow 0.3s ease-in-out, transform 0.3s ease-in-out;
  margin-bottom: 60px;
  display: flex;
  flex-direction: column;

  .top {
    width: 100vw;
    height: 100px;
    margin: 0 auto;
    border-bottom: 1px solid #222;
    display: flex;
    align-items: center;
    justify-content: center;

    p {
      color: white;
      font-weight: 300;
      margin: 0 20px;
      font-size: 0.8rem;
    }

    input {
      padding: 15px;
      background-color: #1f1c1c;
      outline: none;
      width: 400px;
      color: white;
      border: none;
      border-radius: 5px;
      font-size: 0.8rem;
    }

    .social-icons {
      display: flex;
      justify-content: space-between;
      height: 50px;
      align-items: center;
      margin-left: 5%;
    }

    /* POSSIBLE BUG HERE!!!!!!!!!! */

    .social-icon {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 40px;
      height: 40px;
      border: solid 2px rgba(255, 255, 255, 0.3);
      border-radius: 50%;
      margin-left: 10px;
      cursor: pointer;
    }

    /* BUG HERE !!!!!!!!!!!!!!!!!! */

    .social-icon:hover {
      border: solid 2px white;
      transition-duration: 250ms;
    }
  }

  .middle {
    display: flex;
    justify-content: space-between;
    padding: 1rem 5rem;
    margin: 0 auto;
    margin-top: 50px;
    width: 100%;
    max-width: 1600px;
    @media only screen and (max-width: 600px) {
      display: grid;
      grid-template-columns: repeat(1, 1fr);
      place-items: center;
    }
    @media only screen and (max-width: 945px) {
      padding: 0px 20px;
    }

    .left {
      display: flex;
      justify-content: space-between;
      @media only screen and (max-width: 600px) {
        display: grid;
        grid-template-columns: repeat(1, 1fr);
        width: 100%;
      }

      .left-content {
        margin-right: 80px;
        @media only screen and (max-width: 600px) {
          margin: 0px;
          padding: 0px 50px;
        }
        @media only screen and (max-width: 950px) {
          margin-right: 30px;
        }

        .title {
          color: white;
          text-transform: uppercase;
          font-size: 1rem;
          font-weight: 600;
          letter-spacing: 0.1rem;
          @media only screen and (max-width: 600px) {
            text-align: start;
          }
        }

        .points {
          margin: 1rem 0;
          display: flex;
          flex-direction: column;
          @media only screen and (max-width: 600px) {
            display: grid;
            grid-column-gap: 20px;
            grid-template-columns: repeat(2, 1fr);
            text-align: start;
          }
        }

        .link {
          font-size: 13px;
          color: rgba(255, 255, 255, 0.3);
          text-decoration: none;
          font-weight: 500;
          margin-bottom: 1rem;
        }

        .link:hover {
          color: #ffffff99;
          transition-duration: 250ms;
        }
      }
    }

    .right {
      h1 {
        font-size: 3rem;
        font-weight: 600;
        color: white;
        text-align: right;
        background-color: #f3ec78;
        background-image: linear-gradient(215deg, #f3ec78, #803c3c);
        background-size: 100%;
        -webkit-background-clip: text;
        -moz-background-clip: text;
        -webkit-text-fill-color: transparent;
        -moz-text-fill-color: transparent;
      }

      span {
        color: #aa9696;
        font-weight: 200;
        font-size: 0.9rem;
        float: right;
        text-align: right;
      }

      @media only screen and (max-width: 600px) {
        h1 {
          font-size: 3rem;
          text-align: center;
        }

        span {
          width: 100%;
          text-align: center;
          padding: 0px 15px;
        }
      }
      @media only screen and (max-width: 945px) {
        h1 {
          font-size: 2.5rem;
          text-align: center;
        }
        span {
          font-size: 0.7rem;
          width: 100%;
          text-align: center;
          
        }
      }
    }
  }

  @media only screen and (max-width: 600px) {
    height: auto;
    padding-top: 10px;

    /* I DONT THINK THIS IS USEFUL  */
    /* padding-bottom: 120px;
    display: flex;
    flex-direction: column;
    justify-content: space-between; */

    .top {
      width: 100%;
      height: 150px;
      flex-direction: column;
      align-items: center;
      justify-content: space-between;

      p {
        font-weight: 200;
        margin-bottom: 5px;
        font-size: 0.7rem;
      }

      input {
        padding: 15px;
        width: 90%;
        color: white;
        border: none;
        border-radius: 5px;
        font-size: 0.8rem;
      }

      .social-icons {
        margin-left: 0%;
      }
    }

    .middle {
      padding: 0;
      margin-top: 30px;

      /* .left {
        display: none;
      } */

      .right {
        display: grid;
        place-items: center;
        width: 100%;
        margin: auto;
      }
    }

    .bottom {
      height: 60px;
      font-size: 0.6rem;
      font-weight: 100;
      background-color: #1f1c1c;
    }
  }
`;
