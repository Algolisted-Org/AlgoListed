import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import ArrowRightAltIcon from '@material-ui/icons/ArrowRightAlt';
import TranslateIcon from '@material-ui/icons/Translate';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import LinkedInIcon from '@material-ui/icons/LinkedIn';
import GitHubIcon from '@material-ui/icons/GitHub';
import EmailIcon from '@material-ui/icons/Email';
import TwitterIcon from '@material-ui/icons/Twitter';
import axios from "axios";
import logo from "../Images/logo-temp10.png";
import sideImage from "../Images/side-image-hero-page.png";
import MobileNavbar from '../Components/MobileNavbar'
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import Fade from 'react-reveal/Fade';
import { Link } from 'react-scroll';
import { Link as RouterLink } from 'react-router-dom';

const LandingPage2 = () => {
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
      "name": "Contest Archive",
      "desc": "Explore a well-structured and seamless collection of all contest problems, empowering you to tackle challenges with maximum efficiency. Moreover, we enhance your contest experience with interactive visualizations and compelling infographics that bring the game alive and aid your understanding effectively."
      ,
      "link": "/contests-archive/leetcode"
    },
    {
      "name": "Contest Analysis",
      "desc": "Dive into a realm of coding insights with post-contest analyses from platforms like LeetCode and Codeforces. Forecast rating changes, examine country rankings, and explore problem statistics. Discover contest performance showcases and problem archives with visualized topics and difficulty levels – all in one place!",
      "link": "/contest-analysis"
    },
    {
      "name": "Coding Sheets",
      "desc": "Searching for an easy way to access diverse coding practice sheets from multiple sources? Look no further than Coding Sheets, a dedicated feature on the Algolisted website. You can find a comprehensive collection of sheets all in one place, and the integrated analysis graphs enhance your solving experience!",
      "link": "/coding-sheets/striver-sde-sheet"
    },
    {
      "name": "Core Subjects Tracker",
      "desc": "We have gathered a wide array of interview questions from respected sources like GeeksforGeeks and InterviewBit. Furthermore, we've integrated core subject insights provided by popular YouTubers such as Striver and Fraz. Our AI meticulously parses these questions to highlight the most relevant ones, ensuring you receive optimal candidate answers.",
      "link": "/core-subjects-tracker/operating-systems"
    },
    {
      "name": "Resume Based Questions",
      "desc": "With this feature, after uploading your resume, our advanced AI analyzes the specific traits and skills your target company seeks. It generates tailored questions that align with those preferences, preparing you for both technical and non-technical interview rounds, including HR discussions and project-related inquiries, ensuring you're fully prepared.",
      "link": "/resume-questions"
    },
    {
      "name": "All Internship & Job Opportunities",
      "desc": "This page mirrors the coding competitions list, as it will present a comprehensive overview of all available hiring and internship opportunities. You will find essential details such as application timelines and requirements for each position. Currently, we are diligently working on this feature.",
      "link": "/opportunities"
    },
  ];

  return (
    <GrandContainer>
      <MobContainer>
        <MobileNavbar />
        <Fade>
          <div className="top-page">
            <div className="heading">
              <h1 className='gradient-text'>Open Community.</h1>
              <h1>Better Information.</h1>
            </div>
            <div className="small-desc">
              Algolisted is a community-driven platform for learning and improving coding skills. It offers a wealth of information on data structures and algorithms, and allows coders to interact with, modify, and contribute to the content.
            </div>
            <div className="btn"><Link to='content' spy={true} smooth={true} offset={30} duration={1000}>Learn More</Link></div>
            {/* <div className="right"><img style={{ "width": "100%", }} src="https://thumbs.gfycat.com/HatefulHollowLangur-size_restricted.gif" alt="" /></div> */}
            <DancerDownIcon>
              <ExpandMoreIcon style={{ fontSize: '2rem', fill: '#333' }} />
            </DancerDownIcon>
          </div>
        </Fade>
        <Fade></Fade>
        <div className="page2" id='content'>
          <div className="content">
            <Fade>
              <h1>Accelerate Your Learning and Development with Algolisted Today!
              </h1>
            </Fade>
            <Fade>
              <div className="desc">
                Our platform is structured into five comprehensive modules, each designed to benefit coders of all levels. We leverage machine learning models to provide insights about companies and utilize web scraping to gather coding questions from various sources, all in one convenient location.
              </div>
            </Fade>
          </div>
          <div className="modules">
            {
              modules.map((item, index) => {
                return (
                  <Fade>
                    <a href={item.link} className="module">
                      <div className="count">{index + 1}</div>
                      <div className="name">{item.name}</div>
                      <div className="desc">{item.desc}</div>
                      <ArrowForwardIcon />
                    </a>
                  </Fade>
                )
              })
            }
            {/* <a href='/' className="module">
                      <div className="count">1</div>
                      <div className="name">Beginner Friendly Blogs</div>
                      <div className="desc">We have beginner friendly website contents, no fancy texts and informations. We just give as much information required by the first time reading users, because we firmly believe that when you want to learn a language you don't study it from a dictionary.</div>
                      <ArrowForwardIcon/>
                  </a> */}
          </div>
        </div>
        <div className="open-source-page">
          <div className="content">
            <Fade>
              <h1>Open Source Contribution</h1>
            </Fade>
            <Fade>
              <div className="desc">
                Our website showcases the commitment and talent of our incredible open-source community. Each contributor has invested their best efforts to develop and enhance the site. If you wish to report an issue or propose a new feature, we invite you to engage in the open-source process by submitting an issue.
              </div>
            </Fade>
          </div>
          <a href='https://github.com/Nayaker/Algorithmist/' target={"_blank"} className="btn" rel="noreferrer">Start Contributing</a>
          <h1 className="sub-page-head">Our Contributors</h1>
          <div className="hold-contributors">
            {
              contributorsList != null && contributorsList.map((item, index) => {
                return <a className="contributor" href={item.html_url} target={"_blank"} key={index} rel="noreferrer">
                  <img src={item.avatar_url} alt="" />
                </a>
              })
            }
          </div>
        </div>
        <PageThreeFooter>
          <div className="top">
            <p>
              Connect with us
            </p>
            <input type="email" placeholder="Email Address" />
            <div className="social-icons">
              <a className="social-icon">
                <GitHubIcon style={{ fill: "white", fontSize: '1.2rem' }} />
              </a>
              <a className="social-icon">
                <EmailIcon style={{ fill: "white", fontSize: '1.2rem' }} />
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
                  <RouterLink to="about-us" className="link">About us</RouterLink>
                  <RouterLink to="core-team" className="link">Team</RouterLink>
                  <RouterLink to="mission" className="link">Our Mission</RouterLink>
                  <RouterLink to="contact" className="link">Contact</RouterLink>
                  <RouterLink to="future-vision" className="link">Future Vision</RouterLink>
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
            {/* Open Source Project, by 
                <a href="https://www.linkedin.com/in/atanu-nayak-profile/" target="_blank">Atanu Nayak</a> and Community */}
            All commercial rights reserved, Open Source Project.
          </div>
        </PageThreeFooter>

      </MobContainer>
      <Container>
        <Navbar>
          <div className="top">
            "Hi, we’re excited to share that we are restructuring our website with Next.js. If you're a frontend developer skilled in Next.js, please send your profile to <a href="mailto:nayak@algolisted.com">nayak@algolisted.com</a>
          </div>

          <div className="bottom">
            <div className="logo">
              <img src={logo} alt="" />
              <div className="text">
                <div className="up-text">Algolisted</div>
              </div>
            </div>
            <div className="menu-list">
              <a href='/contests-archive/leetcode' className="item">Archive</a>
              <a href='/contest-analysis' className="item">Analysis</a>
              <a href='/coding-sheets/striver-sde-sheet' className="item">Coding Sheets</a>
              <a href='/core-subjects-tracker/operating-systems' className="item">Tracker</a>
              <a href='/resume-questions' className="item">Resume AI</a>
              <a href='/opportunities' className="item">Opportunities</a>
            </div>
          </div>
        </Navbar>
        <div className="hero-page">
          <div className="responsive-1700">
            <div className="left">
              <Fade>
                <div className="heading">
                  <h1>Transform Your Coding Journey with</h1>
                  <h1 className='gradient-text'>AI and Visualization!</h1>
                </div>
              </Fade>
              <Fade>
                <div className="small-desc">
                  Explore an AI-driven coding platform that seamlessly blends stunning design with dynamic features. Monitor your progress, dive into competition insights, and compete with friends in exciting coding challenges
                </div>
              </Fade>
              <Fade left>
                <div className="learn">
                  <Link to='content' spy={true} smooth={true} offset={700} duration={1000}>
                    <div className="btn">Learn More</div>
                  </Link>
                </div>
              </Fade>
            </div>
            {/* <div className="right"><img style={{ "width": "100%", }} src="https://thumbs.gfycat.com/CharmingMilkyHamster-size_restricted.gif" alt="" /></div> */}
            <div className="right">
              <Fade>
                <div className="img-container">
                  {/* <img src="https://spideo.com/wp-content/uploads/2021/12/Gif-Analytics-50-2.gif" alt="" draggable="false"/> */}
                  {/* <img src="https://analytics-smart.com/wp-content/uploads/2022/06/Data-Science1-1.gif" alt="" /> */}
                  {/* <img src={sideImage} alt="" /> */}
                  {/* <img src="https://img1.picmix.com/output/stamp/normal/1/9/5/4/2444591_542b7.gif" alt="" draggable="false" /> */}
                  {/* <img src="https://64.media.tumblr.com/839357ea6275db93b26830442d2b09ca/68e588a8812a4c4d-3f/s500x750/e1724104c696b362e9de15678922e3ad17c6c145.gif" alt="" draggable="false" /> */}
                  <img src="https://shkspr.mobi/blog/wp-content/uploads/2015/02/loop2.gif" alt="" draggable="false" />
                  {/* <img src="https://media0.giphy.com/media/P5S1CXl0y1v1I9308B/200w.gif?cid=6c09b952ifjcc0rzwkzfiqpi092ga6ssf5cvqk1nuxylglq1&ep=v1_gifs_search&rid=200w.gif&ct=s" alt="" /> */}
                </div>
              </Fade>
            </div>
          </div>
          <DancerDownIcon>
            <ExpandMoreIcon style={{ fontSize: '2rem', fill: '#333' }} />
          </DancerDownIcon>
        </div>

        <div className="page2">
          <div className="content">
            <Fade bottom>
              <h1>Accelerate Your Learning and Development with Algolisted Today!</h1>
            </Fade>
            <Fade bottom>
              <div className="desc">
                Our platform is structured into five comprehensive modules, each designed to benefit coders of all levels. We leverage machine learning models to provide insights about companies and utilize web scraping to gather coding questions from various sources, all in one convenient location.
              </div>
            </Fade>
          </div>
          <div className="modules">
            {
              modules.map((item, index) => {
                return (
                  <Fade bottom>
                    <a href={item.link} className="module">
                      <div className="count">{index + 1}</div>
                      <div className="name">{item.name}</div>
                      <div className="desc">{item.desc}</div>
                      <ArrowForwardIcon />
                    </a>
                  </Fade>
                )
              })
            }
          </div>
        </div>

        <div className="open-source-page">
          <div className="content">
            <Fade bottom>
              <h1>Open Source Contribution</h1>
            </Fade>
            <Fade bottom>
              <div className="desc">
              Our website showcases the commitment and talent of our incredible open-source community. Each contributor has invested their best efforts to develop and enhance the site. If you wish to report an issue or propose a new feature, we invite you to engage in the open-source process by submitting an issue.
              </div>
            </Fade>
          </div>
          <a href='https://github.com/Nayaker/Algorithmist/' target={"_blank"} className="btn" rel="noreferrer">Start Contributing</a>
          <h1 className="sub-page-head">Technologies Used</h1>
          <div className="hold-contributors">
            <div className="contributor"><img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQo8BG6UD3b_Fowh4gtwIjw2GPTWQQ30uBy-w&s" alt="" /></div>
            <div className="contributor"><img src="https://friconix.com/png/fi-cnsuxx-nodejs.png" alt="" /></div>
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
          <div className="sub-page-head">Our Contributors</div>
          <div className="hold-contributors">
            {
              contributorsList != null && contributorsList.map((item, index) => {
                return (
                  <Fade up>
                    <a className="contributor" href={item.html_url} target={"_blank"} key={index} rel="noreferrer">
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
              Connect with us
            </p>
            <input type="email" placeholder="Email Address" />
            <div className="social-icons">
              <a className="social-icon" href='https://github.com/Algolisted-Org/AlgoListed'>
                <GitHubIcon style={{ fill: "white", fontSize: '1.2rem' }} />
              </a>
              <a className="social-icon" href='nayak@algolisted.com'>
                <EmailIcon style={{ fill: "white", fontSize: '1.2rem' }} />
              </a>
              <a className="social-icon" href="https://twitter.com/NayakPenguin">
                <TwitterIcon style={{ fill: "white", fontSize: '1.2rem' }} />
              </a>
              <a className="social-icon" href="https://www.linkedin.com/company/algolisted/">
                <LinkedInIcon style={{ fill: "white", fontSize: '1.2rem' }} />
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
                  <RouterLink to="organisation-information/all-contributors" className="link">All Contributors</RouterLink>
                  <RouterLink to="organisation-information/contributor-work" className="link">Contributors Work</RouterLink>
                  <RouterLink to="https://business.algolisted.com/" target='_blank' className="link">Business</RouterLink>
                  <RouterLink to="https://github.com/Algolisted-Org/AlgoListed" target='_blank' className="link">Open Source</RouterLink>
                </div>
              </div>

              <div className="left-content">
                <div className="title">
                  General
                </div>
                <div className="points">
                  <a href="/organisation-information/privacy-policies" className="link">Privacy Policies</a>
                  <a href="/page-not-found" className="link">Data protection</a>
                  <a href="/organisation-information/disclaimer" className="link">Disclaimer</a>
                </div>
              </div>

              <div className="left-content">
                <div className="title">
                  Founder
                </div>
                <div className="points">
                  <a href="https://github.com/NayakPenguin" target='_blank' className="link" rel="noreferrer">Github</a>
                  <a href="https://www.linkedin.com/in/atanu-nayak-profile/" target='_blank' className="link" rel="noreferrer">Linkedin</a>
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

export default LandingPage2

const GrandContainer = styled.div`
  width: 100vw;
  overflow: hidden;

  
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
  .top-page{
    /* height: calc(100vh - 70px); */
    height: 100vh;
    width: 100vw;
    /* background-color: #111; */
    /* padding: 60px 25px; */
    padding: 120px 25px;
    position: relative;
    
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    .heading{
        h1{
            /* color: white; */
            font-size: 30px;
            font-weight: 500;
            text-align: center;
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

    .small-desc{
        /* color: white; */
        font-size: 0.85rem;
        font-weight: 200;
        margin: 15px 0;
        text-align: center;
        line-height: 2.25rem;
        letter-spacing: 0.1rem;
    }

    .btn{
      background: linear-gradient(270deg,#56f238,#56f238,#c5c5ef,#56f238,#56f238);
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

      a{
        color: #333; 
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

    .right{
      position: absolute;
      top: calc(50vh - 150px);
      z-index: -1;
    }
    
  }

  .page2{
    min-height: 100vh;
    width: 100%;
    padding: 100px 50px;
    padding-bottom: 60px;
    background-color: #fbf5ff;
    border-bottom: 1px solid #fee0e0;

    
    .content{
        height: 100%;
        margin: 0 auto;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;

        h1{
            /* color: white; */
            font-size: 20px;
            font-weight: 500;
            text-align: center;
            background-color: #f3ec78;
            background-image: linear-gradient(135deg,#0066ff,#5dff00);
            background-size: 100%;
            -webkit-background-clip: text;
            -moz-background-clip: text;
            -webkit-text-fill-color: transparent; 
            -moz-text-fill-color: transparent;
        }

      .desc{
          /* color: white; */
          font-size: 0.85rem;
          font-weight: 200;
          margin: 15px 0;
          text-align: center;
          line-height: 1.5rem;
          letter-spacing: 0.1rem;
      }
    }

    .modules{
        width: 100%;
        margin: 20px auto 0 auto;
        display: flex;
        flex-direction: column;
        align-items: center;
        
        .module{
            text-decoration: none;
            color: inherit;
            border: 1px solid transparent;
            height: 370px;
            width: 100%;
            max-width: 500px;
            border-radius: 50px;
            background-color: white;
            margin: 20px;
            margin-bottom: 50px;
            position: relative;
            display: flex;
            flex-direction: column;
            align-items: center;
            padding: 60px 30px;
            cursor: pointer;

            .count{
                position: absolute;
                height: 60px;
                width: 60px;
                border-radius: 100px;
                background-color: black;
                display: grid;
                place-items: center;
                color: white;
                font-size: 1.25rem;
                top: -30px;
                left: calc(50% - 30px);
                font-family: "Roboto","Arial",sans-serif;
                user-select: none;
            }

            div{
                text-align: center;
            }

            .name{
                font-size: 1rem;
                font-weight: 500;
            }
            
            .desc{
                font-size: 0.8rem;
                font-weight: 200;
                margin: 15px 0;
                flex: 1;
            }

            svg{

            }

            &:hover{
                background-color: #fdfdfd;
                border: 1px solid #c2bebe;
                transition-duration: 250ms;
                transition-timing-function: ease-in-out;
            }
            
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

    h1{
        /* color: white; */
        font-size: 26px;
        font-weight: 500;
        text-align: center;
        background-color: #f3ec78;
        background-image: linear-gradient(135deg,#0066ff,#5dff00);
        background-size: 100%;
        -webkit-background-clip: text;
        -moz-background-clip: text;
        -webkit-text-fill-color: transparent; 
        -moz-text-fill-color: transparent;
    }

    .content{
        height: 100%;
        margin: 0 auto;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;

        

      .desc{
          /* color: white; */
          font-size: 0.85rem;
          font-weight: 200;
          margin: 15px 0;
          text-align: center;
          line-height: 1.5rem;
          letter-spacing: 0.1rem;
      }
    }

    .btn{
      background: linear-gradient(270deg,#56f238,#56f238,#c5c5ef,#56f238,#56f238);
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

    .sub-page-head{
      font-size: 1rem;
      margin-bottom: 10px;
      font-weight: 500;
      background-image: linear-gradient(24deg,#5f97ec,#e64b4b);
    }

    .hold-contributors{
      width: 90%;
      display: flex;
      gap: 10px;
      justify-content: center;
      flex-wrap: wrap;
      margin: auto;
      margin-top: 10px;

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
      color: inherit;
      margin: 10px 0;
      font-size: 0.85rem;
      padding: 10px 20px;
      letter-spacing: 0.07rem;
      margin-bottom: 50px;

      &:hover{
        background-color: #222;
        color: whitesmoke;
      }
    }
  }

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
    width: 100vw;
    min-height: max(100vh, 540px);
    height: auto;
    /* background: linear-gradient( rgba(0, 0, 0, 0.4),  rgba(0, 0, 0, 0.4) ), url("https://i.gifer.com/OsLU.gif") center top / cover no-repeat fixed; */
    margin: 0;
    position: relative;
    /* background-color: #111; */
    padding: 70px 120px;
    /* border: 1px solid black; */
    display: flex;
    justify-content: center;
    align-items: center;

    
    .responsive-1700{
        /* border: 1px solid black; */
        width: 100%;
        height: 100%;
        max-width: 1600px;
        margin: auto;
        display: flex;
        justify-content: space-between;
        align-items: center;

        
        .left{
            width: 70vw;
            max-width: 800px;
        }

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
            /* color: white; */
            font-size: 1.15rem;
            font-weight: 200;
            margin: 30px 0;
            line-height: 2.25rem;
            letter-spacing: 0.1rem;
        }

        .right{
          .img-container{
            height: 300px;
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
    }

    .btn{
      background: linear-gradient(270deg,#56f238,#c5c5ef,#56f238);
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

  .page2{
    min-height: 100vh;
    min-height: 540px;
    width: 100vw;
    padding: 100px 50px;
    background-color: #fbf5ff;
    border-bottom: 1px solid #fee0e0;

    
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

    .modules{
        width: 100%;
        max-width: 1000px;
        margin: 50px auto;
        display: flex;
        justify-content: center;
        flex-wrap: wrap;
        
        .module{
            text-decoration: none;
            color: inherit;
            border: 1px solid transparent;
            height: 370px;
            width: calc(33.33% - 20px);
            border-radius: 50px;
            background-color: white;
            margin: 35px 10px;
            position: relative;
            display: flex;
            flex-direction: column;
            align-items: center;
            padding: 60px 30px;
            cursor: pointer;

            .count{
                position: absolute;
                height: 60px;
                width: 60px;
                border-radius: 100px;
                background-color: black;
                display: grid;
                place-items: center;
                color: white;
                font-size: 1.5rem;
                top: -30px;
                left: calc(50% - 30px);
                font-family: "Roboto","Arial",sans-serif;
                user-select: none;
            }

            div{
                text-align: center;
            }

            .name{
                font-size: 1.15rem;
                font-weight: 500;
            }
            
            .desc{
                font-size: 0.8rem;
                font-weight: 200;
                margin: 15px 0;
                flex: 1;
            }

            svg{

            }

            &:hover{
                background-color: #fdfdfd;
                border: 1px solid #c2bebe;
                transition-duration: 250ms;
                transition-timing-function: ease-in-out;
            }
            
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
      margin-top: 50px;
      font-size: 1.75rem;
      font-weight: 500;
    }

    .hold-contributors{
      display: flex;
      flex-wrap: wrap;
      width: 50% !important;
      gap: 20px;
      justify-content: center;
      margin-top: 30px;

      .contributor{
        cursor: pointer;
        background-color: white;
        overflow: hidden;
        height: 47.5px;
        width: 47.5px;
        margin: 0 7.5px 7.5px 0;  
        border-radius: 100px;
        border: 1px solid #bab6b6;
        /* box-shadow: 0px 0px 9px 2px rgb(0 0 0 / 12%); */
        /* transition-timing-function: ease-in-out; */

        img{
          height: 100%;
        }

        &:hover{
          z-index: 10;
          scale: 1.5;
          transition-duration: 500ms;
          transition-timing-function: cubic-bezier(0, 1.04, 0, 1.73);
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
    width: 100%;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 100;
    display: flex;
    flex-direction: column;

    .top{
      height: 40px;
      width: 100%;
      background-color: #86e847;
      display: flex;
      align-items: center;
      justify-content: flex-start;
      padding: 0 40px;
      font-weight: 300;
      font-size: 0.75rem;
      
      a{
        margin-left: 5px;
        font-weight: 500;
        color: #2b497f;
        background-color: #7ccd4a;
        padding: 2.5px 7.5px;
        border-radius: 100px;
        text-decoration: none;
      }
    }

    .bottom{
      height: 70px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-bottom: 1px solid rgb(233, 229, 229);
      padding: 0 35px;
      /* background-color: rgb(255, 255, 255); */
      background-color: #ffffffd4;
      box-shadow: 1px 1px 10px 0 rgb(0 0 0 / 5%);
      -webkit-backdrop-filter: blur(8px);
      backdrop-filter: blur(8px);

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
          }
          .down-text{
            font-size: 0.7rem;
            font-weight: 200;
          }
        }
      }

      .menu-list{
          display: flex;
          align-items: center;

          /* background-color: #f3ec78;
            background-image: linear-gradient(300deg,#a0bc42,#066df9);
            background-size: 100%;
            -webkit-background-clip: text;
            -moz-background-clip: text;
            -webkit-text-fill-color: transparent; 
            -moz-text-fill-color: transparent; */
          
          .item{
            font-size: 0.85rem;
            margin: 0 15px;
            font-weight: 400;
            text-decoration: none;
            color: inherit;
            
            

              &:hover{
                  color: cornflowerblue;
                  background-color: #f3ec78;
                  background-image: linear-gradient(300deg,#a0bc42,#066df9);
                  background-size: 100%;
                  -webkit-background-clip: text;
                  -moz-background-clip: text;
                  -webkit-text-fill-color: transparent; 
                  -moz-text-fill-color: transparent;
              }
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