import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import CCHeader from '../Components/CCHeader'
import codeclublogo from '../Images/jucc-logo.png'
import LeftMenuCodeClub from '../Components/LeftMenuCodeClub'
import QuestionAnswerIcon from '@material-ui/icons/QuestionAnswer';
import SpellcheckIcon from '@material-ui/icons/Spellcheck';
import CheckCircleOutlineIcon from "@material-ui/icons/CheckCircleOutline";

const CodeClub = () => {
    return ( 
        <GrandContainer>
            <MobContainer>
                We are still working on Responsive Version of the website, please view the site with 
                width more than 1100px, a standard laptop or tablet landscape. 
                <img src="https://media4.giphy.com/media/13FrpeVH09Zrb2/giphy.gif" alt="" />
            </MobContainer>
            <Container>
                <CCHeader />
                <LeftMenuCodeClub marked={"potd"} /> 
                <div className="cc-middle-content">
                    <h1 className='main-heading'>Codeclub Jadavpur University</h1>
                    <p className="heading-supporter">
                        <img className='club-logo' src={codeclublogo} alt="" />
                        <div className="text">
                            <p>
                                Welcome to CodeClub JU! Get ready to explore the world of programming, tech, and innovation, whether you're a coding expert or a curious newcomer. We're here to learn, collaborate, and aim to elevate our college's standing in ICPC finals, college fests, and national hackathons by reinforcing a strong coding culture. From Data Structures to Machine Learning, there's a lot in store for us to achieve together.
                            </p>
                            <div className="message">
                                <div className="icon"></div>
                                <div className="text">
                                    For faster updates and a better community support, join our WhatsApp group : <a href="https://chat.whatsapp.com/CwtNO2i2RnbA1GfijifOkb" target='_blank'>click here</a>
                                </div>
                            </div>
                        </div>
                    </p>    

                    <div className="main-section">
                        <div className="small-head">Problem of the Day</div>
                        <div className="problem-box">
                            <div className="main-problem">
                                <div className="problem">
                                    <div>
                                        <div className="title">Maximum cities Alex can reach</div>
                                        <div className="desc1">Medium</div>
                                        <div className="desc2">Time left : 13 Hours, 2 Mins</div>
                                    </div>

                                    <div className="author"><b>Author</b> : <a href="/">Atanu Nayak</a></div>
                                </div>
                            </div>
                            <div className="end-opt">
                            </div>
                            <div className="end-opt">
                            </div>
                        </div>
                    </div>

                    <div className="section">
                        <div className="small-head">Previous POTDs</div>
                        <div className="problem">
                            <div className="title">Alice enters into the Borderland</div>    
                            <div className="done-btn">
                                <CheckCircleOutlineIcon/>
                            </div>
                        </div>   
                        <div className="problem">
                            <div className="title">No overlapping subproblem</div>    
                            <div className="done-btn">
                                <CheckCircleOutlineIcon/>
                            </div>
                        </div>    
                        <div className="problem">
                            <div className="title">World with no affiars</div>    
                            <div className="done-btn">
                                <CheckCircleOutlineIcon/>
                            </div>
                        </div> 
                    </div>
                    
                </div>

            </Container>
        </GrandContainer>
    )
}

export default CodeClub

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

    a{
      color: #18489f;
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
          color: #292929;
      }

      
      .heading-supporter{
        display: flex;
        align-items: center;
        margin-top: 20px;

        .club-logo{
            height: 185px;
            border-radius: 20px;
            margin-right: 20px;
        }

        .text{
            
          p{
            font-size: 1.05rem;
            margin-bottom: 10px;
            font-weight: 400;
            color: #696168;

            a{
                color: #18489f;
                font-size: 0.95rem;
                font-weight: 300;
                margin-left: 0.25rem;
            }
          }
          
          .message{
            display: inline-block;
            /* display: flex; */
            /* align-items: center; */
            background-color: #d5f7e1;
            border-radius: 5px;
            padding: 10px;
            /* margin: 10px 0 10px 0; */
    
            .text{
                font-size: 0.8rem;
                color: #13803b;
                font-weight: 300;
                
            }
          }
        }
      }

      .main-section{
        margin-top: 50px;
        border-top: 1px solid #d0b3b3;
        padding: 20px 0;
        
        .small-head{
            font-size: 1.25rem;
            font-weight: 600;
            color: #292929;
        }

        .problem-box{
            height: 125px;
            width: 100%;
            margin: 20px 0;
            border-radius: 10px;
            display: flex;
            align-items: center;
            justify-content: space-between;

            .main-problem{
                flex: 1;
                .problem{
                    height: 125px;
                    padding: 10px;
                    width: 400px;
                    background-color: #f3f1ef;
                    border-radius: 10px;
                    display: flex;
                    flex-direction: column;
                    justify-content: space-between;

                    .title{
                        font-weight: 500;
                        color: cornflowerblue;
                    }

                    .desc1{
                        font-size: 0.85rem;
                        font-weight: 500;
                        color: orange;
                    }

                    .desc2{
                        font-size: 0.85rem;
                        font-weight: 300;
                    }

                    .author{
                        b{
                            font-weight: 500;
                        }
                        
                        font-size: 0.75rem;
                        font-weight: 300;
                    }
                }
            }
            .end-opt{
                height: 125px;
                width: 125px;
                background-color: #f3f1ef;
                margin-left: 10px;
                border-radius: 10px;
                position: relative;
                display: grid;
                place-items: center;
            }
        }
        
      }
    
      .section{
        border-top: 1px solid #d0b3b3;
        padding: 20px 0;
        
        .small-head{
            font-size: 1.25rem;
            font-weight: 600;
            color: #292929;
            margin-bottom: 20px;
        }

        .problem{
            display: flex;
            align-items: center;
            justify-content: space-between;
            margin-top: 10px;
            padding: 10px 20px; 
            /* background-color: #f3f1ef; */
            border: 1px solid #e2ddd9;
            border-radius: 10px;
            
            .title{
                font-weight: 500;
                color: cornflowerblue;
            }

            .done-btn {
                .MuiSvgIcon-root {
                    fill: #b5a6a6;
                    font-size: 1.75rem;

                    &:hover {
                        transition-duration: 250ms;
                        fill: orange;
                        cursor: pointer;
                    }
                }
            }
        }
      }
    }
`
