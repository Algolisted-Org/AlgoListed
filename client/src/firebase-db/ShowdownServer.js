import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import CCHeader from '../Components/CCHeader'
import LeftMenu from '../Components/LeftMenu'
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import InfoIcon from '@material-ui/icons/Info';
import { collection, addDoc, getDocs, onSnapshot, doc,deleteDoc, getDoc, updateDoc, arrayUnion  } from 'firebase/firestore'

import db from '../firebase';

const ShowdownServer = () => {
    const [username, setUsername] = useState('')
    const [servername, setServername] = useState('')
    const [serverId, setServerId] = useState('')
    const collectionRef = collection(db, 'server-info');
    //const collectionRef = db.collection('server-info')
    const handleSubmitcreateserver = async(e)=> {
        e.preventDefault()
        
        const adminId = username+Date.now() 
        const serverId = servername+Date.now()
        const createdAt = Date.now()
        await addDoc(collectionRef, { adminId , serverId , members : [username] , createdAt })
        console.log("form submitted");
    }
    const handlesubmitjoinserver = async(e)=> {
        e.preventDefault()
        const serverRef = collectionRef.get()
        console.log(serverRef)
        /*
        await updateDoc(serverRef,{
            members: arrayUnion(username)
        }) 
        */
    }
    return (
        <GrandContainer>
            <MobContainer>
                We are still working on Responsive Version of the website, please view the site with
                width more than 1100px, a standard laptop or tablet landscape.
                <img src="https://media4.giphy.com/media/13FrpeVH09Zrb2/giphy.gif" alt="" />
            </MobContainer>
            <Container>
                <CCHeader />
                <LeftMenu marked={"showdown-server"} />
                <div className="cc-middle-content">
                    <h1 className='main-heading'>Showdown Server <div className="head-tag">Powered by Algolisted Ai <img src="https://www.gstatic.com/lamda/images/sparkle_resting_v2_darkmode_2bdb7df2724e450073ede.gif" alt="" /></div></h1>
                    <p className="heading-supporter">
                        <img className='circle' draggable="false" src="https://giffiles.alphacoders.com/214/214686.gif" alt="" />
                        Now, you can host coding competitions with your friends and select questions randomly from specific topics like binary search, recursion or graphs from platforms like Codeforces or LeetCode. Algolisted AI ensures each question is rephrased, preventing direct searches, and the competition concludes with a thrilling leaderboard showcasing your friends' coding skills!
                    </p>
                    <div className="message">
                        <div className="icon"></div>
                        <div className="text">
                            <b>For the developers working on this feature : </b>Our goal is to develop a functionality akin to <a href="https://skribbl.io/" target='_blank'>skribbl.io</a>. In essence, a user will be able to initiate a server without any login, modify settings within it, and subsequently share a link with their friends for them to join.
                        </div>
                    </div>

                    <div className="form" >
                        <div className="input-container-server username">
                            <input type="text" onChange={(e) => setUsername(e.target.value)} placeholder='Username' />
                            <ArrowForwardIosIcon />
                        </div>
                        <div className="input-container-server create-room">
                            <input type="text" onChange={(e) => setServername(e.target.value)} placeholder='Server Name' />
                            <ArrowForwardIosIcon />
                        </div>
                        or join server 
                        <div className="input-container-server join-room">
                            <input type="text" onChange={(e) => setServerId(e.target.value)} placeholder='Server-ID' />
                            <ArrowForwardIosIcon />
                        </div>
                        <div className="play-btn" onClick={handleSubmitcreateserver}>
                            Go to Server!
                            {/*
                            <a href='showdown-server/id-4398921a-iamatanunayak' className="btn-server">
                                Go to Server!
                            </a>
    */}                     
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

    a{
      color: #18489f;
    }

    .circle{
        border-radius: 1000px;
        padding: 5px;
        height: 120px;
        border: 1px solid #dababa;
        background-color: #e5e5e5;
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
          display: flex; 
          align-items: center;

          .head-tag{
            display: inline;
            font-size: 0.75rem;
            font-weight: 500;
            padding: 0.25rem 0.5rem;
            border-radius: 100px;
            background-color: #e5e5e5;
            margin-left: 10px;

            img{
                height: 1.15rem;
                margin-bottom: -5px;
                margin-left: 5px;
            }
          }
      }


      .heading-supporter{
          font-size: 1.05rem;
          margin-bottom: 10px;
          font-weight: 400;
          color: #696168;
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
        background-color: #d5f7e1;
        border-radius: 5px;
        padding: 10px;
        margin: 20px 0 50px 0;

        .text{
            font-size: 0.8rem;
            color: #13803b;
            font-weight: 300;
            
            b{
                font-weight: 500;
            }
        }   
      }

      .form{
        .input-container-server{
            height: 40px;
            width: 500px;
            background-color: #e5e5e5;
            margin-bottom: 10px;
            border-radius: 5px;
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 10px;
            border: 1px solid #c0c0c0;


            input{
                height: 100%;
                font-size: 0.75rem;
                background-color: transparent;
                flex: 1;
                font-weight: 300;
                letter-spacing: 0.05rem;
                border: none;
                border-right: 1px solid #c0c0c0;
                margin-right: 10px;
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
                background-color: #e5e5e5;
                margin-bottom: 10px;
                border-radius: 5px;
                display: flex;
                align-items: center;
                justify-content: center;
                padding: 10px;
                border: 1px solid #c0c0c0;
                font-size: 0.8rem;
                text-transform: uppercase;
                font-weight: 600;
                cursor: pointer;
                text-decoration: none;
                color: black;
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
                    fill: #333;
                    font-size: 1rem;
                }

                .text{
                    font-size: 0.7rem;
                    font-weight: 200;
                }
                
            }
        }
      }
    }
`
