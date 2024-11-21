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
import { Link } from 'react-scroll';
import { Link as RouterLink } from 'react-router-dom';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import featureAnalysis1 from "../Images/feature-analysis1.png";
import CallMadeIcon from '@material-ui/icons/CallMade';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';

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

  const featuresDisplayData = [
    {
      // "img-url": featureAnalysis1, // create GIFs here
      "img-url": "dummy-link1", 
      "feature-title": "About this Feature",
      "feature-desc": "This feature will be completed after we are done with all the main-site-features are completed. We will bring out some gifs and attach above - try to do it in dark mode :) ",
      "id": "1",
    },
    {
      "img-url": "dummy-link2", // create GIFs here
      "feature-title": "dummy-title2",
      "feature-desc": "dummy-desc2",
      "id": "2",
    },
    {
      "img-url": "dummy-link2", // create GIFs here
      "feature-title": "dummy-title2",
      "feature-desc": "dummy-desc2",
      "id": "2",
    },
    {
      "img-url": "dummy-link2", // create GIFs here
      "feature-title": "dummy-title2",
      "feature-desc": "dummy-desc2",
      "id": "2",
    },
    {
      "img-url": "dummy-link2", // create GIFs here
      "feature-title": "dummy-title2",
      "feature-desc": "dummy-desc2",
      "id": "2",
    },
    {
      "img-url": "dummy-link2", // create GIFs here
      "feature-title": "dummy-title2",
      "feature-desc": "dummy-desc2",
      "id": "2",
    },
    {
      "img-url": "dummy-link2", // create GIFs here
      "feature-title": "dummy-title2",
      "feature-desc": "dummy-desc2",
      "id": "2",
    },
    {
      "img-url": "dummy-link2", // create GIFs here
      "feature-title": "dummy-title2",
      "feature-desc": "dummy-desc2",
      "id": "2",
    },

  ]

  const [featureIdx, setFeatureIdx] = useState(0);

  const incrementFeatureIdx = () => {
    setFeatureIdx((prevIdx) => (prevIdx + 1) % featuresDisplayData.length);
  };

  const decrementFeatureIdx = () => {
    setFeatureIdx((prevIdx) =>
      prevIdx === 0 ? featuresDisplayData.length - 1 : prevIdx - 1
    );
  };

  const currentFeature = featuresDisplayData[featureIdx];

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
              <a href="/" className='link'>Open Source</a>
              <a href="/" className='link'>Business</a>
            </div>
          </div>
          <div className="right-links">
            <a href="/" className='github-star-link'>
              <StarBorderIcon />
              <div className="text">Star us on Github</div>
            </a>
            {/* <div className="version">
              <div className="text">12.8 K | Visits</div>
            </div> */}
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
                Discover an AI-powered coding website that combines elegant design with powerful features. Track your progress, access contest insights, and challenge friends in coding competitions.
              </div>
            </Fade>
            <Fade left>
              <div className="learn">
                <div className="btn">Get Started</div>
              </div>
            </Fade>
          </div>
          <div className="right">
            <Fade>
              <div className="img-container">
                {/* <img src="https://25.media.tumblr.com/3121f994e1e28da404a1c953bad557e8/tumblr_mfzyw50YKd1rq9asdo1_500.gif" alt="" draggable="false"/> */}
                {/* <img src="https://static.vecteezy.com/system/resources/previews/009/343/580/original/3d-business-analysis-chart-illustration-png.png" alt="" draggable="false"/> */}
                <img src="https://media.giphy.com/media/Qw4X3FM5UtA1OKdOn4I/giphy.gif" alt="" draggable="false" />
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
            <div className="vertical-line-menu">
              {featuresDisplayData.map((_, index) => (
                <div
                  key={index}
                  className={`menu-item ${index === featureIdx ? 'dark-item' : ''}`}
                ></div>
              ))}
            </div>
            <img src={currentFeature["img-url"]} alt="" />
            <ArrowBackIosIcon className='left-btn icon-btn' onClick={decrementFeatureIdx} />
            <ArrowForwardIosIcon className='right-btn icon-btn' onClick={incrementFeatureIdx} />
            <div className="message">
              <div className="feature-name">{currentFeature["feature-title"]} </div>
              <div className="feature-desc">
                {currentFeature["feature-desc"]}
              </div>
            </div>
          </div>

          <div className="feature-table">
            <div className="one-row">
              <div className="box down-border right-border">
                <img src='https://leetcode.com/static/images/LeetCode_logo_rvs.png' className="feature-logo"></img>
                <a href='/contest-analysis' className="feature-name">Leetcode Contest Analysis <CallMadeIcon/> </a> 
                <div className="feature-desc">Unlock a world of coding insights with post-contest analyses from platforms like LeetCode and Codeforces. Predict rating changes, view country rankings, and delve into problem statistics. </div>
              </div>
              <div className="box down-border right-border">
                <img src='https://play-lh.googleusercontent.com/WsR_f03nbqW3qZjCZeXUYmnmhSWXo3hQhLX9hgl9QHydCgbXQi_VJeAwnmtuIgTHKdQ' className="feature-logo"></img>
                <a href='/contests-archive' className="feature-name">Contest Problems Collection <CallMadeIcon/> </a> 
                <div className="feature-desc">Explore an organized collection of all past contest problems across various platforms, empowering you to get better efficiency with interactive visuals.</div>
              </div>
              <div className="box down-border right-border">
                <img src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQJwFbP8A6iFB7mX56y_hTVlTpssz3RpAvSgQ&usqp=CAU' className="feature-logo"></img>
                <a href='/coding-sheets/striver-sde-sheet' className="feature-name">Coding Sheets with Visualisation <CallMadeIcon/> </a> 
                <div className="feature-desc">Get a wide range of sheets all in one place with the included analysis graphs which make solving them even more enjoyable by allowing you to track your progress.</div>
              </div>
              <div className="box down-border">
                <img src='https://res.cloudinary.com/practicaldev/image/fetch/s--CsuD8TQh--/c_imagga_scale,f_auto,fl_progressive,h_420,q_auto,w_1000/https://dev-to-uploads.s3.amazonaws.com/uploads/articles/yy6g8h2z1y7req5ibczx.jpg' className="feature-logo"></img>
                <a href='/interview-summaries' className="feature-name">Coding Interview Summarization <CallMadeIcon/> </a> 
                <div className="feature-desc">Get ready for big tech company interviews with a comprehensive collection of resources covering Data Structures and Algorithms (DSA) and core subjects with frequently asked questions.</div>
              </div>
            </div>
            <div className="one-row">
              <div className="box right-border">
                <img src='https://play-lh.googleusercontent.com/8ddL1kuoNUB5vUvgDVjYY3_6HwQcrg1K2fd_R8soD-e2QYj8fT9cfhfh3G0hnSruLKec' className="feature-logo"></img>
                <a href='/showdown-server' className="feature-name">Host Friendly Coding Competitions <CallMadeIcon/> </a> 
                <div className="feature-desc">Host coding competitions with your friends and select questions randomly from variety of topics from platforms like Codeforces or LeetCode. </div>
              </div>
              <div className="box right-border">
                <img src='https://www.grackledocs.com/wp-content/uploads/2023/09/pdf.png' className="feature-logo"></img>
                <a href='/resources' className="feature-name">Collection of Coding Learning Resources <CallMadeIcon/> </a> 
                <div className="feature-desc">Dive into gems of resources available on different websites like LinkedIn and Leetcode compiled together and organised effectively at a single place.</div>
              </div>
              <div className="box right-border">
                <img src='https://static.vecteezy.com/system/resources/previews/005/086/755/original/apply-now-banner-label-free-vector.jpg' className="feature-logo"></img>
                <a href='/opportunities' className="feature-name">Job & Internship Openings <CallMadeIcon/> </a> 
                <div className="feature-desc">Apply and find details about various job openings and internship opportunities, along with the corresponding schedules and other necessary details.</div>
              </div>
              <div className="last-box">
                <div className="circle">
                  <img src="https://img1.picmix.com/output/stamp/normal/1/3/1/0/1370131_e7a69.gif" alt="" />
                  <div className="text">
                    EXPLORE
                    <CallMadeIcon />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="page-3">
          <div className="feature-header">
            <div className="line"></div>
            <h1 className='gradient-text'>Open Source</h1>
            <div className="line"></div>
          </div>
          <div className="desc">
            Our website is a testament to the dedication and contributions of our amazing open source community. Every member has put in their best efforts to create and improve the site. If you want to resolve an issue or suggest a new feature, we encourage you to participate in the open source process by creating an issue.
          </div>
          <a href='https://github.com/Nayaker/Algorithmist/' target={"_blank"} className="btn" rel="noreferrer">Start Contributing</a>
          <h1 className="sub-page-head">Technologies Used</h1>
          <div className="hold-collection">
            <div className="contributor"><img src="https://icons-for-free.com/iconfiles/png/512/logo+react+react+js+icon-1320184811840217251.png" alt="" /></div>
            <div className="contributor"><img src="https://vistaran-tech.s3.ap-south-1.amazonaws.com/wp-content/uploads/2022/05/13104926/nodejs-logo.png" alt="" /></div>
            <div className="contributor"><img src="https://ajeetchaulagain.com/static/7cb4af597964b0911fe71cb2f8148d64/87351/express-js.png" alt="" /></div>
            <div className="contributor"><img src="https://images.crunchbase.com/image/upload/c_lpad,f_auto,q_auto:eco,dpr_1/erkxwhl1gd48xfhe2yld" alt="" /></div>
            <div className="contributor"><img src="https://mui.com/static/logo.png" alt="" /></div>
            <div className="contributor"><img src="https://www.styled-components.com/atom.png" alt="" /></div>
            <div className="contributor"><img src="https://openastronomy.org/pyastro/images/pyastro_logo.svg" alt="" /></div>
            <div className="contributor"><img src="https://static.javatpoint.com/tutorial/flask/images/flask-tutorial.png" alt="" /></div>
            <div className="contributor"><img src="https://play-lh.googleusercontent.com/yMjUC6LBh7uOCK6wUcIEf5MHZQmSqDPXoInOQLZzw0DWQsPJuvkwSymX2zI4Ok7i_BY" alt="" /></div>
            <div className="contributor"><img src="https://firebase.google.com/static/images/brand-guidelines/logo-logomark.png" alt="" /></div>
            <div className="contributor"><img src="https://media.licdn.com/dms/image/C4D0BAQFBESIaXqZ9sg/company-logo_200_200/0/1631285887620?e=2147483647&v=beta&t=7U1O5C3TnMlpihufNmmRMaiMawMAwt0ZXE_87JRFFJ4" alt="" /></div>
            <div className="contributor"><img src="https://egw2023.eurac.edu/favicon.ico" alt="" /></div>
            <div className="contributor"><img src="https://microstream.one/blog/wp-content/uploads/2023/06/redis_logo-1.png" alt="" /></div>
            <div className="contributor"><img src="https://cdn.iconscout.com/icon/free/png-256/free-aws-3215369-2673787.png" alt="" /></div>
            <div className="contributor"><img src="https://cdn.icon-icons.com/icons2/2699/PNG/512/docker_tile_logo_icon_168248.png" alt="" /></div>
          </div>

          <h1 className="sub-page-head">Our Contributors</h1>
          <div className="hold-collection">
            {
              contributorsList != null && contributorsList.map((item, index) => {
                return <a className="contributor" href={item.html_url} target={"_blank"} key={index} rel="noreferrer">
                  <img src={item.avatar_url} alt="" />
                </a>
              })
            }
          </div>
        </div>
        <div className="page-4">
          {/* <img className='background' src="https://cutewallpaper.org/24/water-transparent-gif/source-files-gifs-get-the-best-gif-on-giphy.gif" draggable="false" alt="" /> */}
          {/* <img className='background' src="https://cutewallpaper.org/24/3d-gif-transparent/top-gif-xxx-3-d-stickers-for-android-amp-ios-gfycat.gif" draggable="false" alt="" /> */}

          <div className="feature-header">
            <div className="line"></div>
            <h1 className='gradient-text'>Algolisted Business</h1>
            <div className="line"></div>
          </div>
          <div className="desc-2">
            Elevate your digital presence with Algolisted's expertise in scalable web and ML solutions, next-gen applications, UI excellence, SEO prowess, and AI-driven feature enhancements.
          </div>
          <a href='https://github.com/Nayaker/Algorithmist/' target={"_blank"} className="btn" rel="noreferrer">Get Started</a>
          <h1 className="sub-page-head">You are in Good Company</h1>
          <div className="hold-collection">
            <div className="contributor">
              <img src="https://substackcdn.com/image/fetch/f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fbbef9f38-7759-4cb9-9acb-3d7b419516ed_128x128.png" alt="" />
            </div>
            <div className="contributor">
              <img src="https://media.licdn.com/dms/image/D560BAQHGytSdEBVC4g/company-logo_200_200/0/1680891170164?e=2147483647&v=beta&t=dNArWJh7CmlsEZIkepijH1ognMf9xKp6JI15rCMfMek" alt="" />
            </div>
            <div className="contributor">
              <img src="https://avatars.githubusercontent.com/u/91122910?s=200&v=4" alt="" />
            </div>
            <div className="contributor">
              <img src="data:image/png;base64,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" alt="" />
            </div>
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
                  <RouterLink to="create-account" className="link">Create account</RouterLink>
                  <RouterLink to="request-api" className="link">Request API access</RouterLink>
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
    width: 100vw;
    background-color: #1a191d;

    display: flex;
    flex-direction: column;
    align-items: center;

    padding: 120px 70px;

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
      margin-top: 100px;
      width: 50vw;
      border-radius: 20px;
      background-color: #c2c3d2;
      padding: 10px;
      min-height: 401.81px;
      
      img{
        width: 100%;
        border-radius: 20px;
        margin-bottom: -5px;
      }
      
      background: linear-gradient(135deg, #036af9, #31afa5, #4add65);
      background-size: 200% 200%;
      animation: AnimationName 10s linear infinite; /* Added animation property */
    }

    .feature-table{
      margin-top: 200px;
      width: 980px;
      height: 490px;
      
      .one-row{
        display: flex;
      }

      .box{
        width: 245px;
        height: 245px;
        padding: 10px 35px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: flex-start;
        
        .feature-logo{
          height: 40px;
          background-color: #3c3131;
          border-radius: 1000px;
        }

        .feature-name{
          font-weight: 500;
          color: white;
          margin: 5px 0 5px 0;
          font-size: 0.9rem;
          text-decoration: none;
          
          svg{
            fill: white;
            font-size: 0.8rem;
          }

          &:hover{
            color: cornflowerblue;
            transition-duration: 250ms;
          }
        }

        .feature-desc{
          font-size: 0.75rem;
          font-weight: 200;
          color: white;
        }
      }

      .last-box{
        width: 245px;
        height: 245px;
        padding: 10px 35px;
        display: grid;
        place-items: center;

        .circle{
          width: 100px;
          height: 100px;
          border-radius: 1000px;
          background-color: #232323;
          position: relative;
          display: grid;
          place-items: center;

          img{
            height: 90px;
          }

          .text{
            font-size: 2.5rem;
            font-weight: 500;
            color: white;
            position: absolute;
            left: -35px;
            top: 20px;
            display: flex;
            color: #29a4b3;
            background-color: #f3ec78;
            background-image: linear-gradient(92deg,#0066ff,#5dff00);
            background-size: 100%;
            -webkit-background-clip: text;
            -moz-background-clip: text;
            -webkit-text-fill-color: transparent; 
            -moz-text-fill-color: transparent;

            svg{
              fill: #5dff00;
            }
          }

        }
      }

      .down-border{
        border-bottom: 1px solid #313034;
      }

      .right-border{
        border-right: 1px solid #313034;
      }
    }
    
    .vertical-line-menu{
      position: absolute;
      width: 1px;
      height: 100%;
      left: -50px;
      background-color: #282828;
      display: flex;
      flex-direction: column;
      justify-content: space-around;

      .menu-item{
        color: white;
        width: 15px;
        height: 15px;
        border-radius: 50%;
        background-color: #282828;
        margin-left: -7.5px;
      }

      .dark-item{
        background: linear-gradient(281deg,rgb(41 202 52) 7%,rgb(255 255 255) 76%);
        /* border: 2.5px solid white; */
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
      background: rgb(148,79,224);
      background: linear-gradient(309deg, rgba(148,79,224,0.5) 7%, rgba(0,0,0,0.7) 76%);

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

    .icon-btn{
      position: absolute;
      top: calc(50% - 0.75rem);
      font-size: 1.5rem;
      fill: white;
      cursor: pointer;
    }

    .left-btn{
      left: -120px;
    }

    .right-btn{
      right: -120px;
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


  }

  .page-3{
    width: 100vw;
    background-color: #1a191d;

    display: flex;
    flex-direction: column;
    align-items: center;

    padding: 120px 70px;

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

    .desc{
        text-align: center;
        font-size: 0.9rem;
        font-weight: 200;
        margin: 30px 0;
        line-height: 2.25rem;
        letter-spacing: 0.1rem;
        color: white;
        max-width: 1000px;
    }

    .hold-collection{
          display: flex;
          flex-wrap: wrap;
          width: 350px;
          justify-content: center;
          margin-top: 30px;

          .contributor{
            background-color: white;
            overflow: hidden;
            height: 48px;
            width: 48px;
            margin: 0 7.5px 7.5px 0;  
            border-radius: 100px;
            border: 3.5px solid #ffffff;

            img{
              height: 100%;
            }
          }
        }
        
        .page-head{
          font-size: 2.5rem;
          font-weight: 500;
          color: white;
        }

        .page-sub-head{
          max-width: 780px;
          margin: 15px 0 10px 0;
          font-size: 1.15rem;
          font-weight: 200;
          color: white;
        }

        .sub-page-head{
          font-size: 1.75rem;
          font-weight: 500;
          color: white;
          margin-top: 40px;
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

  .page-4{
    width: 100vw;
    background-color: #1a191d;
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    z-index: 2;

    padding: 120px 70px;

    .background{
      position: absolute;
      height: 815px;
      opacity: 0.4; 
      z-index: 1;
      top: 0;
    }

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

    .desc-2{
        text-align: center;
        font-size: 1.35rem;
        font-weight: 100;
        margin: 30px 0;
        line-height: 2.25rem;
        letter-spacing: 0.1rem;
        color: white;
        max-width: 1000px;
    }

    .hold-collection{
          display: flex;
          flex-wrap: wrap;
          width: 80%;
          justify-content: center;
          margin-top: 30px;

          .contributor{
            z-index: 2;
            background-color: white;
            overflow: hidden;
            height: 48px;
            width: 48px;
            margin: 0 7.5px 7.5px 0;  
            border-radius: 100px;
            border: 3.5px solid #ffffff;

            img{
              height: 100%;
            }
          }
        }
        
        .page-head{
          font-size: 2.5rem;
          font-weight: 500;
          color: white;
          z-index: 2;
        }

        .page-sub-head{
          max-width: 780px;
          margin: 15px 0 10px 0;
          font-size: 1.15rem;
          font-weight: 200;
          color: white;
          z-index: 2;
        }

        .sub-page-head{
          font-size: 1.75rem;
          font-weight: 500;
          color: white;
          margin-top: 40px;
          z-index: 2;
        }

        // btn is continued from top
        .btn{
          z-index: 2;
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
        background: linear-gradient(150deg, #016df8,#2ba4b4,#d6cd16);
        background-size: 200% 200%;
        animation: AnimationName 10s linear infinite;
        padding: 5px 10px;
        border-radius: 5px;

        .text{
          font-size: 0.75rem;
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
        background: linear-gradient(150deg,#d6cd16,#2ba4b4,#016df8,#016df8,#016df8);
        background-size: 200% 200%;
        /* animation: AnimationName 10s linear infinite; */
        padding: 5px 10px;
        border-radius: 5px;
        margin-left: 15px;

        .text{
          font-size: 0.85rem;
          color: #ededf0;
          /* font-weight: 700; */
        }
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
    z-index: 0;


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