import React, { useState } from 'react'
import styled from 'styled-components'
import ArrowRightAltIcon from '@material-ui/icons/ArrowRightAlt';
import TranslateIcon from '@material-ui/icons/Translate';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import InstagramIcon from '@material-ui/icons/Instagram';
import GitHubIcon from '@material-ui/icons/GitHub';
import EmailIcon from '@material-ui/icons/Email';
import FacebookIcon from '@material-ui/icons/Facebook';

const ContributeSite = () => {
    const [showModel, setShowModel] = useState(false);

    return (
        <GrandContainer>
            <MobContainer>
                We are still working on Responsive Version of the website, please view the site with
                width more than 1100px, a standard laptop or tablet landscape.
                <img src="https://media4.giphy.com/media/13FrpeVH09Zrb2/giphy.gif" alt="" />
            </MobContainer>
            <Container>
                {/* <TopMessage>
          <div className="text">The is website is under constant development, if there is something you can contribute the website with <a href="/"> click here</a>.</div>
        </TopMessage> */}

                <div className="main-page">
                    <div className="heading">
                        <h1 className='gradient-text'>Work with Algorithmist.</h1>
                    </div>
                    <div className="small-desc">
                        At Algorithmist we strongly believe that people are paramount to success.
                        That's why we not only invest efforts in the growth of our website but also in the growth of the whole community. You could be one of us.
                    </div>

                    <div className="sub-content">
                        <div className="page-sub-head">Non Coding Tasks</div>
                        <div className="small-desc">
                            These tasks don't require you to be a coder to contribute to the website, and still you
                            can contribute and yourself a certificate of work aswell.
                        </div>
                        <div className="btns">
                            <div className="btn">Non-Techincal Content Writer</div>
                            <div className="btn">Social Media Posts Maker</div>
                            <div className="btn">Documentation Management</div>
                            <div className="btn">Product Management</div>
                            <div className="btn">Resources Provider</div>
                        </div>
                    </div>

                    <div className="sub-content">
                        <div className="page-sub-head">Coding Tasks</div>
                        <div className="small-desc">
                            These tasks require you to know coding to contribute to the website.
                        </div>
                        <div className="btns">
                            <div className="btn">Technical Content Writer</div>
                            <div className="btn">React Js</div>
                            <div className="btn">Open Source</div>
                        </div>
                    </div>
                </div>
                {
                    showModel ? (
                        <Model>
                            <div className="content-box">
                            </div>
                        </Model>
                    ):(<></>)
                }
            </Container>
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
                                Algorithmist
                            </div>
                            <div className="points">
                                <a href="/" className="link">About us</a>
                                <a href="/" className="link">Team</a>
                                <a href="/" className="link">Our Mission</a>
                                <a href="/" className="link">Contact</a>
                                <a href="/" className="link">Future Vision</a>
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
                                <a href="/" className="link">Login</a>
                                <a href="/" className="link">Create account</a>
                                <a href="/" className="link">Request API access</a>
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

                <div className="bottom">
                    Open Source Project, by
                    <a href="https://www.linkedin.com/in/atanu-nayak-profile/" target="_blank">Atanu Nayak</a> and Community
                </div>
            </PageThreeFooter>
        </GrandContainer>
    )
}

export default ContributeSite

const GrandContainer = styled.div`

`

const MobContainer = styled.div`
  width: 100vw;
  padding: 40px;
  text-align: center;
  font-size: 2rem;
  font-weight: 500;

  img{
    width: calc(100% - 80px);
    margin: 40px;
    border-radius: 5px;
    display: block;
  }

  @media only screen and (min-width: 1099px){
    display: none;
  }
`

const Container = styled.div`
  @media only screen and (max-width: 1100px){
    display: none;
  }

  width: 100vw;
  padding: 40px;

  .btns{
    display: flex;
    flex-wrap: wrap;
    margin: 20px 0;

    .btn{
        border: 1px solid #c2b1b1;
        color: white;
        padding: 7.5px 15px;
        display: inline-block;
        font-size: 0.85rem;
        font-weight: 400;
        text-decoration: none;
        /* text-transform: uppercase; */
        letter-spacing: 0.15rem;
        /* border-radius: 100px; */
        color: #333;
        margin-right: 10px;
        margin-bottom: 10px;
        
        &:hover{
            /* background-color: whitesmoke; */
            border-color: #333;
            cursor: pointer;
            transition-duration: 250ms;
        }
    }
  }


  .main-page{
    min-height: max(100vh, 660px);

    .heading{
        h1{
            font-size: 45px;
            font-weight: 500;
        }

        .gradient-text {
            background-color: #f3ec78;
            background-image: linear-gradient(219deg,#769de0,#db8585);
            background-size: 100%;
            -webkit-background-clip: text;
            -moz-background-clip: text;
            -webkit-text-fill-color: transparent; 
            -moz-text-fill-color: transparent;
        }
    }

    .small-desc{
        font-size: 1.15rem;
        font-weight: 200;
        margin: 10px 0;
        line-height: 2.25rem;
        letter-spacing: 0.1rem;
    }
    
    .sub-content{
        max-width: 1000px;
    }

    .page-sub-head{
      margin: 80px 0 10px 0;
      font-size: 1.5rem;
      font-weight: 500;
      color: #524b4b;
    }
  }
`

const TopMessage = styled.div`
  height: 40px;
  width: 100vw;
  z-index: 10;
  position: fixed;
  top: 0;
  left: 0;
  background-color: #ebebeb;
  display: flex;
  align-items: center;
  justify-content: center;
  border-bottom: 1px solid #e7c9c9;
  
  .text{
    font-size: 0.8rem;
    font-weight: 300;

    a{
      text-decoration: none;
    }
  }
`

const PageThreeFooter = styled.div`
    height: 560px;
    background-color: #111;
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
        background-color: #1f1c1c;
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


    @media only screen and (max-width: 600px){
        height: 480px;
        padding-top: 36px;
        display: flex;
        flex-direction: column;
        padding-bottom: 120px;
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
            padding: 0; 
            margin-top: 30px;
            text-align: center;

            .left{
                display: none;
            }

            .right{
                display: grid;
                place-items: center;
                width: 80%;
                margin: auto;

                h1{
                    font-size: 3rem;
                    text-align: right;
                }

                span{
                    font-size: 0.9rem;
                }
            }
        }

        .bottom{
            height: 60px;
            font-size: 0.6rem;
            font-weight: 100;
            background-color: #1f1c1c;
        }


    }

`

const Model = styled.div`
    width: 100vw;
    z-index: 100;
    height: 100vh;
    background-color: #000000cc;
    position: fixed;
    top: 0;
    left: 0;
    display: grid;
    place-items: center;

    .content-box{
        height: 500px;
        width: 1000px;
        background-color: white;
        z-index: 10;
    }
`