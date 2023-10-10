import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import ArrowRightAltIcon from '@material-ui/icons/ArrowRightAlt';
import TranslateIcon from '@material-ui/icons/Translate';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import InstagramIcon from '@material-ui/icons/Instagram';
import GitHubIcon from '@material-ui/icons/GitHub';
import EmailIcon from '@material-ui/icons/Email';
import FacebookIcon from '@material-ui/icons/Facebook';
import axios from "axios";
import logo from "../Images/logo.png";
import MobileNavbar from '../Components/MobileNavbar'
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import Fade from 'react-reveal/Fade';
import {Link} from 'react-scroll';
import { Link as RouterLink }from 'react-router-dom';
import StarBorderIcon from '@material-ui/icons/StarBorder';
// import featureAnalysis1 from "../Images/fe";

const LandingPage3 = () => {
  const [contributorsList, setContributorsList] = useState(null);

  useEffect(() => {
    axios.get("https://api.github.com/repos/Nayaker/Algorithmist/contributors")
      .then((res) => {
        setContributorsList(res.data);
        // console.log(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  const modules = [
    {
        "name" : "All Upcoming Coding Competitions",
        "desc" : "There are several websites, such as CLIST and Unstop, that provide information about upcoming contests. However, our list is specifically geared towards Indians and is curated by an Indian who understands the types of competitions that are most relevant to this audience.",
        "link" : "/coding-competitions"
    },
    {
        "name" : "Coding Sheets",
        "desc" : "Coding Sheets is a website that offers a range of software engineering practice sheets to select from in a single location. The discussion section, which will be available soon, will provide support and guidance while working on a specific sheet.",
        "link" : "/coding-sheets/striver-sde-sheet"
    },
    {
        "name" : "Coding Resources",
        "desc" : "There is a wealth of disorganized notes and other resources available on websites like LinkedIn and Leetcode, but they can be difficult to find because they are not listed in a organized manner. To make your life easier, we have compiled all of these resources by topic in a single location.",
        "link" : "/resources"
    },
    // {
    //     "name" : "Selected Profiles",
    //     "desc" : "This can be helpful for those who want to know what kind of resumes or skills they need to build in order to be selected for a particular company. This will also be machine learning model based that would enable you to get the hiring infographics for a perticular company.",
    //     "link" : "/selected-profiles"
    // },
    {
      "name" : "All Internship & Job Opportunities",
      "desc" : "This page is very similar to the coding competitions list page, here in this page we will provide information about all available hiring and internship opportunities, including the timing of these opportunities. We are currently in the planning stages and will be launching this page soon.",
      "link" : "/opportunities"
    },
    {
        "name" : "Beginner Friendly Blogs",
        "desc" : "We have beginner friendly website contents, no fancy texts and informations. We just give as much information required by the first time reading users, because we firmly believe that when you want to learn a language you don't study it from a dictionary.",
        "link" : "/blogs/all"
    },
  ]

  return (
    <GrandContainer>
      <MobContainer>
      </MobContainer>
      <Container>
        <Navbar>
            <div className='left-links'>
              <div className="logo">
                  {/* <img src={logo} alt="" /> */}
                  <div className="text">
                      <div className="up-text">algolisted</div>
                      {/* <div className="down-text">version v2.10</div> */}
                  </div>
              </div>
              <div className="menu">
                <a href="/" className='link'>Docs</a>
                <a href="/" className='link'>Features</a>
                <a href="/" className='link'>Contributors</a>
                <a href="/" className='link'>Updates</a>
                <a href="/" className='link'>Business</a>
              </div>
            </div>
            <div className="right-links">
              <a href="/" className='github-star-link'>
                <StarBorderIcon/>
                <div className="text">Star us on Github</div>
              </a>
              <div className="version">
                <div className="text">v2.10</div>
              </div>
            </div>
        </Navbar>
        <div className="hero-page">
          <div className="left">
            <Fade>
              <div className="heading">
                <h1>Elevate Your Coding Skills with</h1>
                <h1 className='gradient-text'>Infographic Brilliance.</h1>
              </div>
            </Fade>
            <Fade>
              <div className="small-desc">
                Discover a coding website that combines elegant design with powerful features. Track your progress, access contest insights, and challenge friends in coding competitions.
              </div>
            </Fade>
            <Fade left>
              <div className="learn">
                <div className="btn">Learn More</div>
              </div>
            </Fade>
          </div>
          <div className="right">
            <Fade>
              <div className="img-container">
                {/* <img src="https://25.media.tumblr.com/3121f994e1e28da404a1c953bad557e8/tumblr_mfzyw50YKd1rq9asdo1_500.gif" alt="" draggable="false"/> */}
                <img src="https://static.vecteezy.com/system/resources/previews/009/343/580/original/3d-business-analysis-chart-illustration-png.png" alt="" draggable="false"/>
              </div>
            </Fade>
          </div>
          <DancerDownIcon>
            <ExpandMoreIcon style={{ fontSize: '2rem', fill: '#fff' }} />
          </DancerDownIcon>
        </div>
        <div className="page-2">
          <div className="feature-header">
            <div className="line"></div>
            <h1 className='gradient-text'>Features</h1>
            <div className="line"></div>
          </div>
          <div className="feature-show">
            {/* <img src={featureAnalysis1} alt="" /> */}
            <div className="message">
              <div className="feature-name">Leetcode Contest Analysis</div>
              <div className="feature-desc">
                Unlock a world of coding insights with post-contest analyses from platforms like LeetCode and Codeforces. Predict rating changes, view country rankings, and delve into problem statistics. Explore contest performance showcases and problem archives with visualized topics and difficulty levels – all in one place!
              </div>
            </div>
          </div>
        </div>

        

        <div className="open-source-page">
            <div className="content">
                <Fade bottom>
                  <h1>Open Source Contribution</h1>
                </Fade>
                <Fade bottom>
                  <div className="desc">
                      Our website is a testament to the dedication and contributions of our amazing open source community. Every member has put in their best efforts to create and improve the site. If you want to resolve an issue or suggest a new feature, we encourage you to participate in the open source process by creating an issue.
                  </div>
                </Fade>
            </div>
          <a href='https://github.com/Nayaker/Algorithmist/' target={"_blank"} className="btn">Start Contributing</a>
          <div className="sub-page-head">Our Contributors</div>
          <div className="hold-contributors">
            {
              contributorsList != null && contributorsList.map((item, index) => {
                return (
                  <Fade up>
                    <a className="contributor" href={item.html_url} target={"_blank"} key={index}>
                      <img src={item.avatar_url} alt="" />
                    </a>
                  </Fade>
                )
              })
            }
          </div>
        </div>

        <PageThreeFooter>
          <div className="top">
            <p>
              connect with us
            </p>
            <input type="email" placeholder="Email Address" />
            <div className="social-icons">
              <a className="social-icon">
                <GitHubIcon style={{ fill: "white", fontSize: '1.2rem' }} />
              </a>
              <a className="social-icon">
                <EmailIcon style={{ fill: "white", fontSize: '1.2rem' }} />
              </a>
              <a className="social-icon">
                <InstagramIcon style={{ fill: "white", fontSize: '1.2rem' }} />
              </a>
              <a className="social-icon">
                <FacebookIcon style={{ fill: "white", fontSize: '1.2rem' }} />
              </a>

            </div>
          </div>

          <div className="middle">
            <div className="left">
              <div className="left-content">
                <div className="title">
                  Algolisted
                </div>
                <div className="points">
                  <RouterLink to="organisation-information/about-us" className="link">About us</RouterLink>                  
                  <RouterLink to="organisation-information/core-team" className="link">Team</RouterLink>            
                  <RouterLink to="organisation-information/mission" className="link">Our Mission</RouterLink>  
                  <RouterLink to="organisation-information/contact" className="link">Contact</RouterLink>  
                  <RouterLink to="organisation-information/future-vision" className="link">Future Vision</RouterLink>                  
                </div>
              </div>

              <div className="left-content">
                <div className="title">
                  General
                </div>
                <div className="points">
                  <a href="/" className="link">Terms and Conditions</a>
                  <a href="/" className="link">Data protection</a>
                  <a href="/" className="link">Trust and Security</a>
                </div>
              </div>

              <div className="left-content">
                <div className="title">
                  Account
                </div>
                <div className="points">
                  <RouterLink to="sign-in" className="link">Login</RouterLink>                  
                  <RouterLink to="create-account"  className="link">Create account</RouterLink>      
                  <RouterLink to="request-api"  className="link">Request API access</RouterLink>
                </div>
              </div>

            </div>
            <div className="right">
              <h1>Algolisted.</h1>
              <span>
                Get organized listed information. Get productive.
              </span>
            </div>
          </div>

          <div className="bottom">
            {/* Open Source Project, by <a href="https://www.linkedin.com/in/atanu-nayak-profile/" target="_blank">Atanu Nayak</a> and Community */}
            Open Source Project, all commercial rights reserved.
          </div>
        </PageThreeFooter>
      </Container>
    </GrandContainer>
  )
}

export default LandingPage3

const GrandContainer = styled.div`
  width: 100vw;
  overflow: hidden;

  body{
    background-color: #000;
  }

  .btn{
    border: 1px solid #c2b1b1;
    color: white;
    padding: 12.5px 25px;
    display: inline-block;
    font-size: 0.85rem;
    font-weight: 400;
    text-decoration: none;
    /* text-transform: uppercase; */
    letter-spacing: 0.15rem;
    border-radius: 100px;

    &:hover{
      background-color: whitesmoke;
      color: #333;
      cursor: pointer;
      transition-duration: 250ms;
    }
  }
`

const MobContainer = styled.div`
  @media only screen and (min-width: 1100px){
    display: none;
  }
`

const Container = styled.div`
  width: 100vw;
  height: auto;
  display: flex;
  flex-direction: column;
  
  /* background-color: pink; */
  margin: 0;

  .hero-page{
    height: 100vh;
    min-height: 500px;
    width: 100vw;
    background-color: #1a191d;

    display: flex;
    align-items: center;
    justify-content: space-between;

    padding: 0 70px;

    .left{
      display: flex;
      flex-direction: column;
      width: 65%;
      
      .heading{
        h1{
            color: #29a4b3;
            font-size: 35px;
            font-weight: 400;
        }

        .gradient-text {
            font-size: 65px;
            background-color: #f3ec78;
            background-image: linear-gradient(92deg,#0066ff,#5dff00);
            background-size: 100%;
            -webkit-background-clip: text;
            -moz-background-clip: text;
            -webkit-text-fill-color: transparent; 
            -moz-text-fill-color: transparent;
        }
      }

      .small-desc{
          color: white;
          font-size: 0.95rem;
          font-weight: 200;
          margin: 30px 0;
          line-height: 2.25rem;
          letter-spacing: 0.1rem;
      }
      
    }

    .right{
      width: 35%;
      .img-container{
        width: 100%;
        aspect-ratio: 1/1;
        overflow: hidden;
        display: flex;
        justify-content: center;
        margin-left: 30px;
        user-select: none;
        
        img{
          height: 100%;
          width: auto;
          user-select: none;
        }
      }
    }

    .btn{
      background: linear-gradient(135deg, #036af9,#31afa5,#4add65);
      background-size: 400% 400%;

      -webkit-animation: AnimationName 10s ease infinite;
      -moz-animation: AnimationName 10s ease infinite;
      animation: AnimationName 10s ease infinite;
      border-color: transparent;
      color: #333;  
      cursor: pointer;
      font-size: 0.8rem;
      padding: 10px 15px;
      margin: auto;

      /* border: 1px solid #bfa6a6; */
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

  }

  .page-2{
    min-height: 100vh;
    width: 100vw;
    background-color: #1a191d;

    display: flex;
    flex-direction: column;
    align-items: center;

    padding: 70px;

    .feature-header{
      display: flex;
      align-items: center;

      .line{
        height: 1px;
        width: 150px;
        background-color: #3a3737;
      }
      
      h1{
          color: #29a4b3;
          font-size: 35px;
          font-weight: 400;
          margin: 0 20px;
      }
  
      .gradient-text {
          font-size: 45px;
          background-color: #f3ec78;
          background-image: linear-gradient(92deg,#0066ff,#5dff00);
          background-size: 100%;
          -webkit-background-clip: text;
          -moz-background-clip: text;
          -webkit-text-fill-color: transparent; 
          -moz-text-fill-color: transparent;
      }
    }

    .feature-show{
      position: relative;
      margin-top: 50px;
      width: 50vw;
      border-radius: 20px;
      background-color: #c2c3d2;
      padding: 10px;
      
      img{
        width: 100%;
        border-radius: 20px;
        margin-bottom: -5px;
      }
      
      background: linear-gradient(135deg, #036af9, #31afa5, #4add65);
      background-size: 200% 200%;
      animation: AnimationName 10s linear infinite; /* Added animation property */
    }

    @keyframes AnimationName {
      0% {
        background-position: 0% 50%;
      }
      50% {
        background-position: 100% 50%;
      }
      100% {
        background-position: 0% 50%;
      }
    }

    .message{
      position: absolute;
      width: 400px;
      height: 160px;
      right: -80px;
      bottom: -80px;
      border-radius: 10px;
      background-color: #000000e6;
      box-shadow: 1px 1px 10px 0 rgb(0 0 0 / 5%);
      -webkit-backdrop-filter: blur(8px);
      backdrop-filter: blur(8px);
      padding: 10px 20px;

      .feature-name{
        color: white;
        margin-bottom: 5px;
      }

      .feature-desc{
        color: white;
        font-size: 0.7rem;
        font-weight: 200;
      }

    }

  }

  .open-source-page{
    width: 100vw;
    min-height: 240px;
    padding: 100px 50px;
    background-color: #f3f1f166;
    /* #e2e8f0 */
    display: flex;
    flex-direction: column;
    align-items: center;

    .content{
        height: 100%;
        width: 800px;
        margin: 0 auto;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;

        h1{
            font-size: 2.25rem;
            font-weight: 500;
            text-align: center;
            background-color: #f3ec78;
            background-image: linear-gradient(92deg,#0066ff,#5dff00);
            background-size: 100%;
            -webkit-background-clip: text;
            -moz-background-clip: text;
            -webkit-text-fill-color: transparent; 
            -moz-text-fill-color: transparent;
        }

        .desc{
            text-align: center;
            font-size: 0.9rem;
            font-weight: 200;
            margin: 30px 0;
            line-height: 2.25rem;
            letter-spacing: 0.1rem;
        }
    }


    .page-head{
      font-size: 2.5rem;
      font-weight: 500;
    }

    .page-sub-head{
      max-width: 780px;
      margin: 15px 0 10px 0;
      font-size: 1.15rem;
      font-weight: 200;
    }

    .sub-page-head{
      font-size: 1.75rem;
      font-weight: 500;
    }

    .hold-contributors{
      display: flex;
      flex-wrap: wrap;
      width: 700px;
      justify-content: center;
      margin-top: 30px;

      .contributor{
        background-color: pink;
        overflow: hidden;
        height: 48px;
        width: 48px;
        margin: 0 7.5px 7.5px 0;  
        border-radius: 100px;
        border: 1px solid #b7a6a6;

        img{
          height: 100%;
        }
      }
    }


    // btn is continued from top
    .btn{
      background: linear-gradient(316deg,#84e472,#84e472,#ffffff,#84e472,#84e472);
      background-size: 400% 400%;

      -webkit-animation: AnimationName 10s cubic-bezier(0.25, 0.1, 0, 1.47) infinite;
      -moz-animation: AnimationName 10s cubic-bezier(0.25, 0.1, 0, 1.47) infinite;
      animation: AnimationName 10s cubic-bezier(0.25, 0.1, 0, 1.47) infinite;
      border-color: transparent;
      color: #333;  
      cursor: pointer;
      margin: 10px auto;
      font-size: 0.85rem;
      padding: 10px 20px;
      letter-spacing: 0.07rem;
      margin-bottom: 50px;

      border: 1px solid #bfa6a6;
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
  }  


  @media only screen and (max-width: 1100px){
    display: none;
  }
`

const Navbar = styled.div`
    height: 70px;
    width: 100%;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 100;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
    padding: 0 35px;
    /* background-color: rgb(255, 255, 255); */
    background-color: transparent;
    box-shadow: 1px 1px 10px 0 rgb(0 0 0 / 5%);
    -webkit-backdrop-filter: blur(8px);
    backdrop-filter: blur(8px);

    .left-links{
      display: flex;
      align-items: center;

      .logo{
        display: flex;
        align-items: center;
        /* border: 1px solid black; */
        height: 100%;
        padding: 5px 0;
  
        img{
          height: 40px;
          border-radius: 4px;
          margin-right: 10px;
        }
  
        .text{
          .up-text{
            font-size: 1.25rem;
            font-weight: 500;
            color: #ededf0;
          }
          .down-text{
            font-size: 0.7rem;
            font-weight: 200;
            color: #ededf0;
          }
        }
      }
  
      .menu{
        margin-left: 50px;

        .link{
          font-size: 0.85rem;
          font-weight: 100;
          color: #ededf0;
          margin: 0 15px;
          text-decoration: none;
          letter-spacing: 0.05rem;
        }
      }
    }
    
    .right-links{
      display: flex;
      align-items: center;

      .github-star-link{
        display: flex;
        align-items: center;
        text-decoration: none;
        background-color: #fd366e;
        padding: 5px 10px;
        border-radius: 2px;

        .text{
          font-size: 0.85rem;
          font-weight: 200;
          color: #ededf0;
          margin: 0 0 0 10px;
          padding-left: 10px;
          border-left: 1px solid #ededf0;
        }

        svg{
          fill: #ededf0;
          font-size: 1.05rem;
        }
      }
      .version{
        display: flex;
        align-items: center;
        text-decoration: none;
        background-color: #fd366e;
        padding: 5px 10px;
        border-radius: 2px;
        margin-left: 15px;

        .text{
          font-size: 0.85rem;
          font-weight: 200;
          color: #ededf0;
          font-weight: 500;
        }
      }
    }

`

const PageThreeFooter = styled.div`
    height: 560px;
    background-color: #052744;
    padding-top: 36px;
    position: relative;
    transition: box-shadow 0.3s ease-in-out, transform 0.3s ease-in-out;
    /* margin-bottom: 60px; */
    display: flex;
    flex-direction: column;


    .top{
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

        input{
            padding: 15px;
            background-color: #031b2f;
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

        .social-icon{
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

        .social-icon:hover{
            border: solid 2px white;
            transition-duration: 250ms;
        }
    }

    .middle{
        display: flex;
        justify-content: space-between;
        padding: 1rem 5rem; 
        margin: 0 auto;
        margin-top: 50px;
        width: 100%;
        max-width: 1600px;

        .left{
            display: flex;
            justify-content: space-between;

            .left-content{
                margin-right: 80px;

                .title{
                    color: white;
                    text-transform: uppercase;
                    font-size: 1rem;
                    font-weight: 600;
                    letter-spacing: 0.1rem;
                }

                .points{
                    margin: 1rem 0;
                    display: flex;
                    flex-direction: column;
                }

                .link{
                    font-size: 13px;
                    color: rgba(255, 255, 255, 0.3);
                    text-decoration: none;
                    font-weight: 500;
                    margin-bottom: 1rem;
                }

                .link:hover{
                    color: #ffffff99;
                    transition-duration: 250ms;
                }
            }
        }

        .right{
            h1{
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

            span{
                color: #aa9696;
                font-weight: 200;
                font-size: 0.9rem;
                min-width: 420px;
                float: right;
                text-align: right;
            }
        }
    }

    .bottom{
        height: 60px;
        font-size: 0.75rem;
        display: flex;
        align-items: center;
        justify-content: center;
        color: white;
        font-weight: 200;
        background-color: #031b2f;
        position: absolute;
        bottom: 0;
        width: 100vw;
        letter-spacing: 0.06rem;
        
        a{
          color: inherit;
          padding: 0 5px;
          font-weight: 400;
          text-decoration: none;
        }
        
    }


    @media only screen and (max-width: 1100px){
        height: auto;
        padding-top: 36px;
        display: flex;
        flex-direction: column;
        padding-bottom: 80px;
        justify-content: space-between;


        .top{
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

            input{
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

        .middle{
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          padding: 30px; 
          margin: 0 auto;
          margin-top: 50px;
          width: 100%;

          .left{
              display: flex;
              flex-direction: column;
              align-items: center;
              justify-content: space-between;

              .left-content{
                  margin-right: 0;

                  .title{
                      text-align: center;
                  }

                  .points{
                      margin: 10px auto 50px auto;
                      display: flex;
                      flex-wrap: wrap;
                      flex-direction: row;
                      justify-content: center;
                      max-width: 90%;
                  }

                  .link{
                      font-size: 0.7rem;
                      color: rgba(255, 255, 255, 0.3);
                      text-decoration: none;
                      text-align: center;
                      font-weight: 500;
                      margin: 10px;
                  }

                  .link:hover{
                      color: #ffffff99;
                      transition-duration: 250ms;
                  }
              }
          }

          .right{
              h1{
                  font-size: 2rem;
                  font-weight: 600;
                  color: white;
                  text-align: center;
                  background-color: #f3ec78;
                  background-image: linear-gradient(215deg, #f3ec78, #803c3c);
                  background-size: 100%;
                  -webkit-background-clip: text;
                  -moz-background-clip: text;
                  -webkit-text-fill-color: transparent; 
                  -moz-text-fill-color: transparent;
              }

              span{
                  display: none;
              }
          }
      }


        .bottom{
            font-size: 0.6rem;
            font-weight: 100;
            background-color: #1f1c1c;
            padding: 20px 50px;
            text-align: center;
            
        }


    }

`

const DancerDownIcon = styled.div`
    position: absolute;
    bottom: 30px;

    left: calc(50vw - 15px);
    
    animation: animateDown infinite 1.5s;

    @keyframes animateDown{
        0%, 20%, 50%, 80%, 100%{
            transform: translateY(0);
        }
        40%{
            transform: translateY(5px);
        }
        60%{
            transform: translateY(3p);
        }
    }
    /* @media only screen and (max-width: 1000px){
        bottom: 60px;
        left: calc(50vw - 30px);
    } */
`