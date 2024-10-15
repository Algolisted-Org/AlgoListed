import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import CCHeaderDark from '../Components/CCHeaderDark'
import LeftMenu from '../Components/LeftMenu'
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import InfoIcon from '@material-ui/icons/Info';
import LeftMenuDark from '../Components/LeftMenuDark';

const ShowdownServer = () => {
    useEffect(() => {
        document.title = "Showdown Server - Algolisted";
    }, []);

    return (
        <GrandContainer>
            <MobContainer>
                We are still working on Responsive Version of the website, please view the site with
                width more than 1100px, a standard laptop or tablet landscape.
                <img src="https://media4.giphy.com/media/13FrpeVH09Zrb2/giphy.gif" alt="" />
            </MobContainer>
            <Container>
                <CCHeaderDark />
                <LeftMenuDark marked={"showdown-server"} />
                <div className="cc-middle-content">
                    <h1 className='main-heading'>Showdown Server <div className="head-tag">Powered by Algolisted Ai <img draggable="false" src="https://static.wixstatic.com/media/592002_0f04cb41e098424588d09e2fba76ec65~mv2.gif" alt="" /></div></h1>
                    <p className="heading-supporter">
                        <img className='circle' draggable="false" src="https://giffiles.alphacoders.com/214/214686.gif" alt="" />
                        Now, you can host coding competitions with your friends and select questions randomly from specific topics like binary search, recursion or graphs from platforms like Codeforces or LeetCode. Algolisted AI ensures each question is rephrased, preventing direct searches, and the competition concludes with a thrilling leaderboard showcasing your friends' coding skills!
                    </p>
                    <div className="message">
                        <div className="icon"></div>
                        <div className="text">
                            <b>For the developers working on this feature : </b>Our goal is to develop a functionality akin to <a href="https://skribbl.io/" target='_blank' rel="noreferrer">skribbl.io</a>. In essence, a user will be able to initiate a server without any login, modify settings within it, and subsequently share a link with their friends for them to join.
                        </div>
                    </div>

                    <div className="form">
                        <div className="input-container-server username">
                            <input type="text" placeholder='Username' />
                            <ArrowForwardIosIcon />
                        </div>
                        <div className="input-container-server create-room">
                            <input type="text" placeholder='Server Name' />
                            <ArrowForwardIosIcon />
                        </div>
                        <div className="input-container-server join-room">
                            <input type="text" placeholder='Server-ID' />
                            <ArrowForwardIosIcon />
                        </div>
                        <div className="play-btn">
                            <a href='showdown-server/id-4398921a-iamatanunayak' className="btn-server">
                                Go to Server!
                            </a>
                            <div className="info">
                                <InfoIcon />
                                <div className="text">
                                    The above data is collected in your local storage.
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Container>
        </GrandContainer>
    )
}

export default ShowdownServer

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
    @media only screen and (max-width: 1099px){
        display: none;
    }

    display: flex;
    justify-content: space-between;
    padding-left: 200px;
    background-color: #313338;

    a{
      color: #6d93d8;
    }

    .circle{
        border-radius: 1000px;
        padding: 5px;
        height: 120px;
        border: 1px solid #dababa;
        background-color: #2b2d31;
    }

    .cc-middle-content{
      min-height: 100vh;
      width: 100%;
      /* padding: 80px min(120px, 5vw) 50px min(120px, 5vw); */
      padding: 80px 120px 50px 120px;
      position: relative;
      width: 100%;
      max-width: 1360px;
      min-width: 850px;
      margin: auto;
      
      
      @media only screen and (max-width: 1200px){
        padding: 80px 50px 50px 50px;
      }   


      .main-heading{
          font-size: 1.65rem;
          font-weight: 600;
          color: #e5e6e8;
          display: flex; 
          align-items: center;

          .head-tag{
            display: inline;
            font-size: 0.75rem;
            font-weight: 500;
            padding: 0.25rem 0.5rem;
            padding-right: 35px;
            border-radius: 100px;
            background-color: #a5bb26;
            margin-left: 10px;

            img{
                position: absolute;
                height: 2rem;
                margin-top: -7.5px;
                margin-left: -5px;
            }
          }
      }

      .heading-supporter{
          font-size: 1.05rem;
          margin-bottom: 10px;
          font-weight: 400;
          color: #ffffffa6;
          display: flex;
          align-items: center;

          a{
            color: #18489f;
            font-size: 0.95rem;
            font-weight: 300;
            margin-left: 0.25rem;
          }

          img{
            margin-right: min(5%, 25px);
          }
      }

      .message{
        display: inline-block;
        /* display: flex; */
        /* align-items: center; */
        background-color: #444754;
        border-radius: 5px;
        padding: 10px;
        margin: 20px 0 50px 0;

        .text{
            font-size: 0.8rem;
            color: #b7b8ba;
            font-weight: 300;
            
            b{
                font-weight: 500;
                color: #b7b8ba;
            }
        }   
      }

      .form{
        .input-container-server{
            height: 40px;
            width: 500px;
            background-color: #2b2d31;
            margin-bottom: 10px;
            border-radius: 5px;
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 10px;
            border: 1px solid #211f1f;


            input{
                height: 100%;
                font-size: 0.75rem;
                background-color: transparent;
                flex: 1;
                font-weight: 300;
                letter-spacing: 0.05rem;
                border: none;
                border-right: 1px solid #211f1f;
                margin-right: 10px;
                color: white;
            }

            svg{
                fill: black;
                font-size: 1rem;
            }
        }

        .play-btn{
            display: flex;
            align-items: center;
            margin-top: 30px;
            width: 100%;
            height: 40px;
            

            .btn-server{
                height: 100%;
                width: 150px;
                background-color: #211f1f;
                margin-bottom: 10px;
                border-radius: 5px;
                display: flex;
                align-items: center;
                justify-content: center;
                padding: 10px;
                border: 1px solid #211f1f;
                font-size: 0.8rem;
                text-transform: uppercase;
                font-weight: 600;
                cursor: pointer;
                text-decoration: none;
                color: white;
            }

            .info{
                flex: 1;
                height: 100%;
                display: flex;
                align-items: center;
                /* border: 1px solid black; */
                margin-left: 10px;
                margin-top: -10px;

                svg{
                    margin-right: 2.5px;
                    fill: #ffffffa6;
                    font-size: 1rem;
                }

                .text{
                    font-size: 0.7rem;
                    font-weight: 200;
                    color: #ffffffa6;
                }
                
            }
        }
      }
    }
`
