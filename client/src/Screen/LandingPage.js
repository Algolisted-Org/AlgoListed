import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import ArrowRightAltIcon from '@material-ui/icons/ArrowRightAlt';
import TranslateIcon from '@material-ui/icons/Translate';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import InstagramIcon from '@material-ui/icons/Instagram';
import GitHubIcon from '@material-ui/icons/GitHub';
import EmailIcon from '@material-ui/icons/Email';
import FacebookIcon from '@material-ui/icons/Facebook';
import react3dLoader from '../Images/react3dLoader.gif'
import axios from "axios";


const LandingPageReal = () => {
  

  

  return (
    <GrandContainer>
      <MobContainer>
        We are still working on Responsive Version of the website, please view the site with 
        width more than 1100px, a standard laptop or tablet landscape. 
        <img src="https://media4.giphy.com/media/13FrpeVH09Zrb2/giphy.gif" alt="" />
      </MobContainer>
      <Container>
        <h1>Upcoming Contests</h1>
      </Container>
    </GrandContainer>
  )
}

export default LandingPageReal

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

  .top-page{
    height: calc(100vh - 40px);
    min-height: 540px;
    /* background: linear-gradient( rgba(0, 0, 0, 0.4),  rgba(0, 0, 0, 0.4) ), url("https://i.gifer.com/OsLU.gif") center top / cover no-repeat fixed; */
    width: 100vw;
    background-color: #111;
    padding: 50px;

    
    .responsive-1700{
        width: 100%;
        max-width: 1600px;
        margin: auto;
        display: flex;
        justify-content: space-between;
        align-items: center;

        height: 100%;
        
        .left{
          width: 70vw;
          max-width: 800px;
        }
    
        .heading{
          h1{
            color: white;
            font-size: 65px;
            font-weight: 400;
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
    
        .small-desc{
          color: white;
          font-size: 1.15rem;
          font-weight: 200;
          margin: 30px 0;
          line-height: 2.25rem;
          letter-spacing: 0.1rem;
        }
    }
    
  }

  .categories-page{
    width: 100vw;
    min-height: 540px;
    padding: 100px 50px;

    .page-head{
      font-size: 2.5rem;
      font-weight: 500;
    }

    .page-sub-head{
      max-width: 980px;
      margin: 10px 0;
      font-size: 1.15rem;
      font-weight: 200;
    }

    section{
      margin-top: 50px;

      .sub-page-head{
        font-size: 1.75rem;
        font-weight: 500;
      }

      .sub-page-sub-head{
        max-width: 980px;
        margin: 15px 0 15px 10px;
        font-size: 1rem;
        font-weight: 200;
        line-height: 1.75rem;
      }

      .cat-boxes{
        margin: 10px 5px;
        display: flex;
        flex-wrap: wrap;

        .cat-box{
          height: 125px;
          width: 375px;
          position: relative;
          text-decoration: none;
          /* background-color: black; */
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          background-color: #f3f1f1;
          border-radius: 5px;
          padding: 15px;
          margin: 0px 15px 15px 0px;

          .cat-left{
            .cat-head{
              font-size: 1rem;
              font-weight: 400;
            }

            .cat-desc{
              font-size: 0.8rem;
              font-weight: 200;
            }
          }

          .cat-right{
            margin-left: 15px;
            height: 100%;
            display: flex;
            justify-content: center;
            align-items: center;
          }
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

  .contribute-content{
    width: 100vw;
    min-height: 240px;
    padding: 100px 50px;
    background-color: #f3f1f166;
    /* #e2e8f0 */
    display: flex;
    justify-content: space-between;
    align-items: center;

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

    img{
      height: 150px;
      margin: 10px 0;
    }

    // btn is continued from top
    .btn{
      color: inherit;
      margin: 10px 0;
      font-size: 0.85rem;
      padding: 10px 20px;
      letter-spacing: 0.07rem;

      &:hover{
        background-color: #222;
        color: whitesmoke;
      }
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
